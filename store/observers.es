import { observe, observer } from 'redux-observers';
import fs from 'fs-extra';
import { store } from 'views/create-store';
import {
  pluginData
 } from './selectors';
import { dataFile } from '../config';

// set data json file
const unsubscribeDataObserve = observe(store, [
  observer(
    state => pluginData(state),
    (dispatch, current, previous) => {
      if (Object.keys(previous).length > 0){
        fs.writeFileSync(dataFile, JSON.stringify(current));
      }
    }
  )]
);


export default {
  unsubscribeDataObserve
}
