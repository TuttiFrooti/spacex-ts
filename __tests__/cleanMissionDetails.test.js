import { cleanMissionDetails } from '../src/script/utils/cleanMissionDetails';

test('Truncate mission name to fit cleanly', () => {
  expect(cleanMissionDetails("They're using our own satellites against us. And the clock is ticking. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? You know what? It is beets. I've crashed into a beet truck. Forget the fat lady! You're obsessed with the fat lady! Drive us out of here!")).toMatch("They're using our own satellites against us. And the clock i...");
});