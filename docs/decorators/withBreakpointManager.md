---
sidebar: auto
sidebarDepth: 5
prev: /decorators/
next: /decorators/withBreakpointObserver.html
---

# withBreakpointManager

Use this decorator to create a component that will have the capacity to switch components between different breakpoints.

## Examples

### Switch between component classes

In the following example, the `MenuMobile` class will be mounted along the `Menu` class on small devices and destroyed on large devices. The `MenuDesktop` class will be mounted on large devices and destroyed on small ones.

The root element `this.$el` of each classes will be the same.

```js{6-9}
import { Base } from '@studiometa/js-toolkit/abstracts';
import { withBreakpointManager } from '@studiometa/js-toolkit/decorators';
import MenuMobile from './MenuMobile';
import MenuDesktop from './MenuDesktop';

export default class Menu extends withBreakpointManager(Base, [
  ['xxs xs s', MenuMobile],
  ['m l xl xxl', MenuDesktop],
]) {
  get config() {
    return {
      name: 'Menu',
    };
  }
}
```

:::tip
See the [`resize` service documentation on breakpoints](/services/resize.html#breakpoint) for a more comprehensive view of the potential values of the `activeBreakpoint` property.
:::