import React from 'react';
import SelectionList from '../main/selector';
import { GifPanelGrid } from './gifpanel-grid';
import Button from '../main/button';
import {Checkbox} from '../main/checkbox';
import PropTypes from 'prop-types';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class resolutionSelection
 * @extends React.Component
 */
export default class GifPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: props.imgHeight,
      imgWidth: props.imgWidth,
      speed: props.speed,
      resolutions: props.resolutions,
      onSelectionChange: props.onSelectionChange,
      resolution: props.resolution,
      valid: props.valid,
      showDates: props.showDates
    };
  }
  handleChange(type, value) {
    this.setState({
      resolution: value
    });
    this.props.onSelectionChange(value);
  }
  render() {
    return (
      <div className="animation-gif-dialog-wrapper">
        <div className='gif-selector-case'>
          <SelectionList
            id='gif-resolution'
            optionArray={this.state.resolutions}
            value={this.state.resolution}
            optionName='resolution'
            onChange={this.handleChange.bind(this)}
          />
          {this.props.firstLabel}
        </div>
        <GifPanelGrid
          width={this.state.imgWidth}
          height={this.state.imgHeight}
          requestSize={this.state.requestSize}
          maxGifSize={this.props.maxGifSize}
          valid={this.state.valid}
          onClick={this.props.onDownloadClick}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          speed={this.state.speed}
        />
        <Button
          onClick={this.props.onClick}
          text='Create GIF'
          valid={this.state.valid}
        />
        <Checkbox
          id="wv-checkbox-gif"
          classNames="wv-checkbox-gif"
          title='Check box to remove dates from Animating GIF'
          checked={this.props.checked}
          onChange={this.props.onCheck}
          label='Include Date Stamps'
        />
      </div>
    );
  }
}

GifPanel.defaultProps = {
  firstLabel: 'Resolution (per pixel)',
  secondLabel: 'Format',
  maxGifSize: 20,
  showDates: true
};
GifPanel.propTypes = {
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  imgWidth: PropTypes.number,
  imgHeight: PropTypes.number,
  maxGifSize: PropTypes.number,
  showDates: PropTypes.bool,
  onDownloadClick: PropTypes.func,
  onClick: PropTypes.func,
  onCheck: PropTypes.func,
  checked: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  resolutions: PropTypes.object,
  requestSize: PropTypes.string,
  resolution: PropTypes.number,
  speed: PropTypes.number,
  valid: PropTypes.bool
};
