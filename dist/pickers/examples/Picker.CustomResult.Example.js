import { __assign, __extends } from "tslib";
import * as React from 'react';
import { DocumentCard, DocumentCardActions, DocumentCardActivity, DocumentCardLocation, DocumentCardPreview, DocumentCardTitle, } from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { BasePickerListBelow, } from 'office-ui-fabric-react/lib/Pickers';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
var rootClass = mergeStyles({
    maxWidth: 500,
});
var baseProductionCdnUrl = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/';
var TestImages = {
    documentPreview: baseProductionCdnUrl + 'document-preview.png',
    documentPreviewTwo: baseProductionCdnUrl + 'document-preview2.png',
    documentPreviewThree: baseProductionCdnUrl + 'document-preview3.png',
    iconPpt: 'https://static2.sharepointonline.com/files/fabric/assets/item-types/32/pptx.png',
    personaFemale: baseProductionCdnUrl + 'persona-female.png',
};
var data = [
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: TestImages.documentPreview,
                    iconSrc: TestImages.iconPpt,
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f',
                },
            ],
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    iconProps: { iconName: 'Share' },
                    onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Pin' },
                    onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Ringer' },
                    onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
            ],
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
            ],
        },
        documentTitleProps: {
            title: 'Document1',
            shouldTruncate: true,
        },
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: TestImages.documentPreview,
                    iconSrc: TestImages.iconPpt,
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f',
                },
            ],
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    iconProps: { iconName: 'Share' },
                    onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Pin' },
                    onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Ringer' },
                    onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
            ],
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
            ],
        },
        documentTitleProps: {
            title: 'Document2',
            shouldTruncate: true,
        },
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: TestImages.documentPreviewTwo,
                    iconSrc: TestImages.iconPpt,
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f',
                },
            ],
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    iconProps: { iconName: 'Share' },
                    onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Pin' },
                    onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Ringer' },
                    onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
            ],
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
            ],
        },
        documentTitleProps: {
            title: 'Document3',
            shouldTruncate: true,
        },
    },
    {
        documentPreviewProps: {
            previewImages: [
                {
                    previewImageSrc: TestImages.documentPreviewThree,
                    iconSrc: TestImages.iconPpt,
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196,
                    accentColor: '#ce4b1f',
                },
            ],
        },
        documentCardProps: {},
        documentActionsProps: {
            actions: [
                {
                    iconProps: { iconName: 'Share' },
                    onClick: function (ev) {
                        console.log('You clicked the share action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Pin' },
                    onClick: function (ev) {
                        console.log('You clicked the pin action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
                {
                    iconProps: { iconName: 'Ringer' },
                    onClick: function (ev) {
                        console.log('You clicked the Ringer action.');
                        ev.preventDefault();
                        ev.stopPropagation();
                    },
                },
            ],
        },
        documentActivityProps: {
            activity: 'Created Feb 23, 2016',
            people: [
                { name: 'Kat Larrson', profileImageSrc: TestImages.personaFemale },
                { name: 'Josh Hancock', profileImageSrc: '', initials: 'JH' },
                { name: 'Tina Dasani', profileImageSrc: TestImages.personaFemale },
            ],
        },
        documentTitleProps: {
            title: 'Document4',
            shouldTruncate: true,
        },
    },
];
var SuggestedBigItem = function (documentProps, itemProps) {
    var documentPreviewProps = documentProps.documentPreviewProps, documentTitleProps = documentProps.documentTitleProps;
    return (React.createElement(Persona, { imageUrl: documentPreviewProps && documentPreviewProps.previewImages[0].previewImageSrc, text: documentTitleProps && documentTitleProps.title, size: PersonaSize.size40 }));
};
var SelectedDocumentItem = function (documentProps) {
    var _a = documentProps.item, documentActionsProps = _a.documentActionsProps, documentPreviewProps = _a.documentPreviewProps, documentActivityProps = _a.documentActivityProps, documentTitleProps = _a.documentTitleProps;
    var actions = [];
    if (documentActionsProps) {
        documentActionsProps.actions.forEach(function (action) { return actions.push(action); });
        actions.push({
            iconProps: { iconName: 'Cancel' },
            onClick: function (ev) {
                if (documentProps.onRemoveItem) {
                    documentProps.onRemoveItem();
                }
            },
        });
    }
    var log = function (text) { return function () { return console.log(text); }; };
    return (React.createElement(DocumentCard, { onClick: log('You clicked the card.') },
        React.createElement(DocumentCardPreview, __assign({}, documentPreviewProps)),
        React.createElement(DocumentCardLocation, { location: "Marketing Documents", locationHref: "http://microsoft.com", ariaLabel: "Location, Marketing Documents" }),
        React.createElement(DocumentCardTitle, __assign({}, documentTitleProps)),
        React.createElement(DocumentCardActivity, __assign({}, documentActivityProps)),
        React.createElement(DocumentCardActions, { actions: actions })));
};
var DocumentPicker = /** @class */ (function (_super) {
    __extends(DocumentPicker, _super);
    function DocumentPicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DocumentPicker;
}(BasePickerListBelow));
var checkboxStyles = { root: { margin: '10px 0' } };
var PickerCustomResultExample = /** @class */ (function (_super) {
    __extends(PickerCustomResultExample, _super);
    function PickerCustomResultExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onDisabledButtonClick = function () {
            _this.setState({
                isPickerDisabled: !_this.state.isPickerDisabled,
            });
        };
        _this._onFilterChanged = _this._onFilterChanged.bind(_this);
        _this.state = {
            isPickerDisabled: false,
        };
        return _this;
    }
    PickerCustomResultExample.prototype.render = function () {
        return (React.createElement("div", { className: rootClass },
            React.createElement(Checkbox, { styles: checkboxStyles, label: "Disable Document Picker", checked: this.state.isPickerDisabled, onChange: this._onDisabledButtonClick }),
            React.createElement(DocumentPicker, { removeButtonAriaLabel: "Remove", onRenderSuggestionsItem: SuggestedBigItem, onResolveSuggestions: this._onFilterChanged, onRenderItem: SelectedDocumentItem, getTextFromItem: this._getTextFromItem, pickerSuggestionsProps: {
                    suggestionsHeaderText: 'Suggested Documents',
                    noResultsFoundText: 'No Documents Found',
                }, disabled: this.state.isPickerDisabled, inputProps: {
                    onFocus: function () { return console.log('onFocus called'); },
                    onBlur: function () { return console.log('onBlur called'); },
                    'aria-label': 'Document Picker',
                } })));
    };
    PickerCustomResultExample.prototype._getTextFromItem = function (props) {
        return props.documentTitleProps.title;
    };
    PickerCustomResultExample.prototype._onFilterChanged = function (filterText, items) {
        var _this = this;
        if (!items) {
            return [];
        }
        return filterText
            ? data
                .filter(function (item) {
                return item.documentTitleProps &&
                    item.documentTitleProps.title.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
            })
                .filter(function (item) { return !_this._listContainsDocument(item, items); })
            : [];
    };
    PickerCustomResultExample.prototype._listContainsDocument = function (document, items) {
        if (!items || !items.length || items.length === 0) {
            return false;
        }
        var documentTitle = document.documentTitleProps && document.documentTitleProps.title;
        return (items.filter(function (item) { return (item.documentTitleProps && item.documentTitleProps.title) === documentTitle; }).length > 0);
    };
    return PickerCustomResultExample;
}(React.Component));
export { PickerCustomResultExample };
//# sourceMappingURL=Picker.CustomResult.Example.js.map