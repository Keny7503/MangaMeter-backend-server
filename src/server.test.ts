// src/server.test.ts
import testfn from './server';

describe('getMessage()', () => {
  it('should return the correct message when called', () => {
    expect(testfn).toBe('123');
  });

  it('should be super smart', () => {
    expect(true).toBe(true);
  });
});
