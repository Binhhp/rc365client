import { __assign } from "tslib";
import * as React from 'react';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ResizeGroup } from 'office-ui-fabric-react/lib/ResizeGroup';
var leftRightBoxClassName = mergeStyles({
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
});
var getNumberedBoxClassName = memoizeFunction(function (backgroundColor) {
    return mergeStyles({
        display: 'inline-block',
        textAlign: 'center',
        fontSize: '20px',
        lineHeight: '50px',
        height: '50px',
        width: '50px',
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor: backgroundColor,
    });
});
var BoxWithLabel = function (props) { return (React.createElement("div", { className: getNumberedBoxClassName(props.backgroundColor) }, props.label)); };
function renderBoxWithLabels(count, backgroundColor) {
    var result = [];
    for (var i = 1; i <= count; i += 1) {
        result.push(React.createElement(BoxWithLabel, { label: "" + i, backgroundColor: backgroundColor, key: backgroundColor + "-" + i }));
    }
    return result;
}
var LeftRightBoxSet = function (props) { return (React.createElement("div", { className: leftRightBoxClassName },
    React.createElement("div", null, renderBoxWithLabels(props.leftCount, 'orange')),
    React.createElement("div", null, renderBoxWithLabels(props.rightCount, 'green')))); };
function onReduceData(props) {
    if (props.leftCount === 0 && props.rightCount === 0) {
        return undefined;
    }
    var result;
    if (props.leftCount > props.rightCount) {
        result = __assign(__assign({}, props), { leftCount: props.leftCount - 1 });
    }
    else {
        result = __assign(__assign({}, props), { rightCount: props.rightCount - 1 });
    }
    // Update the cache key
    return __assign(__assign({}, result), { cacheKey: "" + (result.leftCount + result.rightCount) });
}
export var FlexBoxResizeGroupExample = function () {
    var data = { leftCount: 5, rightCount: 5, cacheKey: '10' };
    return (React.createElement(ResizeGroup, { data: data, 
        // tslint:disable-next-line:jsx-no-lambda
        onRenderData: function (scaledData) { return React.createElement(LeftRightBoxSet, __assign({}, scaledData)); }, onReduceData: onReduceData }));
};
//# sourceMappingURL=ResizeGroup.FlexBox.Example.js.map