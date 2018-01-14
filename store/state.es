export const pluginName = 'poi-plugin-magic-change';

export const magicModel = {
  id: 0,
  name: '未命名',
  description: '',
  imgs: []
}

export const shipModel = {
  id: 0,
  magicList: [magicModel.id]
}

export default {
  shipList: {},
  magicList: {},
  nowShip: {},
  shimakazeGoPath: '',
};
