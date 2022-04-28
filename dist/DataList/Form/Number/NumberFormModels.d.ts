import { OperatorFilterNumberEnums } from "../../Interface/Common";
import { IFilterQuery } from "../../Interface";
import { IColumnDl } from "../../Main/MainModel";
export interface INumberFormProps {
    rcName?: string;
    darkMode?: string;
    OnGetFilterValue?: (operator: OperatorFilterNumberEnums, value: number) => void;
    min?: number;
    filterQuery?: IFilterQuery[];
    workingColumn?: IColumnDl | null;
}
export interface INumberFormStates {
    operator: OperatorFilterNumberEnums;
    value: number;
}
//# sourceMappingURL=NumberFormModels.d.ts.map