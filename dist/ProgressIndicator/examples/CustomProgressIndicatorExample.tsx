import React from "react";
import "./App.css";
// <ProgressIndicatorImport>
import CustomProgressIndicator from "aod-dependencies/ProgressIndicator/CustomProgressIndicator";
// </ProgressIndicatorImport>
const intervalDelay = 100;
const intervalIncrement = 0.01;

function App() {
  const [percentComplete, setPercentComplete] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 1);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  });

  // <ProgressIndicatorExample>
  return (
    <div className="App">
      <CustomProgressIndicator
        label="Example title"
        description="Example description"
        title="Example"
        // <ProgressIndicatorDarkMode>
        darkMode="dark"
        // </ProgressIndicatorDarkMode>
        percentComplete={percentComplete}
      />
    </div>
  );
}
//</ProgressIndicatorExample>

export default App;
