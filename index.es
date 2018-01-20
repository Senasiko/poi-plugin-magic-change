import reactClass from './component';
import reducer from './store/reducer';
import observes from './store/observers';

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
