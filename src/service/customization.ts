export type ListIconOption = "album" | "attachment" | "book" | "label" | "note";
export const listIconOptionValues: ListIconOption[] = ["album",  "attachment",  "book",  "label",  "note"];

export type Settings = {
    listIcon: ListIconOption;
}

export const defaultSettings: Settings = {
    listIcon: "label"
}

export function isSettings(x: unknown): x is Settings {
    if (typeof x !== "object" || x == null) {
        return false;
    }
    const obj: {[key: string]: unknown} = x as {[key: string]: unknown};
    if (typeof obj.listIcon !== "string" || !(listIconOptionValues as string[]).includes(obj.listIcon)) {
        return false;
    }
    return true;
}
