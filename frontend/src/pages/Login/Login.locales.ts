import type { Language } from "../../context/LanguageContext";

export type LoginTranslations = {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitButton: string;
    registerLink: string;
    backHome: string;
    errorEmailInvalid: string;
    errorPasswordShort: string;
    successMock: string;
};

export const loginLocales: Record<Language, LoginTranslations> = {
    en: {
        title: "Sign In",
        subtitle: "Access your academic tools session securely.",
        emailLabel: "Email Address",
        emailPlaceholder: "student@university.edu",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        submitButton: "Sign In to Account",
        registerLink: "Don't have an account? Sign Up",
        backHome: "Back to Home",
        errorEmailInvalid: "Please enter a valid email address.",
        errorPasswordShort: "Password must be at least 8 characters long.",
        successMock: "Mock Sign In Successful! Redirecting to Portal.",
    },
    fr: {
        title: "Se Connecter",
        subtitle:
            "Accédez à votre session d'outils académiques en toute sécurité.",
        emailLabel: "Adresse e-mail",
        emailPlaceholder: "etudiant@universite.edu",
        passwordLabel: "Mot de passe",
        passwordPlaceholder: "Saisissez votre mot de passe",
        submitButton: "Se connecter au compte",
        registerLink: "Vous n'avez pas de compte ? S'inscrire",
        backHome: "Retour à l'accueil",
        errorEmailInvalid: "Veuillez saisir une adresse e-mail valide.",
        errorPasswordShort:
            "Le mot de passe doit contenir au moins 8 caractères.",
        successMock: "Connexion fictive réussie ! Redirection vers le portail.",
    },
    es: {
        title: "Iniciar Sesión",
        subtitle:
            "Accede a tu sesión de herramientas académicas de forma segura.",
        emailLabel: "Dirección de correo",
        emailPlaceholder: "estudiante@universidad.edu",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Introduce tu contraseña",
        submitButton: "Iniciar Sesión en la Cuenta",
        registerLink: "¿No tienes una cuenta? Regístrate",
        backHome: "Volver al inicio",
        errorEmailInvalid: "Por favor introduce un correo electrónico válido.",
        errorPasswordShort: "La contraseña debe tener al menos 8 caracteres.",
        successMock:
            "¡Inicio de sesión simulado exitoso! Redirigiendo al portal.",
    },
};
