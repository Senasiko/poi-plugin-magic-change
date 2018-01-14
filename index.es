import reactClass from './component.es';
import reducer from './store/reducer.es';
import observes from './store/observers.es';
import { store } from 'views/create-store';
import { init_ship } from './store/actions.es';

function pluginDidLoad() {
  store.dispatch(init_ship());
}

function pluginWillUnload() {
  for (let observe of observes)
    if (observe instanceof Function)
      oboserve();
}

export {
  reactClass,
  reducer,
  pluginDidLoad,
  pluginWillUnload,
}
