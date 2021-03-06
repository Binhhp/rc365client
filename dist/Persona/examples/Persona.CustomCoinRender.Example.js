import { __assign } from "tslib";
import * as React from 'react';
import { Persona, PersonaSize, PersonaPresence, } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
var customCoinClass = mergeStyles({
    borderRadius: 20,
    display: 'block',
});
var examplePersona = {
    imageInitials: 'TR',
    text: 'Ted Randall',
    secondaryText: 'Project Manager',
    optionalText: 'Available at 4:00pm',
};
export var PersonaCustomCoinRenderExample = function () {
    return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
        React.createElement("div", null, "Custom render function in place of persona coin's image"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size72, presence: PersonaPresence.online, onRenderCoin: _onRenderCoin, imageAlt: "Ted Randall, status is available at 4 PM", imageUrl: TestImages.personaMale, coinSize: 72 }))));
};
function _onRenderCoin(props) {
    var coinSize = props.coinSize, imageAlt = props.imageAlt, imageUrl = props.imageUrl;
    return React.createElement("img", { src: imageUrl, alt: imageAlt, width: coinSize, height: coinSize, className: customCoinClass });
}
//# sourceMappingURL=Persona.CustomCoinRender.Example.js.map