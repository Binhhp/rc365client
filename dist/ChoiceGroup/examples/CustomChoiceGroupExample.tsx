import React from "react";
import "./App.css";
// <ChoiceGroupImport>
import CustomChoiceGroup from "aod-dependencies/ChoiceGroup/CustomChoiceGroup";
// </ChoiceGroupImport>
import { IChoiceGroupOption } from "../ChoiceGroup.types";

function App() {
  const optionsChoiceGroup: IChoiceGroupOption[] = [
    { key: "A", text: "Option A" },
    { key: "B", text: "Option B", disabled: true },
    { key: "C", text: "Option C" },
    { key: "D", text: "Option D" },
  ];

  // <ChoiceGroupExample>
  return (
    <div>
      <CustomChoiceGroup
        options={optionsChoiceGroup}
        defaultSelectedKey="B"
        label="Pick one"
        // <ChoiceGroupDarkMode>
        darkMode="dark"
        // </ChoiceGroupDarkMode>
      />
    </div>
  );
}
//</ChoiceGroupExample>

export default App;
