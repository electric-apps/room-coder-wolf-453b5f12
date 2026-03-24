ALTER TABLE "answers" ADD CONSTRAINT "answers_session_question_unique" UNIQUE("session_id","question_id");--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "chosen_answer_check" CHECK ("answers"."chosen_answer" IN ('a', 'b', 'c', 'd'));--> statement-breakpoint
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_session_status_check" CHECK ("game_sessions"."status" IN ('active', 'completed'));--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "correct_answer_check" CHECK ("questions"."correct_answer" IN ('a', 'b', 'c', 'd'));--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "difficulty_check" CHECK ("questions"."difficulty" IN ('easy', 'medium', 'hard'));