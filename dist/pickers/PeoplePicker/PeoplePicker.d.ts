import * as React from 'react';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { IBasePickerProps, IBasePickerSuggestionsProps, ValidationState } from '../BasePicker.types';
import { IPersonaProps } from '../../Persona';
import { IPeoplePickerItemSelectedProps } from './PeoplePickerItems/PeoplePickerItem.types';
/**
 * PeoplePicker props interface which renders Personas as items.
 * {@docCategory PeoplePicker}
 * */
export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}
/**
 * {@docCategory PeoplePicker}
 */
export declare class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}
/**
 * {@docCategory PeoplePicker}
 */
export declare class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}
/**
 * Standard People Picker.
 * {@docCategory PeoplePicker}
 */
export declare class NormalPeoplePickerBase extends BasePeoplePicker {
    /** Default props for NormalPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps<any> | undefined) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}
/**
 * Compact layout. It uses personas without secondary text when displaying search results.
 * {@docCategory PeoplePicker}
 */
export declare class CompactPeoplePickerBase extends BasePeoplePicker {
    /** Default props for CompactPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps<any> | undefined) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}
/**
 * MemberList layout. The selected people show up below the search box.
 * {@docCategory PeoplePicker}
 */
export declare class ListPeoplePickerBase extends MemberListPeoplePicker {
    /** Default props for ListPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps<any> | undefined) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}
/**
 * {@docCategory PeoplePicker}
 */
export interface IGenericItem {
    primaryText: string;
    imageInitials: string;
    ValidationState: ValidationState;
}
/**
 * {@docCategory PeoplePicker}
 */
export declare function createGenericItem(name: string, currentValidationState: ValidationState): IGenericItem & {
    key: React.Key;
};
export declare const NormalPeoplePicker: React.FunctionComponent<IPeoplePickerProps>;
export declare const CompactPeoplePicker: React.FunctionComponent<IPeoplePickerProps>;
export declare const ListPeoplePicker: React.FunctionComponent<IPeoplePickerProps>;
