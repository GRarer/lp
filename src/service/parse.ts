import { v4 as generateUUID } from 'uuid';
import XLSX from 'xlsx';
import { LabelAttribute, LabelAttributeFormat, LabelData } from './model';

const tagSkip = '[label:skip]'; // including this in column headers tells us not to print these columns
const tagScoreOutOf5 = '[label:5_stars]';
const tagScoreOutOf10 = '[label:10_stars]';


type SheetRow = {[column: string]: string | undefined;};
type ColumnMetadata = {displayName: string; format: LabelAttributeFormat | 'skip';};

// extract format tags from column names
function extractColumnMetadata(colName: string): ColumnMetadata {
  let format: LabelAttributeFormat | 'skip' = 'text';
  if (colName.includes(tagScoreOutOf5)) {
    format = 'scoreOutOf5';
  }
  if (colName.includes(tagScoreOutOf10)) {
    format = 'scoreOutOf10';
  }
  if (colName.includes(tagSkip)) {
    format = 'skip';
  }

  let trimmedName = colName;
  for (const tag of [tagSkip, tagScoreOutOf5, tagScoreOutOf10]) {
    trimmedName = trimmedName.replace(tag, '');
  }
  trimmedName = trimmedName.trim();

  return { displayName: trimmedName, format };
}

function makeItem(
  row: SheetRow,
  colMap: Map<string, ColumnMetadata>,
  titleColName: string,
  subtitleColName: string | undefined
): LabelData {
  const attributes: LabelAttribute[] = [];

  for (const colName in row) {
    const column = colMap.get(colName);
    const value = row[colName]?.trim();
    if (value && column) {
      if (column.format !== 'skip') {
        attributes.push({
          uuid: generateUUID(),
          value: value,
          name: column.displayName,
          format: column.format
        });
      }
    }
  }

  return {
    title: row[titleColName] ?? '(unknown)',
    subtitle: subtitleColName ? row[subtitleColName] : undefined,
    uuid: generateUUID(),
    attributes
  };
}

export function readSpreadsheet(fileContents: ArrayBuffer): LabelData[] {
  // extract data rows from excel file
  const workbook = XLSX.read(fileContents, { type: 'array' });
  const mainSheet = workbook.Sheets[workbook.SheetNames[0]];


  const data: SheetRow[] = XLSX.utils.sheet_to_json(mainSheet, { raw: false, blankrows: false });
  // parse rows based on expected column names
  const headers = XLSX.utils.sheet_to_json(mainSheet, { header: 1 })[0];
  if (!Array.isArray(headers) || !headers.every((x): x is string => typeof x === 'string')) {
    throw 'unexpected parse result'; // TODO error handling
  }
  const titleColName: string | undefined = headers[0];
  const subtitleColName: string | undefined = headers[1];
  if (typeof titleColName === 'undefined') {
    throw 'First column not found'; // TODO error handling
  }

  const colMap: Map<string, ColumnMetadata> = new Map(headers.map(header => [header, extractColumnMetadata(header)]));

  const result = data.map(row => makeItem(row, colMap, titleColName, subtitleColName));
  console.log(result);
  return result;
}
