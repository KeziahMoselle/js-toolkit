import * as utils from '~/utils';

describe('~/utils exports', () => {
  it('should export all scripts', () => {
    expect(Object.keys(utils)).toEqual([
      'debounce',
      'keyCodes',
      'nextFrame',
      'throttle',
      'css',
      'math',
      'object',
      'focusTrap',
      'history',
    ]);
  });
});
