import { type FormEvent, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { registerLocales } from "./Register.locales";

export type RegisterProps = {
    onNavigate: (page: "home" | "login") => void;
};

function getRegisterLocale(lang: "en" | "fr" | "es") {
    switch (lang) {
        case "fr":
            return registerLocales.fr;
        case "es":
            return registerLocales.es;
        default:
            return registerLocales.en;
    }
}

export function Register(props: RegisterProps) {
    const { language } = useLanguage();
    const t = getRegisterLocale(language);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Username check
        if (username.trim().length < 3) {
            setError(t.errorUsernameShort);
            return;
        }

        // Email check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t.errorEmailInvalid);
            return;
        }

        // Password length check
        if (password.length < 8) {
            setError(t.errorPasswordShort);
            return;
        }

        // Password matching check
        if (password !== confirmPassword) {
            setError(t.errorPasswordsMismatch);
            return;
        }

        // Mock onboarding success
        setSuccess(t.successMock);
        setTimeout(() => {
            props.onNavigate("home");
        }, 1500);
    }

    return (
        <main className="layout-shell max-w-lg mx-auto py-12">
            <article className="card-surface flex flex-col gap-space-md">
                {/* Title Block */}
                <header className="flex flex-col gap-space-sm border-b border-border-primary pb-4">
                    <h1 className="text-heading-lg">{t.title}</h1>
                    <p className="text-body opacity-70">{t.subtitle}</p>
                </header>

                {/* Form Container */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-space-md"
                >
                    {/* Username Input */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="reg-username"
                            className="text-body font-bold"
                        >
                            {t.usernameLabel}
                        </label>
                        <input
                            type="text"
                            id="reg-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-primary"
                            placeholder={t.usernamePlaceholder}
                            autoComplete="username"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="reg-email"
                            className="text-body font-bold"
                        >
                            {t.emailLabel}
                        </label>
                        <input
                            type="email"
                            id="reg-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-primary"
                            placeholder={t.emailPlaceholder}
                            autoComplete="email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="reg-password"
                            className="text-body font-bold"
                        >
                            {t.passwordLabel}
                        </label>
                        <input
                            type="password"
                            id="reg-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-primary"
                            placeholder={t.passwordPlaceholder}
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col gap-space-sm">
                        <label
                            htmlFor="reg-confirm"
                            className="text-body font-bold"
                        >
                            {t.confirmPasswordLabel}
                        </label>
                        <input
                            type="password"
                            id="reg-confirm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-primary"
                            placeholder={t.confirmPasswordPlaceholder}
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Error Message Callout */}
                    {error && (
                        <div className="border border-red-500 text-red-500 p-space-sm text-sm font-bold bg-transparent">
                            {error}
                        </div>
                    )}

                    {/* Success Message Callout */}
                    {success && (
                        <div className="border border-green-500 text-green-500 p-space-sm text-sm font-bold bg-transparent">
                            {success}
                        </div>
                    )}

                    {/* Action Trigger */}
                    <button type="submit" className="btn-primary mt-2">
                        {t.submitButton}
                    </button>
                </form>

                {/* Footer Navigation */}
                <footer className="flex flex-col gap-space-sm border-t border-border-primary pt-4 text-center">
                    <button
                        type="button"
                        onClick={() => props.onNavigate("login")}
                        className="text-body underline hover:opacity-80 cursor-pointer bg-transparent border-0 p-0 font-semibold"
                    >
                        {t.loginLink}
                    </button>
                    <button
                        type="button"
                        onClick={() => props.onNavigate("home")}
                        className="btn-primary py-1 text-sm self-center mt-2"
                    >
                        {t.backHome}
                    </button>
                </footer>
            </article>
        </main>
    );
}
