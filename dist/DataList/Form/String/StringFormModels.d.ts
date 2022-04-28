import { IFilterQuery } from "../../Interface";
import { OperatorFilterStringEnums } from "../../Interface/Common";
import { IColumnDl } from "../../Main/MainModel";
export interface IStringFormProps {
    rcName?: string;
    darkMode?: string;
    OnGetFilterValue?: (operator: OperatorFilterStringEnums, value: string) => void;
    filterQuery?: IFilterQuery[];
    workingColumn?: IColumnDl | null;
}
export interface IStringFormStates {
    operator: OperatorFilterStringEnums;
    value: string;
}
//# sourceMappingURL=StringFormModels.d.ts.map