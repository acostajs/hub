import type { Language } from "../../context/LanguageContext";

export type RegisterTranslations = {
    title: string;
    subtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submitButton: string;
    loginLink: string;
    backHome: string;
    errorUsernameShort: string;
    errorEmailInvalid: string;
    errorPasswordShort: string;
    errorPasswordsMismatch: string;
    successMock: string;
};

export const registerLocales: Record<Language, RegisterTranslations> = {
    en: {
        title: "Create Account",
        subtitle: "Onboard once to access all attached academic utilities.",
        usernameLabel: "Username",
        usernamePlaceholder: "Enter a unique handle",
        emailLabel: "Email Address",
        emailPlaceholder: "student@university.edu",
        passwordLabel: "Password",
        passwordPlaceholder: "Minimum 8 characters",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Repeat password",
        submitButton: "Register Account",
        loginLink: "Already have an account? Sign In",
        backHome: "Back to Home",
        errorUsernameShort: "Username must be at least 3 characters long.",
        errorEmailInvalid: "Please enter a valid email address.",
        errorPasswordShort: "Password must be at least 8 characters long.",
        errorPasswordsMismatch: "Passwords do not match.",
        successMock: "Mock Registration Successful! Redirecting to Homepage.",
    },
    fr: {
        title: "Créer un Compte",
        subtitle:
            "Inscrivez-vous une seule fois pour accéder à tous les services.",
        usernameLabel: "Nom d'utilisateur",
        usernamePlaceholder: "Choisissez un pseudonyme unique",
        emailLabel: "Adresse e-mail",
        emailPlaceholder: "etudiant@universite.edu",
        passwordLabel: "Mot de passe",
        passwordPlaceholder: "Minimum 8 caractères",
        confirmPasswordLabel: "Confirmer le mot de passe",
        confirmPasswordPlaceholder: "Répétez le mot de passe",
        submitButton: "Créer le compte",
        loginLink: "Vous avez déjà un compte ? Se Connecter",
        backHome: "Retour à l'accueil",
        errorUsernameShort:
            "Le nom d'utilisateur doit contenir au moins 3 caractères.",
        errorEmailInvalid: "Veuillez saisir une adresse e-mail valide.",
        errorPasswordShort:
            "Le mot de passe doit contenir au moins 8 caractères.",
        errorPasswordsMismatch: "Les mots de passe ne correspondent pas.",
        successMock: "Inscription fictive réussie ! Redirection à l'accueil.",
    },
    es: {
        title: "Crear Cuenta",
        subtitle: "Regístrate una vez para acceder a todos los servicios.",
        usernameLabel: "Nombre de usuario",
        usernamePlaceholder: "Elige un identificador único",
        emailLabel: "Dirección de correo",
        emailPlaceholder: "estudiante@universidad.edu",
        passwordLabel: "Contraseña",
        passwordPlaceholder: "Mínimo 8 caracteres",
        confirmPasswordLabel: "Confirmar contraseña",
        confirmPasswordPlaceholder: "Repite la contraseña",
        submitButton: "Registrar Cuenta",
        loginLink: "¿Ya tienes una cuenta? Iniciar Sesión",
        backHome: "Volver al inicio",
        errorUsernameShort:
            "El nombre de usuario debe tener al menos 3 caracteres.",
        errorEmailInvalid: "Por favor introduce un correo electrónico válido.",
        errorPasswordShort: "La contraseña debe tener al menos 8 caracteres.",
        errorPasswordsMismatch: "Las contraseñas no coinciden.",
        successMock: "¡Registro simulado exitoso! Redirigiendo al inicio.",
    },
};
