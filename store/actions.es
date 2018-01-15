import path from 'path';
import { magicChangeDir } from '../config.es'
import types from './types.es';
import {
  shimakazeGoPath,
  shipIdByFileName,
  magicShipDataFactory,
  shipBaseDataFactory,
  magicDataFactory,
} from './selectors.es';
import {
  read_data_file,
  read_swf_file,
  get_swf_img_base64,
  set_magicChange_file,
  read_shimakazeGoData,
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

const change_ship = shipId => ({
  type: types.change_ship,
  shipId
});

const change_magic = magicId => async (dispatch, getState) => {
  // if magic's image message is not exist, judge the image.json exist? if not, read swf.
  let magic = magicDataFactory(magicId)(getState());
  let imgs = magic.imgs || [];
  if (imgs.length === 0) {
    // need shipId, change get_swf_img_base64 function, add error handler when file is not exist
    let data = get_swf_img_base64(path.join(magicChangeDir, magicId, mgicId + '.hack.swf'));

  }
};

const change_shimakazeGoPath = path => async (dispatch, getState) => {
  dispatch({
    type: types.change_shimakazeGoPath,
    path,
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
      ship = {
        ...ship,
        ...shipBaseDataFactory(ship.api_id)(getState()),
      }
      console.log('ship', magicShipDataFactory(ship.api_id)(getState()));
      dispatch({
        type: types.new_magicChange,
        magic: { id: magicId, fileName },
        existedShip: Object.keys(magicShipDataFactory(ship.api_id)(getState())).length > 0,
        ship: {
          id: ship.api_id,
          name: ship.api_name
        }
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
