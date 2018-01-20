import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shimakazeGoPath } from '../store/selectors';
import actions from '../store/actions';
import { ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class Setting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shimakazeGoPath: props.shimakazeGoPath
    }
  }
  render() {
    const { shimakazeGoPath } = this.state;
    const { change_shimakazeGoPath } = this.props.actions;
    return (
      <div>
        <FormControl
          componentClass="input"
          placeholder="岛风GO路径"
          value={shimakazeGoPath}
          onChange={e => this.setState({shimakazeGoPath: e.target.value})}
        />
        <HelpBlock>
          如：D:\program files\ShimakazeGo
        </HelpBlock>
        <Button onClick={()=>{change_shimakazeGoPath(shimakazeGoPath)}}>保存</Button>
      </div>

    );
  }
}

export default connect(
  state => ({
    shimakazeGoPath: shimakazeGoPath(state)
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Setting);
