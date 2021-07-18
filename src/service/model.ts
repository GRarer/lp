export type LabelAttributeFormat = 'text' | 'scoreOutOf5' | 'scoreOutOf10';

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
