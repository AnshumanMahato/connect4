import Bot from '../Bot';
import { expect, test } from '@jest/globals';

test('returned column must be between 1 and 7', () => {
  expect(Bot.pickBestMove()).toBeGreaterThanOrEqual(1);
  expect(Bot.pickBestMove()).toBeLessThanOrEqual(7);
});
