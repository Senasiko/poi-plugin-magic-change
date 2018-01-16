import reactClass from './component.es';
import reducer from './store/reducer.es';
import observes from './store/observers.es';

function pluginDidLoad() {
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
