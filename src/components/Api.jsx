import axios from "axios";
import { LANGUAGE_VERS } from "../Default";

export const execute = async (language, sourceCode) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
    language: language,
    version: LANGUAGE_VERS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};



