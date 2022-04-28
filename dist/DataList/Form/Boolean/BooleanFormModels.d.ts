import { IColumnDl } from "../../Main/MainModel";
import { IChoiceGroupOption } from "../../../ChoiceGroup/ChoiceGroup.types";
import { IFilterQuery } from "../../Interface";
export interface IBooleanFormProps {
    rcName?: string;
    darkMode?: string;
    OnGetFilterValue?: (operator: string, val: boolean | string) => void;
    column?: IColumnDl;
    filterQuery?: IFilterQuery[];
    workingColumn?: IColumnDl | null;
}
export interface IBooleanFormStates {
    operator: string;
    options: IChoiceGroupOption[];
}
//# sourceMappingURL=BooleanFormModels.d.ts.map