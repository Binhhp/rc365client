import { IFilterQuery } from "../Interface";
import { IColumnDl } from "../Main/MainModel";
export interface IPanelProps {
    rcName?: string;
    darkMode?: string;
    targetColumn?: any;
    onGetFilterObj?: (operator: string, colKey: string, value?: any) => void;
    filterWithTicks?: boolean;
    filterQuery?: IFilterQuery[];
    workingColumn?: IColumnDl | null;
}
export interface IPanelStates {
}
//# sourceMappingURL=PanelModels.d.ts.map