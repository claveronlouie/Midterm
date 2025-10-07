const ITEMS_KEY = 'ims_items';

export function readItems() {
  try { return JSON.parse(localStorage.getItem(ITEMS_KEY)) || []; } catch { return []; }
}
export function writeItems(items) { localStorage.setItem(ITEMS_KEY, JSON.stringify(items)); }
