const path = require('path');
const fs = require('fs-extra');
const {readFromBufferP, extractImages} = require('swf-extract');
import initalState from '../store/state.es';
import { shimakazeGoPath } from '../store/selectors.es';
import { store } from 'views/create-store.es';

const dataDir = window.APPDATA_PATH;
const dataFile = path.join(dataDir, 'poi-plugin-magic-change.json');

export const change_swf = () => {
  const filePath = path.join(__dirname, 'data')
}

export const read_data_file = () => {
  let data;
  try {
    data = fs.readJsonSync(dataFile);
  } catch (e) {

    data = fs.writeJsonSync(dataFile, initalState);
  }
  return data;
};

export const read_ShimakazeGoDate = async () => {
  let data;
  let shimakazeGoPath = shimakazeGoPath(store.getState());
  try {
    data = fs.readFileSync();
  } catch (e) {

  }
};

export const read_swf_file = async (filePath) => {
  const rawData = fs.readFileSync(filePath);
  const swf = await readFromBufferP(rawData);
  const ts = await Promise.all(extractImages(swf.tags));
  return ts;
};

export const get_swf_img_base64 = async (filePath) => {
  const imgDatas = await read_swf_file(filePath);
  window.imgDatas = imgDatas;
  return imgDatas.map(img => `data:image/${img.imgType};base64,${img.imgData.toString('base64')}`);
};
