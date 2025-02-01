import axios from "axios";
import { LANGUAGE_VERS } from "../Default";

export const execute = async (language, sourceCode) => {
  console.log(language, sourceCode, "api.js");
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: language,
    version: LANGUAGE_VERS[language].version,
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};



