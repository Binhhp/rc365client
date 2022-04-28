import { on } from "../../utilities";
import * as React from "react";
/**
 * Hook to attach an event handler on mount and handle cleanup.
 * @param element- Element (or ref to an element) to attach the event handler to
 * @param eventName- The event to attach a handler for
 * @param callback- The handler for the event
 * @param useCapture- Whether or not to attach the handler for the capture phase
 */
export function useOnEvent(element, eventName, callback, useCapture) {
  // Use a ref for the callback to prevent repeatedly attaching/unattaching callbacks that are unstable across renders
  var callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  const onHandleChange = (data) => {
    if (element && "current" in element) {
      element = element.current;
    }
    if (!element) {
      return;
    }
    var dispose = on(
      element,
      eventName,
      function (ev) {
        return callbackRef.current(ev);
      },
      useCapture
    );
    return dispose;
  };

  React.useEffect(
    function () {
      onHandleChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [element, eventName, useCapture]
  );
}
//# sourceMappingURL=useOnEvent.js.map
