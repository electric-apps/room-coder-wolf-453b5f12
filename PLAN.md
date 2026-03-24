# TriviaBlitz — Implementation Plan

## App Description
A fun, real-time trivia app where players answer multiple-choice questions across categories and difficulty levels. Scores are tracked live and a leaderboard shows top performers — all synced in real time via Electric SQL.

## Data Model

### categories
- id: UUID, primary key, defaultRandom()
- name: text, notNull (e.g. "Science", "History", "Pop Culture", "Sports", "Technology")
- emoji: text, notNull (icon representing category)
- created_at: timestamptz, notNull, defaultNow()

### questions
- id: UUID, primary key, defaultRandom()
- category_id: UUID, notNull, FK → categories.id, onDelete: cascade
- question: text, notNull
- option_a: text, notNull
- option_b: text, notNull
- option_c: text, notNull
- option_d: text, notNull
- correct_answer: text, notNull (one of "a", "b", "c", "d")
- difficulty: text, notNull (one of "easy", "medium", "hard")
- created_at: timestamptz, notNull, defaultNow()

### game_sessions
- id: UUID, primary key, defaultRandom()
- player_name: text, notNull
- category_id: UUID, nullable, FK → categories.id, onDelete: set null
- difficulty: text, nullable
- score: integer, notNull, default 0
- questions_answered: integer, notNull, default 0
- questions_correct: integer, notNull, default 0
- status: text, notNull, default "active" (one of "active", "completed")
- created_at: timestamptz, notNull, defaultNow()
- updated_at: timestamptz, notNull, defaultNow()

### answers
- id: UUID, primary key, defaultRandom()
- session_id: UUID, notNull, FK → game_sessions.id, onDelete: cascade
- question_id: UUID, notNull, FK → questions.id, onDelete: cascade
- chosen_answer: text, notNull (one of "a", "b", "c", "d")
- is_correct: boolean, notNull
- created_at: timestamptz, notNull, defaultNow()

## Implementation Tasks
- [ ] Phase 2: Discover playbook skills and read relevant ones
- [ ] Phase 3: Data model — schema, zod-schemas, migrations, tests
- [ ] Phase 4: Collections & API routes
- [ ] Phase 5: UI components
- [ ] Phase 6: Build, lint & test
- [ ] Phase 7: README.md
- [ ] Phase 8: Deploy & send `@room REVIEW_REQUEST:` (MANDATORY — pipeline stalls without it)

## Design Conventions
- UUID primary keys with defaultRandom()
- timestamp({ withTimezone: true }) for all dates
- snake_case for SQL table/column names
- Foreign keys with onDelete: "cascade" where appropriate
- Seed data: 5 categories + 50 trivia questions pre-loaded via migration

## Features
- Pick a category and difficulty, enter your name, and start playing
- 10 questions per game, multiple choice (A/B/C/D)
- Instant feedback after each answer (correct/wrong + explanation)
- Score tally at end of game
- Live leaderboard showing all completed sessions, sorted by score
