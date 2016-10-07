# Worldview Timeline Components

## About

External components built to use on the [NASA Worldview](worldview.earthdata.nasa.gov) data visualization Application. Worldview Timeline Components is built with ES6 and facebook's [react](https://github.com/facebook/react/) JS library. This repository is the start of a larger project to make Worldview code more scalable and readable.

## Getting Started

### Installation

`npm install worldview-timeline-components`

### CommonJS
#### Get Entire Package
`var TimelineComponents = require('worldview-timeline-components');`
#### Use Single Module
`var DateSelector = require('worldview-timeline-components').DateSelector;`

### ES6
#### Get Entire Package
`import TimelineComponents from 'worldview-timeline-components';`
#### Grab what you need
`import {DateSelector, Tooltip} from 'worldview-timeline-components';`

### Components
#### Date Selector
A Date selection widget that handles validations. 

##### Example

  `<DateSelector
	width="120"
	height="30"
	date={someDateYouWantToDisplay}
	id='someId'
	onDateChange={this.someOnChangeHandler}
	maxDate={this.props.maxDate} // Latest possible date
	minDate={this.props.startDate} // earliest possible date
  />`
