import { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import actions from '../store/actions.es';
import { shipListWithMagicData } from '../store/selectors.es';
import styles from '../css.es';

class Magic extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedShip: {
        magicList: []
      }
    }
  }

  FieldGroup({ id, label, help, ...props }) {
  	return (
  		<FormGroup controlId={id}>
  			<ControlLabel>{label}</ControlLabel>
  			<FormControl {...props} />
  			{help && <HelpBlock>{help}</HelpBlock>}
  		</FormGroup>
  	);
  }
  select_ship(e) {
    this.setState({
      selectedShip: this.props.magicShipList[e.target.value]
    })
  }
  render() {
    const { magicShipList } = this.props;
    const { selectedShip } = this.state;
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
            style: {
              width: 200,
            },
            onChange: this.select_ship.bind(this),
            children: Object.values(magicShipList).map(ship =>
              <option key={ship.id} value={ship.id}>{ship.name}</option>
            )
          })
        }
        {
            this.FieldGroup({
            id: '2',
            label: '魔改名称',
            componentClass: "select",
            bsSize: 'small',
            placeholder: "请选择魔改",
            style: {
              width: 200,
            },
            children: selectedShip.magicList.map(magic =>
              <option key={magic.id} value={magic.id}>{magic.name}</option>
            )
          })
        }
      </Form>
      </div>
    )
  }
}

export default connect(
  state => ({
    magicShipList: shipListWithMagicData(state),
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Magic);
