import { Textarea } from "@nextui-org/react";

function OutputComp({ output }) {
  // console.log(output.run.output);
// console.log(output);
 
  return (
    <> 
      <div className="p-8 ">
        <div className="flex flex-wrap gap-4 items-center p-2"></div>
        <Textarea
          isReadOnly
          className="text-xl"
          // defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
          // defaultValue={output.run.output}
          value={
            output?.run.output !== undefined && output?.run.output !== null
              ? output.run.output
              : `NextUI is a React UI library that provides...`
          }
          maxRows={50}
          // fontSize={20}
          size="lg"
          label="Code Output"
          labelPlacement="outside"
          placeholder="View The Output Here!"
          variant="bordered"
          isInvalid={output?.run.stderr ? true : false}
          

        />
      </div>
    </>
  );
}

export default OutputComp;
