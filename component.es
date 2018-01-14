import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { store } from 'views/create-store';
import actions from './store/actions.es';
import { pluginName } from './store/state.es';
import { magicShipList } from './store/selectors.es';
import NowShip from './views/NowShip.es';
import Menus from './views/Menus.es';
import styles from './css.es';

class Magic extends Component {
  FieldGroup({ id, label, help, ...props }) {
  	return (
  		<FormGroup controlId={id}>
  			<ControlLabel>{label}</ControlLabel>
  			<FormControl {...props} />
        {
          props.children
        }
  			{help && <HelpBlock>{help}</HelpBlock>}
  		</FormGroup>
  	);
  }
  componentDidMount = async () => {
    this.props.actions.init_ship();
  }
  render() {
    const { magicShipList } = this.props;
    const { change_ship } = this.props.actions;
    console.log(magicShipList);
    return (
      <div>
      <Form inline>
        {
            this.FieldGroup({
            id: '1',
            label: '舰娘名称',
            componentClass: "select",
            bsSize: 'small',
            placeholder: "请选择舰娘",
            width: 200,
            children: Object.values(magicShipList).map(ship =>
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            )
          })
        }
      </Form>
      <Menus/>
      </div>
    )
  }
}

export default connect(
  state => ({
    magicShipList: magicShipList(state),
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Magic);
