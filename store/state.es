export const pluginName = 'poi-plugin-magic-change';

export const magicData = {
  id: 0,
  name: '',
  description: '',
  fileName: '',
  imgs: []
}

export const shipData = {
  id: 0,
  magicList: [magicData.id]
}

export default {
  shipList: [{...shipData}],
  magicList: [],
  nowShip: {...shipData},
  shimakazeGoPath: '',
};
