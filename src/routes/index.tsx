import {
	Badge,
	Button,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Spinner,
	Text,
	TextField,
} from "@radix-ui/themes";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, Play, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { answersCollection } from "@/db/collections/answers";
import { categoriesCollection } from "@/db/collections/categories";
import { gameSessionsCollection } from "@/db/collections/game-sessions";
import { questionsCollection } from "@/db/collections/questions";
import type { Category, GameSession, Question } from "@/db/zod-schemas";

export const Route = createFileRoute("/")({
	ssr: false,
	loader: async () => {
		await Promise.all([
			categoriesCollection.preload(),
			questionsCollection.preload(),
			gameSessionsCollection.preload(),
			answersCollection.preload(),
		]);
		return null;
	},
	component: TriviaApp,
});

type GameState = "start" | "playing" | "results";
type Difficulty = "easy" | "medium" | "hard";

const QUESTIONS_PER_GAME = 10;
const DIFFICULTY_COLORS: Record<Difficulty, "green" | "orange" | "red"> = {
	easy: "green",
	medium: "orange",
	hard: "red",
};
const POINTS: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 30 };

function TriviaApp() {
	const [gameState, setGameState] = useState<GameState>("start");
	const [playerName, setPlayerName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	const [selectedDifficulty, setSelectedDifficulty] =
		useState<Difficulty>("easy");
	const [currentSession, setCurrentSession] = useState<GameSession | null>(
		null,
	);
	const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showFeedback, setShowFeedback] = useState(false);
	const [score, setScore] = useState(0);
	const [correctCount, setCorrectCount] = useState(0);

	const { data: categories, isLoading: catsLoading } = useLiveQuery(
		(q) =>
			q.from({ c: categoriesCollection }).orderBy(({ c }) => c.name, "asc"),
		[],
	);

	const { data: questions } = useLiveQuery(
		(q) => q.from({ q: questionsCollection }),
		[],
	);

	const { data: leaderboard } = useLiveQuery(
		(q) =>
			q
				.from({ s: gameSessionsCollection })
				.where(({ s }) => eq(s.status, "completed"))
				.orderBy(({ s }) => s.score, "desc")
				.limit(10),
		[],
	);

	const startGame = useCallback(async () => {
		if (!playerName.trim() || !selectedCategory) return;

		// Pick random questions filtered by category + difficulty
		const pool = questions.filter(
			(q) =>
				q.category_id === selectedCategory.id &&
				q.difficulty === selectedDifficulty,
		);

		let picked = [...pool]
			.sort(() => Math.random() - 0.5)
			.slice(0, QUESTIONS_PER_GAME);

		// If not enough questions at chosen difficulty, fill from same category any difficulty
		if (picked.length < QUESTIONS_PER_GAME) {
			const fallback = questions
				.filter(
					(q) =>
						q.category_id === selectedCategory.id &&
						!picked.find((p) => p.id === q.id),
				)
				.sort(() => Math.random() - 0.5);
			picked = [...picked, ...fallback].slice(0, QUESTIONS_PER_GAME);
		}

		// If still not enough, fill from any category
		if (picked.length < QUESTIONS_PER_GAME) {
			const any = questions
				.filter((q) => !picked.find((p) => p.id === q.id))
				.sort(() => Math.random() - 0.5);
			picked = [...picked, ...any].slice(0, QUESTIONS_PER_GAME);
		}

		const sessionId = crypto.randomUUID();
		const now = new Date();

		gameSessionsCollection.insert({
			id: sessionId,
			player_name: playerName.trim(),
			category_id: selectedCategory.id,
			difficulty: selectedDifficulty,
			score: 0,
			questions_answered: 0,
			questions_correct: 0,
			status: "active",
			created_at: now,
			updated_at: now,
		});

		setCurrentSession({ id: sessionId } as GameSession);
		setSessionQuestions(picked);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setShowFeedback(false);
		setScore(0);
		setCorrectCount(0);
		setGameState("playing");
	}, [playerName, selectedCategory, selectedDifficulty, questions]);

	const submitAnswer = useCallback(
		(answer: string) => {
			if (showFeedback || !currentSession) return;
			const question = sessionQuestions[currentIndex];
			const correct = answer === question.correct_answer;
			const points = correct ? POINTS[selectedDifficulty] : 0;
			const newScore = score + points;
			const newCorrect = correctCount + (correct ? 1 : 0);

			setSelectedAnswer(answer);
			setShowFeedback(true);
			setScore(newScore);
			setCorrectCount(newCorrect);

			answersCollection.insert({
				id: crypto.randomUUID(),
				session_id: currentSession.id,
				question_id: question.id,
				chosen_answer: answer,
				is_correct: correct,
				created_at: new Date(),
			});
		},
		[
			showFeedback,
			currentSession,
			sessionQuestions,
			currentIndex,
			score,
			correctCount,
			selectedDifficulty,
		],
	);

	const nextQuestion = useCallback(() => {
		if (!currentSession) return;
		const nextIndex = currentIndex + 1;
		const isLast = nextIndex >= sessionQuestions.length;

		gameSessionsCollection.update(currentSession.id, (draft) => {
			draft.questions_answered = nextIndex;
			draft.questions_correct = correctCount;
			draft.score = score;
			if (isLast) draft.status = "completed";
			draft.updated_at = new Date();
		});

		if (isLast) {
			setGameState("results");
		} else {
			setCurrentIndex(nextIndex);
			setSelectedAnswer(null);
			setShowFeedback(false);
		}
	}, [
		currentSession,
		currentIndex,
		sessionQuestions.length,
		score,
		correctCount,
	]);

	const playAgain = useCallback(() => {
		setGameState("start");
		setCurrentSession(null);
		setSessionQuestions([]);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setShowFeedback(false);
		setScore(0);
		setCorrectCount(0);
	}, []);

	if (catsLoading) {
		return (
			<Flex align="center" justify="center" py="9">
				<Spinner size="3" />
			</Flex>
		);
	}

	if (gameState === "playing") {
		const question = sessionQuestions[currentIndex];
		if (!question) return null;
		const options = [
			{ key: "a", text: question.option_a },
			{ key: "b", text: question.option_b },
			{ key: "c", text: question.option_c },
			{ key: "d", text: question.option_d },
		];
		const progress = ((currentIndex + 1) / sessionQuestions.length) * 100;

		return (
			<Container size="2" py="6">
				<Flex direction="column" gap="5">
					{/* Progress bar */}
					<Flex direction="column" gap="2">
						<Flex justify="between" align="center">
							<Text size="2" color="gray">
								Question {currentIndex + 1} of {sessionQuestions.length}
							</Text>
							<Flex gap="3" align="center">
								<Badge
									color={DIFFICULTY_COLORS[selectedDifficulty]}
									variant="soft"
								>
									{selectedDifficulty}
								</Badge>
								<Text size="2" weight="bold" color="violet">
									{score} pts
								</Text>
							</Flex>
						</Flex>
						<div
							style={{
								height: 6,
								background: "var(--gray-4)",
								borderRadius: 3,
								overflow: "hidden",
							}}
						>
							<div
								style={{
									height: "100%",
									width: `${progress}%`,
									background: "var(--violet-9)",
									transition: "width 0.3s ease",
								}}
							/>
						</div>
					</Flex>

					{/* Question card */}
					<Card variant="surface" style={{ padding: "var(--space-5)" }}>
						<Text size="5" weight="medium">
							{question.question}
						</Text>
					</Card>

					{/* Options */}
					<Flex direction="column" gap="3">
						{options.map(({ key, text }) => {
							let variant: "soft" | "solid" | "surface" = "surface";
							let color: "violet" | "green" | "red" | "gray" = "gray";

							if (showFeedback) {
								if (key === question.correct_answer) {
									variant = "solid";
									color = "green";
								} else if (
									key === selectedAnswer &&
									key !== question.correct_answer
								) {
									variant = "solid";
									color = "red";
								}
							} else if (key === selectedAnswer) {
								variant = "soft";
								color = "violet";
							}

							return (
								<Button
									key={key}
									variant={variant}
									color={color}
									size="3"
									onClick={() => submitAnswer(key)}
									disabled={showFeedback}
									style={{
										justifyContent: "flex-start",
										textAlign: "left",
										height: "auto",
										padding: "12px 16px",
									}}
								>
									<Flex gap="3" align="center">
										<Text
											weight="bold"
											style={{ minWidth: 20, textTransform: "uppercase" }}
										>
											{key}
										</Text>
										<Text style={{ whiteSpace: "normal" }}>{text}</Text>
									</Flex>
								</Button>
							);
						})}
					</Flex>

					{/* Feedback */}
					{showFeedback && (
						<Card
							variant="surface"
							style={{
								borderLeft: `4px solid ${selectedAnswer === question.correct_answer ? "var(--green-9)" : "var(--red-9)"}`,
								padding: "var(--space-4)",
							}}
						>
							<Flex justify="between" align="center">
								<Flex gap="2" align="center">
									{selectedAnswer === question.correct_answer ? (
										<>
											<CheckCircle size={20} color="var(--green-9)" />
											<Text weight="medium" color="green">
												Correct! +{POINTS[selectedDifficulty]} points
											</Text>
										</>
									) : (
										<>
											<XCircle size={20} color="var(--red-9)" />
											<Text weight="medium" color="red">
												Wrong! Correct:{" "}
												<Text
													weight="bold"
													style={{ textTransform: "uppercase" }}
												>
													{question.correct_answer}
												</Text>
											</Text>
										</>
									)}
								</Flex>
								<Button onClick={nextQuestion} size="2">
									{currentIndex + 1 >= sessionQuestions.length
										? "See Results"
										: "Next →"}
								</Button>
							</Flex>
						</Card>
					)}
				</Flex>
			</Container>
		);
	}

	if (gameState === "results") {
		const total = sessionQuestions.length;
		const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
		const maxScore = total * POINTS[selectedDifficulty];
		const grade = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "😅";

		return (
			<Container size="2" py="6">
				<Flex direction="column" gap="5" align="center">
					<Text size="9">{grade}</Text>
					<Flex direction="column" gap="1" align="center">
						<Heading size="8">{score} pts</Heading>
						<Text color="gray" size="3">
							{correctCount} / {total} correct ({pct}%)
						</Text>
					</Flex>

					<Grid columns="3" gap="4" style={{ width: "100%" }}>
						<Card
							variant="surface"
							style={{ textAlign: "center", padding: "var(--space-4)" }}
						>
							<Flex direction="column" gap="1" align="center">
								<Text size="6" weight="bold" color="violet">
									{score}
								</Text>
								<Text size="1" color="gray">
									Score
								</Text>
							</Flex>
						</Card>
						<Card
							variant="surface"
							style={{ textAlign: "center", padding: "var(--space-4)" }}
						>
							<Flex direction="column" gap="1" align="center">
								<Text size="6" weight="bold" color="green">
									{correctCount}
								</Text>
								<Text size="1" color="gray">
									Correct
								</Text>
							</Flex>
						</Card>
						<Card
							variant="surface"
							style={{ textAlign: "center", padding: "var(--space-4)" }}
						>
							<Flex direction="column" gap="1" align="center">
								<Text size="6" weight="bold" color="gray">
									{maxScore}
								</Text>
								<Text size="1" color="gray">
									Max pts
								</Text>
							</Flex>
						</Card>
					</Grid>

					<Button size="3" onClick={playAgain}>
						<RotateCcw size={16} />
						Play Again
					</Button>
				</Flex>
			</Container>
		);
	}

	// Start screen
	return (
		<Container size="3" py="6">
			<Flex direction="column" gap="7">
				{/* Hero */}
				<Flex direction="column" gap="2" align="center">
					<Heading size="8" align="center">
						Test Your Knowledge
					</Heading>
					<Text color="gray" size="4" align="center">
						Pick a category, choose your difficulty, and challenge yourself!
					</Text>
				</Flex>

				<Grid columns={{ initial: "1", sm: "2" }} gap="6">
					{/* Setup panel */}
					<Flex direction="column" gap="5">
						<Heading size="5">Start a Game</Heading>

						{/* Name */}
						<Flex direction="column" gap="2">
							<Text size="2" weight="medium" color="gray">
								Your Name
							</Text>
							<TextField.Root
								placeholder="Enter your name..."
								value={playerName}
								onChange={(e) => setPlayerName(e.target.value)}
								size="3"
							/>
						</Flex>

						{/* Category */}
						<Flex direction="column" gap="2">
							<Text size="2" weight="medium" color="gray">
								Category
							</Text>
							<Grid columns="2" gap="2">
								{categories.map((cat) => (
									<Button
										key={cat.id}
										variant={
											selectedCategory?.id === cat.id ? "solid" : "surface"
										}
										onClick={() => setSelectedCategory(cat)}
										size="2"
									>
										{cat.emoji} {cat.name}
									</Button>
								))}
							</Grid>
						</Flex>

						{/* Difficulty */}
						<Flex direction="column" gap="2">
							<Text size="2" weight="medium" color="gray">
								Difficulty
							</Text>
							<Flex gap="2">
								{(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
									<Button
										key={d}
										variant={selectedDifficulty === d ? "solid" : "surface"}
										color={DIFFICULTY_COLORS[d]}
										onClick={() => setSelectedDifficulty(d)}
										size="2"
										style={{ flex: 1 }}
									>
										{d === "easy" ? "🟢" : d === "medium" ? "🟡" : "🔴"} {d}
									</Button>
								))}
							</Flex>
							<Text size="1" color="gray">
								Points per correct: Easy {POINTS.easy} · Medium {POINTS.medium}{" "}
								· Hard {POINTS.hard}
							</Text>
						</Flex>

						<Button
							size="3"
							disabled={!playerName.trim() || !selectedCategory}
							onClick={startGame}
						>
							<Play size={16} />
							Start Game
						</Button>
					</Flex>

					{/* Leaderboard */}
					<Flex direction="column" gap="4">
						<Flex align="center" gap="2">
							<Trophy size={20} color="var(--yellow-9)" />
							<Heading size="5">Leaderboard</Heading>
						</Flex>

						{leaderboard.length === 0 ? (
							<Flex direction="column" align="center" gap="2" py="6">
								<Text color="gray" size="3">
									No scores yet — be the first!
								</Text>
							</Flex>
						) : (
							<Flex direction="column" gap="2">
								{leaderboard.map((session, i) => (
									<Card
										key={session.id}
										variant={i === 0 ? "classic" : "surface"}
									>
										<Flex justify="between" align="center">
											<Flex gap="3" align="center">
												<Text
													size="4"
													weight="bold"
													color={
														i === 0
															? "yellow"
															: i === 1
																? "gray"
																: i === 2
																	? "orange"
																	: "gray"
													}
												>
													#{i + 1}
												</Text>
												<Flex direction="column" gap="1">
													<Text weight="medium" size="2">
														{session.player_name}
													</Text>
													<Text size="1" color="gray">
														{session.questions_correct}/
														{session.questions_answered} correct
													</Text>
												</Flex>
											</Flex>
											<Flex gap="2" align="center">
												<Text weight="bold" size="4" color="violet">
													{session.score}
												</Text>
												<Text size="1" color="gray">
													pts
												</Text>
											</Flex>
										</Flex>
									</Card>
								))}
							</Flex>
						)}
					</Flex>
				</Grid>
			</Flex>
		</Container>
	);
}
