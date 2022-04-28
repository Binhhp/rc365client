import React from "react";
//<SpinButtonImport>
import CustomSpinButton from "aod-dependencies/SpinButton/CustomSpinButton";
//</SpinButtonImport>

function App() {
  // <SpinButtonExample>
  return (
    <div>
      <CustomSpinButton
        defaultValue="0"
        label={"Basic SpinButton:"}
        min={0}
        max={100}
        step={1}
        //<SpinButtonDarkMode>
        darkMode="dark"
        //</SpinButtonDarkMode>
        iconProps={{ iconName: "IncreaseIndentLegacy" }}
      />
    </div>
  );
  // </SpinButtonExample>
}

export default App;
