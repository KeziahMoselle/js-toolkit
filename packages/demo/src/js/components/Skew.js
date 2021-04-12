import Base from '@studiometa/js-toolkit';
import { matrix } from '@studiometa/js-toolkit/utils/css';
import { damp } from '@studiometa/js-toolkit/utils/math';
import { withMountWhenInView } from '@studiometa/js-toolkit/decorators';

function clamp(value, min, max) {
  /* eslint-disable no-nested-ternary */
  return min < max
    ? value < min
      ? min
      : value > max
      ? max
      : value
    : value < max
    ? max
    : value > min
    ? min
    : value;
  /* eslint-enable no-nested-ternary */
}

export default class Skew extends withMountWhenInView(Base) {
  static config = {
    name: 'Skew',
  };

  skewY = 0;

  dampedSkewY = 0;

  scrolled({ delta, changed }) {
    if (changed.y && !this.$services.has('ticked')) {
      this.$services.enable('ticked');
    }

    this.skewY = clamp(delta.y * -0.005, -0.1, 0.1);
  }

  ticked() {
    this.dampedSkewY = damp(this.skewY, this.dampedSkewY, 0.1);
    this.$el.style.transform = matrix({ skewY: this.dampedSkewY });

    if (Math.abs(this.dampedSkewY - this.skewY) < 0.01) {
      this.$services.disable('ticked');
    }
  }
}