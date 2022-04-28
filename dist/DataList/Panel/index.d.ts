import * as React from "react";
import { IPanelProps, IPanelStates } from "./PanelModels";
import { OperatorFilterNumberEnums, OperatorFilterStringEnums } from "../Interface/Common";
export default class PanelContent extends React.Component<IPanelProps, IPanelStates> {
    private _onHandleSendFilterObj;
    private onConvertBetweenDateAndTicks;
    OnGetFilterValueNumber: (operator: OperatorFilterNumberEnums, value: number) => void;
    OnGetFilterValueString: (operator: OperatorFilterStringEnums, value: string) => void;
    OnGetFilterValueBoolean: (operator: string, value: boolean | string) => void;
    OnGetFilterValueDate: (operator: string, value: Date | {
        date: Date;
    }[]) => void;
    RenderFormByType: () => JSX.Element | undefined;
    render(): JSX.Element;
}
//# sourceMappingURL=index.d.ts.map