import * as React from 'react';
import { PersonaInitialsExample } from './examples/Persona.Initials.Example';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { PersonaAlternateExample } from './examples/Persona.Alternate.Example';
import { PersonaColorsExample } from './examples/Persona.Colors.Example';
import { PersonaCustomRenderExample } from './examples/Persona.CustomRender.Example';
import { PersonaCustomCoinRenderExample } from './examples/Persona.CustomCoinRender.Example';
import { UnknownPersonaExample } from './examples/Persona.UnknownPersona.Example';
import { PersonaPresenceExample } from './examples/Persona.Presence.Example';
var PersonaInitialsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx');
var PersonaBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx');
var PersonaAlternateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx');
var PersonaColorsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Colors.Example.tsx');
var PersonaCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx');
var PersonaCustomCoinRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomCoinRender.Example.tsx');
var UnknownPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.UnknownPersona.Example.tsx');
var PersonaPresenceExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Presence.Example.tsx');
export var PersonaPageProps = {
    title: 'Persona',
    componentName: 'Persona',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Persona',
    examples: [
        {
            title: 'Persona in various sizes',
            code: PersonaBasicExampleCode,
            view: React.createElement(PersonaBasicExample, null),
        },
        {
            title: 'Alternative small personas',
            code: PersonaAlternateExampleCode,
            view: React.createElement(PersonaAlternateExample, null),
        },
        {
            title: 'Persona with initials',
            code: PersonaInitialsExampleCode,
            view: React.createElement(PersonaInitialsExample, null),
        },
        {
            title: 'PersonaCoin colors',
            code: PersonaColorsExampleCode,
            view: React.createElement(PersonaColorsExample, null),
        },
        {
            title: 'Rendering custom persona text',
            code: PersonaCustomRenderExampleCode,
            view: React.createElement(PersonaCustomRenderExample, null),
        },
        {
            title: 'Rendering custom coin',
            code: PersonaCustomCoinRenderExampleCode,
            view: React.createElement(PersonaCustomCoinRenderExample, null),
        },
        {
            title: 'Rendering unknown persona coin',
            code: UnknownPersonaExampleCode,
            view: React.createElement(UnknownPersonaExample, null),
        },
        {
            title: 'Persona Presence',
            code: PersonaPresenceExampleCode,
            view: React.createElement(PersonaPresenceExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Persona.doc.js.map