import Bot from '../components/BotPlayer/Bot';
import { expect, test } from '@jest/globals';

const bot = new Bot(1, 1, 2);

test('Choose center column in first move', () => {
  const grid = [
    [0, 6, 6, 6, 6, 6, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const move = bot.play(grid, null);
  expect(move).toEqual([6, 4]);
});

test('Bot must return a valid move even if no best case available', () => {
  const grid = [
    [0, 6, 6, 5, 3, 5, 6, 6],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0],
  ];
  const move = bot.play(grid, [5, 4]);
  expect(move).toBeInstanceOf(Array);
});
