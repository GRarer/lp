import { isSettings, Settings } from "./customization";

const settingsLSKey = "customization_settings";

export function loadStoredSettings(): Settings | undefined {
    const saved = window.localStorage.getItem(settingsLSKey);
    if (!saved) {
        return undefined;
    }
    try {
        // TODO better format validation
        const result: unknown = JSON.parse(saved);
        if (isSettings(result)) {
            return result;
        } else {
            return undefined;
        }
    } catch (err) {
        console.error(err);
        return undefined;
    }
}

export function saveStoredSettings(settings: Settings): void {
    window.localStorage.setItem(settingsLSKey, JSON.stringify(settings));
}
