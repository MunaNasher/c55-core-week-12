import fs from 'fs';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'flashcards.db'));

const data = JSON.parse(
  fs.readFileSync(join(__dirname, 'data', 'data.json'), 'utf-8')
);


for (const deck of data.decks) {
  db.prepare(
    'INSERT INTO decks (id, name, description) VALUES (?, ?, ?)'
  ).run(deck.id, deck.name, deck.description);
}


for (const card of data.cards) {
  db.prepare(`
    INSERT INTO cards (id, question, answer, learned, deck_id)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    card.id,
    card.question,
    card.answer,
    card.learned ? 1 : 0,
    card.deckId
  );
}

console.log('✅ Migration done!');