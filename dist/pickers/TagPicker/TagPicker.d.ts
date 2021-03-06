import * as React from 'react';
import { BasePicker } from '../BasePicker';
import { ITagPickerProps, ITag, ITagItemProps } from './TagPicker.types';
/**
 * {@docCategory TagPicker}
 */
export declare class TagPickerBase extends BasePicker<ITag, ITagPickerProps> {
    static defaultProps: {
        onRenderItem: (props: ITagItemProps) => JSX.Element;
        onRenderSuggestionsItem: (props: ITag,a:any) => JSX.Element;
    };
    constructor(props: ITagPickerProps);
}
export declare const TagPicker: React.FunctionComponent<ITagPickerProps>;
