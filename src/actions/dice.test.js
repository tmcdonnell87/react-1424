/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { ROLL } from '../constants';
import * as actions from './dice';

describe('dice actions', () => {
  describe('roll', () => {
    const roll = actions.roll(5);
    it('should have a type of roll', () => {
      expect(roll.type).to.equal(ROLL);
    });
    it('should have 5 dice', () => {
      expect(roll.payload.dice).to.have.length(5);
    });
  });
});
