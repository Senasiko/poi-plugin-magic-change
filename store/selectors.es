import { createSelector } from 'reselect';
import {
  extensionSelectorFactory,
  constSelector
 } from 'views/utils/selectors.es';
 import { pluginName, magicData, shipData } from './state.es'

export const

 export const pluginData = createSelector(
   [extensionSelectorFactory(pluginName)],
   state => state || {},
 );

export const shimakazeGoPath = createSelector(
  [pluginData],
  state => state.shimakazeGoPath || ''
)

export const shimakazeGoData = createSelector(
  [pluginData],
  state => state.shimakazeGoData || ''
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

export const shipBaseDataFactory = shipId => createSelector(
  [constSelector],
  ({ $ship }) => {console.log($ship);return $ships[shipId] || {}}
)

// get magicChange by id
export const magicDataFactory = magicId => createSelector(
    [magicList],
    list => list[magicId] || {}
)

// get ship magicData by shipId
export const shipMagicListFactory = shipId => createSelector(
    [magicShipList, magicList],
    (shipList, magicList) => shipList[shipId]?shipList[shipId].magicList.map(
      magicId => magicDataFactory(magicId)
    ):[]
);

//
export const shipListInShimakzeGo = createSelector(
  [shimakazeGoData],
  (shimakazeGoData) => shimakazeGoData.shipData || []
);

export const resListInShimakzeGo = createSelector(
  [shimakazeGoData],
  (shimakazeGoData) => shimakazeGoData.resData || []
);

export const shipFileNameInShimakazeGo = shipId => createSelector(
  [shipListInShimakzeGo, resListInShimakzeGo],
  (shipListInShimakzeGo, resListInShimakzeGo) => shimakazeGoData.resData || []
);

// get now ship's base data and magicChange data
export const shipBaseAndMagicDataFactory = shipId => createSelector(
  [shipBaseDataFactory(shipId), shipMagicListFactory(shipId)],
  (shipArray, magicList) =>
    Object.assign(typeof shipArray === 'array'?shipArray[shipId]:{}, {magicList}) || {}
);
