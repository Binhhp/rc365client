import * as React from 'react';

export interface TransferLocale {
    titles: string[];
    notFoundContent?: React.ReactNode;
    searchPlaceholder: string;
    itemUnit: string;
    itemsUnit: string;
    remove: string;
    selectAll: string;
    selectCurrent: string;
    selectInvert: string;
    removeAll: string;
    removeCurrent: string;
}