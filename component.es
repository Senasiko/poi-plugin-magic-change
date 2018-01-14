import { Component } from 'react';
import SelectMagic from './views/SelectMagic.es';
import Menus from './views/Menus.es';
import NowShip from './views/NowShip.es';

class Magic extends Component {
  render() {
    return (
      <div>
      <SelectMagic/>
      <Menus/>
      </div>
    )
  }
}

export default Magic;
