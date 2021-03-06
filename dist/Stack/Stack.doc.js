import * as React from 'react';
// Vertical Stack Examples
import { VerticalStackBasicExample } from './examples/Stack.Vertical.Basic.Example';
var VerticalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Basic.Example.tsx');
import { VerticalStackReversedExample } from './examples/Stack.Vertical.Reversed.Example';
var VerticalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Reversed.Example.tsx');
import { VerticalStackSpacingExample } from './examples/Stack.Vertical.Spacing.Example';
var VerticalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Spacing.Example.tsx');
import { VerticalStackGrowExample } from './examples/Stack.Vertical.Grow.Example';
var VerticalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Grow.Example.tsx');
import { VerticalStackShrinkExample } from './examples/Stack.Vertical.Shrink.Example';
var VerticalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Shrink.Example.tsx');
import { VerticalStackWrapExample } from './examples/Stack.Vertical.Wrap.Example';
var VerticalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Wrap.Example.tsx');
import { VerticalStackWrapAdvancedExample } from './examples/Stack.Vertical.WrapAdvanced.Example';
var VerticalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapAdvanced.Example.tsx');
import { VerticalStackWrapNestedExample } from './examples/Stack.Vertical.WrapNested.Example';
var VerticalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapNested.Example.tsx');
import { VerticalStackVerticalAlignExample } from './examples/Stack.Vertical.VerticalAlign.Example';
var VerticalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.VerticalAlign.Example.tsx');
import { VerticalStackHorizontalAlignExample } from './examples/Stack.Vertical.HorizontalAlign.Example';
var VerticalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.HorizontalAlign.Example.tsx');
import { VerticalStackConfigureExample } from './examples/Stack.Vertical.Configure.Example';
var VerticalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Configure.Example.tsx');
// Horizontal Stack Examples
import { HorizontalStackBasicExample } from './examples/Stack.Horizontal.Basic.Example';
var HorizontalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Basic.Example.tsx');
import { HorizontalStackReversedExample } from './examples/Stack.Horizontal.Reversed.Example';
var HorizontalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Reversed.Example.tsx');
import { HorizontalStackSpacingExample } from './examples/Stack.Horizontal.Spacing.Example';
var HorizontalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Spacing.Example.tsx');
import { HorizontalStackGrowExample } from './examples/Stack.Horizontal.Grow.Example';
var HorizontalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Grow.Example.tsx');
import { HorizontalStackShrinkExample } from './examples/Stack.Horizontal.Shrink.Example';
var HorizontalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Shrink.Example.tsx');
import { HorizontalStackWrapExample } from './examples/Stack.Horizontal.Wrap.Example';
var HorizontalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Wrap.Example.tsx');
import { HorizontalStackWrapAdvancedExample } from './examples/Stack.Horizontal.WrapAdvanced.Example';
var HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapAdvanced.Example.tsx');
import { HorizontalStackWrapNestedExample } from './examples/Stack.Horizontal.WrapNested.Example';
var HorizontalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapNested.Example.tsx');
import { HorizontalStackHorizontalAlignExample } from './examples/Stack.Horizontal.HorizontalAlign.Example';
var HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.HorizontalAlign.Example.tsx');
import { HorizontalStackVerticalAlignExample } from './examples/Stack.Horizontal.VerticalAlign.Example';
var HorizontalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.VerticalAlign.Example.tsx');
import { HorizontalStackConfigureExample } from './examples/Stack.Horizontal.Configure.Example';
var HorizontalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Configure.Example.tsx');
export var StackPageProps = {
    title: 'Stack',
    componentName: 'Stack',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Stack',
    examples: [
        {
            title: 'Basic Vertical Stack',
            code: VerticalStackBasicExampleCode,
            view: React.createElement(VerticalStackBasicExample, null),
        },
        {
            title: 'Reversed Basic Vertical Stack',
            code: VerticalStackReversedExampleCode,
            view: React.createElement(VerticalStackReversedExample, null),
        },
        {
            title: 'Vertical Stack - Gap and Padding Sizes',
            code: VerticalStackSpacingExampleCode,
            view: React.createElement(VerticalStackSpacingExample, null),
        },
        {
            title: 'Vertical Stack - Growing Items',
            code: VerticalStackGrowExampleCode,
            view: React.createElement(VerticalStackGrowExample, null),
        },
        {
            title: 'Vertical Stack - Shrinking Items',
            code: VerticalStackShrinkExampleCode,
            view: React.createElement(VerticalStackShrinkExample, null),
        },
        {
            title: 'Vertical Stack - Wrapping - Basic',
            code: VerticalStackWrapExampleCode,
            view: React.createElement(VerticalStackWrapExample, null),
        },
        {
            title: 'Vertical Stack - Wrapping - Advanced',
            code: VerticalStackWrapAdvancedExampleCode,
            view: React.createElement(VerticalStackWrapAdvancedExample, null),
        },
        {
            title: 'Vertical Stack - Wrapping - Nested',
            code: VerticalStackWrapNestedExampleCode,
            view: React.createElement(VerticalStackWrapNestedExample, null),
        },
        {
            title: 'Vertical Stack - Vertical Alignments',
            code: VerticalStackVerticalAlignExampleCode,
            view: React.createElement(VerticalStackVerticalAlignExample, null),
        },
        {
            title: 'Vertical Stack - Horizontal Alignments',
            code: VerticalStackHorizontalAlignExampleCode,
            view: React.createElement(VerticalStackHorizontalAlignExample, null),
        },
        {
            title: 'Vertical Stack - Configure Properties',
            code: VerticalStackConfigureExampleCode,
            view: React.createElement(VerticalStackConfigureExample, null),
        },
        {
            title: 'Basic Horizontal Stack',
            code: HorizontalStackBasicExampleCode,
            view: React.createElement(HorizontalStackBasicExample, null),
        },
        {
            title: 'Reversed Basic Horizontal Stack',
            code: HorizontalStackReversedExampleCode,
            view: React.createElement(HorizontalStackReversedExample, null),
        },
        {
            title: 'Horizontal Stack - Gap and Padding Sizes',
            code: HorizontalStackSpacingExampleCode,
            view: React.createElement(HorizontalStackSpacingExample, null),
        },
        {
            title: 'Horizontal Stack - Growing Items',
            code: HorizontalStackGrowExampleCode,
            view: React.createElement(HorizontalStackGrowExample, null),
        },
        {
            title: 'Horizontal Stack - Shrinking Items',
            code: HorizontalStackShrinkExampleCode,
            view: React.createElement(HorizontalStackShrinkExample, null),
        },
        {
            title: 'Horizontal Stack - Wrapping - Basic',
            code: HorizontalStackWrapExampleCode,
            view: React.createElement(HorizontalStackWrapExample, null),
        },
        {
            title: 'Horizontal Stack - Wrapping - Advanced',
            code: HorizontalStackWrapAdvancedExampleCode,
            view: React.createElement(HorizontalStackWrapAdvancedExample, null),
        },
        {
            title: 'Horizontal Stack - Wrapping - Nested',
            code: HorizontalStackWrapNestedExampleCode,
            view: React.createElement(HorizontalStackWrapNestedExample, null),
        },
        {
            title: 'Horizontal Stack - Horizontal Alignments',
            code: HorizontalStackHorizontalAlignExampleCode,
            view: React.createElement(HorizontalStackHorizontalAlignExample, null),
        },
        {
            title: 'Horizontal Stack - Vertical Alignments',
            code: HorizontalStackVerticalAlignExampleCode,
            view: React.createElement(HorizontalStackVerticalAlignExample, null),
        },
        {
            title: 'Horizontal Stack - Configure Properties',
            code: HorizontalStackConfigureExampleCode,
            view: React.createElement(HorizontalStackConfigureExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Stack.doc.js.map