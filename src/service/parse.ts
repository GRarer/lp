import { v4 as generateUUID } from 'uuid';
import XLSX from 'xlsx';
import { LabelAttribute, LabelAttributeFormat, LabelData, MikeSpreadsheetRow } from './model';


function makeAttr(name: string, value: string | undefined, format?: LabelAttributeFormat): LabelAttribute | undefined {
  if (!value?.trim()) {
    return undefined;
  }
  return {
    name, value, format: (format ?? 'text'), uuid: generateUUID()
  };
}

// TODO replace with a more generic customizable solution
function mikeToRecord(row: MikeSpreadsheetRow): LabelData {

  const attributes = [
    makeAttr('Title', row.Title),
    makeAttr('Artist', row.Artist),
    makeAttr('Release Date', row.Year),
    makeAttr('Genre', row.Genre),
    makeAttr('Acquisition', row['Purch. Date']),
    makeAttr('Source', row.Source),
    makeAttr('Price', row.Price),
    makeAttr('Score', row.Score, 'scoreOutOf5'),
    makeAttr('Thoughts', row.Thoughts),
    makeAttr('Notes', row['Notes & Oddities']),
    makeAttr('Discogs Log', row['Discogs Log']),
  ].filter((a): a is LabelAttribute => (typeof a !== 'undefined'));

  return {
    title: row.Title ?? '⚠️ unknown',
    subtitle: row.Artist,
    attributes,
    uuid: generateUUID(),
  };
}

export function readSpreadsheet(fileContents: ArrayBuffer): LabelData[] {
  // extract data rows from excel file
  const workbook = XLSX.read(fileContents, { type: 'array' });
  const mainSheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: {[column: string]: string;}[] = XLSX.utils.sheet_to_json(mainSheet, { raw: false, blankrows: false });
  // parse rows based on expected column names
  return data.map(mikeToRecord);
}
