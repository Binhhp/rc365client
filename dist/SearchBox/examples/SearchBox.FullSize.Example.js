import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
var stackTokens = { childrenGap: 20 };
// tslint:disable:jsx-no-lambda
export var SearchBoxFullSizeExample = function () {
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement(SearchBox, { placeholder: "Search", onSearch: function (newValue) { return console.log('value is ' + newValue); } }),
        React.createElement(SearchBox, { placeholder: "Search with no animation", onSearch: function (newValue) { return console.log('value is ' + newValue); }, disableAnimation: true })));
};
//# sourceMappingURL=SearchBox.FullSize.Example.js.map