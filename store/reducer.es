import initalState from './state.es';
import types from './types.es';

export default (state=initalState, action) => {
  let newState = {...state};
  switch (action.type) {
    case types.init_ship:
      newState = { ...initalState, ...action.data };
      break;
    case types.change_ship:
      newState.nowShip = { ...initalState.nowShip, ...action.newShip };
      break;
    case types.change_shimakazeGoPath:
      newState.shimakazeGoPath = action.path || '';
      newState.shimakazeGoData = action.shimakazeGoData || {};
      break;
    case types.new_magicChange:
      newState.magicList.push(action.magicId);
      break;
    default: return state;

  }
  return newState;
};
