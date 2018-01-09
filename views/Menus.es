import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import SetShimakaze from './SetShimakaze.es';
import Upload from './Upload.es'

class Menus extends React.Component {
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
          label: '初始化魔改',
          key: 3
        }
      ],
      nowMenu: {}
    }
  }

  changeMenu(nowMenu) {
    this.setState({
      nowMenu
    })
  }
  getMenu() {

  }
  render() {
    const { menus, nowMenu } = this.state;
    return (
      <div>
      {
        menus.map(menu => (
          <Button
            key={menu.key}
            onClick={() => {this.changeMenu(menu)}}
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

export default Menus;
