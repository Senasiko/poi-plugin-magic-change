import { Component } from 'react';
import SelectMagic from './views/SelectMagic.es';
import Menus from './views/Menus.es';
import NowMagic from './views/NowMagic.es';
import { store } from 'views/create-store';
import { init_ship } from './store/actions.es';

class Magic extends Component {
  componentDidMount() {
    store.dispatch(init_ship());
  }
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
