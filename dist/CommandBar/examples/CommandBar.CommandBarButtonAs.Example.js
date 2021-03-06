import { __assign, __rest } from "tslib";
import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { Coachmark } from 'office-ui-fabric-react/lib/Coachmark';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
/** Command bar button with a coachmark and teaching bubble */
var CoachmarkCommandBarButton = function (props) {
    var targetButton = React.useRef(null);
    var defaultRender = props.defaultRender, isCoachmarkVisible = props.isCoachmarkVisible, onDismiss = props.onDismiss, buttonProps = __rest(props, ["defaultRender", "isCoachmarkVisible", "onDismiss"]);
    var ButtonComponent = defaultRender || CommandBarButton;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { ref: targetButton },
            React.createElement(ButtonComponent, __assign({}, buttonProps))),
        isCoachmarkVisible && (React.createElement(Coachmark, { target: targetButton.current, positioningContainerProps: {
                directionalHint: DirectionalHint.bottomCenter,
            }, ariaAlertText: "A Coachmark has appeared", ariaDescribedBy: "coachmark-desc1", ariaLabelledBy: "coachmark-label1", ariaLabelledByText: "Coachmark notification" },
            React.createElement(TeachingBubbleContent, { headline: "Example Title", hasCloseButton: true, closeButtonAriaLabel: "Close", onDismiss: onDismiss, ariaDescribedBy: "example-description1", ariaLabelledBy: "example-label1" }, "Welcome to the land of Coachmarks!")))));
};
var overflowButtonProps = {
    ariaLabel: 'More commands',
};
/** Command bar which renders the Share button with a coachmark */
// tslint:disable-next-line:max-line-length
var IndividualCommandBarButtonAsExample = function (props) {
    var onDismissCoachmark = props.onDismissCoachmark, isCoachmarkVisible = props.isCoachmarkVisible;
    var items = React.useMemo(function () {
        var CoachmarkButtonWrapper = function (p) {
            return (React.createElement(CoachmarkCommandBarButton, __assign({}, p, { isCoachmarkVisible: isCoachmarkVisible, onDismiss: onDismissCoachmark })));
        };
        return [
            { key: 'newItem', text: 'New', iconProps: { iconName: 'Add' }, onClick: function () { return console.log('New'); } },
            { key: 'upload', text: 'Upload', iconProps: { iconName: 'Upload' }, onClick: function () { return console.log('Upload'); } },
            {
                key: 'share',
                text: 'Share',
                iconProps: { iconName: 'Share' },
                // The Share button will have a coachmark
                commandBarButtonAs: CoachmarkButtonWrapper,
                onClick: function () { return console.log('Share'); },
            },
            {
                key: 'download',
                text: 'Download',
                iconProps: { iconName: 'Download' },
                onClick: function () { return console.log('Download'); },
            },
        ];
    }, [props.onDismissCoachmark, props.isCoachmarkVisible]);
    return (React.createElement(CommandBar, { overflowButtonProps: overflowButtonProps, items: items, ariaLabel: "Use left and right arrow keys to navigate between commands" }));
};
export var IndividualCommandBarButtonAsExampleWrapper = function () {
    var _a = React.useState(true), isCoachmarkVisible = _a[0], setIsCoachmarkVisible = _a[1];
    var onDismissCoachmark = React.useCallback(function () { return setIsCoachmarkVisible(false); }, []);
    return (React.createElement(IndividualCommandBarButtonAsExample, { onDismissCoachmark: onDismissCoachmark, isCoachmarkVisible: isCoachmarkVisible }));
};
//# sourceMappingURL=CommandBar.CommandBarButtonAs.Example.js.map