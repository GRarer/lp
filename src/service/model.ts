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

export type LabelAttributeFormat = 'text' | 'scoreOutOf5' | 'scoreOutOf10';
export const labelAttributeOptions: LabelAttributeFormat[] = ['text', 'scoreOutOf5', 'scoreOutOf10'];

export type LabelAttribute = {
  name: string;
  value: string;
  format: LabelAttributeFormat;
  uuid: string;
};

export type LabelData = {
  title: string;
  subtitle?: string;
  attributes: LabelAttribute[];
  uuid: string;
};
