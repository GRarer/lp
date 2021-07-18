export type ListIconOption = "album" | "attachment" | "book" | "label" | "note";
export const listIconOptionValues: ListIconOption[] = ["album",  "attachment",  "book",  "label",  "note"];

export type Settings = {
    listIcon: ListIconOption;
    imageDataUrl?: string;
}

export const defaultSettings: Settings = {
    listIcon: "label"
}

// TODO use augustus or something to simplify settings format validation
export function isSettings(x: unknown): x is Settings {
    if (typeof x !== "object" || x == null) {
        return false;
    }
    const obj: {[key: string]: unknown} = x as {[key: string]: unknown};
    if (typeof obj.listIcon !== "string" || !(listIconOptionValues as string[]).includes(obj.listIcon)) {
        return false;
    }
    if(obj.imageDataUrl !== undefined && typeof obj.imageDataUrl !== "string") {
        return false;
    }

    return true;
}
