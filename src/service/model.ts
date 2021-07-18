export type MikeSpreadsheetRow = {
  'Artist'?: string;
  'Discogs Log'?: string;
  'Genre'?: string;
  'Media'?: string;
  'Notes & Oddities'?: string;
  'Price'?: string;
  'Purch. Date'?: string;
  'Score'?: string;
  'Source'?: string;
  'Thoughts'?: string;
  'Title'?: string;
  'Year'?: string;
};

export type RecordLabel = {
  artist?: string;
  title?: string;
  releaseDate?: string;
  genre?: string;
  acquisition?: string;
  source?: string;
  price?: string;
  score?: string;
  thoughts?: string;
  notes?: string;
  discogsLog?: string;
  _uuid: string; // each row is assigned a permanent UUID when it is parsed, for use as react element key
};
