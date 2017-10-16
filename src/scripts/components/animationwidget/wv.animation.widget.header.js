import React from 'react';
import Tooltip from '../tooltip/wv.tooltip';

/*
 * A react component, Builds a rather specific
 * interactive widget
 *
 * @class AnimationWidget
 * @extends React.Component
 */
export default class animWidgetHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className='wv-animation-widget-header'>
        {'Animate Map in '}
        <Tooltip text={this.props.text} onClick={this.props.onClick} dataArray={this.props.toolTipTextArray}/>
        {' Increments'}
      </div>
    );
  }
}
