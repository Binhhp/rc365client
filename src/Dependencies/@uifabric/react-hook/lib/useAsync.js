import { Async } from "../../utilities";
import * as React from "react";
import { useConst } from "./useConst";
/**
 * Hook to provide an Async instance that is automatically cleaned up on dismount.
 */
export function useAsync() {
  var asyncRef = useConst(function () {
    return new Async();
  });
  // Function that returns a function in order to dispose the async instance on unmount
  React.useEffect(
    function () {
      return function () {
        return asyncRef.dispose();
      };
    },
    [asyncRef] // fix in here
  );
  return asyncRef;
}
//# sourceMappingURL=useAsync.js.map
