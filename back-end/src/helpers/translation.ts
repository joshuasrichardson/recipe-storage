import { Translator } from "deepl-node";

const authKey = process.env.DEEPL_API_KEY;
const translator = new Translator(authKey);

export const translate = async (words, fromLanguage) => {
  const result = await translator.translateText(
    words,
    fromLanguage,
    fromLanguage === "en" ? "ja" : "en"
  );
  return result.text;
};

export default translate;
