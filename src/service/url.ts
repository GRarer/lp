import { LabelData, } from './model';

const itemUUIDSearchKey = 'item';

export function getItemFromUrlParam(): LabelData | undefined {
  const urlSearch = new URLSearchParams(window.location.search);
  const uuid = urlSearch.get(itemUUIDSearchKey);
  if (!uuid) {
    return undefined;
  }
  const json = window.sessionStorage.getItem(uuid);
  // TODO validate format of loaded json
  if (json) {
    return JSON.parse(json);
  }
  return undefined;
}

export function openItemInNewTab(item: LabelData): void {
  const uuid = item.uuid;
  // save label data to session storage so it can be accessed from new tab
  window.sessionStorage.setItem(uuid, JSON.stringify(item));
  // open new tab to show label
  const url = new URL(window.location.href);
  url.search = (new URLSearchParams({ [itemUUIDSearchKey]: uuid })).toString();
  window.open(url.toString(), '_blank');
}
