-- SQLite

CREATE TABLE decks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE cards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  learned INTEGER DEFAULT 0,
  deck_id INTEGER,
  FOREIGN KEY (deck_id) REFERENCES decks(id)
);

SELECT * FROM decks;

            