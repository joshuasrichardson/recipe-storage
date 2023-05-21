import {
  SourceGlossaryLanguageCode,
  TargetGlossaryLanguageCode,
  Translator,
} from "deepl-node";

const authKey = process.env.DEEPL_API_KEY;
const translator = new Translator(authKey);

export const translate = async (words: string): Promise<string> => {
  const sourceLanguage: SourceGlossaryLanguageCode = "en";
  const targetLanguage: TargetGlossaryLanguageCode = "ja";
  const result = await translator.translateText(
    words,
    sourceLanguage,
    targetLanguage
  );
  return result.text;
};

export default translate;
