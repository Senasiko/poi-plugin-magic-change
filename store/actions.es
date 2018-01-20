import path from 'path';
import { magicChangeDir } from '../config'
import types from './types';
import {
  shimakazeGoPath,
  shipIdByFileName,
  magicShipDataFactory,
  shipBaseDataFactory,
  magicDataFactory,
  nowMagicData,
} from './selectors';
import {
  read_data_file,
  read_swf_file,
  get_swf_img_base64,
  set_magicChange_file,
  read_shimakazeGoData,
  delete_magicFile,
  use_magicFile,
} from '../utils/fileUtils';

const init_ship = () => {
  return async (dispatch, getState) => {
    let data = await read_data_file();
    dispatch({
      type: types.init_ship,
      data,
    })
  };
};

const change_magic = magicId => ({
  type: types.change_magic,
  magicId
})

const change_shimakazeGoPath = path => async (dispatch, getState) => {
    if (await read_shimakazeGoData(path)) {
      dispatch({
        type: types.change_shimakazeGoPath,
        path,
      });
      success('岛风Go目录保存成功')
    }else {
      warn('输入的路径有误');
    }

};

const change_magicData = (newValue, magicId) => (dispatch, getState) => {
  if (!magicId) {
    magicId = nowMagicData(getState()).id
  }
  dispatch({
    type: types.change_magicData,
    magicId,
    newValue
  })
};

const delete_nowMagic = () => async (dispatch, getState) => {
  try {
    let nowMagic = nowMagicData(getState());
    // toggleModal('提示', `确定删除 ${nowMagic.name} 吗？`, {
    //   name: '确定',
    //   style: 'danger',
    //   func: async () => {
    //     await delete_magicFile(nowMagic.id);
    //     dispatch({
    //       type: types.delete_nowMagic,
    //     })
    //     success(`删除 ${nowMagic.name} 成功`)
    //   }
    // });
    await delete_magicFile(nowMagic.id, shimakazeGoPath(getState()));
    dispatch({
      type: types.delete_nowMagic,
    })
    success(`删除 ${nowMagic.name} 成功`)
  } catch (e) {
  }
};

const upload_magicChange = files => async (dispatch, getState) => {
  let magicId = Math.random().toString(36).substr(2);
  try{
    let mainFile;
    for (let file of files) {
      file.name.match(/\.hack\.swf$/g) && (mainFile = file);
    }
    if (!mainFile) {
      throw '';
    }
    let fileName = mainFile.name.split('.')[0];
    let ship = shipIdByFileName(fileName)(getState());
    if (Object.keys(ship).length > 0) {
      for (let file of files) {
        await set_magicChange_file(file, magicId);
      }
      ship = {
        ...ship,
        ...shipBaseDataFactory(ship.api_id)(getState()),
      }
      dispatch({
        type: types.new_magicChange,
        magic: { id: magicId, fileName },
        existedShip: Object.keys(magicShipDataFactory(ship.api_id)(getState())).length > 0,
        ship: {
          id: ship.api_id,
          name: ship.api_name
        }
      });
      toast(`${ship.api_name}魔改添加成功`, { type: 'success' });
    }else {
      warn('找不到对应文件名的舰娘 id，请检查文件名');
    }
  }catch(e) {
    warn('文件格式不正确');
  }
}

export default {
  init_ship,
  change_magic,
  change_shimakazeGoPath,
  upload_magicChange,
  change_magicData,
  delete_nowMagic,
}
