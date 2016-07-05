import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './die.css';
import cx from 'classnames';

class Die extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.number,
    disabled: PropTypes.bool,
  };

  /*
  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.value);
    }
  };

  render() {
    return (<span
      onClick={this.handleClick}
      className={cx(s.die, s[`die-${this.props.value}`], { [s.locked]: !this.props.onClick })}
    ></span>
    );
  }*/
  render() {
    return (<span
      onClick={this.props.onClick}
      className={cx(s.die, s[`die-${this.props.value}`])}
      disabled={this.props.disabled}
    ></span>
    );
  }
}

export default withStyles(s)(Die);

