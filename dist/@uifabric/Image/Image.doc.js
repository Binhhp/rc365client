import * as React from 'react';
import { ImageCenterExample } from './examples/Image.Center.Example';
import { ImageCenterContainExample } from './examples/Image.CenterContain.Example';
import { ImageCenterCoverExample } from './examples/Image.CenterCover.Example';
import { ImageContainExample } from './examples/Image.Contain.Example';
import { ImageCoverExample } from './examples/Image.Cover.Example';
import { ImageDefaultExample } from './examples/Image.Default.Example';
import { ImageMaximizeFrameExample } from './examples/Image.MaximizeFrame.Example';
import { ImageNoneExample } from './examples/Image.None.Example';
import './ImagePage.global.scss';
var ImageDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Default.Example.tsx');
var ImageCenterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Center.Example.tsx');
var ImageContainExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Contain.Example.tsx');
var ImageCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.Cover.Example.tsx');
var ImageCenterContainExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.CenterContain.Example.tsx');
var ImageCenterCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.CenterCover.Example.tsx');
var ImageNoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.None.Example.tsx');
var ImageMaximizeFrameExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Image/examples/Image.MaximizeFrame.Example.tsx');
export var ImagePageProps = {
    title: 'Image',
    componentName: 'Image',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Image',
    examples: [
        {
            title: 'ImageFit: Not specified',
            code: ImageDefaultExampleCode,
            view: React.createElement(ImageDefaultExample, null),
        },
        {
            title: 'ImageFit: None',
            code: ImageNoneExampleCode,
            view: React.createElement(ImageNoneExample, null),
        },
        {
            title: 'ImageFit: Center',
            code: ImageCenterExampleCode,
            view: React.createElement(ImageCenterExample, null),
        },
        {
            title: 'ImageFit: Contain',
            code: ImageContainExampleCode,
            view: React.createElement(ImageContainExample, null),
        },
        {
            title: 'ImageFit: Cover',
            code: ImageCoverExampleCode,
            view: React.createElement(ImageCoverExample, null),
        },
        {
            title: 'ImageFit: CenterContain',
            code: ImageCenterContainExampleCode,
            view: React.createElement(ImageCenterContainExample, null),
        },
        {
            title: 'ImageFit: CenterCover',
            code: ImageCenterCoverExampleCode,
            view: React.createElement(ImageCenterCoverExample, null),
        },
        {
            title: 'Maximizing the image frame',
            code: ImageMaximizeFrameExampleCode,
            view: React.createElement(ImageMaximizeFrameExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Image/docs/ImageDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
    nativePropsElement: 'img',
};
//# sourceMappingURL=Image.doc.js.map