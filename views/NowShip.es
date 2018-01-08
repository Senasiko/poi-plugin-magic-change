import React from 'react';
import { connect } from 'react-redux';
import PropsTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { shipBaseAndMagicDataFactory, shipMagicDataFactory } from '../store/selectors.es';
import styles from '../css.es';

class NowShip extends React.PureComponent {
  static propTypes = {
    shipId: PropsTypes.number.isRequired,
    nowShip: PropsTypes.object.isRequired,
  }

  render() {
    const { nowShip } = this.props;
    console.log(this.props);
    return (
      <div>
        <Carousel
          style={styles.carousel}
        >
        
        </Carousel>
      </div>
    );
  }
}

export default connect(
  (state, { shipId }) => ({
    nowShip: shipBaseAndMagicDataFactory(shipId)(state),
    nowShipMagic: shipMagicDataFactory(shipId)(state)
  })
)(NowShip);
