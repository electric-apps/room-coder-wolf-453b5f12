-- Seed categories
INSERT INTO categories (id, name, emoji) VALUES
  ('11111111-1111-1111-1111-111111111001', 'Science', '🔬'),
  ('11111111-1111-1111-1111-111111111002', 'History', '📜'),
  ('11111111-1111-1111-1111-111111111003', 'Pop Culture', '🎬'),
  ('11111111-1111-1111-1111-111111111004', 'Sports', '⚽'),
  ('11111111-1111-1111-1111-111111111005', 'Technology', '💻')
ON CONFLICT (id) DO NOTHING;

-- Science questions
INSERT INTO questions (id, category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
  ('22222222-2222-2222-2222-222222220001', '11111111-1111-1111-1111-111111111001',
   'What is the chemical symbol for gold?', 'Go', 'Gd', 'Au', 'Ag', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220002', '11111111-1111-1111-1111-111111111001',
   'How many bones are in the adult human body?', '196', '206', '216', '226', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220003', '11111111-1111-1111-1111-111111111001',
   'What planet is known as the Red Planet?', 'Venus', 'Jupiter', 'Mars', 'Saturn', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220004', '11111111-1111-1111-1111-111111111001',
   'What is the speed of light (approx.) in km/s?', '199,792', '299,792', '399,792', '499,792', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220005', '11111111-1111-1111-1111-111111111001',
   'What is the powerhouse of the cell?', 'Nucleus', 'Ribosome', 'Golgi apparatus', 'Mitochondria', 'd', 'easy'),
  ('22222222-2222-2222-2222-222222220006', '11111111-1111-1111-1111-111111111001',
   'What is the half-life of Carbon-14?', '1,570 years', '5,730 years', '11,460 years', '14,300 years', 'b', 'hard'),
  ('22222222-2222-2222-2222-222222220007', '11111111-1111-1111-1111-111111111001',
   'Which particle has no electric charge?', 'Proton', 'Electron', 'Neutron', 'Positron', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220008', '11111111-1111-1111-1111-111111111001',
   'What is the most abundant gas in Earth''s atmosphere?', 'Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220009', '11111111-1111-1111-1111-111111111001',
   'What is the pH of pure water at 25°C?', '5', '6', '7', '8', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220010', '11111111-1111-1111-1111-111111111001',
   'Which element has atomic number 79?', 'Silver', 'Platinum', 'Mercury', 'Gold', 'd', 'medium')
ON CONFLICT (id) DO NOTHING;

-- History questions
INSERT INTO questions (id, category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
  ('22222222-2222-2222-2222-222222220011', '11111111-1111-1111-1111-111111111002',
   'In what year did World War II end?', '1943', '1944', '1945', '1946', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220012', '11111111-1111-1111-1111-111111111002',
   'Who was the first President of the United States?', 'John Adams', 'Thomas Jefferson', 'Benjamin Franklin', 'George Washington', 'd', 'easy'),
  ('22222222-2222-2222-2222-222222220013', '11111111-1111-1111-1111-111111111002',
   'The Great Wall of China was primarily built during which dynasty?', 'Han', 'Tang', 'Ming', 'Qing', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220014', '11111111-1111-1111-1111-111111111002',
   'Which ancient wonder was located in Alexandria?', 'The Colossus', 'The Lighthouse', 'The Mausoleum', 'The Hanging Gardens', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220015', '11111111-1111-1111-1111-111111111002',
   'In what year did the Berlin Wall fall?', '1987', '1988', '1989', '1990', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220016', '11111111-1111-1111-1111-111111111002',
   'Who wrote the Magna Carta and in what year?', 'King John, 1215', 'King Henry II, 1189', 'King Richard I, 1199', 'King Edward I, 1265', 'a', 'hard'),
  ('22222222-2222-2222-2222-222222220017', '11111111-1111-1111-1111-111111111002',
   'Which country was the first to give women the right to vote?', 'USA', 'UK', 'New Zealand', 'France', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220018', '11111111-1111-1111-1111-111111111002',
   'Who painted the Sistine Chapel ceiling?', 'Leonardo da Vinci', 'Raphael', 'Donatello', 'Michelangelo', 'd', 'easy'),
  ('22222222-2222-2222-2222-222222220019', '11111111-1111-1111-1111-111111111002',
   'The French Revolution began in which year?', '1776', '1789', '1798', '1805', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220020', '11111111-1111-1111-1111-111111111002',
   'Which empire was ruled by Genghis Khan?', 'Ottoman', 'Roman', 'Mongol', 'Persian', 'c', 'easy')
ON CONFLICT (id) DO NOTHING;

-- Pop Culture questions
INSERT INTO questions (id, category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
  ('22222222-2222-2222-2222-222222220021', '11111111-1111-1111-1111-111111111003',
   'Who played Iron Man in the Marvel Cinematic Universe?', 'Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220022', '11111111-1111-1111-1111-111111111003',
   'Which TV show features the fictional city of Pawnee, Indiana?', 'The Office', 'Brooklyn Nine-Nine', 'Parks and Recreation', 'Community', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220023', '11111111-1111-1111-1111-111111111003',
   'How many Harry Potter books are there?', '5', '6', '7', '8', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220024', '11111111-1111-1111-1111-111111111003',
   'What is the highest-grossing film of all time (worldwide)?', 'Titanic', 'Avatar', 'Avengers: Endgame', 'The Lion King', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220025', '11111111-1111-1111-1111-111111111003',
   'Which artist released the album "Thriller"?', 'Prince', 'Michael Jackson', 'Whitney Houston', 'David Bowie', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220026', '11111111-1111-1111-1111-111111111003',
   'In Breaking Bad, what is Walter White''s chemistry teacher alias?', 'The Professor', 'Heisenberg', 'Blue Sky', 'Mr. White', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220027', '11111111-1111-1111-1111-111111111003',
   'Which video game character is known for saying "It''s-a me, Mario!"?', 'Luigi', 'Wario', 'Mario', 'Toad', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220028', '11111111-1111-1111-1111-111111111003',
   'What year did Netflix start its streaming service?', '2005', '2006', '2007', '2008', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220029', '11111111-1111-1111-1111-111111111003',
   'Which band performed "Bohemian Rhapsody"?', 'The Beatles', 'Led Zeppelin', 'Queen', 'Pink Floyd', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220030', '11111111-1111-1111-1111-111111111003',
   'Who wrote the novel "1984"?', 'Aldous Huxley', 'Ray Bradbury', 'George Orwell', 'Philip K. Dick', 'c', 'easy')
ON CONFLICT (id) DO NOTHING;

-- Sports questions
INSERT INTO questions (id, category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
  ('22222222-2222-2222-2222-222222220031', '11111111-1111-1111-1111-111111111004',
   'How many players are on a basketball team on the court at one time?', '4', '5', '6', '7', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220032', '11111111-1111-1111-1111-111111111004',
   'Which country has won the most FIFA World Cup titles?', 'Germany', 'Italy', 'Argentina', 'Brazil', 'd', 'easy'),
  ('22222222-2222-2222-2222-222222220033', '11111111-1111-1111-1111-111111111004',
   'What is the distance of a marathon in miles (approx.)?', '24.2', '26.2', '28.2', '30.2', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220034', '11111111-1111-1111-1111-111111111004',
   'In tennis, what is the term for a score of 40-40?', 'Tie', 'Deuce', 'Advantage', 'Love', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220035', '11111111-1111-1111-1111-111111111004',
   'Michael Jordan played for which NBA team for most of his career?', 'Los Angeles Lakers', 'Boston Celtics', 'Chicago Bulls', 'New York Knicks', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220036', '11111111-1111-1111-1111-111111111004',
   'How many holes are on a standard golf course?', '9', '12', '18', '24', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220037', '11111111-1111-1111-1111-111111111004',
   'What sport uses a shuttlecock?', 'Squash', 'Badminton', 'Table Tennis', 'Racquetball', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220038', '11111111-1111-1111-1111-111111111004',
   'Who holds the record for the most Olympic gold medals?', 'Carl Lewis', 'Usain Bolt', 'Michael Phelps', 'Mark Spitz', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220039', '11111111-1111-1111-1111-111111111004',
   'What year were the first modern Olympic Games held?', '1892', '1896', '1900', '1904', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220040', '11111111-1111-1111-1111-111111111004',
   'In cricket, how many balls are in an over?', '4', '5', '6', '8', 'c', 'easy')
ON CONFLICT (id) DO NOTHING;

-- Technology questions
INSERT INTO questions (id, category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
  ('22222222-2222-2222-2222-222222220041', '11111111-1111-1111-1111-111111111005',
   'Who co-founded Apple Inc.?', 'Bill Gates', 'Elon Musk', 'Steve Jobs', 'Jeff Bezos', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220042', '11111111-1111-1111-1111-111111111005',
   'What does "HTTP" stand for?', 'HyperText Transfer Protocol', 'High Tech Transfer Process', 'HyperText Transmission Program', 'Hybrid Transfer Technology Protocol', 'a', 'easy'),
  ('22222222-2222-2222-2222-222222220043', '11111111-1111-1111-1111-111111111005',
   'What programming language was created by Guido van Rossum?', 'Ruby', 'Perl', 'Python', 'JavaScript', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220044', '11111111-1111-1111-1111-111111111005',
   'In binary, what is the decimal value of 1010?', '8', '9', '10', '12', 'c', 'medium'),
  ('22222222-2222-2222-2222-222222220045', '11111111-1111-1111-1111-111111111005',
   'What year was the World Wide Web invented?', '1985', '1989', '1991', '1993', 'b', 'medium'),
  ('22222222-2222-2222-2222-222222220046', '11111111-1111-1111-1111-111111111005',
   'What does "GPU" stand for?', 'General Processing Unit', 'Graphics Processing Unit', 'Global Program Utility', 'Graphical Program Upload', 'b', 'easy'),
  ('22222222-2222-2222-2222-222222220047', '11111111-1111-1111-1111-111111111005',
   'Which company developed the Android operating system?', 'Apple', 'Microsoft', 'Google', 'Samsung', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220048', '11111111-1111-1111-1111-111111111005',
   'What is the name of the first computer virus?', 'ILOVEYOU', 'Creeper', 'Melissa', 'Morris Worm', 'b', 'hard'),
  ('22222222-2222-2222-2222-222222220049', '11111111-1111-1111-1111-111111111005',
   'How many bits are in a byte?', '4', '6', '8', '16', 'c', 'easy'),
  ('22222222-2222-2222-2222-222222220050', '11111111-1111-1111-1111-111111111005',
   'Which sorting algorithm has O(n log n) average time complexity?', 'Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Selection Sort', 'c', 'hard')
ON CONFLICT (id) DO NOTHING;
