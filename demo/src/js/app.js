/* eslint-disable max-classes-per-file */
import Base from '../../../src';
import { Modal, Tabs, Accordion, Cursor } from '../../../src/components';
import { matrix } from '../../../src/utils/css';
import withBreakpointObserver from '../../../src/decorators/withBreakpointObserver';
import BreakpointManagerDemo from './components/BreakPointManagerDemo';
import BreakpointObserverDemo from './components/BreakpointObserverDemo';

/**
 * @typedef {import(../../../src/abstracts/Base/index).BaseConfig} BaseConfig
 */
class App extends Base {
  /** @type {Baseconfig} */
  static config = {
    name: 'App',
    refs: ['modal'],
    log: true,
    components: {
      Accordion,
      BreakpointManagerDemo,
      BreakpointObserverDemo,
      Cursor: class extends Cursor {
        static config = {
          ...Cursor.config,
          refs: ['inner'],
        };

        render({ x, y, scale }) {
          this.$el.style.transform = `translateZ(0) ${matrix({ translateX: x, translateY: y })}`;
          this.$refs.inner.style.transform = `translateZ(0) ${matrix({
            scaleX: scale,
            scaleY: scale,
          })}`;
        }
      },
      Skew: () => import(/* webpackChunkName: "Skew" */ './components/Skew'),
      '[data-src]': () => import(/* webpackChunkName: "Lazyload" */ './components/Lazyload'),
      Modal: withBreakpointObserver(Modal),
      Tabs,
    },
  };

  /**
   * @inheritdoc
   */
  mounted() {
    this.$log('Mounted 🎉');
  }

  onModalOpen(...args) {
    this.$log('onModalOpen', ...args);
  }

  loaded() {
    this.$log('Loaded');
  }

  resized(props) {
    this.$log('resized', props);
  }

  scrolled(props) {
    this.$log('scrolled', props, 'foo');
  }
}

const app = App.$factory('html');
window.APP = app;
