/*
 * NASA Worldview
 *
 * This code was originally developed at NASA/Goddard Space Flight Center for
 * the Earth Science Data and Information System (ESDIS) project.
 *
 * Copyright (C) 2013 - 2016 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * Licensed under the NASA Open Source Agreement, Version 1.3
 * http://opensource.gsfc.nasa.gov/nosa.php
 */

import React from 'react';

export default class Modal extends React.Component {
    render() {
      if (this.props.isOpen === false) {
        return null
      }

      let modalContainerStyle = {
          position: 'relative'
      }

      let modalStyle = {
        position: 'absolute',
        top: '200px',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999',
        background: '#fff',
        width:' 300px',
        height: '300px'
      }

      if (this.props.width && this.props.height) {
        modalStyle.width = this.props.width + 'px'
        modalStyle.height = this.props.height + 'px'
        modalStyle.marginLeft = '-' + (this.props.width/2) + 'px',
        modalStyle.marginTop = '-' + (this.props.height/2) + 'px',
        modalStyle.transform = null
      }

      if (this.props.style) {
        for (let key in this.props.style) {
          modalStyle[key] = this.props.style[key]
        }
      }

      return (
        <div className={this.props.containerClassName} style={modalContainerStyle}>
          <div className={this.props.className} style={modalStyle}>
            {this.props.children}
          </div>
        </div>
      )
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }
