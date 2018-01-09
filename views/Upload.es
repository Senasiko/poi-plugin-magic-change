import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../store/actions.es';
import styles from '../css.es';
import { set_magicChange_file } from '../utils/fileUtils.es';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragOver: false,
    }
  }
  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('drop', e.dataTransfer.files);
    set_magicChange_file(e.dataTransfer.files[0])
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    const { upload_magicChange } = this.props.actions;
    return (
      <div>
        <div
          style={styles.uploadContainer}
          onDrop={this.onDrop.bind(this)}
          onDragOver={this.onDragOver.bind(this)}
        >
          将swf文件拖到此处
        </div>
      </div>

    );
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Upload);
