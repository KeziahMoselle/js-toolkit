import { EventManagerInterface } from '../EventManager';

/* eslint-disable no-use-before-define */
export interface BaseElement extends HTMLElement {
  __base__?: Base;
}

export interface Options {
  [name: string]: unknown;
}

export interface Config {
  name: string;
  components?: { [name: string]: Base };
  debug?: boolean;
  log?: boolean;
  [key: string]: unknown;
}

export interface Refs {
  [name: string]: HTMLElement | HTMLElement[] | BaseElement | BaseElement[] | Base | Base[];
}

export interface Children {
  [name: string]: Base[];
}

export interface BaseStatic {
  __isBase__: boolean;
  $factory(nameOrSelector:string):Base[];
}

export interface Base extends EventManagerInterface {
  __isChild__: boolean;
  readonly _excludeFromAutoBind?: string[];
  readonly $refs: Refs;
  readonly $children: Children;
  readonly $parent: Base | null;
  readonly config: Config;
  readonly $el: BaseElement;
  readonly $id: string;
  $options: Options;
  $isMounted: boolean;

  // new(element:BaseElement):Base;
  $mount(): Base;
  $destroy(): Base;
  $terminate(): void;
}
