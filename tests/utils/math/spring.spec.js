import spring from '~/utils/math/spring';

describe('The spring function', () => {
  let current = 0;
  const step = 10; // produces shortest animation for test parameters
  jest.spyOn(performance, 'now').mockImplementation(() => current);
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((f) => {
    current += step;
    f(performance.now());
    return 0;
  });
  jest.spyOn(window, 'cancelAnimationFrame');

  it('should trigger the step and done callbacks', () => {
    const fn = jest.fn();
    return new Promise((resolve) => {
      spring(
        {
          step: (value) => fn(value),
          done: () => {
            expect(fn).toHaveBeenLastCalledWith(1);
            resolve(true);
          },
        },
        { precision: 0.1 }
      );
    });
  });

  it('should be able to cancel the animation', () => {
    const fn = jest.fn();
    const cancel = spring(
      {
        step: () => {},
        cancel: (value) => fn(value),
      },
      { precision: 0.1 }
    );
    cancel();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
