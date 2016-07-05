import { ADD_DIE, REMOVE_DIE, SELECT_DIE, UNSELECT_DIE, RESET, CONFIRM, ROLL } from '../constants';

export function add({ added }) {
  return {
    type: ADD_DIE,
    payload: {
      die: added,
    },
  };
}

export function remove({ removed }) {
  return {
    type: REMOVE_DIE,
    payload: {
      die: removed,
    },
  };
}

export function select(index) {
  return {
    type: SELECT_DIE,
    payload: {
      index,
    },
  };
}

export function unselect(index) {
  return {
    type: UNSELECT_DIE,
    payload: {
      index,
    },
  };
}

export function reset() {
  return {
    type: RESET,
  };
}

export function confirm() {
  return {
    type: CONFIRM,
  };
}

export function roll(num) {
  const dice = [];
  for (let i = 0; i < num; i++) {
    dice.push(Math.floor(Math.random() * 6) + 1);
  }
  return {
    type: ROLL,
    payload: {
      dice,
    },
  };
}
