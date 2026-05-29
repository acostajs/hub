import { type FormEvent, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { loginLocales } from "./Login.locales";

export type LoginProps = {
    onNavigate: (page: "home" | "register" | "portal") => void;
    onLoginSuccess: () => void;
};

function getLoginLocale(lang: "en" | "fr" | "es") {
    switch (lang) {
        case "fr":
            return loginLocales.fr;
        case "es":
            return loginLocales.es;
        default:
            return loginLocales.en;
    }
}

export function Login(props: LoginProps) {
    const { language } = useLanguage();
    const t = getLoginLocale(language);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t.errorEmailInvalid);
            return;
        }

        // Password validation
        if (password.length < 8) {
            setError(t.errorPasswordShort);
            return;
        }

        // Simulate secure loading state using custom loading skeletons
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setSuccess(t.successMock);

            setTimeout(() => {
                props.onLoginSuccess();
            }, 1000);
        }, 1500);
    }

    if (isLoading) {
        return (
            <div className="layout-shell max-w-lg mx-auto py-12">
                <div className="card-surface flex flex-col gap-space-md">
                    {/* Header Skeleton */}
                    <div className="flex flex-col gap-space-sm border-b border-border-primary pb-4">
                        <div className="h-8 w-1/2 bg-current opacity-30 animate-pulse" />
                        <div className="h-4 w-3/4 bg-current opacity-20 animate-pulse mt-2" />
                    </div>

                    {/* Inputs Skeleton */}
                    <div className="flex flex-col gap-space-md py-4">
                        <div className="flex flex-col gap-space-sm">
                            <div className="h-4 w-24 bg-current opacity-30 animate-pulse" />
                            <div className="h-10 w-full border border-border-primary opacity-20 animate-pulse" />
                        </div>
                        <div className="flex flex-col gap-space-sm">
                            <div className="h-4 w-24 bg-current opacity-30 animate-pulse" />
                            <div className="h-10 w-full border border-border-primary opacity-20 animate-pulse" />
                        </div>
                    </div>

                    {/* Button Skeleton */}
                    <div className="h-10 w-full bg-current opacity-40 animate-pulse mt-4" />
                </div>
            </div>
        );
    }

    return (
        <div className="layout-shell max-w-lg mx-auto py-12">
            <div className="card-surface flex flex-col gap-space-md">
                {/* Header Title */}
                <header className="flex flex-col gap-space-sm border-b border-border-primary pb-4">
                    <h1 className="text-heading-lg">{t.title}</h1>
                    <p className="text-body opacity-70">{t.subtitle}</p>
                </header>

                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-space-md"
                >
                    {/* Email Field */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="login-email"
                            className="text-body font-bold"
                        >
                            {t.emailLabel}
                        </label>
                        <input
                            type="email"
                            id="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-primary"
                            placeholder={t.emailPlaceholder}
                            autoComplete="email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="login-password"
                            className="text-body font-bold"
                        >
                            {t.passwordLabel}
                        </label>
                        <input
                            type="password"
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-primary"
                            placeholder={t.passwordPlaceholder}
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Error Alerts */}
                    {error && (
                        <div className="border border-red-500 text-red-500 p-space-sm text-sm font-bold bg-transparent">
                            {error}
                        </div>
                    )}

                    {/* Success Alerts */}
                    {success && (
                        <div className="border border-green-500 text-green-500 p-space-sm text-sm font-bold bg-transparent">
                            {success}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="btn-primary mt-2">
                        {t.submitButton}
                    </button>
                </form>

                {/* Navigation Links */}
                <footer className="flex flex-col gap-space-sm border-t border-border-primary pt-4 text-center">
                    <button
                        type="button"
                        onClick={() => props.onNavigate("register")}
                        className="text-body underline hover:opacity-80 cursor-pointer bg-transparent border-0 p-0 font-semibold"
                    >
                        {t.registerLink}
                    </button>
                    <button
                        type="button"
                        onClick={() => props.onNavigate("home")}
                        className="btn-primary py-1 text-sm self-center mt-2"
                    >
                        {t.backHome}
                    </button>
                </footer>
            </div>
        </div>
    );
}
