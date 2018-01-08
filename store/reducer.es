import initalState from './state.es';
import types from './types.es';

export default (state=initalState, action) => {
  let newState = {...state};
  switch (action.type) {
    case types.init_ship:
      newState = action.data || initalState;
      break;
    case types.change_ship:
      newState.nowShip = action.newShip || initalState.nowShip;
      break;
    case types.change_shimakazeGoPath:
      newState.shimakazeGoPath = action.path;
      break;
    default: return state;

  }
  return newState;
};
