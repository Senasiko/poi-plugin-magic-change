import types from './types.es';
import { read_data_file, read_swf_file, get_swf_img_base64 } from '../utils/fileUtils.es';

const init_ship = () => {
  return async (dispatch) => {
    let data = await read_data_file();
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
    })
  };
};

const change_shimakazeGoPath = path => ({
  type: types.change_shimakazeGoPath,
  path,
});

const upload_magicChange = file => async dispatch => {
  
}

export default {
  init_ship,
  change_ship,
  change_shimakazeGoPath,
}
