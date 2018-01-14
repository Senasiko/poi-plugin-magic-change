export const pluginName = 'poi-plugin-magic-change';

export const magicModel = {
  id: 0,
  name: '',
  description: '',
  fileName: '',
  imgs: []
}

export const shipModel = {
  id: 0,
  magicList: [magicModel.id]
}

export default {
  shipList: {0: { ...shipModel }},
  magicList: {},
  nowShip: {...shipModel},
  shimakazeGoPath: '',
};
