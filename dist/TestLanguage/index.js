"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestLanguage = void 0;

const TestLanguage = (label, multilingual) => {
  let result = label;
  if (!multilingual) return label;

  for (let i = 0; i < (multilingual === null || multilingual === void 0 ? void 0 : multilingual.length); i++) {
    if (label === multilingual[i].textKey) {
      result = multilingual[i].context;
      break;
    }
  }

  return result;
};

exports.TestLanguage = TestLanguage;