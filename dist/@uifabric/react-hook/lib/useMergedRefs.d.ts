import { Ref } from 'react';
/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs- Refs to collectively update with one ref value.
 */
export declare function useMergedRefs<T>(...refs: Ref<T>[]): (instance: T) => void;
