import { cloneDeepWith, clone } from 'lodash';
import initalState, { magicModel, shipModel } from './state.es';
import types from './types.es';

export default (state=initalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case types.init_ship:
      newState = { ...initalState, ...action.data };
      break;
    case types.change_ship:
      newState.nowShip = { ...cloneDeepWith(initalState.nowShip), ...action.newShip };
      break;
    case types.change_shimakazeGoPath:
      newState.shimakazeGoPath = action.path || '';
      newState.shimakazeGoData = action.shimakazeGoData || {};
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
      updateState(newState, ['shipList', 'magicList'])
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
