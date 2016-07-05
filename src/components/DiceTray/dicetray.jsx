import React, { Component, PropTypes } from 'react';
import Die from '../Die';

class DiceTray extends Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    known: PropTypes.array,
    onClick: PropTypes.func,
    slots: PropTypes.number,
    locked: PropTypes.number,
  };

  static defaultProps = {
    known: [],
    slots: 0,
    locked: 0,
  };

  render() {
    const dice = this.props.known.map((value, idx) => <Die
      value={value}
      onClick={this.props.onClick && idx >= this.props.locked ? () => this.props.onClick(this, value, idx) : null}
      disabled={idx < this.props.locked}
      key={idx}
    />);
    for (let idx = dice.length; idx < this.props.slots; idx++) {
      dice.push(<Die key={idx} disabled />);
    }
    return (
      <div>{dice}</div>
    );
  }
}

export default DiceTray;

