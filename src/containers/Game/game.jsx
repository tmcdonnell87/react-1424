import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions/dice';

import DiceTray from '../../components/DiceTray';

class Game extends Component { // eslint-disable-line react/prefer-stateless-function
  
  static propTypes = {
    dice: PropTypes.shape({
        selected: PropTypes.array,
        available: PropTypes.array,
        locked: PropTypes.number,        
    }),
    locked: PropTypes.number,
    actions: PropTypes.shape({
      select: PropTypes.func,
      unselect: PropTypes.func,
      roll: PropTypes.func,
      reset: PropTypes.func,
      confirm: PropTypes.func,
    })
  };

  componentDidMount = () => {
    this.props.actions.roll(6);
  };

  select = (event, num, index) => {
    this.props.actions.select(index);
  };

  unselect = (event, num, index) => {
    this.props.actions.unselect(index);
  };

  roll = () => {
    this.props.actions.confirm();
    this.props.actions.roll(6 - this.props.dice.selected.length);
  };

  reset = () => {
    this.props.actions.reset();
    this.props.actions.roll(6);
  }

  render() {
    return (
      <div>
        <h1>Selected</h1>
        <DiceTray known={this.props.dice.selected} slots={6} onClick={this.unselect} locked={this.props.dice.locked} />
        <h1>Available</h1>
        <DiceTray known={this.props.dice.available} onClick={this.select} />
        <button onClick={this.roll} disabled={this.props.dice.selected.length <= this.props.dice.locked}>Roll</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { dice: state.dice };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
