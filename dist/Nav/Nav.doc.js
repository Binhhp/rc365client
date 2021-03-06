import * as React from 'react';
import { NavBasicExample } from './examples/Nav.Basic.Example';
import { NavFabricDemoAppExample } from './examples/Nav.FabricDemoApp.Example';
import { NavNestedExample } from './examples/Nav.Nested.Example';
import { NavCustomGroupHeadersExample } from './examples/Nav.CustomGroupHeaders.Example';
var NavBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx');
var NavFabricDemoAppExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.FabricDemoApp.Example.tsx');
var NavNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Nested.Example.tsx');
var NavCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.CustomGroupHeaders.Example.tsx');
export var NavPageProps = {
    title: 'Nav',
    componentName: 'Nav',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Nav',
    examples: [
        {
            title: 'Basic nav with sample links',
            code: NavBasicExampleCode,
            view: React.createElement(NavBasicExample, null),
        },
        {
            title: 'Nav similar to the one in this demo app',
            code: NavFabricDemoAppExampleCode,
            view: React.createElement(NavFabricDemoAppExample, null),
        },
        {
            title: 'Nav with nested links',
            code: NavNestedExampleCode,
            view: React.createElement(NavNestedExample, null),
        },
        {
            title: 'Nav with custom group header',
            code: NavCustomGroupHeadersExampleCode,
            view: React.createElement(NavCustomGroupHeadersExample, null),
        },
    ],
    propertiesTablesSources: [require('!raw-loader!office-ui-fabric-react/src/components/Nav/Nav.types.ts')],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Nav.doc.js.map