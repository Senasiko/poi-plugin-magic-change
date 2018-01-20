import { cloneDeepWith, clone, remove, unset } from 'lodash';
import initalState, { magicModel, shipModel } from './state';
import types from './types';

export default (state=initalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case types.init_ship:
      newState = { ...initalState, ...action.data };
      break;
    case types.change_magic:
      newState.nowMagicId = action.magicId;
      break;
    case types.change_shimakazeGoPath:
      newState.shimakazeGoPath = action.path || '';
      newState.shimakazeGoData = action.shimakazeGoData || {};
      break;
    case types.change_magicData:
      newState.magicList[action.magicId] = {
        ...newState.magicList[action.magicId],
        ...action.newValue,
      };
      updateState(newState, ['magicList']);
      break;
    case types.delete_nowMagic:
      for (let shipId in newState.shipList) {
        let ship = newState.shipList[shipId];
        remove(ship.magicList, magicId => magicId === newState.nowMagicId);
        if (ship.magicList.length === 0) {
          unset(newState.shipList, shipId);
        }else {
          newState.nowMagicId = ship.magicList[0];
        }
      }
      remove(newState.magicList, magic => magic.id === newState.nowMagicId);
      newState.nowMagicId = '';
      updateState(newState, ['shipList', 'magicList']);
      break;
    case types.new_magicChange:
      newState.magicList[action.magic.id] = {
        ...cloneDeepWith(magicModel),
        ...action.magic,
      };
      // if shipId is not exist, create her;
      if (!action.existedShip) {
        newState.shipList[action.ship.id] = {
          ...cloneDeepWith(shipModel),
          ...action.ship,
        };
      }
      newState.shipList[action.ship.id].magicList.push(action.magic.id);
      updateState(newState, ['shipList', 'magicList']);
      break;
    default: return state;
  }
  return newState;
};


const updateState = (state, changeList) => {
  for (let name of changeList) {
    state[name] = clone(state[name]);
  }
};
