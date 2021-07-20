import { Schemas as S, Schema } from '@nprindle/augustus';

export type LabelAttributeFormat = 'text' | 'scoreOutOf5' | 'scoreOutOf10';

const labelAttributeFormatSchema: Schema<LabelAttributeFormat, LabelAttributeFormat> = S.union(
  S.literal('text' as const), S.union(S.literal('scoreOutOf5' as const), S.literal('scoreOutOf10' as const))
);

export type LabelAttribute = {
  name: string;
  value: string;
  format: LabelAttributeFormat;
  uuid: string;
};

const labelAttributeSchema = S.recordOf({
  name: S.aString,
  value: S.aString,
  format: labelAttributeFormatSchema,
  uuid: S.aString,
});

export type LabelData = {
  title: string;
  subtitle?: string;
  attributes: LabelAttribute[];
  uuid: string;
};

export const labelDataSchema: Schema<LabelData, LabelData> = S.recordOf({
  title: S.aString,
  subtitle: S.optional(S.aString),
  attributes: S.arrayOf(labelAttributeSchema),
  uuid: S.aString
});
