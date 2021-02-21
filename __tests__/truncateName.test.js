import { truncateMissionName } from '../src/script/utils/truncateName';

test('Truncate mission name to fit cleanly', () => {
  expect(truncateMissionName("Apollo Mission 11 Moon Landing")).toMatch('Apollo 12');
});