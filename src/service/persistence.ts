import { jsonDecodeWith, jsonEncodeWith } from '@nprindle/augustus';
import { Settings, settingsSchema } from './customization';

const settingsLSKey = 'customization_settings';

export function loadStoredSettings(): Settings | undefined {
  const saved = window.localStorage.getItem(settingsLSKey);
  if (!saved) {
    return undefined;
  }
  const result = jsonDecodeWith(saved, settingsSchema);
  if (result.resultType === 'success') {
    return result.result;
  } else {
    console.error(result);
    return undefined;
  }
}

export function saveStoredSettings(settings: Settings): void {
  window.localStorage.setItem(settingsLSKey, jsonEncodeWith(settings, settingsSchema));
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const { result } = reader;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('file reader did not have expected result type'));
      }
    });

    reader.addEventListener('error', () => {
      reject(reader.error ?? new Error('unknown file reader error'));
    });

    reader.readAsDataURL(file);
  });
}
