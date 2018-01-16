import { createSelector } from 'reselect';
import { cloneDeepWith } from 'lodash';
import memoize from 'fast-memoize';
import {
  extensionSelectorFactory,
  constSelector
 } from 'views/utils/selectors.es';
 import { pluginName } from '../config.es';

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
  state => state.shipList || {}
);

// get magicList
export const magicList = createSelector(
  [pluginData],
  state => state.magicList || {}
);

export const nowMagicData = createSelector(
  [pluginData, magicList],
  (state, magicList) => magicList[state.nowMagicId] || {}
);

export const magicShipDataFactory = shipId => createSelector(
  [magicShipList],
  list => list[shipId] || {}
);

export const shipBaseDataFactory = memoize(shipId => createSelector(
  [constSelector],
  ({ $ship }) => $ships[shipId] || {}
))

export const shipGraphsDataFactory = memoize(shipId => createSelector(
  [constSelector],
  ({ $shipgraph }) => $shipgraph[shipId - 1] || {}
))

export const shipIdByFileName = memoize(fileName => createSelector(
  [constSelector],
  ({ $shipgraph }) => {
    let ship = $shipgraph.find(graph => graph.api_filename === fileName);
    return ship || {};
  }
))

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

// get shipList with magicData
export const shipListWithMagicData = createSelector(
    [magicShipList, magicList],
    (shipList, magicList) => {
      let mShipList = cloneDeepWith(shipList);
      for (let ship of Object.values(mShipList)){
        ship.magicList = ship.magicList.map(magicId => magicList[magicId]);
      }
      return mShipList;
    }
);

// get now ship's base data and magicChange data
export const shipBaseAndMagicDataFactory = shipId => createSelector(
  [shipBaseDataFactory(shipId), shipGraphsDataFactory(shipId), shipMagicListFactory(shipId)],
  (shipArray, shipgraph, magicList) =>
    Object.assign(
      typeof shipArray === 'array'?shipArray[shipId]:{},
      {
        magicList,
        ...shipgraph
      }
    ) || {}
);


export const nowShipByNowMagic = createSelector(
  [shipListWithMagicData, pluginData],
  (shipList, state) =>
    Object.values(shipList).find(ship => ship.magicList.find(magic => magic.id === state.nowMagicId)) || {
      magicList: []
    }
);
