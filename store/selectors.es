import { createSelector } from 'reselect';
import {
  extensionSelectorFactory,
  shipDataSelectorFactory
 } from 'views/utils/selectors.es';
 import { pluginName, magicData, shipData } from './state.es'

 export const pluginData = createSelector(
   [extensionSelectorFactory(pluginName)],
   state => state || {},
 );

export const shimakazeGoPath = createSelector(
  [pluginData],
  state => state.shimakazeGoPath || ''
)

// get all has magicChange's ship
export const magicShipList = createSelector(
  [pluginData],
  state => state.shipList || [{...shipData}]
);

// get magicList
export const magicList = createSelector(
  [pluginData],
  state => state.magicList || [{...magicData}]
);

// get magicChange by id
export const magicDataFactory = magicId => createSelector(
    [magicList],
    list => list[magicId] || {}
)

// get ship magicData by shipId
export const shipMagicDataFactory = shipId => createSelector(
    [magicShipList, magicList],
    (shipList, magicList) => shipList[shipId]?shipList[shipId].magicList.map(
      magicId => magicDataFactory(magicId)
    ):[]
);

// get now ship's base data and magicChange data
export const shipBaseAndMagicDataFactory = shipId => createSelector(
  [shipDataSelectorFactory(shipId), shipMagicDataFactory(shipId)],
  (shipArray, magicList) =>
    Object.assign(typeof shipArray === 'array'?shipArray[1]:{}, {magicList}) || {}
);
