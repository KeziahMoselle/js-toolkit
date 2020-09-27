import { ServiceInterface, PublicServiceInterface } from '../abstracts/Service';
export interface ScrollPropsInterface {
    readonly x: number;
    readonly y: number;
    readonly changed: {
        x: boolean;
        y: boolean;
    };
    readonly last: {
        x: number;
        y: number;
    };
    readonly delta: {
        x: number;
        y: number;
    };
    readonly progress: {
        x: number;
        y: number;
    };
    readonly max: {
        x: number;
        y: number;
    };
}
export interface ScrollServiceInterface extends ServiceInterface {
    y: number;
    yLast: number;
    x: number;
    xLast: number;
}
export interface ScrollPublicServiceInterface extends PublicServiceInterface {
    props(): ScrollPropsInterface;
}
declare const _default: () => {
    add: any;
    remove: any;
    has: any;
    props: () => any;
};
export default _default;
