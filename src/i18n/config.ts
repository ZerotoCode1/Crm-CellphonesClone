import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { translateTextVn } from "./vi/shared";
import { translateTextEn } from "./en/shared";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

export const LANG_ENUM = {
  vi: "vi",
  en: "en",
};

const currentLng = localStorage.getItem(LOCAL_STORAGE_KEYS.KEY_LANG) || LANG_ENUM.vi;

export const defaultNS = "shared";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          test: "test",
          ...translateTextEn,
        },
      },
      vi: {
        translation: {
          test: "kiem tra",
          ...translateTextVn,
        },
      },
    },
    lng: currentLng, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
export default i18n;
