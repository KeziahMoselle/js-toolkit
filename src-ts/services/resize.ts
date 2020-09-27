import Service, {
  PropsInterface,
  ServiceInterface,
  ServiceConstructor,
  PublicServiceInterface,
} from '../abstracts/Service';
import debounce from '../utils/debounce';

enum ResizeOrientation {
  Square = 'square',
  Portrait = 'portrait',
  Landscape = 'landscape',
}

export interface ResizePropsInterface extends PropsInterface {
  readonly width: number;
  readonly height: number;
  readonly ratio: number;
  orientation: ResizeOrientation;
  breakpoint?: string;
  breakpoints?: string[];
}

interface ResizeObserverInterface {
  [key:string]: any;
}

export interface ResizeServiceInterface extends ServiceInterface {
  resizeObserver: ResizeObserverInterface;
  readonly breakpoint: string;
  readonly breakpoints: string[];

  readonly props: ResizePropsInterface;
}

export interface PublicResizeServiceInterface extends PublicServiceInterface {
  props(): ResizePropsInterface;
}

export interface ResizeServiceConstructor extends ServiceConstructor {
  new(): ResizeServiceInterface;
}

/**
 * Resize service
 *
 * ```
 * import { useResize } from '@studiometa/js/services';
 * const { add, remove, props } = useResize();
 * add(key, (props) => {});
 * remove(key);
 * props();
 * ```
 */
class Resize extends Service implements ResizeServiceInterface {
  resizeObserver: ResizeObserverInterface;

  /**
   * Bind the handler to the resize event.
   *
   * @return {void}
   */
  init() {
    this.handler = debounce(() => {
      this.trigger(this.props);
    }).bind(this);

    if (this.canUseResizeObserver) {
      // @ts-ignore
      this.resizeObserver = new ResizeObserver(this.handler);
      this.resizeObserver.observe(document.documentElement);
    } else {
      window.addEventListener('resize', this.handler as EventListener);
    }
  }

  /**
   * Unbind the handler from the resize event.
   *
   * @return {void}
   */
  kill() {
    if (this.canUseResizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.handler as EventListener);
    }
    delete this.resizeObserver;
  }

  /**
   * Get resize props.
   *
   * @type {Object}
   */
  get props() {
    const props:ResizePropsInterface = {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight,
      orientation: ResizeOrientation.Square,
    };

    if (props.ratio > 1) {
      props.orientation = ResizeOrientation.Landscape;
    }

    if (props.ratio < 1) {
      props.orientation = ResizeOrientation.Portrait;
    }

    if (this.breakpointElement) {
      props.breakpoint = this.breakpoint;
      props.breakpoints = this.breakpoints;
    }

    return props;
  }

  /**
   * The element holding the breakpoints data.
   * @return {HTMLElement}
   */
  get breakpointElement() {
    return document.querySelector('[data-breakpoint]') || null;
  }

  /**
   * Get the current breakpoint.
   * @return {String}
   */
  get breakpoint() {
    return window
      .getComputedStyle(this.breakpointElement, '::before')
      .getPropertyValue('content')
      .replace(/"/g, '');
  }

  /**
   * Get all breakpoints.
   * @return {Array}
   */
  get breakpoints() {
    const breakpoints = window
      .getComputedStyle(this.breakpointElement, '::after')
      .getPropertyValue('content')
      .replace(/"/g, '');

    return breakpoints.split(',');
  }

  /**
   * Test if we can use the `ResizeObserver` API.
   * @return {Boolean}
   */
  get canUseResizeObserver() {
    // @ts-ignore
    return typeof window.ResizeObserver !== 'undefined';
  }
}

let resize = null;

export default () => {
  if (!resize) {
    resize = new Resize();
  }

  const add = resize.add.bind(resize);
  const remove = resize.remove.bind(resize);
  const has = resize.has.bind(resize);
  const props = () => resize.props;

  return {
    add,
    remove,
    has,
    props,
  };
};
