import { observe, observer } from 'redux-observers';
import fs from 'fs-extra';
import { store } from 'views/create-store.es';
import {
  pluginData
 } from './selectors.es';
import { dataFile } from '../config.es';

// set data json file
const unsubscribeShimakazeGoObserve = observe(store, [
  observer(
    state => pluginData(state),
    (dispatch, current, previous) => {
      if (Object.keys(previous).length > 0){
        let data = {...current};
        delete data.shimakazeGoData;
        fs.writeFileSync(dataFile, JSON.stringify(data));
      }
    }
  )]
);


export function pluginWillUnload() {
  unsubscribeShimakazeGoObserve();
}
