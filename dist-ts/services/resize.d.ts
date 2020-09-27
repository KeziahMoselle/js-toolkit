import { PropsInterface, ServiceInterface, ServiceConstructor, PublicServiceInterface } from '../abstracts/Service';
declare enum ResizeOrientation {
    Square = "square",
    Portrait = "portrait",
    Landscape = "landscape"
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
    [key: string]: any;
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
    new (): ResizeServiceInterface;
}
declare const _default: () => {
    add: any;
    remove: any;
    has: any;
    props: () => any;
};
export default _default;
