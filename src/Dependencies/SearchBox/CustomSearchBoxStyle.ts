import styled from 'styled-components';
import {ISearchBoxProps} from './SearchBox.types';

export interface ICustomSearchBox extends ISearchBoxProps {
    darkMode?:string;
}

export const SearchBoxWrapper = styled.div``;
