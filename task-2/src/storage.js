// storage.js
// This file now uses SQLite instead of JSON

import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, '../flashcards.db'));

// ----------------------------------------------------------------
// Decks
// ----------------------------------------------------------------

export function getAllDecks() {
  return db.prepare('SELECT * FROM decks').all();
}

export function getDeckById(id) {
  return db.prepare('SELECT * FROM decks WHERE id = ?').get(id) ?? null;
}

export function addDeck(name, description) {
  const info = db
    .prepare('INSERT INTO decks (name, description) VALUES (?, ?)')
    .run(name, description);

  return {
    id: info.lastInsertRowid,
    name,
    description,
  };
}

export function deleteDeck(deckId) {
  const info = db.prepare('DELETE FROM decks WHERE id = ?').run(deckId);
  return info.changes > 0;
}

// ----------------------------------------------------------------
// Cards
// ----------------------------------------------------------------

export function getAllCardsForDeck(deckId) {
  return db
    .prepare(
      'SELECT id, question, answer, learned, deck_id AS deckId FROM cards WHERE deck_id = ?'
    )
    .all(deckId);
}

export function addCard(question, answer, deckId) {
  const info = db
    .prepare(
      'INSERT INTO cards (question, answer, learned, deck_id) VALUES (?, ?, 0, ?)'
    )
    .run(question, answer, deckId);

  return {
    id: info.lastInsertRowid,
    question,
    answer,
    learned: 0,
    deckId,
  };
}

export function markCardLearned(cardId) {
  db.prepare('UPDATE cards SET learned = 1 WHERE id = ?').run(cardId);
  return db
    .prepare(
      'SELECT id, question, answer, learned, deck_id AS deckId FROM cards WHERE id = ?'
    )
    .get(cardId);
}

export function deleteCard(cardId) {
  const info = db.prepare('DELETE FROM cards WHERE id = ?').run(cardId);
  return info.changes > 0;
}