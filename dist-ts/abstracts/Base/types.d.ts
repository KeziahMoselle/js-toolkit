import { EventManagerInterface } from '../EventManager';
export interface BaseElement extends HTMLElement {
    __base__?: Base;
}
export interface Options {
    [name: string]: any;
}
export interface Config {
    name: string;
    components?: {
        [name: string]: Base;
    };
    debug?: boolean;
    log?: boolean;
    [key: string]: any;
}
export interface Refs {
    [name: string]: HTMLElement | HTMLElement[] | BaseElement | BaseElement[] | Base | Base[];
}
export interface Children {
    [name: string]: Base[];
}
export interface BaseConstructor<B extends Base = Base> {
    __isBase__: boolean;
    $factory(nameOrSelector: string): Base[];
    new (element: BaseElement): this;
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
    $mount(): Base;
    $destroy(): Base;
    $terminate(): void;
}
