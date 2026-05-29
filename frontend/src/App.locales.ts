import type { Language } from "./context/LanguageContext";

export type Translations = {
    title: string;
    subtitle: string;
    description: string;
    apiTesterTitle: string;
    langEn: string;
    langFr: string;
    langEs: string;
    loginAction: string;
    registerAction: string;
    welcomeMessage: string;
};

export const locales: Record<Language, Translations> = {
    en: {
        title: "Student Hub",
        subtitle: "SSO Identity Portal",
        description:
            "Welcome to the central student gateway. Sign in once to access PicoCards, Napuccino, and all connected university tools seamlessly.",
        apiTesterTitle: "API Gateway Diagnostics",
        langEn: "EN",
        langFr: "FR",
        langEs: "ES",
        loginAction: "Sign In",
        registerAction: "Register",
        welcomeMessage: "One account. All your study tools.",
    },
    fr: {
        title: "Hub Étudiant",
        subtitle: "Portail d'Identité Unique",
        description:
            "Bienvenue sur la passerelle étudiante centrale. Connectez-vous une seule fois pour accéder à PicoCards, Napuccino, et à tous vos outils universitaires.",
        apiTesterTitle: "Diagnostics de l'API Centrale",
        langEn: "EN",
        langFr: "FR",
        langEs: "ES",
        loginAction: "Se Connecter",
        registerAction: "S'inscrire",
        welcomeMessage: "Un seul compte. Tous vos outils d'étude.",
    },
    es: {
        title: "Hub de Estudiantes",
        subtitle: "Portal de Identidad Única",
        description:
            "Bienvenido a la puerta de acceso estudiantil central. Inicia sesión una vez para acceder a PicoCards, Napuccino y todas las herramientas universitarias sin fricciones.",
        apiTesterTitle: "Diagnóstico de la API Central",
        langEn: "EN",
        langFr: "FR",
        langEs: "ES",
        loginAction: "Iniciar Sesión",
        registerAction: "Registrarse",
        welcomeMessage: "Una cuenta. Todas tus herramientas de estudio.",
    },
};
