import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { importFromShimakaze } from '../utils/fileUtils.es';
import { shimakazeGoPath } from '../store/selectors';
import actions from '../store/actions.es';
import SetShimakaze from './SetShimakaze.es';
import Upload from './Upload.es';
import SelectMagic from './SelectMagic.es';

class Menus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          label: '岛风Go目录',
          component: <SetShimakaze/>,
          key: 1
        },
        {
          label: '导入魔改',
          key: 2,
          component: <Upload/>,
        },
        {
          label: '导入魔改',
          key: 3,
          onClick: this.importFromShimakaze.bind(this),
        }
      ],
      nowMenu: {}
    }
  }
  clickMenuButton(menu) {
    if (menu.onClick && menu.onClick instanceof Function) {
      menu.onClick();
    } else {
      this.changeMenu(menu);
    }
  }
  importFromShimakaze() {
    const { shimakazeGoPath } = this.props;
    const { upload_magicChange } = this.props.actions;
    let magicChangeFileList = importFromShimakaze(shimakazeGoPath);
    if (magicChangeFileList && magicChangeFileList.length > 0) {
      for (let magicChangeFile of magicChangeFileList) {
        upload_magicChange(magicChangeFile);
      }
    }
  }
  changeMenu(nowMenu) {
    this.setState({
      nowMenu
    })
  }
  render() {
    const { menus, nowMenu } = this.state;
    return (
      <div>
      {
        menus.map(menu => (
          <Button
            key={menu.key}
            onClick={() => this.clickMenuButton.call(this, menu)}
          >
            {menu.label}
          </Button>
        ))
      }
      <div>
        {
          nowMenu.component
        }
      </div>
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
)(Menus);
