/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { EVALUATE } from '../constants';
import * as actions from './calc';

describe('actions', () => {
  describe('single die roll', () => {
    it('should correctly calculate a basic score', () => {
      const hand = [, 1, , , 1, 2, 1];  // eslint-disable-line no-sparse-arrays
      const available = [6];
      const expectedAction = {
        type: EVALUATE,
        choices: new Map([[6, 22]]),
      };
      expect(actions.evaluate(hand, available)).to.eql(expectedAction);
    });

    it('should return zero when no "1" is present', () => {
      const hand = [, , 1, , 1, 2, 1];  // eslint-disable-line no-sparse-arrays
      const available = [6];
      const expectedAction = {
        type: EVALUATE,
        choices: new Map([[6, 0]]),
      };
      expect(actions.evaluate(hand, available)).to.eql(expectedAction);
    });

    it('should return zero when no "4" is present', () => {
      const hand = [, 1, , 1, , 2, 1];  // eslint-disable-line no-sparse-arrays
      const available = [6];
      const expectedAction = {
        type: EVALUATE,
        choices: new Map([[6, 0]]),
      };
      expect(actions.evaluate(hand, available)).to.eql(expectedAction);
    });

    it('should complete on the last roll', () => {
      const hand = [, 1, , 1, , 2, 1];  // eslint-disable-line no-sparse-arrays
      const available = [4];
      const expectedAction = {
        type: EVALUATE,
        choices: new Map([[4, 19]]),
      };
      expect(actions.evaluate(hand, available)).to.eql(expectedAction);
    });
  });
  describe('two-die roll', () => {
    describe('1, 3, 4, 6', () => {
      const hand = {
        1: 1,
        3: 1,
        4: 1,
        6: 1,
      };  // eslint-disable-line no-sparse-arrays
      const available = [5, 6];
      const result = actions.evaluate(hand, available).choices;
      it('should only check the best option if one choice returns a clearly higher score', () => {
        expect(result.get(6)).to.exist;
        expect(result.get(5)).to.not.exist;
      });
      it('should calculate the correct expected value', () => {
        expect(result.get(6)).to.equal(18.5);
      });
    });
    describe('1, 3, 5, 6', () => {
      const hand = {
        1: 1,
        3: 1,
        5: 1,
        6: 1,
      };  // eslint-disable-line no-sparse-arrays
      const available = [4, 6];
      const result = actions.evaluate(hand, available).choices;
      it('should only check both between higher and needed value', () => {
        expect(result.get(6)).to.exist;
        expect(result.get(4)).to.exist;
      });
      it('should calculate the correct expected value based on keeping the 4', () => {
        expect(result.get(4)).to.equal(17.5);
      });
      it('should calculate the correct expected value based on keeping the 6', () => {
        expect(result.get(6)).to.equal(20 / 6);
      });
    });
  });
  describe('three-die roll', () => {
    const hand = {
      1: 1,
      3: 1,
      6: 1,
    };
    const available = [3, 4, 6];
    const result = actions.evaluate(hand, available).choices;
    it('should calculate for the 4 and 6', () => {
      expect(result.get(6)).to.exist;
      expect(result.get(4)).to.exist;
      expect(result.get(3)).to.not.exist;
    });
    it('should calculate the correct value for 4', () => {
      expect(result.get(4)).to.equal(16 + 35 / 36);
    });
  });
});


