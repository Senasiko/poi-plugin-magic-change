import { Component } from 'react';
import SelectMagic from './views/SelectMagic.es';
import Menus from './views/Menus.es';
import NowMagic from './views/NowMagic.es';

class Magic extends Component {
  render() {
    return (
      <div>
      <SelectMagic/>
      <NowMagic/>
      <Menus/>
      </div>
    )
  }
}

export default Magic;
