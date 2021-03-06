import { __assign } from "tslib";
import * as React from 'react';
import { Persona, PersonaSize, PersonaPresence, } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';
var personaStyles = { root: { margin: '0 0 10px 0' } };
var iconStyles = { root: { marginRight: 5 } };
export var PersonaCustomRenderExample = function () {
    var examplePersona = {
        imageUrl: TestImages.personaFemale,
        imageInitials: 'AL',
        text: 'Annie Lindqvist',
        secondaryText: 'Software Engineer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm',
    };
    return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
        React.createElement("div", null, "Custom icon in secondary text"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size72, presence: PersonaPresence.offline, onRenderSecondaryText: _onRenderSecondaryText, styles: personaStyles, imageAlt: "Annie Lindqvist, status is offline." }))));
};
function _onRenderSecondaryText(props) {
    return (React.createElement("div", null,
        React.createElement(Icon, { iconName: "Suitcase", styles: iconStyles }),
        props.secondaryText));
}
//# sourceMappingURL=Persona.CustomRender.Example.js.map