import { __assign, __extends, __spreadArrays } from "tslib";
import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, DetailsRow, } from 'office-ui-fabric-react/lib/DetailsList';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
var _items = [];
var _columns = ['Name', 'Modified', 'Modified By', 'File Size'].map(function (name) {
    var fieldName = name.replace(' ', '').toLowerCase();
    return {
        fieldName: fieldName,
        name: name,
        key: fieldName,
        minWidth: 100,
        maxWidth: 200,
        isResizable: true,
    };
});
var iconButtonStyles = { root: { float: 'right', height: 'inherit' } };
var _names = [
    'Annie Lindqvist',
    'Aaron Reid',
    'Alex Lundberg',
    'Roko Kolar',
    'Christian Bergqvist',
    'Valentina Lovric',
    'Makenzie Sharett',
];
function getMockDateString() {
    return 'Thu Jan 05 2017‌';
}
var AnnouncedQuickActionsExample = /** @class */ (function (_super) {
    __extends(AnnouncedQuickActionsExample, _super);
    function AnnouncedQuickActionsExample(props) {
        var _this = _super.call(this, props) || this;
        _this._detailsList = React.createRef();
        _this._textField = React.createRef();
        _this._onRenderRow = function (props) {
            return React.createElement(DetailsRow, __assign({}, props));
        };
        _this._onRenderItemColumn = function (item, index, column) {
            var fieldContent = item[column.fieldName];
            if (column.key === 'name') {
                return (React.createElement("div", null,
                    fieldContent,
                    React.createElement(IconButton, { menuIconProps: { iconName: 'MoreVertical' }, role: "button", "aria-haspopup": true, "aria-label": "Show actions", styles: iconButtonStyles, menuProps: {
                            items: [
                                {
                                    key: 'delete',
                                    text: 'Delete',
                                    onClick: function () { return _this._deleteItem(index); },
                                },
                                {
                                    key: 'rename',
                                    text: 'Rename',
                                    onClick: function () { return _this._renameItem(item, index); },
                                },
                            ],
                        } })));
            }
            else {
                return React.createElement("span", null, fieldContent);
            }
        };
        _this._renderAnnounced = function () {
            var announced = _this.state.announced;
            return announced;
        };
        _this._deleteItem = function (index) {
            var items = _this.state.items;
            items.splice(items.indexOf(items[index]), 1);
            _this.setState({
                items: __spreadArrays(items),
                announced: React.createElement(Announced, { message: "Item deleted", "aria-live": "assertive" }),
            });
            return;
        };
        _this._closeRenameDialog = function () {
            _this.setState({
                renameDialogOpen: false,
            });
        };
        _this._async = new Async(_this);
        // Populate with items for demos.
        if (_items.length === 0) {
            for (var i = 0; i < 20; i++) {
                _items.push({
                    key: i,
                    name: 'Item ' + i,
                    modified: getMockDateString(),
                    modifiedby: _names[Math.floor(Math.random() * _names.length)],
                    filesize: Math.floor(Math.random() * 30).toString() + ' MB',
                });
            }
        }
        _this._selection = new Selection({
            onSelectionChanged: function () { return _this.setState({ selectionDetails: _this._getSelectionDetails() }); },
        });
        _this.state = {
            items: _items,
            selectionDetails: _this._getSelectionDetails(),
            renameDialogOpen: false,
            dialogContent: undefined,
            announced: undefined,
        };
        return _this;
    }
    AnnouncedQuickActionsExample.prototype.componentDidUpdate = function (prevState) {
        var _this = this;
        if (prevState.announced !== this.state.announced && this.state.announced !== undefined) {
            this._async.setTimeout(function () {
                _this.setState({
                    announced: undefined,
                });
            }, 2000);
        }
    };
    AnnouncedQuickActionsExample.prototype.componentWillUnmount = function () {
        this._async.dispose();
    };
    AnnouncedQuickActionsExample.prototype.render = function () {
        var _a = this.state, items = _a.items, renameDialogOpen = _a.renameDialogOpen, dialogContent = _a.dialogContent;
        return (React.createElement(React.Fragment, null,
            this._renderAnnounced(),
            React.createElement(MarqueeSelection, { selection: this._selection },
                React.createElement(DetailsList, { componentRef: this._detailsList, items: items, columns: _columns, setKey: "set", layoutMode: DetailsListLayoutMode.fixedColumns, selection: this._selection, selectionPreservedOnEmptyClick: true, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", onRenderItemColumn: this._onRenderItemColumn, onRenderRow: this._onRenderRow }),
                React.createElement(Dialog, { hidden: !renameDialogOpen, onDismiss: this._closeRenameDialog, closeButtonAriaLabel: "Close" }, dialogContent))));
    };
    AnnouncedQuickActionsExample.prototype._renameItem = function (item, index) {
        this.setState({
            renameDialogOpen: true,
            dialogContent: (React.createElement(React.Fragment, null,
                React.createElement(TextField, { componentRef: this._textField, label: "Rename", defaultValue: item.name }),
                React.createElement(DialogFooter, null,
                    React.createElement(PrimaryButton, { onClick: this._updateItemName.bind(this, index), text: "Save" })))),
        });
        return;
    };
    AnnouncedQuickActionsExample.prototype._updateItemName = function (index) {
        if (this._textField && this._textField.current) {
            var items = this.state.items;
            items[index].name = this._textField.current.value || items[index].name;
            this.setState({
                renameDialogOpen: false,
                items: __spreadArrays(items),
                announced: React.createElement(Announced, { message: "Item renamed", "aria-live": "assertive" }),
            });
        }
        else {
            return;
        }
    };
    AnnouncedQuickActionsExample.prototype._getSelectionDetails = function () {
        var selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + this._selection.getSelection()[0].name;
            default:
                return selectionCount + " items selected";
        }
    };
    return AnnouncedQuickActionsExample;
}(React.Component));
export { AnnouncedQuickActionsExample };
//# sourceMappingURL=Announced.QuickActions.Example.js.map