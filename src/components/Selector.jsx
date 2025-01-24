import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { LANGUAGE_VERS } from "../Default";

const placements = ["outside-left"];
function Selector({ compiler, onSelect, index, Language, sockerRef }) {
  const options = Object.entries(LANGUAGE_VERS);

  const localData = localStorage.getItem("data");

  let username, roomId;
  localData
    ? ({ username, roomId } = JSON.parse(localData))
    : console.log("no data");

  const [selectedLanguage, setSelectedLanguage] = useState(Language);

  useEffect(() => {
    setSelectedLanguage(Language);
  }, [Language]);

  // Update selectedLanguage whenever the Language prop changes
  useEffect(() => {
    if (!sockerRef.current) return;

    // const handleSelected = ({ Lan }) => {
    //   console.log("Language updated for all users:", Lan);
    //   setSelectedLanguage(Lan); // Update the state for all users
    // };

    sockerRef.current.on("selected", ({ Lan }) => {
      console.log("Language updated for all users:", Lan);
      setSelectedLanguage(Lan);
    });

    return () => {
      sockerRef.current.off("selected");
    };
  }, [Language, sockerRef]);

  console.log("Current Language:", selectedLanguage);

  const selection = (ls) => {
    if (!sockerRef.current) return;
    sockerRef.current.emit("selection", { ls, roomId });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4 justify-between p-4">
            {placements.map((placement) => (
              <Select
                key={placement}
                className="max-w-xs items-center "
                label="Language"
                labelPlacement={placement}
                selectedKeys={[selectedLanguage]}
              >
                {options.map(([Ls]) => (
                  <SelectItem
                    key={Ls}
                    onPress={() => {
                      onSelect(Ls);
                      selection(Ls);
                    }}
                  >
                    {Ls.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </SelectItem>
                ))}
              </Select>
            ))}

            <Button
              color="success"
              onPress={async () => {
                await compiler();
              }}
            >
              Success
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Selector;
