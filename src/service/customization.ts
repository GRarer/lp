import { Schemas as S, Schema, DomainOf } from '@nprindle/augustus';

export const listIconOptionValues = [
  'album' as const, 'attachment' as const, 'book' as const, 'label' as const, 'note' as const
];
const listIconOptionSchema = listIconOptionValues.reduce(
  (prev, curr) => S.union(prev, S.literal(curr)),
  S.literal(listIconOptionValues[0])
);
export type ListIconOption = DomainOf<typeof listIconOptionSchema>;

export type Settings = {
  listIcon: ListIconOption;
  imageDataUrl?: string;
};

export const settingsSchema: Schema<Settings, Settings> = S.recordOf({
  listIcon: listIconOptionSchema,
  ImageDataUrl: S.optional(S.aString)
});

export const defaultSettings: Settings = {
  listIcon: 'label',
};
