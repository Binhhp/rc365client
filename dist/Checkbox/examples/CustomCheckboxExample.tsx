import React from "react";
// <CheckBoxImport>
import CustomCheckBox from "aod-dependencies/Checkbox/CustomCheckBox";
// </CheckBoxImport>

function App() {
  // <CheckBoxExample>
  return (
    <CustomCheckBox
      label="Check box"
      //<CheckBoxDarkMode>
      darkMode="dark"
      //</CheckBoxDarkMode>
      indeterminate={true}
      disabled
      icon={{ iconName: "Delete" }}
    />
  );
}
//</CheckBoxExample>

export default App;
