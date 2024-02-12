import Bot from '../Bot';
import { expect, test } from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
  expect(Bot(1, 2)).toBe(3);
});
