import { Curtain } from './curtain';

test('should create new instance', () => {
  const curtain = new Curtain(new HTMLElement());
  expect(curtain).toBeTruthy();
});
