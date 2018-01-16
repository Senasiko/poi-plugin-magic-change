import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropsTypes from 'prop-types';
import path from 'path';
import { Carousel, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { nowMagicData } from '../store/selectors.es';
import actions from '../store/actions.es';
import * as styles from '../css.es';
import { get_swf_img_base64 } from '../utils/fileUtils.es';
import { getMagicChangeFilePath } from '../utils/pathUtils.es';

class NowMagic extends React.PureComponent {
  static propTypes = {
    nowMagic: PropsTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      magicName: props.nowMagic.name || '',
      magicDescription: props.nowMagic.description || '',
      imgs: []
    }
  }
  componentWillReceiveProps(nextProps) {
    const { nowMagic } = nextProps;
    this.setState({
      magicName: nowMagic.name,
      magicDescription: nowMagic.description,
    });
    get_swf_img_base64(getMagicChangeFilePath(nowMagic)).then(imgs => {
      this.setState({ imgs })
    })
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
  render() {
    const { nowMagic } = this.props;
    const { change_magicData } = this.props.actions;
    const { magicName, magicDescription, imgs } = this.state;
    return (
      <div>
        <Carousel
          style={styles.carousel}
        >
        {
          imgs.map((img, index) =>
            <Carousel.Item style={styles.carouselItem} key={index}>
              <img style={styles.magicImg} src={img}/>
            </Carousel.Item>
          )
        }
        </Carousel>
        <Form style={styles.magicForm}>
          {
            this.FieldGroup({
              id: '1',
              label: '魔改名称',
              componentClass: 'input',
              bsSize: 'sm',
              type: 'text',
              value: magicName,
              onChange: e => this.setState({ magicName: e.target.value }),
            })
          }
          {
            this.FieldGroup({
              id: '2',
              label: '魔改描述',
              componentClass: 'input',
              bsSize: 'sm',
              type: 'textarea',
              value: magicDescription,
              onChange: e => this.setState({ magicDescription: e.target.value }),
            })
          }
          <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => change_magicData({ name: magicName, description: magicDescription })}
          >保存</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  state => ({
    nowMagic: nowMagicData(state)
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(NowMagic);
