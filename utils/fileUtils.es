const path = require('path');
const fs = require('fs-extra');
const upzip = require('node-unzip-2');
const {readFromBufferP, extractImages} = require('swf-extract');
import memoize from 'fast-memoize';
import initalState from '../store/state.es';
import {
  appDataPath,
  tempDir,
  magicChangeDir,
  dataFile,
} from '../config.es';
import { store } from 'views/create-store.es';



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
  return data || {};
};

export const read_shimakazeGoData = async (shimakazeGoRoot) => {
  try {
    if (shimakazeGoRoot) {
      const dataDir = path.join(shimakazeGoRoot, 'data', 'KanColle');
      let shipData = await fs.readJsonSync(path.join(dataDir, 'picture_book.json'));
      let resData = await fs.readJsonSync(path.join(dataDir, 'static_res.json'));
      return {
        shipData,
        resData
      };
    } else {
      toast('请初始化岛风GO路径', { type: 'warning', title: '舰娘魔改' });
    }
  } catch (e) {
    toast(e, { type: 'error' });
  }
  return null;
};

export const set_magicChange_file = (async (file, magicChangeId) => {
  try {
    fs.ensureDirSync(magicChangeDir);
    let fileDir = await fs.ensureDir(path.join(magicChangeDir, magicChangeId));
    switch (file.type) {
      case 'application/x-shockwave-flash':
        fs.ensureDirSync(fileDir);
        fs.copy(file.path, path.join(fileDir, file.name));
        break;
      case '':
        fs.ensureDirSync(tempDir);
        fs.copy(file.path, tempDir);
        // fs.createReadStream('path/to/archive.zip')
        // .pipe(unzip.Parse())
        // .on('entry', function (entry) {
        //   var fileName = entry.path;
        //   var type = entry.type; // 'Directory' or 'File'
        //   var size = entry.size;
        //   if (fileName === "this IS the file I'm looking for") {
        //     entry.pipe(fs.createWriteStream('output/path'));
        //   } else {
        //     entry.autodrain();
        //   }
          // });
        break;
      default:break;

    }
  } catch (e) {
    toast(e, { type: 'error' });
    throw e;
  } finally {

  }
})

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

const getRandomStr = () => Math.random().toString(36).substr(2);
