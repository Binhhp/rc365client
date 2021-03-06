import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
var searchBoxStyles = { root: { width: 200 } };
// tslint:disable:jsx-no-lambda
export var SearchBoxSmallExample = function () { return (React.createElement(SearchBox, { styles: searchBoxStyles, placeholder: "Search", onEscape: function (ev) {
        console.log('Custom onEscape Called');
    }, onClear: function (ev) {
        console.log('Custom onClear Called');
    }, onChange: function (_, newValue) { return console.log('SearchBox onChange fired: ' + newValue); }, onSearch: function (newValue) { return console.log('SearchBox onSearch fired: ' + newValue); } })); };
//# sourceMappingURL=SearchBox.Small.Example.js.map