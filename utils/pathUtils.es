import path from 'path';
import {
  magicChangeDir,
} from '../config.es';

export const getMagicChangeFilePath = magic =>
  path.join(magicChangeDir, magic.id, magic.fileName + '.hack.swf')

export const getShimakazeGoShipResPath = shimakazeGoPath =>
  path.join(shimakazeGoPath, 'cache', 'kcs', 'resources', 'swf', 'ships')
