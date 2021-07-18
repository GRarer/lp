import { v4 as generateUUID } from 'uuid';
import XLSX from 'xlsx';
import { MikeSpreadsheetRow, RecordLabel } from './model';

function mikeToRecord(row: MikeSpreadsheetRow): RecordLabel {
  return {
    artist: row.Artist,
    title: row.Title,
    releaseDate: row.Year,
    genre: row.Genre,
    acquisition: row['Purch. Date'],
    source: row.Source,
    price: row.Price,
    score: row.Score,
    thoughts: row.Thoughts,
    notes: row['Notes & Oddities'],
    discogsLog: row['Discogs Log'],
    _uuid: generateUUID(),
  };
}

export function readSpreadsheet(fileContents: ArrayBuffer): RecordLabel[] {
  // extract data rows from excel file
  const workbook = XLSX.read(fileContents, { type: 'array' });
  const mainSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: {[column: string]: string;}[] = XLSX.utils.sheet_to_json(mainSheet, { raw: false, blankrows: false });
  // parse rows based on expected column names
  return data.map(mikeToRecord);
}
