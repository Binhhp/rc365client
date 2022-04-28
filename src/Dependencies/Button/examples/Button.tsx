import React from "react";
// <ButtonImport>
import Button from "aod-dependencies/Button";
// </ButtonImport>

function App() {
  return (
    // <ButtonExample>
    <div className="App">
      <Button
        text="Button"
        onClick={() => console.log("click")}
        // <ButtonDarkMode>
        darkMode="dark"
        // </ButtonDarkMode>
        disabled={false}
        // <ButtonType>
        type="Primary"
        // </ButtonType>
        // <ButtonIcon>
        icon="Delete"
        // </ButtonIcon>
      />
    </div>
    // </ButtonExample>
  );
}

export default App;
