import path from 'path';
// file path
export const appDataPath = window.APPDATA_PATH;
export const tempDir = path.join(appDataPath, 'magicChangetemp');
export const magicChangeDir = path.join(appDataPath, 'magicChange');
export const dataFile = path.join(magicChangeDir, 'poi-plugin-magic-change.json');
