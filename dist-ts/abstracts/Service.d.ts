export interface PropsInterface {
    [key: string]: unknown;
}
export interface ServiceInterface {
    callbacks: MapInterface;
    isInit: boolean;
    readonly props: PropsInterface;
    handler?: Function | EventListener;
    init(): void;
    kill(): void;
    add(key: string, callback: Function): ServiceInterface;
    has(key: string): boolean;
    get(key: string): Function;
    remove(key: string): ServiceInterface;
    trigger(...args: unknown[]): ServiceInterface;
}
export interface PublicServiceInterface {
    add(key: string, callback: Function): ServiceInterface;
    remove(key: string): ServiceInterface;
    has(key: string): boolean;
    props(): unknown;
}
export interface ServiceConstructor {
    new (): ServiceInterface;
}
export interface MapInterface {
    readonly size: number;
    clear(): any;
    delete(key: string): any;
    get(key: string): any;
    has(key: string): boolean;
    set(key: string, value: unknown): any;
    keys(): Iterator<string>;
    values(): Iterator<unknown>;
    entries(): Iterator<[string, unknown]>;
    forEach(callback: Function): any;
}
declare const Service: ServiceConstructor;
export default Service;
