import React from 'react';
import PropTypes from 'prop-types';
import Util from '../../util/util';
import lodashIsEqual from 'lodash/isEqual';

const util = new Util();

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunningData: props.isRunningData,
      colorHex: props.colorHex,
      isHoveringCanvas: props.isHoveringCanvas,
      legends: props.legends,
      width: this.props.width
    };
  }
  componentWillReceiveProps(props) {
    if (!lodashIsEqual(props.legends, this.state.legends)) {
      this.setState({ legends: props.legends });
    } else {
      let setState = false;
      if (props.isRunningData !== this.state.isRunningData) {
        setState = true;
      }
      if (props.colorHex !== this.state.colorHex) {
        setState = true;
      }
      if (setState) {
        this.setState({
          isRunningData: props.isRunningData,
          colorHex: props.colorHex
        });
      }
    }
  }
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  /**
   * g
   */
  getPercent(len, index) {
    var segmentWidth;
    var location;
    const { width } = this.state;
    if (len < 250) {
      segmentWidth = width / len;
      location = segmentWidth * index + 0.5 * segmentWidth;
      return location / width;
    } else if (len) {
      return 0;
    } else {
      return index / len;
    }
  }
  /**
   * OnMouseMove get correct canvas Data
   * @param {Object} canvas | Element
   * @param {Object} e | Event Object
   */
  onHoverColorbar(canvas, e) {
    e.preventDefault();
    e.stopPropagation();
    var boundingRec = e.target.getBoundingClientRect();
    var x = e.clientX - boundingRec.left;
    var y = e.clientY - boundingRec.top;
    var rgba = canvas.current.getContext('2d').getImageData(x, y, 1, 1).data;
    var hex = util.rgbaToHex(rgba[0], rgba[1], rgba[2]);

    this.setState({
      colorHex: hex
    });
  }
  /**
   * On Mouse Enter update State
   * @param {*} e
   */
  onMouseEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isRunningData: true,
      isHoveringLegend: true
    });
  }
  /**
   * Find wanted legend object from Hex
   * @param {Object} legend
   * @param {String} hex
   * @param {Number} acceptableDifference
   */
  getLegendObject(legend, hex, acceptableDifference) {
    var units = legend.units || '';
    for (var i = 0, len = legend.colors.length; i < len; i++) {
      if (util.hexColorDelta(legend.colors[i], hex) < acceptableDifference) {
        // If the two colors are close
        return {
          label: legend.tooltips[i] + ' ' + units,
          len: len,
          index: i
        };
      }
    }
    return null;
  }
  /**
   * Update state on MouseOut
   */
  hideValue(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isRunningData: false,
      isHoveringLegend: false
    });
  }
  /**
   * Style Canvas bases on updates to legend or canvas-width
   */
  updateCanvas() {
    const { checkerBoardPattern } = this.props;
    const { legends } = this.state;

    legends.forEach((colorMap, index) => {
      if (colorMap.type === 'continuous' || colorMap.type === 'discrete') {
        let ctxStr = 'canvas_' + index;
        if (this[ctxStr]) {
          let newWidth = this[ctxStr].current.getBoundingClientRect().width;
          if (newWidth !== this.state.width) {
            // If scrollbar appears canvas width changes.
            // This value is needed for calculating running data offsets
            this.setState({ width: newWidth });
          }
          this.drawOnCanvas(ctxStr, checkerBoardPattern, colorMap.colors);
        }
      }
    });
  }
  /**
   * Redraw canvas with selected colormap
   * @param {*} ctxStr | String of wanted cavnas
   * @param {*} checkerBoardPattern | Background for canvas threshold
   * @param {*} colors | array of color values
   */
  drawOnCanvas(ctxStr, checkerBoardPattern, colors) {
    var context = this[ctxStr].current.getContext('2d');
    const { height, width } = this.props;
    context.fillStyle = checkerBoardPattern;
    context.fillRect(0, 0, width, height);

    if (colors) {
      var bins = colors.length;
      var binWidth = width / bins;
      var drawWidth = Math.ceil(binWidth);
      colors.forEach((color, i) => {
        context.fillStyle = util.hexToRGBA(color);
        context.fillRect(Math.floor(binWidth * i), 0, drawWidth, height);
      });
    }
  }
  /**
   * @param {Number} index | Selected label Index
   * @param {Number} boxWidth | Width of Each label box
   * @param {Number} textWidth | Label width
   * @param {Number} width | Case width
   */
  getClassLabelStyle(index, boxWidth, textWidth, width) {
    var halfTextWidth = textWidth / 2 || 0;
    var xOffset = boxWidth * index + boxWidth / 2 || 0;
    if (halfTextWidth > xOffset) {
      return { left: '0', visibility: 'visible' };
    } else if (xOffset + halfTextWidth > width) {
      return { right: '0', visibility: 'visible' };
    }
    return { left: xOffset - halfTextWidth + 'px', visibility: 'visible' };
  }
  /**
   * @param {*} xOffset | X px Location of running-data
   * @param {Number} textWidth | px width of text calculated with canvas
   * @param {*} width | Case width
   */
  getRunningLabelStyle(xOffset, textWidth, width) {
    var halfTextWidth = textWidth / 2 || 0;

    if (halfTextWidth > xOffset) {
      return { left: '0' };
    } else if (xOffset + halfTextWidth > width) {
      return { right: '0' };
    }
    return { left: xOffset - halfTextWidth + 'px' };
  }
  /**
   * Render scale-type legends
   * @param {Object} legend
   * @param {Number} index
   * @param {Boolean} isMoreThanOneColorBar
   */
  renderScale(legend, index, isMoreThanOneColorBar) {
    const { layer, width } = this.props;
    const { isRunningData, colorHex, isHoveringLegend } = this.state;

    var percent, textWidth, xOffset, legendObj;
    var toolTipLength = legend.tooltips.length;

    if (isRunningData && colorHex) {
      legendObj = this.getLegendObject(legend, colorHex, 5); // {label,len,index}
      if (legendObj) {
        percent = this.getPercent(legendObj.len, legendObj.index);
        textWidth = util.getTextWidth(legendObj.label, 'Lucida Sans');
        xOffset = this.state.width * percent;
      }
    }

    var min = legend.minLabel || legend.tooltips[0];
    var max = legend.maxLabel || legend.tooltips[toolTipLength];

    min = legend.units ? min + ' ' + legend.units : min;
    max = legend.units ? max + ' ' + legend.units : max;
    return (
      <div
        className={
          legendObj ? 'wv-running wv-palettes-legend' : 'wv-palettes-legend'
        }
        id={layer.id + '_' + legend.id + '_' + index}
        key={layer.id + '_' + legend.id + '_' + index}
      >
        {isMoreThanOneColorBar ? (
          <div className="wv-palettes-title">{legend.title}</div>
        ) : (
          <div className="wv-palettes-title" />
        )}
        <div className="colorbar-case">
          <canvas
            className="wv-palettes-colorbar"
            id={layer.id + '-' + legend.id + index + 'colorbar'}
            width={width}
            height={12}
            ref={this['canvas_' + index]}
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.hideValue.bind(this)}
            onMouseMove={this.onHoverColorbar.bind(
              this,
              this['canvas_' + index]
            )}
          />
          <div
            className="wv-running-bar"
            style={{
              left: isHoveringLegend ? 0 : xOffset,
              visibility: legendObj && !isHoveringLegend ? 'visible' : 'hidden'
            }}
          />
        </div>
        <div className="wv-palettes-min">{min}</div>
        <div className="wv-palettes-max"> {max}</div>
        <span
          className="wv-running-label"
          style={
            isRunningData
              ? this.getRunningLabelStyle(xOffset, textWidth, this.state.width)
              : { display: 'none' }
          }
        >
          {legendObj ? legendObj.label : ''}
        </span>
      </div>
    );
  }
  /**
   * Update label & Location on Mousemove
   * @param {String} color | Hex
   * @param {Object} e | Event Object
   */
  onMove(color, e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ colorHex: color });
  }
  /**

   * @param {Object} legend | Legend Object
   * @param {Number} index | Legend Index
   */
  renderClasses(legend, index) {
    const { isRunningData, colorHex } = this.state;
    const { width } = this.props;
    const boxWidth = 17; // width (13) + margin (4)
    var legendObj, textWidth;
    if (isRunningData && colorHex) {
      legendObj = this.getLegendObject(legend, colorHex, 40); // {label,len,index}
      if (legendObj) {
        textWidth = util.getTextWidth(legendObj.label, 'Lucida Sans');
      }
    }
    return (
      <div
        className={
          legendObj
            ? 'wv-running wv-palettes-legend wv-palettes-classes'
            : 'wv-palettes-legend wv-palettes-classes'
        }
        key={legend.id + '_' + index}
      >
        {legend.colors.map((color, index) => {
          return (
            <React.Fragment key={legend.id + '-color-' + index}>
              <span
                className={
                  legendObj && legendObj.index === index
                    ? 'wv-active wv-palettes-class'
                    : 'wv-palettes-class'
                }
                style={{ backgroundColor: util.hexToRGBA(color) }}
                onMouseMove={this.onMove.bind(this, color)}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.hideValue.bind(this)}
                dangerouslySetInnerHTML={{ __html: '&nbsp' }}
              />
              {isRunningData && legendObj && index === legendObj.index ? (
                <span
                  className="wv-running-category-label"
                  style={this.getClassLabelStyle(
                    index,
                    boxWidth,
                    textWidth,
                    width
                  )}
                >
                  {legendObj.label}
                </span>
              ) : (
                ''
              )}
            </React.Fragment>
          );
        })}
        <span
          className="wv-running-category-label"
          style={
            legendObj && isRunningData
              ? this.getClassLabelStyle(
                legendObj.index,
                boxWidth,
                textWidth,
                width
              )
              : {}
          }
        >
          {legendObj ? legendObj.label : ''}
        </span>
      </div>
    );
  }
  /**
   * Render correct legend type
   */
  renderLegends() {
    const { legends } = this.state;
    return legends.map((colorMap, index) => {
      if (colorMap.type === 'continuous' || colorMap.type === 'discrete') {
        this['canvas_' + index] = React.createRef();
        return this.renderScale(colorMap, index, legends.length > 1);
      } else if (colorMap.type === 'classification') {
        return this.renderClasses(colorMap, index);
      }
    });
  }
  render() {
    const { palette, layer } = this.props;
    const { isHoveringLegend } = this.state;
    if (!layer.palette) return;
    return (
      <div
        className={
          isHoveringLegend
            ? 'active-lengend wv-palettes-panel'
            : 'wv-palettes-panel'
        }
        datalayer={layer.id}
        id={palette.id + '_panel'}
      >
        {this.renderLegends()}
      </div>
    );
  }
}
Legend.defaultProps = {
  isRunningData: false,
  isHoveringLegend: false,
  isRunningDataEnabled: true,
  width: 235,
  height: 12
};
Legend.propTypes = {
  palette: PropTypes.object,
  layer: PropTypes.object,
  checkerBoardPattern: PropTypes.object,
  isHoveringLegend: PropTypes.bool,
  isRunningDataEnabled: PropTypes.bool,
  legends: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  isRunningData: PropTypes.bool,
  isHoveringCanvas: PropTypes.bool,
  colorHex: PropTypes.string
};

export default Legend;
