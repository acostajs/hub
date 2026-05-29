import { useLanguage } from "../../context/LanguageContext";
import { portalLocales } from "./Portal.locales";

export type PortalProps = {
  onLogout: () => void;
};

function getPortalLocale(lang: "en" | "fr" | "es") {
  switch (lang) {
    case "fr":
      return portalLocales.fr;
    case "es":
      return portalLocales.es;
    default:
      return portalLocales.en;
  }
}

export function Portal(props: PortalProps) {
  const { language } = useLanguage();
  const t = getPortalLocale(language);

  return (
    <div className="layout-shell max-w-4xl mx-auto py-12">
      {/* Portal Header */}
      <header className="card-surface flex justify-between items-center flex-wrap gap-space-sm mb-6">
        <div>
          <h1 className="text-heading-lg">{t.welcome}</h1>
          <p className="text-body opacity-70">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={props.onLogout}
          className="btn-primary border-red-500 hover:opacity-90 active:scale-95"
        >
          {t.logout}
        </button>
      </header>

      {/* Grid of Microservice Launcher Cards */}
      <main className="grid md:grid-cols-2 gap-space-md">
        {/* PicoCards Launcher */}
        <section className="card-surface flex flex-col justify-between gap-space-md">
          <div className="flex flex-col gap-space-sm">
            <h2 className="text-heading-md">{t.picocardsTitle}</h2>
            <p className="text-body">{t.picocardsDesc}</p>
          </div>
          <div className="flex flex-col gap-space-sm mt-4">
            <div className="text-sm font-semibold opacity-70">
              {t.statusLabel}:{" "}
              <span className="underline">{t.picocardsStatus}</span>
            </div>
            <a
              href="http://picocards.hub.ca"
              className="btn-primary text-center no-underline block"
            >
              {t.picocardsTitle} &rarr;
            </a>
          </div>
        </section>

        {/* Napuccino Launcher */}
        <section className="card-surface flex flex-col justify-between gap-space-md">
          <div className="flex flex-col gap-space-sm">
            <h2 className="text-heading-md">{t.napuccinoTitle}</h2>
            <p className="text-body">{t.napuccinoDesc}</p>
          </div>
          <div className="flex flex-col gap-space-sm mt-4">
            <div className="text-sm font-semibold opacity-70">
              {t.statusLabel}:{" "}
              <span className="underline">{t.napuccinoStatus}</span>
            </div>
            <a
              href="http://napuccino.hub.ca"
              className="btn-primary text-center no-underline block"
            >
              {t.napuccinoTitle} &rarr;
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
