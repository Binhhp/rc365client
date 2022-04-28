"use strict";

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));
var dom = React.createElement;

var _TestLanguage = require("../TestLanguage");

var _FinalNode = _interopRequireDefault(require("./FinalNode"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class Tree extends React.Component {
  constructor(props) {
    super(props);

    this.onCheckDefaultChecked = async (rootData) => {
      let Nodes = this.props.childNodes;

      if (!rootData) {
        for (let i = 0; i < Nodes.length; i++) {
          let repo = Nodes[i].childNodes;

          if (Nodes[i].isIndeterminate) {
            Nodes[i] = _objectSpread(
              _objectSpread({}, Nodes[i]),
              {},
              {
                isIndeterminate: false,
              }
            );
            this.setState({
              myNodes: Nodes[i],
            });
          }

          for (let j = 0; j < repo.length; j++) {
            if (repo[j].isChecked) {
              this.onSetStateCurrentNodes(repo[j]);
              let result = await this.onCheckParentState(Nodes[i]);

              if (result) {
                Nodes[i] = _objectSpread(
                  _objectSpread({}, Nodes[i]),
                  {},
                  {
                    isChecked: result[0],
                    isIndeterminate: result[1],
                  }
                );

                if (result[0]) {
                  this.onSetStateCurrentNodes(Nodes[i]);
                } else {
                  this.onSetStateCurrentNodes(Nodes[i], "remove");
                }
              }
            }

            if (Nodes[i].isDisable) {
              repo[j] = _objectSpread(
                _objectSpread({}, repo[j]),
                {},
                {
                  isDisable: true,
                }
              );
              this.setState({
                myNodes: repo[i],
              });
            }

            if (Nodes[i].isChecked) {
              repo[j] = _objectSpread(
                _objectSpread({}, repo[j]),
                {},
                {
                  isChecked: true,
                }
              );
              this.onSetStateCurrentNodes(repo[j]);
            }
          }

          if (Nodes[i].childNodes.length >= 1) {
            this.onCheckDefaultChecked(Nodes[i].childNodes);
          }
        }
      }

      if (rootData) {
        for (let i = 0; i < rootData.length; i++) {
          let repo = rootData[i].childNodes;

          if (rootData[i].isIndeterminate) {
            rootData[i] = _objectSpread(
              _objectSpread({}, rootData[i]),
              {},
              {
                isIndeterminate: false,
              }
            );
            this.setState({
              myNodes: rootData[i],
            });
          }

          for (let j = 0; j < repo.length; j++) {
            if (repo[j].isChecked) {
              this.onSetStateCurrentNodes(repo[j]);
              let result = await this.onCheckParentState(rootData[i]);

              if (result) {
                rootData[i] = _objectSpread(
                  _objectSpread({}, rootData[i]),
                  {},
                  {
                    isChecked: result[0],
                    isIndeterminate: result[1],
                  }
                );

                if (result[0]) {
                  this.onSetStateCurrentNodes(rootData[i]);
                } else {
                  this.onSetStateCurrentNodes(rootData[i], "remove");
                }
              }
            }

            if (rootData[i].isDisable) {
              repo[j] = _objectSpread(
                _objectSpread({}, repo[j]),
                {},
                {
                  isDisable: true,
                }
              );
              this.setState({
                myNodes: repo[i],
              });
            }

            if (rootData[i].isChecked) {
              repo[j] = _objectSpread(
                _objectSpread({}, repo[j]),
                {},
                {
                  isChecked: true,
                }
              );
              this.onSetStateCurrentNodes(repo[j]);
            }
          }

          if (rootData[i].childNodes.length >= 1) {
            this.onCheckDefaultChecked(rootData[i].childNodes);
          }
        }
      }
    };

    this.onFindNodeInState = (node, loopData) => {
      let currentNodes = this.state.NodesList;

      if (!loopData) {
        for (let i = 0; i < currentNodes.length; i++) {
          if (currentNodes[i].id !== node.id) {
            currentNodes[i].childNodes.length >= 1 &&
              this.onFindNodeInState(node, currentNodes[i].childNodes);
          } else {
            currentNodes[i] = node;
          }
        }
      }

      if (loopData) {
        for (let i = 0; i < loopData.length; i++) {
          if (loopData[i].id !== node.id) {
            loopData[i].childNodes.length >= 1 &&
              this.onFindNodeInState(node, loopData[i].childNodes);
          } else {
            loopData[i] = node;
          }
        }
      }

      this.setState({
        myNodes: node,
      });
    };

    this.onExpandsTree = async (node) => {
      node = _objectSpread(
        _objectSpread({}, node),
        {},
        {
          isExpand: !node.isExpand,
        }
      );
      await this.onFindNodeInState(node);
    };

    this.onCheckedNode = async (node) => {
      node = _objectSpread(
        _objectSpread({}, node),
        {},
        {
          isChecked: !node.isChecked,
          isIndeterminate: false,
        }
      );
      await this.onCheckAllChild(node);
      await this.onFindNodeInState(node);

      if (node.parentNode) {
        await this.onCheckedParent(node);
      }

      if (node.isChecked) {
        await this.onSetStateCurrentNodes(node);
      } else {
        await this.onSetStateCurrentNodes(node, "remove");
      }

      this.props.onGetChecked &&
        this.props.onGetChecked([...new Set(this.state.currentNodes)]);
    };

    this.onCheckAllChild = async (node, repo) => {
      let childNodes = node.childNodes;

      if (!repo && node.isChecked) {
        for (let i = 0; i < childNodes.length; i++) {
          if (!childNodes[i].isDisable) {
            childNodes[i].isChecked = true;
            await this.onSetStateCurrentNodes(childNodes[i]);
          }

          if (childNodes[i].childNodes.length >= 1) {
            await this.onCheckAllChild(node, childNodes[i].childNodes);
          }
        }
      }

      if (repo && node.isChecked) {
        for (let i = 0; i < repo.length; i++) {
          if (!repo[i].isDisable) {
            repo[i].isChecked = true;
            await this.onSetStateCurrentNodes(repo[i]);
          }

          if (repo[i].childNodes.length >= 1) {
            await this.onCheckAllChild(node, repo[i].childNodes);
          }
        }
      }

      if (!repo && !node.isChecked) {
        for (let i = 0; i < childNodes.length; i++) {
          if (!childNodes[i].isDisable) {
            childNodes[i].isChecked = false;
            await this.onSetStateCurrentNodes(childNodes[i], "remove");
          }

          if (childNodes[i].childNodes.length >= 1) {
            await this.onCheckAllChild(node, childNodes[i].childNodes);
          }
        }
      }

      if (repo && !node.isChecked) {
        for (let i = 0; i < repo.length; i++) {
          if (!repo[i].isDisable) {
            repo[i].isChecked = false;
            await this.onSetStateCurrentNodes(repo[i], "remove");
          }

          if (repo[i].childNodes.length >= 1) {
            await this.onCheckAllChild(node, repo[i].childNodes);
          }
        }
      }
    };

    this.onCheckParentState = async (node) => {
      let count = 0;
      let length = node.childNodes.length;
      let parentNode = node.childNodes;

      for (let i = 0; i < parentNode.length; i++) {
        if (parentNode[i].isChecked) {
          count++;
        }
      }

      if (count === length) {
        return [true, false];
      }

      if (count < length && count > 0) {
        return [false, true];
      }

      if (count === 0) {
        return [false, false];
      } // return boolean[] with [isChecked,isIndeterminate]
    };

    this.onCheckedParent = async (node, rootData) => {
      let parent = node.parentNode;
      let currentNodes = this.state.NodesList;

      if (parent && !rootData) {
        let result = await this.onCheckParentState(parent);

        for (let i = 0; i < currentNodes.length; i++) {
          if (currentNodes[i].id === parent.id) {
            if (result) {
              currentNodes[i] = _objectSpread(
                _objectSpread({}, parent),
                {},
                {
                  isChecked: result[0],
                  isIndeterminate: result[1],
                }
              );
            }

            if (result && result[0]) {
              await this.onSetStateCurrentNodes(currentNodes[i]);
            } else {
              await this.onSetStateCurrentNodes(currentNodes[i], "remove");
            }

            if (currentNodes[i].parentNode) {
              await this.onCheckedParent(currentNodes[i]);
            }
          }

          if (
            currentNodes[i].id !== parent.id &&
            currentNodes[i].childNodes.length >= 1
          ) {
            await this.onCheckedParent(node, currentNodes[i].childNodes);
          }
        }
      }

      if (parent && rootData) {
        let result = await this.onCheckParentState(parent);

        for (let i = 0; i < rootData.length; i++) {
          if (rootData[i].id === parent.id) {
            if (result) {
              rootData[i] = _objectSpread(
                _objectSpread({}, parent),
                {},
                {
                  isChecked: result[0],
                  isIndeterminate: result[1],
                }
              );
            }

            if (result && result[0]) {
              await this.onSetStateCurrentNodes(rootData[i]);
            } else {
              await this.onSetStateCurrentNodes(rootData[i], "remove");
            }

            if (rootData[i].parentNode) {
              await this.onCheckedParent(rootData[i]);
            }
          }

          if (
            rootData[i].id !== parent.id &&
            rootData[i].childNodes.length >= 1
          ) {
            await this.onCheckedParent(node, rootData[i].childNodes);
          }
        }
      }
    };

    this.onSetStateCurrentNodes = async (node, type) => {
      let currentSelectNode = this.state.currentNodes;
      let index = currentSelectNode.findIndex((item) => item.id === node.id);

      if ((!type || type === "add") && index === -1) {
        currentSelectNode.push(node);
        await this.setState({
          currentNodes: currentSelectNode,
        });
      }

      if (type && type === "remove" && index !== -1) {
        currentSelectNode.splice(index, 1);
        await this.setState({
          currentNodes: currentSelectNode,
        });
      }
    };

    this.state = {
      NodesList: this.props.childNodes,
      myNodes: null,
      currentNodes: [],
    };
  }

  componentDidMount() {
    this.onCheckDefaultChecked();
  }

  render() {
    var _this$state$NodesList;

    return dom(
      "div",
      null,
      (_this$state$NodesList = this.state.NodesList) === null ||
        _this$state$NodesList === void 0
        ? void 0
        : _this$state$NodesList.map((item) => {
            let labelVal =
              this.props.multilingual && item.label
                ? (0, _TestLanguage.TestLanguage)(
                    item.label,
                    this.props.multilingual
                  )
                : item.label;
            return dom(_FinalNode.default, {
              isChecked: item.isChecked || false,
              isExpand: item.isExpand || false,
              isDisable: item.isDisable || false,
              label: labelVal,
              isAllChildSelected: item.isAllChildSelected || false,
              isIndeterminate: item.isIndeterminate || false,
              childNodes: item.childNodes,
              key: item.id,
              node: item,
              parentNode: item.parentNode,
              theme: this.props.darkMode || "",
              id: item.id,
              onExpands: (node) => this.onExpandsTree(node),
              onChecked: (node) => this.onCheckedNode(node),
              multilingual: this.props.multilingual,
              rcName: this.props.rcName,
            });
          })
    );
  }
}

var _default = Tree;
exports.default = _default;
