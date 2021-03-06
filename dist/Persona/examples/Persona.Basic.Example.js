import { __assign } from "tslib";
import * as React from 'react';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TestImages } from '@uifabric/example-data';
export var PersonaBasicExample = function () {
    var _a = React.useState(true), renderDetails = _a[0], updateRenderDetails = _a[1];
    var onChange = function (ev, checked) {
        updateRenderDetails(!!checked);
    };
    var examplePersona = {
        imageUrl: TestImages.personaFemale,
        imageInitials: 'AL',
        text: 'Annie Lindqvist',
        secondaryText: 'Software Engineer',
        tertiaryText: 'In a meeting',
        optionalText: 'Available at 4:00pm',
    };
    return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
        React.createElement(Checkbox, { label: "Include persona details", checked: renderDetails, onChange: onChange }),
        React.createElement(Label, null, "Size 8 Persona, with no presence"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size8, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, no presence detected" })),
        React.createElement(Label, null, "Size 8 Persona, with presence"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size8, presence: PersonaPresence.offline, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is offline" })),
        React.createElement(Label, null, "Size 24 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size24, presence: PersonaPresence.online, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is online" })),
        React.createElement(Label, null, "Size 32 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size32, presence: PersonaPresence.online, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is online" })),
        React.createElement(Label, null, "Size 40 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size40, presence: PersonaPresence.away, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is away" })),
        React.createElement(Label, null, "Size 48 Persona (default) "),
        React.createElement(Persona, __assign({}, examplePersona, { hidePersonaDetails: !renderDetails, presence: PersonaPresence.busy, imageAlt: "Annie Lindqvist, status is busy" })),
        React.createElement(Label, null, "Size 56 Persona (default) "),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size56, hidePersonaDetails: !renderDetails, presence: PersonaPresence.online, imageAlt: "Annie Lindqvist, status is online" })),
        React.createElement(Label, null, "Size 72 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size72, presence: PersonaPresence.dnd, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is dnd" })),
        React.createElement(Label, null, "Size 100 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size100, presence: PersonaPresence.blocked, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is blocked" })),
        React.createElement(Label, null, "Size 120 Persona"),
        React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size120, presence: PersonaPresence.away, hidePersonaDetails: !renderDetails, imageAlt: "Annie Lindqvist, status is away" }))));
};
//# sourceMappingURL=Persona.Basic.Example.js.map