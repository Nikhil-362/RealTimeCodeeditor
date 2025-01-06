import { useState } from "react";
import EditComp from "../components/editComp";
import OutputComp from "../components/outputComp";
import NavbarComp from "../components/NavbarComp";
import Split from "react-split";

function Main() {
  const [output, setOutput] = useState();

  const retrieve = (data) => {
    setOutput(data);
  };

  return (
    <>
      <NavbarComp></NavbarComp>
      <Split className="split px-8">
        <EditComp retrieve={retrieve}></EditComp>
        <OutputComp output={output}></OutputComp>
      </Split>
    </>
  );
}

export default Main;
