import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { LANGUAGE_VERS } from "../Default";
import { useEffect } from "react";

const placements = ["outside-left"];
function Selector({ compiler, onSelect, Language }) {
  const lang = Object.entries(LANGUAGE_VERS);
  console.log(lang);

  const IndexFinding = (lang, setLang) => {
    const arr = lang.map(([a]) => a);
    return arr.findIndex((b) => b === setLang);
  };

  // useEffect(() => {}, [Language]);

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
                defaultSelectedKeys={
                  Language
                    ? [lang[IndexFinding(lang, Language)][0]]
                    : [lang[0][0]]
                }
                // defaultSelectedKeys={[lang[0][0]]}
                labelPlacement={placement}
              >
                {lang.map(([Ls]) => (
                  <SelectItem key={Ls} onPress={() => onSelect(Ls)}>
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
