/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { ADD_DIE, REMOVE_DIE, SELECT_DIE, UNSELECT_DIE, ROLL } from '../constants';
import reducer from './dice';

const state1 = {
  selected: [1, 1, 4],
  available: [4, 5, 6],
  locked: 0,
};

describe('dice reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.eql({
      selected: [],
      available: [],
      locked: 0,
    });
  });
  it('should handle ADD_DIE', () => {
    expect(
      reducer(state1, {
        type: ADD_DIE,
        payload: { die: 6 },
      })
    ).to.eql(
      {
        selected: [1, 1, 4, 6],
        available: [4, 5, 6],
        locked: 0,
      }
    );
  });
  it('should handle REMOVE_DIE', () => {
    expect(
      reducer(state1, {
        type: REMOVE_DIE,
        payload: { die: 4 },
      })
    ).to.eql(
      {
        selected: [1, 1],
        available: [4, 5, 6],
        locked: 0,
      }
    );
  });
  it('should handle SELECT_DIE', () => {
    expect(
      reducer(state1, {
        type: SELECT_DIE,
        payload: { index: 2 },
      })
    ).to.eql(
      {
        selected: [1, 1, 4, 6],
        available: [4, 5],
        locked: 0,
      }
    );
  });
  it('should handle SELECT_DIE with index 0', () => {
    expect(
      reducer(state1, {
        type: SELECT_DIE,
        payload: { index: 0 },
      })
    ).to.eql(
      {
        selected: [1, 1, 4, 4],
        available: [5, 6],
        locked: 0,
      }
    );
  });
  it('should handle UNSELECT_DIE', () => {
    expect(
      reducer(state1, {
        type: UNSELECT_DIE,
        payload: { index: 1 },
      })
    ).to.eql(
      {
        selected: [1, 4],
        available: [4, 5, 6, 1],
        locked: 0,
      }
    );
  });
  it('should handle ROLL', () => {
    expect(
      reducer(state1, {
        type: ROLL,
        payload: { dice: [1, 3, 5] },
      })
    ).to.eql(
      {
        selected: [1, 1, 4],
        available: [1, 3, 5],
        locked: 0,
      }
    );
  });
});

