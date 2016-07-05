import { ADD_DIE, REMOVE_DIE, ROLL, SELECT_DIE, UNSELECT_DIE, RESET, CONFIRM } from '../constants';

const initialState = {
  selected: [],
  available: [],
  locked: 0,
};


export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ADD_DIE:
      if (!action.payload.die) return state;
      return Object.assign({}, state, { selected: [...state.selected, action.payload.die] });
    case REMOVE_DIE:  // eslint-disable-lin
      if (!action.payload.die) return state;
      const index = state.selected.indexOf(action.payload.die);
      if (!index) return state;
      return Object.assign({}, state, { selected: [
        ...state.selected.slice(0, index),
        ...state.selected.slice(index + 1),
      ] });
    case SELECT_DIE:
      if (!action.payload.index && action.payload.index !== 0) return state;
      return Object.assign({}, state, {
        selected: [...state.selected, state.available[action.payload.index]],
        available: [
          ...state.available.slice(0, action.payload.index),
          ...state.available.slice(action.payload.index + 1),
        ],
      });
    case UNSELECT_DIE:
      if (!action.payload.index && action.payload.index !== 0) return state;
      return Object.assign({}, state, {
        available: [...state.available, state.selected[action.payload.index]],
        selected: [
          ...state.selected.slice(0, action.payload.index),
          ...state.selected.slice(action.payload.index + 1),
        ],
      });
    case RESET:
      return initialState;
    case ROLL:
      return Object.assign({}, state, { available: action.payload.dice });
    case CONFIRM: 
      return Object.assign({}, state, { locked: state.selected.length });
    default:
      return state;
  }
}
