import type { Language } from "./context/LanguageContext";

export type Translations = {
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  apiTesterTitle: string;
  langEn: string;
  langFr: string;
  langEs: string;
  loginAction: string;
  registerAction: string;
  welcomeMessage: string;
  featuresHeader: string;
  mockLoginAction: string;
};

export const locales: Record<Language, Translations> = {
  en: {
    title: "Student Hub",
    subtitle: "SSO Identity Portal",
    description:
      "Welcome to the central student gateway. Sign in once to access PicoCards, Napuccino, and all connected university tools seamlessly.",
    buttonLabel: "Enter Launcher",
    apiTesterTitle: "API Gateway Diagnostics",
    langEn: "EN",
    langFr: "FR",
    langEs: "ES",
    loginAction: "Sign In",
    registerAction: "Register",
    welcomeMessage: "One account. All your study tools.",
    featuresHeader: "Universally Connected Workspace",
    mockLoginAction: "Mock SSO Session",
  },
  fr: {
    title: "Hub Étudiant",
    subtitle: "Portail d'Identité Unique",
    description:
      "Bienvenue sur la passerelle étudiante centrale. Connectez-vous une seule fois pour accéder à PicoCards, Napuccino, et à tous vos outils universitaires.",
    buttonLabel: "Accéder au Portail",
    apiTesterTitle: "Diagnostics de l'API Centrale",
    langEn: "EN",
    langFr: "FR",
    langEs: "ES",
    loginAction: "Se Connecter",
    registerAction: "S'inscrire",
    welcomeMessage: "Un seul compte. Tous vos outils d'étude.",
    featuresHeader: "Espace de Travail Connecté Universel",
    mockLoginAction: "Session SSO Fictive",
  },
  es: {
    title: "Hub de Estudiantes",
    subtitle: "Portal de Identidad Única",
    description:
      "Bienvenido a la puerta de acceso estudiantil central. Inicia sesión una vez para acceder a PicoCards, Napuccino y todas las herramientas universitarias sin fricciones.",
    buttonLabel: "Entrar al Portal",
    apiTesterTitle: "Diagnóstico de la API Central",
    langEn: "EN",
    langFr: "FR",
    langEs: "ES",
    loginAction: "Iniciar Sesión",
    registerAction: "Registrarse",
    welcomeMessage: "Una cuenta. Todas tus herramientas de estudio.",
    featuresHeader: "Espacio de Trabajo Conectado Universal",
    mockLoginAction: "Simular Sesión SSO",
  },
};
