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
  swfImgJson,
} from '../config.es';
import { getShimakazeGoShipResPath } from './pathUtils.es';

export const read_data_file = () => {
  let data;
  try {
    fs.ensureDirSync(magicChangeDir);
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

export const set_magicChange_file = async (file, magicChangeId) => {
  try {
    fs.ensureDirSync(magicChangeDir);
    let fileDir = fs.ensureDirSync(path.join(magicChangeDir, magicChangeId));
    let fileType = file.name.split('.')[file.name.split('.').length - 1];
    switch (fileType) {
      case 'zip':
        fs.ensureDirSync(tempDir);
        fs.copySync(file.path, tempDir);
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
      default:
      // ini file error
        fs.copySync(file.path, path.join(fileDir, file.name));
        break;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const importFromShimakaze = shimakazeGoPath => {
  console.log(shimakazeGoPath);
  if (!shimakazeGoPath) {
    toast('请初始化岛风Go路径');
    return
  }
  try {
    let shipPath = getShimakazeGoShipResPath(shimakazeGoPath);
    let magicChangeList = [];
    let files = fs.readdirSync(shipPath);
    let hackFiles = files.filter(file => file.split('.')[1] === 'hack' && file.split('.')[2] === 'swf');
    for (let file of hackFiles) {
      let fileName = file.split('.')[0];
      let fileFile = {
        name: file,
        path: path.join(shipPath, file),
      };
      let iniFileName = `${fileName}.config.ini`;
      let magicChange = files.includes(iniFileName)?
        [
          fileFile,
          {
            name: iniFileName,
            path: path.join(shipPath, iniFileName)
          }
        ]:
        [fileFile];
      magicChangeList.push(magicChange);
    }
    return magicChangeList;
  } catch (e) {
    console.log(e);
    toast('请确认岛风Go路径是否正确')
  }

};

export const read_swf_file = async (filePath) => {
  const rawData = fs.readFileSync(filePath);
  const swf = await readFromBufferP(rawData);
  const ts = await Promise.all(extractImages(swf.tags));
  return ts;
};

export const get_swf_img_base64 = memoize(async (filePath) => {
  try {
    let dir = path.dirname(filePath);
    let imgFile = path.join(dir, swfImgJson);
    let imgDatas;
    try {
      imgDatas = fs.readJsonSync(imgFile);
    }catch (e) {
      imgDatas = await read_swf_file(filePath);
      imgDatas = imgDatas.map(img => `data:image/${img.imgType};base64,${img.imgData.toString('base64')}`);
      fs.writeJsonSync(imgFile, imgDatas);
    }
    return imgDatas || [];
  } catch (e) {
    console.error(e)
    toast('请检查文件完整性')
    return [];
  }
});

const getRandomStr = () => Math.random().toString(36).substr(2);
