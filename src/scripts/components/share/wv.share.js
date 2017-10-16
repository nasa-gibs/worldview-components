import React from 'react';
import ShareLinks from './wv.share.links';

export default class Share extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fbLink: props.fbLink,
      twLink: props.twLink,
      rdLink: props.rdLink,
      emailLink: props.emailLink
    };
  }

  render() {
    return (
      <div>
        <ShareLinks
          fbLink={this.state.fbLink}
          twLink={this.state.twLink}
          rdLink={this.state.rdLink}
          emailLink={this.state.emailLink}
          onClick={this.props.clickFunction}
        />
      </div>
    );
  }

}
