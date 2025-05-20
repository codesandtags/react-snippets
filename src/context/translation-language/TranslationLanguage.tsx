import * as React from "react";

type Language = "en" | "es" | "fr" | "de";
type TranslationKey = "hello" | "welcome";
type Translations = Record<Language, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    hello: "Hello!",
    welcome: "Welcome to our app!. I love you ❤️"
  },
  es: {
    hello: "¡Hola!",
    welcome: "¡Bienvenido a nuestra aplicación!. Te amo ❤️"
  },
  fr: {
    hello: "Bonjour !",
    welcome: "Bienvenue dans notre application !. Je t'aime ❤️"
  },
  de: {
    hello: "Hallo!",
    welcome: "Willkommen in unserer App!. Ich liebe dich ❤️"
  }
};

type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translation: (key: TranslationKey) => string;
};

const languageContext = React.createContext<LanguageContextType>({
  language: "en",
  changeLanguage: () => {},
  translation: (key) => key
});

type LanguageProviderProps = {
  children: React.ReactNode;
};

function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = React.useState<Language>("en");

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const translation = (key: TranslationKey) => {
    return translations[language]?.[key] || key;
  };

  return (
    <languageContext.Provider value={{ language, changeLanguage, translation }}>
      {children}
    </languageContext.Provider>
  );
}

function LanguageSwitcher() {
  const { language, changeLanguage } = React.useContext(languageContext);

  return (
    <div>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as Language)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </div>
  );
}

function Greeting() {
  const { translation } = React.useContext(languageContext);

  return (
    <div>
      <h1>👋 {translation("hello")}</h1>
      <p>{translation("welcome")}</p>
    </div>
  );
}

export default function TranslationLanguage() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Greeting />
    </LanguageProvider>
  );
}