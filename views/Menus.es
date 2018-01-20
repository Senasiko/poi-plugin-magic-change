import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { importFromShimakaze } from '../utils/fileUtils';
import { shimakazeGoPath } from '../store/selectors';
import * as styles from '../css';
import actions from '../store/actions';
import SetShimakaze from './SetShimakaze';
import Upload from './Upload';
import SelectMagic from './SelectMagic';

class Menus extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenus: false,
      menus: [
        {
          label: '岛风Go目录',
          component: <SetShimakaze/>,
          key: 1
        },
        {
          label: '添加魔改',
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
    try {
      let magicChangeFileList = importFromShimakaze(shimakazeGoPath);
      if (magicChangeFileList && magicChangeFileList.length > 0) {
        for (let magicChangeFile of magicChangeFileList) {
          upload_magicChange(magicChangeFile);
        }
      }
    } catch (e) {
    }

  }
  changeMenu(nowMenu) {
    this.setState({
      nowMenu
    })
  }
  render() {
    const { menus, nowMenu, showMenus } = this.state;
    return (
      <div style={{ marginTop: 15 }}>
        <div
          style={{
            ...styles.menuGroup,
            transform: `translateX(${showMenus?0:'100%'})`
          }}
          className="panel"
        >
          <a
            style={styles.setButton}
            onClick={() => { this.setState({ showMenus: !showMenus }) }}
          >
            <i
              className={`fa ${showMenus?'fa-angle-double-right':'fa-angle-double-left'}`}
            ></i>
            </a>
          <div className="panel-body">
            <ButtonGroup vertical>
              {
                menus.map(menu => (
                  <Button
                    key={menu.key}
                    onClick={() => this.clickMenuButton.call(this, menu)}
                    active={nowMenu.key === menu.key}
                  >
                    {menu.label}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            {
              nowMenu.component
            }
          </div>
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
