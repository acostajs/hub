import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "en" | "fr" | "es";

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function detectLanguage(): Language {
  const browserLang = navigator.language || "";
  if (browserLang.startsWith("fr")) {
    return "fr";
  }
  if (browserLang.startsWith("es")) {
    return "es";
  }
  return "en";
}

export function LanguageProvider(props: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // On initial mount, detect the language preference
  useEffect(() => {
    setLanguageState(detectLanguage());
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {props.children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
