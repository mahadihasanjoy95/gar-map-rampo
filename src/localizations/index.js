import i18next from 'i18next';
import en from './en.json';
import { useTranslation, initReactI18next } from "react-i18next";
import {DEFAULT_LANGUAGE} from '../config';

i18next
  .init({
    interpolation: {
      // React already does escaping
      escapeValue: false
    },
    lng: DEFAULT_LANGUAGE, // 'en' | 'es'
    // Using simple hardcoded resources for simple example
    resources: {
      en,
    },
  });

export function translator(name) {
  return i18next.t(name);
  
}

export default i18next;
