import { Addiction } from "@/constants/types";
import * as SQLite from "expo-sqlite";

const DBNAME = "addictions.db";

export const createDb = async () => {
  const db = await SQLite.openDatabaseAsync(DBNAME); //
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS addictions (
    id INTEGER PRIMARY KEY,
    addiction varchar(255),
    started DATETIME
    );
    `);
  console.log(`Success DB.`);
};

export const getAllAddictions = async () => {
  const db = await SQLite.openDatabaseAsync(`${DBNAME}`);
  const newStatement = await db.prepareAsync(`SELECT * FROM addictions`);
  const result = newStatement.executeAsync(null);
  const allRows = (await result).getAllAsync();
  (await allRows).map((x) => console.log(`data ${JSON.stringify(x)}`));
  await newStatement.finalizeAsync();
  return allRows as Promise<Addiction[]>;
};

export const getSpecific = async (name: string) => {
  const db = await SQLite.openDatabaseAsync(DBNAME);
  const newStatement = await db.prepareAsync(
    `SELECT * FROM addictions WHERE name = '${name}';`,
  );
  const result = newStatement.executeAsync(null);
  const allRows = (await result).getAllAsync();
  await newStatement.finalizeAsync();
  return allRows as Promise<Addiction[]>;
};

export const addAddiction = async (addiction: string) => {
  const db = await SQLite.openDatabaseAsync(`${DBNAME}`);
  await db.execAsync(
    `INSERT INTO addictions (addiction, started) VALUES ('${addiction}', datetime('now'));`,
  );
  console.log(`Successfully added! (${addiction} addiction)`);
};

export const deleteAll = async () => {
  const db = await SQLite.openDatabaseAsync(`${DBNAME}`);
  await db.execAsync(`DELETE FROM addictions;`);
  console.log(`deleting all from addictions!`);
};

export const removeAddiction = async (id: number) => {
  const db = await SQLite.openDatabaseAsync(`${DBNAME}`);
  await db.execAsync(`DELETE FROM addictions WHERE id = ${id};`);
  console.log(`Successfully removed addiction with id ${id}`);
};

// ========= Operations for cured addictions! =========

export const addCured = async (addiction: string, started: Date) => {
  const db = await SQLite.openDatabaseAsync(DBNAME);
  await db.execAsync(
    `INSERT INTO addictions (addiction, started, ended) VALUES ('${addiction}', '${started}', datetime('now'));`,
  );
  console.log(`Addiction ${addiction} cured!`);
};

// export const createDbForCured = async ()
