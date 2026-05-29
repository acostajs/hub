import type { Language } from "../../context/LanguageContext";

export type PortalTranslations = {
    welcome: string;
    subtitle: string;
    logout: string;
    picocardsTitle: string;
    picocardsDesc: string;
    picocardsStatus: string;
    napuccinoTitle: string;
    napuccinoDesc: string;
    napuccinoStatus: string;
    statusLabel: string;
};

export const portalLocales: Record<Language, PortalTranslations> = {
    en: {
        welcome: "Welcome to your Student Portal",
        subtitle: "Launch your connected study workspaces seamlessly.",
        logout: "Sign Out",
        picocardsTitle: "PicoCards Workspace",
        picocardsDesc:
            "Create and study highly structured academic flashcards with automated, spaced repetition logic.",
        picocardsStatus: "Authorized & Active",
        napuccinoTitle: "Napuccino Timer",
        napuccinoDesc:
            "Track your focus sessions, manage healthy study breaks, and coordinate target metrics.",
        napuccinoStatus: "Authorized & Active",
        statusLabel: "Status",
    },
    fr: {
        welcome: "Bienvenue sur votre Portail Étudiant",
        subtitle: "Lancez vos espaces de travail connectés sans friction.",
        logout: "Se Déconnecter",
        picocardsTitle: "Espace PicoCards",
        picocardsDesc:
            "Créez et étudiez des fiches académiques hautement structurées avec un système de répétition espacée.",
        picocardsStatus: "Autorisé & Actif",
        napuccinoTitle: "Minuteur Napuccino",
        napuccinoDesc:
            "Suivez vos sessions de concentration, gérez vos pauses et coordonnez vos objectifs d'étude.",
        napuccinoStatus: "Autorisé & Actif",
        statusLabel: "Statut",
    },
    es: {
        welcome: "Bienvenido a tu Portal de Estudiantes",
        subtitle: "Inicia tus espacios de trabajo conectados sin fricciones.",
        logout: "Cerrar Sesión",
        picocardsTitle: "Área PicoCards",
        picocardsDesc:
            "Crea y estudia fichas académicas altamente estructuradas con lógica de repetición espaciada.",
        picocardsStatus: "Autorizado y Activo",
        napuccinoTitle: "Temporizador Napuccino",
        napuccinoDesc:
            "Registra tus sesiones de enfoque, gestiona descansos saludables y coordina métricas de estudio.",
        napuccinoStatus: "Autorizado y Activo",
        statusLabel: "Estado",
    },
};
