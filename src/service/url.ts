import { LabelData, labelDataSchema, } from './model';
import { jsonEncodeWith, jsonDecodeWith } from '@nprindle/augustus';

const itemUUIDSearchKey = 'item';

export function getItemFromUrlParam(): LabelData | undefined {
  const urlSearch = new URLSearchParams(window.location.search);
  const uuid = urlSearch.get(itemUUIDSearchKey);
  if (!uuid) {
    return undefined;
  }
  const json = window.sessionStorage.getItem(uuid);
  if (json) {
    const result = jsonDecodeWith(json, labelDataSchema);
    if (result.resultType === 'success') {
      return result.result;
    } else {
      console.error(result); // TODO show error to user
      return undefined;
    }
  }
  return undefined;
}

export function openItemInNewTab(item: LabelData): void {
  const uuid = item.uuid;
  // save label data to session storage so it can be accessed from new tab
  window.sessionStorage.setItem(uuid, jsonEncodeWith(item, labelDataSchema));
  // open new tab to show label
  const url = new URL(window.location.href);
  url.search = (new URLSearchParams({ [itemUUIDSearchKey]: uuid })).toString();
  window.open(url.toString(), '_blank');
}
