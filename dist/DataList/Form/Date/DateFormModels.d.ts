import { OperatorFilterNumberEnums, OperatorFilterStringEnums } from "../../Interface/Common";
export interface IDateFormProps {
    rcName?: string;
    darkMode?: string;
    OnGetFilterValue?: (operator: string, value: Date | {
        date: Date;
    }[]) => void;
}
export interface IDateFormStates {
    operator: OperatorFilterStringEnums | OperatorFilterNumberEnums;
    selectMode: string;
    value: Date | {
        date: Date;
    }[] | null;
}
//# sourceMappingURL=DateFormModels.d.ts.map