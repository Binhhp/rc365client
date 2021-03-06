import React from "react";
// <TextFieldImport>
import CustomTextField from "aod-dependencies/TextField/CustomTextField";
// </TextFieldImport>

function App() {
  // <TextFieldExample>
  return (
    <CustomTextField
      label="Standard"
      //   <TextFieldDarkMode>
      darkMode="dark"
      //   </TextFieldDarkMode>
      placeholder="Custom textfield"
      iconProps={{ iconName: "Calendar" }}
    />
  );
}
//</TextFieldExample>

export default App;
