import path from 'path';
import {
  magicChangeDir,
} from '../config.es';

export const getMagicDir = magicId =>
  path.join(magicChangeDir, magicId)

export const getMagicChangeFilePath = magic =>
  path.join(getMagicDir(magic.id), magic.fileName + '.hack.swf')

export const getShimakazeGoShipResPath = shimakazeGoRoot =>
  path.join(shimakazeGoRoot, 'cache', 'kcs', 'resources', 'swf', 'ships')
