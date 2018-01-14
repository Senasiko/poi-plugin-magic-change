import types from './types.es';
import {
  shimakazeGoPath,
  shipIdByFileName,
  magicShipDataFactory
} from './selectors.es';
import {
  read_data_file,
  read_swf_file,
  get_swf_img_base64,
  set_magicChange_file,
  read_shimakazeGoData
} from '../utils/fileUtils.es';

const init_ship = () => {
  return async (dispatch, getState) => {
    let data = await read_data_file();
    dispatch({
      type: types.init_ship,
      data,
    })
  };
};

const change_ship = (filePath) => {
  return async (dispatch) => {
    let imgs = await get_swf_img_base64(filePath);
    console.log('base64_img', imgs);
    dispatch({
      type: types.change_ship,
      newShip: {
        name: 'shenhai',
        imgs
      }
    });
  };
};

const change_shimakazeGoPath = path => async (dispatch, getState) => {
  let shimakazeGoData = await read_shimakazeGoData(path);
  dispatch({
    type: types.change_shimakazeGoPath,
    path,
    shimakazeGoData,
  });
};


const upload_magicChange = files => async (dispatch, getState) => {
  let magicId = Math.random().toString(36).substr(2);
  try{
    for (let file of files) {
      await set_magicChange_file(file, magicId);
    }
    let fileName = files[0].name.split('.')[0];
    let ship = shipIdByFileName(fileName)(getState());
    if (ship) {
      dispatch({
        type: types.new_magicChange,
        magic: { id: magicId, fileName },
        existedShip: Object.keys(magicShipDataFactory(ship.api_id)(getState())) > 0,
        shipId: ship.api_id
      });
    }else {
      toast('找不到对应文件名的舰娘 id，请检查文件名');
    }
  }catch(e) {
    toast('文件格式不正确', { type: 'error' });
  }


}

export default {
  init_ship,
  change_ship,
  change_shimakazeGoPath,
  upload_magicChange,
}
