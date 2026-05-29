import { useEffect, useState } from "react";
import { APITester } from "./APITester";
import { locales } from "./App.locales";
import {
    type Language,
    LanguageProvider,
    useLanguage,
} from "./context/LanguageContext";
import "./index.css";
import { Login } from "./pages/Login/Login";
import { Portal } from "./pages/Portal/Portal";
import { Register } from "./pages/Register/Register";
import {
    deleteAuthCookie,
    hasAuthCookie,
    setMockAuthCookie,
} from "./utils/cookie";

export type Page = "home" | "login" | "register" | "portal";

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
    const [page, setPage] = useState<Page>("home");
    const t = getLocale(language);

    // Session Interception: check cookie on startup
    useEffect(() => {
        if (hasAuthCookie()) {
            setPage("portal");
        }
    }, []);

    function handleLanguageChange(lang: Language) {
        setLanguage(lang);
    }

    function handleLogout() {
        deleteAuthCookie();
        setPage("home");
    }

    function handleMockLogin() {
        setMockAuthCookie();
        setPage("portal");
    }

    // Router matching
    if (page === "portal") {
        return <Portal onLogout={handleLogout} />;
    }

    if (page === "register") {
        return <Register onNavigate={(target) => setPage(target)} />;
    }

    if (page === "login") {
        return (
            <Login
                onNavigate={(target) => setPage(target)}
                onLoginSuccess={handleMockLogin}
            />
        );
    }

    return (
        <div className="layout-shell max-w-4xl mx-auto py-12">
            {/* Header Panel */}
            <header className="card-surface flex flex-col gap-space-sm mb-6">
                <div className="flex justify-between items-center flex-wrap gap-space-sm">
                    <div>
                        <h1 className="text-heading-lg">{t.title}</h1>
                        <p className="text-heading-md opacity-70">
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Simple Monochromatic Language Selector */}
                    <nav
                        className="flex gap-space-sm"
                        aria-label="Language Selector"
                    >
                        <ul className="flex gap-space-sm list-none p-0 m-0">
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLanguageChange("en");
                                    }}
                                    className={`btn-primary ${language === "en" ? "opacity-100" : "opacity-50"}`}
                                >
                                    {t.langEn}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLanguageChange("fr");
                                    }}
                                    className={`btn-primary ${language === "fr" ? "opacity-100" : "opacity-50"}`}
                                >
                                    {t.langFr}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleLanguageChange("es");
                                    }}
                                    className={`btn-primary ${language === "es" ? "opacity-100" : "opacity-50"}`}
                                >
                                    {t.langEs}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Grid (Homepage view) */}
            <main className="grid md:grid-cols-2 gap-space-md">
                <section className="card-surface flex flex-col gap-space-md justify-between">
                    <div className="flex flex-col gap-space-sm">
                        <h2 className="text-heading-md">{t.welcomeMessage}</h2>
                        <p className="text-body">{t.description}</p>
                    </div>

                    <div className="flex flex-col gap-space-sm mt-6">
                        <nav
                            aria-label="Account Access Actions"
                            className="w-full"
                        >
                            <ul className="grid grid-cols-2 gap-space-sm list-none p-0 m-0">
                                <li className="w-full">
                                    <button
                                        type="button"
                                        onClick={() => setPage("login")}
                                        className="btn-primary w-full"
                                    >
                                        {t.loginAction}
                                    </button>
                                </li>
                                <li className="w-full">
                                    <button
                                        type="button"
                                        onClick={() => setPage("register")}
                                        className="btn-primary w-full"
                                    >
                                        {t.registerAction}
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* SSO Mock Action */}
                        <button
                            type="button"
                            onClick={handleMockLogin}
                            className="btn-primary opacity-80 border-dashed"
                        >
                            {t.mockLoginAction}
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
