import { APITester } from "./APITester";
import { locales } from "./App.locales";
import {
  type Language,
  LanguageProvider,
  useLanguage,
} from "./context/LanguageContext";
import "./index.css";

function getLocale(lang: Language) {
  switch (lang) {
    case "fr":
      return locales.fr;
    case "es":
      return locales.es;
    default:
      return locales.en;
  }
}

function AppContent() {
  const { language, setLanguage } = useLanguage();
  const t = getLocale(language);

  function handleLanguageChange(lang: Language) {
    setLanguage(lang);
  }

  return (
    <div className="layout-shell max-w-4xl mx-auto py-12">
      {/* Header Panel */}
      <header className="card-surface flex flex-col gap-space-sm mb-6">
        <div className="flex justify-between items-center flex-wrap gap-space-sm">
          <div>
            <h1 className="text-heading-lg">{t.title}</h1>
            <p className="text-heading-md opacity-70">{t.subtitle}</p>
          </div>

          {/* Simple Monochromatic Language Selector */}
          <nav className="flex gap-space-sm" aria-label="Language Selector">
            <button
              type="button"
              onClick={() => {
                handleLanguageChange("en");
              }}
              className={`btn-primary ${language === "en" ? "opacity-100" : "opacity-50"}`}
            >
              {t.langEn}
            </button>
            <button
              type="button"
              onClick={() => {
                handleLanguageChange("fr");
              }}
              className={`btn-primary ${language === "fr" ? "opacity-100" : "opacity-50"}`}
            >
              {t.langFr}
            </button>
            <button
              type="button"
              onClick={() => {
                handleLanguageChange("es");
              }}
              className={`btn-primary ${language === "es" ? "opacity-100" : "opacity-50"}`}
            >
              {t.langEs}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Feature Workspace (Clean functional columns) */}
      <main className="grid md:grid-cols-2 gap-space-md">
        <section className="card-surface flex flex-col gap-space-md justify-between">
          <div className="flex flex-col gap-space-sm">
            <h2 className="text-heading-md">{t.title}</h2>
            <p className="text-body">{t.description}</p>
          </div>
          <div>
            <button type="button" className="btn-primary w-full mt-4">
              {t.buttonLabel}
            </button>
          </div>
        </section>

        {/* API Central Gateway Diagnostics */}
        <section className="card-surface flex flex-col gap-space-md">
          <h2 className="text-heading-md">{t.apiTesterTitle}</h2>
          <APITester />
        </section>
      </main>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
