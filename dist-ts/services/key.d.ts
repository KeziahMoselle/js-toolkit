import { PropsInterface, ServiceInterface, ServiceConstructor, PublicServiceInterface } from '../abstracts/Service';
declare enum KeyServiceDirection {
    Up = "up",
    Down = "down",
    None = "none"
}
export interface KeyPropsInterface extends PropsInterface {
    event: KeyboardEvent | null;
    triggered: number;
    direction: KeyServiceDirection;
    isUp: boolean;
    isDown: boolean;
    [name: string]: unknown;
}
export interface KeyServiceInterface extends ServiceInterface {
    event: KeyboardEvent | null;
    previousEvent: KeyboardEvent | null;
    triggered: number;
    readonly props: KeyPropsInterface;
}
export interface PublicKeyServiceInterface extends PublicServiceInterface {
    props(): KeyPropsInterface;
}
export interface KeyServiceConstructor extends ServiceConstructor {
    new (): KeyServiceInterface;
}
declare const _default: () => PublicKeyServiceInterface;
export default _default;
