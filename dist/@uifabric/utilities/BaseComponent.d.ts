import * as React from 'react';
import { Async } from './Async';
import { EventGroup } from './EventGroup';
import { IDisposable } from './IDisposable';
import { ISettingsMap } from './warn/warn';
import { IBaseProps } from './BaseComponent.types';
/**
 * BaseComponent class, which provides basic helpers for all components.
 *
 * @public
 * {@docCategory BaseComponent}
 *
 * @deprecated Do not use. We are moving away from class component.
 */
export declare class BaseComponent<TProps extends IBaseProps = {}, TState = {}> extends React.Component<TProps, TState> {
    /**
     * @deprecated Use React's error boundaries instead.
     */
    static onError: (errorMessage?: string, ex?: any) => void;
    /**
     * Controls whether the componentRef prop will be resolved by this component instance. If you are
     * implementing a passthrough (higher-order component), you would set this to false and pass through
     * the props to the inner component, allowing it to resolve the componentRef.
     */
    protected _skipComponentRefResolution: boolean;
    private __async;
    private __events;
    private __disposables;
    private __resolves;
    private __className;
    /**
     * BaseComponent constructor
     * @param props - The props for the component.
     * @param context - The context for the component.
     */
    constructor(props: TProps, context?: any);
    /**
     * When the component receives props, make sure the componentRef is updated.
     */
    componentDidUpdate(prevProps: TProps, prevState: TState): void;
    /**
     * When the component has mounted, update the componentRef.
     */
    componentDidMount(): void;
    /**
     * If we have disposables, dispose them automatically on unmount.
     */
    componentWillUnmount(): void;
    /**
     * Gets the object's class name.
     */
    readonly className: string;
    /**
     * Allows subclasses to push things to this._disposables to be auto disposed.
     */
    protected readonly _disposables: IDisposable[];
    /**
     * Gets the async instance associated with the component, created on demand. The async instance gives
     * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
     * will be cleared/ignored automatically after unmounting. The helpers within the async object also
     * preserve the this pointer so that you don't need to "bind" the callbacks.
     */
    protected readonly _async: Async;
    /**
     * Gets the event group instance assocaited with the component, created on demand. The event instance
     * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
     * will be automatically disconnected after unmounting. The helpers within the events object also
     * preserve the this reference so that you don't need to "bind" the callbacks.
     */
    protected readonly _events: EventGroup;
    /**
     * Helper to return a memoized ref resolver function.
     * @param refName - Name of the member to assign the ref to.
     * @returns A function instance keyed from the given refname.
     * @deprecated Use `createRef` from React.createRef.
     */
    protected _resolveRef(refName: string): (ref: React.ReactNode) => React.ReactNode;
    /**
     * Updates the componentRef (by calling it with "this" when necessary.)
     */
    protected _updateComponentRef(currentProps: IBaseProps, newProps?: IBaseProps): void;
    /**
     * Warns when a deprecated props are being used.
     *
     * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
     * either null or a replacement prop name.
     */
    protected _warnDeprecations(deprecationMap: ISettingsMap<TProps>): void;
    /**
     * Warns when props which are mutually exclusive with each other are both used.
     *
     * @param mutuallyExclusiveMap - The map of mutually exclusive props.
     */
    protected _warnMutuallyExclusive(mutuallyExclusiveMap: ISettingsMap<TProps>): void;
    /**
     * Warns when props are required if a condition is met.
     *
     * @param requiredProps - The name of the props that are required when the condition is met.
     * @param conditionalPropName - The name of the prop that the condition is based on.
     * @param condition - Whether the condition is met.
     */
    protected _warnConditionallyRequiredProps(requiredProps: string[], conditionalPropName: string, condition: boolean): void;
    private _setComponentRef;
}
/**
 * Simple constant function for returning null, used to render empty templates in JSX.
 *
 * @public
 */
export declare function nullRender(): JSX.Element | null;
