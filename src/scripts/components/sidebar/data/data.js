import React from 'react';
import PropTypes from 'prop-types';
// import { Scrollbars } from 'react-custom-scrollbars';
import Product from './product';
import Scrollbars from '../../util/scrollbar';

class Data extends React.Component {
  render() {
    const {
      height,
      data,
      getCounts,
      selected,
      selectProduct,
      showUnavailableReason
    } = this.props;
    const dataArray = Object.entries(data);
    const counts = getCounts();
    return (
      <Scrollbars style={{ maxHeight: height + 'px' }}>
        <div id="wv-data">
          <div className="wv-datalist sidebar-panel content">
            <div id="wv-datacontent">
              {dataArray.map(product => {
                return (
                  <Product
                    key={product[0]}
                    id={product[0]}
                    productObject={product[1]}
                    countsObject={counts}
                    isSelected={selected === product[0]}
                    selectProduct={selectProduct}
                    showUnavailableReason={showUnavailableReason}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Scrollbars>
    );
  }
}
Data.propTypes = {
  height: PropTypes.number,
  data: PropTypes.object,
  getCounts: PropTypes.func
};

export default Data;
