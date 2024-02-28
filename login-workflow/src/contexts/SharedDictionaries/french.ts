import { CommonTranslationsFile } from './types';

const resources: CommonTranslationsFile = {
    translation: {
        ACTIONS: {
            FINISH: 'Terminer',
            NEXT: 'Prochain',
            BACK: 'Retour',
            CREATE_ACCOUNT: 'Créer un compte',
            OKAY: "d'accord",
            CANCEL: 'Annuler',
            CONTINUE: 'Continuer',
            DONE: 'Terminé',
            LOG_IN: "S'identifier",
            LOG_OUT: 'Se déconnecter',
            CLICK_BUTTON: 'Cliquez sur le bouton',
            UPDATE_REDUX: 'Cliquez sur le bouton pour mettre à jour la valeur du magasin redux!',
            CHANGE_LANGUAGE: 'Changer de langue ici!',
            GO_HOME: 'Aller à la maison',
            GO_TEST: 'Aller à la page de test',
            RESEND: 'Envoyer à nouveau',
            UPDATE: 'Mise à jour',
            REMEMBER: 'Souvenez-vous de moi',
            SUBMIT: 'Soumettre',
            CLOSE: 'Fermer',
        },
        LABELS: {
            EMAIL: 'Adresse e-mail',
            USERNAME: `Nom d'utilisateur`,
            PASSWORD: 'Mot de passe',
            CURRENT_PASSWORD: 'Mot de passe actuel',
            NEW_PASSWORD: 'Nouveau mot de passe',
            OPTIONAL: 'Optionnel',
            FORGOT_PASSWORD: 'Mot de passe oublié',
            NEED_ACCOUNT: 'Besoin dun compte?',
            VIEW_ALL_EVENTS: 'Afficher les {{count}} événements',
        },
        MESSAGES: {
            EMAIL_SENT: 'Email envoyé',
            WELCOME: 'Bienvenue',
            WELCOME_PROJECT: 'Bienvenue sur {{project}}',
            LOGIN_MESSAGE: 'Vous êtes connecté',
            CONGRATS: 'Toutes nos félicitations!',
            CONTACT: 'Contacter un représentant du support Eaton',
            ERROR: 'Erreur!',
            EMAIL_ENTRY_ERROR: "S'il vous plaît entrer un email valide",
            USERNAME_ENTRY_ERROR: "Merci d'entrer un nom d'utilisateur valide",
            SUCCESS: 'Succès',
            FAILURE: 'Échec',
            LOADING: 'le chargement...',
            REQUEST_ERROR: `Désolé, un problème est survenu lors de l'envoi de votre demande.`,
            PASSWORD_REQUIRED_ERROR: 'Mot de passe requis',
            RETRY: 'Recommencez',
        },
        FORMS: {
            FIRST_NAME: 'Prénom',
            LAST_NAME: 'Nom de Famille',
            PHONE_NUMBER: 'Numéro de Téléphone',
            PASSWORD: 'Mot de Passe',
            CONFIRM_PASSWORD: 'Confirmez',
            PASS_MATCH_ERROR: 'Les mots de passe ne correspondent pas',
            PASS_MATCH: 'Correspondances de mots de passe',
            TOGGLE_PASSWORD_VISIBILITY: 'Basculer la visibilité du mot de passe',
            RESET_PASSWORD: 'Réinitialiser le Mot de Passe',
            FIRST_NAME_LENGTH_ERROR: 'Le prénom doit comporter au moins 1 caractères',
            LAST_NAME_LENGTH_ERROR: 'Le nom de famille doit comporter au moins 1 caractères',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 Caractères',
            NUMBERS: 'Un nombre',
            UPPER: 'Une lettre majuscule',
            LOWER: 'Une lettre miniscule',
            SPECIAL: 'Un caractère spécial',
        },
    },
};
export default resources;
