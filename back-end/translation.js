const deepl = require("deepl-node");

const authKey = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(authKey);

const translate = async (words, fromLanguage) => {
  const result = await translator.translateText(words, fromLanguage, fromLanguage === "en" ? "ja" : "en");
  return result.text;
};

module.exports = {
  translate,
};
