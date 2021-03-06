import * as React from 'react';
import { IResizeGroupProps } from './ResizeGroup.types';
export interface IResizeGroupState {
    /**
     * Final data used to render proper sized component
     */
    renderedData?: any;
    /**
     * Data to render in a hidden div for measurement
     */
    dataToMeasure?: any;
    /**
     * Set to true when the content container might have new dimensions and should
     * be remeasured.
     */
    measureContainer?: boolean;
    /**
     * Are we resizing to accommodate having more or less available space?
     * The 'grow' direction is when the container may have more room than the last render,
     * such as when a window resize occurs. This means we will try to fit more content in the window.
     * The 'shrink' direction is when the contents don't fit in the container and we need
     * to find a transformation of the data that makes everything fit.
     */
    resizeDirection?: 'grow' | 'shrink';
}
/**
 * Returns a simple object is able to store measurements with a given key.
 */
export declare const getMeasurementCache: () => {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any) => number | undefined;
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number) => void;
};
/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export declare const getNextResizeGroupStateProvider: (measurementCache?: {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any) => number | undefined;
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number) => void;
}) => {
    getNextState: (props: IResizeGroupProps, currentState: IResizeGroupState, getElementToMeasureDimension: () => number, newContainerDimension?: number | undefined) => IResizeGroupState | undefined;
    shouldRenderDataForMeasurement: (dataToMeasure: any) => boolean;
    getInitialResizeGroupState: (data: any) => IResizeGroupState;
};
export declare const MeasuredContext: React.Context<{
    isMeasured: boolean;
}>;
export declare class ResizeGroupBase extends React.Component<IResizeGroupProps, IResizeGroupState> {
    private _nextResizeGroupStateProvider;
    private _root;
    private _initialHiddenDiv;
    private _updateHiddenDiv;
    private _hasRenderedContent;
    private _async;
    private _events;
    constructor(props: IResizeGroupProps);
    render(): JSX.Element;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IResizeGroupProps): void;
    componentDidUpdate(prevProps: IResizeGroupProps): void;
    componentWillUnmount(): void;
    remeasure(): void;
    private _afterComponentRendered;
    private _onResize;
}
