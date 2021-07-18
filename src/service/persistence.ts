import { isSettings, Settings } from './customization';

const settingsLSKey = 'customization_settings';

export function loadStoredSettings(): Settings | undefined {
  const startTime = new Date().getTime();
  const saved = window.localStorage.getItem(settingsLSKey);
  if (!saved) {
    return undefined;
  }
  try {
    // TODO better format validation
    const result: unknown = JSON.parse(saved);
    if (isSettings(result)) {
      console.log('loaded settings after time: ', new Date().getTime() - startTime);
      console.log(result);
      return result;
    }
    return undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export function saveStoredSettings(settings: Settings): void {
  const startTime = new Date().getTime();
  window.localStorage.setItem(settingsLSKey, JSON.stringify(settings));
  console.log('saved settings after time: ', new Date().getTime() - startTime);
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
