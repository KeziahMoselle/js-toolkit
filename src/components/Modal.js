import Base from '../abstracts/Base';
import transition from '../utils/css/transition';
import focusTrap from '../utils/focusTrap';

const { trap, untrap, saveActiveElement } = focusTrap();

/**
 * @typedef {import('../abstracts/Base').BaseOptions} BaseOptions
 */

/**
 * Modal class.
 * @property {BaseOptions & { move?: Boolean | String, autofocus?: String, styles?: Object }} $options
 */
export default class Modal extends Base {
  /**
   * Modal options.
   */
  static config = {
    name: 'Modal',
    refs: ['close', 'container', 'content', 'modal', 'open', 'overlay'],
    options: {
      move: String,
      autofocus: { type: String, default: '[autofocus]' },
      styles: {
        type: Object,
        default: () => ({
          modal: {
            closed: {
              opacity: 0,
              pointerEvents: 'none',
              visibility: 'hidden',
            },
          },
        }),
      },
    },
  };

  /**
   * Open the modal on click on the `open` ref.
   *
   * @return {Function} The component's `open` method.
   */
  get onOpenClick() {
    return this.open;
  }

  /**
   * Close the modal on click on the `close` ref.
   *
   * @return {Function} The component's `close` method.
   */
  get onCloseClick() {
    return this.close;
  }

  /**
   * Close the modal on click on the `overlay` ref.
   *
   * @return {Function} The component's `close` method.
   */
  get onOverlayClick() {
    return this.close;
  }

  /**
   * Initialize the component's behaviours.
   *
   * @return {Modal} The current instance.
   */
  mounted() {
    this.isOpen = false;
    this.close();

    if (this.$options.move) {
      const target =
        this.$options.move === true
          ? document.body
          : document.querySelector(this.$options.move) || document.body;
      const refsBackup = this.$refs;

      /** @type {Comment} */
      this.refModalPlaceholder = document.createComment('');
      /** @type {HTMLElement} */
      this.refModalParentBackup = this.$refs.modal.parentElement || this.$el;
      this.refModalParentBackup.insertBefore(this.refModalPlaceholder, this.$refs.modal);

      /** @type {Function} */
      this.refModalUnbindGetRefFilter = this.$on('get:refs', (refs) => {
        Object.entries(refsBackup).forEach(([key, ref]) => {
          if (!refs[key]) {
            refs[key] = ref;
          }
        });
      });
      target.appendChild(this.$refs.modal);
    }

    return this;
  }

  /**
   * Unbind all events on destroy.
   *
   * @return {Modal} The Modal instance.
   */
  destroyed() {
    this.close();

    if (this.$options.move && this.refModalParentBackup) {
      this.refModalParentBackup.insertBefore(this.$refs.modal, this.refModalPlaceholder);
      this.refModalUnbindGetRefFilter();
      this.refModalPlaceholder.remove();
      delete this.refModalPlaceholder;
      delete this.refModalParentBackup;
      delete this.refModalUnbindGetRefFilter;
    }

    return this;
  }

  /**
   * Close the modal on `ESC` and trap the tabulation.
   *
   * @param  {Object}        options
   * @param  {KeyboardEvent} options.event  The original keyboard event
   * @param  {Boolean}       options.isUp   Is it a keyup event?
   * @param  {Boolean}       options.isDown Is it a keydown event?
   * @param  {Boolean}       options.ESC    Is it the ESC key?
   * @return {void}
   */
  keyed({ event, isUp, isDown, ESC }) {
    if (!this.isOpen) {
      return;
    }

    if (isDown) {
      trap(this.$refs.modal, event);
    }

    if (ESC && isUp) {
      this.close();
    }
  }

  /**
   * Open the modal.
   *
   * @return {Promise<Modal>} The Modal instance.
   */
  async open() {
    if (this.isOpen) {
      return Promise.resolve(this);
    }

    this.$refs.modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';

    this.isOpen = true;
    this.$emit('open');

    return Promise.all(
      // @ts-ignore
      Object.entries(this.$options.styles).map(([refName, { open, active, closed } = {}]) =>
        transition(
          this.$refs[refName],
          {
            from: closed,
            active,
            to: open,
          },
          'keep'
        )
      )
    ).then(() => {
      if (this.$options.autofocus && this.$refs.modal.querySelector(this.$options.autofocus)) {
        saveActiveElement();
        this.$refs.modal.querySelector(this.$options.autofocus).focus();
      }
      return Promise.resolve(this);
    });
  }

  /**
   * Close the modal.
   *
   * @return {Promise<Modal>} The Modal instance.
   */
  async close() {
    if (!this.isOpen) {
      return Promise.resolve(this);
    }

    this.$refs.modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';

    this.isOpen = false;
    untrap();
    this.$emit('close');

    return Promise.all(
      // @ts-ignore
      Object.entries(this.$options.styles).map(([refName, { open, active, closed } = {}]) =>
        transition(
          this.$refs[refName],
          {
            from: open,
            active,
            to: closed,
          },
          'keep'
        )
      )
    ).then(() => Promise.resolve(this));
  }
}
