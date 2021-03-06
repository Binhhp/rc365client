import { __assign } from "tslib";
import * as React from 'react';
import { Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
var examplePersona = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
};
var personaWithInitials = __assign(__assign({}, examplePersona), { text: 'Maor Sharett', imageInitials: 'MS' });
export var PersonaInitialsExample = function () {
    return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
        React.createElement(Persona, __assign({}, examplePersona, { text: "Kat Larrson", size: PersonaSize.size24 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "Annie", size: PersonaSize.size24 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "Annie Lind", size: PersonaSize.size32 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "Annie Boyl Lind", size: PersonaSize.size32 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "Annie Boyl Carrie Lindqvist", size: PersonaSize.size40 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "+1 (111) 123-4567 X4567", size: PersonaSize.size40 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "+1 (555) 123-4567 X4567", size: PersonaSize.size48, allowPhoneInitials: true })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "\u5B8B\u667A\u6D0B", size: PersonaSize.size48 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "\uB0A8\uAD81 \uC131\uC885", size: PersonaSize.size56 })),
        React.createElement(Persona, __assign({}, examplePersona, { text: "\u062E\u0633\u0631\u0648 \u0631\u062D\u06CC\u0645\u06CC", size: PersonaSize.size56 })),
        React.createElement(Persona, __assign({}, personaWithInitials, { initialsColor: PersonaInitialsColor.lightBlue, size: PersonaSize.size72 })),
        React.createElement(Persona, __assign({}, personaWithInitials, { initialsColor: PersonaInitialsColor.magenta, size: PersonaSize.size100 })),
        React.createElement(Persona, __assign({}, personaWithInitials, { initialsColor: PersonaInitialsColor.teal, coinSize: 150 }))));
};
//# sourceMappingURL=Persona.Initials.Example.js.map