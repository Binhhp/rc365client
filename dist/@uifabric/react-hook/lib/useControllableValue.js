import * as React from "react";
import { useConst } from "./useConst";
export function useControllableValue(
  controlledValue,
  defaultUncontrolledValue,
  onChange
) {
  var _a = React.useState(defaultUncontrolledValue),
    value = _a[0],
    setValue = _a[1];
  var isControlled = useConst(controlledValue !== undefined);
  var setValueOrCallOnChange = React.useCallback(
    function (newValue, ev) {
      if (onChange) {
        onChange(ev, newValue);
      }
      if (!isControlled) {
        setValue(newValue);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange]
  );
  return [isControlled ? controlledValue : value, setValueOrCallOnChange];
}
//# sourceMappingURL=useControllableValue.js.map
