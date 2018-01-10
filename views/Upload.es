import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../store/actions.es';
import styles from '../css.es';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragOver: false,
    }
  }
  onDrop(e) {
    const { upload_magicChange } = this.props.actions;
    e.preventDefault();
    e.stopPropagation();
    upload_magicChange(e.dataTransfer.files)
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    return (
      <div>
        <div
          style={styles.uploadContainer}
          onDrop={this.onDrop.bind(this)}
          onDragOver={this.onDragOver.bind(this)}
        >
          将swf文件拖到此处
        </div>
        {// magic form }
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
