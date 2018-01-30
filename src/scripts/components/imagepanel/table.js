/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2017 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 */

import React from 'react';
import PropTypes from 'prop-types';

/*
 * A table that updates with image
 * data
 *
 * @class ResolutionTable
 * @extends React.Component
 */
export default class ResolutionTable extends React.Component {
  renderImageSize() {
    var size = this.props.fileSize;
    if (!this.props.valid) {
      return (
        <td id='wv-image-size' className='wv-image-size wv-image-size-invalid'>
          <i className='fa fa-times fa-fw' />
          {size + 'MB'}
        </td>
      );
    } else {
      return (
        <td id='wv-image-size' className='wv-image-size'>
          {size + 'MB'}
        </td>
      );
    }
  }
  render() {
    let imageSize = this.renderImageSize();
    return (
      <table className='wv-image-download'>
        <tbody>
          <tr>
            <th>Raw Size</th>
            <th>Maximum</th>
          </tr>
          <tr>
            {imageSize}
            <td className='wv-image-size'>
              {this.props.maxImageSize}
            </td>
          </tr>
          <tr>
            <td>
              <span id='wv-image-width'>
                {this.props.width + ' '}
              </span>
              x
              <span id='wv-image-height'>
                {' ' + this.props.height}
              </span>
              px
            </td>
            <td>
              <button
                onClick={this.props.onClick}
                id='wv-image-download-button'
                disabled={(!this.props.valid)}
                className= {(this.props.valid) ? '' : 'ui-state-disabled'}
              >
                <span className='ui-button-text'>Download</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
ResolutionTable.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  valid: PropTypes.bool,
  onClick: PropTypes.func,
  fileSize: PropTypes.string,
  maxImageSize: PropTypes.string
};
