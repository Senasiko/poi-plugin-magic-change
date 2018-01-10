import types from './types.es';
import { shimakazeGoPath } from './selectors.es';
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
    let shimakazeGoData = await read_shimakazeGoData(data.shimakazeGoPath);
    data.shimakazeGoData = shimakazeGoData;
    dispatch({
      type: types.init_ship,
      data,
    })
  };
};

const change_ship = (filePath) => {
  return async (dispatch) => {
    let imgs = await get_swf_img_base64('D:\\program files\\ShimakazeGo\\cache\\kcs\\resources\\swf\\ships\\agybvcshxbpm.swf');
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


const upload_magicChange = files => async dispatch => {
  let magicId = Math.random().toString(36).substr(2);
  try{
    for (let file of files) {
      await set_magicChange_file(file, magicId);
    }
    dispatch({
      type: types.new_magicChange,
      magicId
    })
  }catch{

  }


}

export default {
  init_ship,
  change_ship,
  change_shimakazeGoPath,
  upload_magicChange,
}
