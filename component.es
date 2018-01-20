import { Component } from 'react';
import SelectMagic from './views/SelectMagic';
import Menus from './views/Menus';
import NowMagic from './views/NowMagic';
import { store } from 'views/create-store';
import { init_ship } from './store/actions';

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
