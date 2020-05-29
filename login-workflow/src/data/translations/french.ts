const resources = {
    translation: {
        ACTIONS: {
            FINISH: 'Terminer',
            NEXT: 'Prochain',
            BACK: 'Retour',
            CREATE_ACCOUNT: 'Créer un compte',
            OKAY: "d'accord",
            CONTINUE: 'Continuer',
            DONE: 'Terminé',
            LOG_IN: "S'identifier",
            LOG_OUT: 'Se déconnecter',
            CLICK_BUTTON: 'Cliquez sur le bouton',
            UPDATE_REDUX: 'Cliquez sur le bouton pour mettre à jour la valeur du magasin redux!',
            CHANGE_LANGUAGE: 'Changer de langue ici!',
            GO_HOME: 'Aller à la maison',
            GO_TEST: 'Aller à la page de test',
            RESEND: 'Renvoyer',
            UPDATE: 'Mise à jour',
            REMEMBER: 'Souviens-toi de moi',
        },
        LABELS: {
            EMAIL: 'Adresse e-mail',
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
            SUCCESS: 'Succès',
            FAILURE: 'Échec',
            LOADING: 'le chargement...',
            REQUEST_ERROR: `Désolé, un problème est survenu lors de l'envoi de votre demande.`,
        },
        REGISTRATION: {
            EULA: {
                LOADING: "Chargement du contrat de licence d'utilisateur final ...",
                AGREE_TERMS: "J'ai lu et j'accepte les conditions générales",
            },
            STEPS: {
                CREATE_ACCOUNT: 'Créer un compte',
                VERIFY_EMAIL: 'Vérifier les courriels',
                LICENSE: 'Accord de Licence',
                PASSWORD: ' Créer un Mot de Passe',
                ACCOUNT_DETAILS: 'Détails du Compte',
                COMPLETE: 'Compte Créé!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Entrez vos coordonnées ci-dessous pour terminer la création du compte.',
            },
            SUCCESS_MESSAGE:
                "Votre compte a été créé avec le courrier électronique <b>{{email}}</b>.\n\nVotre compte a déjà été ajouté à l'organisation <b>{{organization}}</b>.\n\nAppuyez sur Continuer ci-dessous pour continuer.",
            FAILURE_MESSAGE:
                "Nous n'avons pas pu terminer votre inscription. Appuyez sur Continuer ci-dessous pour continuer.",
            UNKNOWN_EMAIL: 'Email inconnu',
            UNKNOWN_ORGANIZATION: 'Organisation inconnue',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS: `Pour vous inscrire à un compte Eaton, entrez les informations requises ci-dessous. Vous devrez vérifier votre adresse e-mail pour continuer.`,
            VERIFY_EMAIL: {
                MESSAGE: `Un code de vérification a été envoyé à l'adresse e-mail que vous avez fournie. Cliquez sur le lien ou entrez le code ci-dessous pour continuer. Ce code est valable 30 minutes.`,
                RESEND: `Renvoyer l'e-mail de vérification`,
                VERIFICATION: 'Code de vérification',
            },
        },
        FORGOT_PASSWORD: {
            ERROR: "Impossible de réinitialiser votre mot de passe pour l'instant",
            INSTRUCTIONS:
                "Entrez l'adresse e-mail du compte associée au compte.\n\n" +
                'Si ce courrier électronique a un compte chez Eaton, vous recevrez une réponse sous <b>un jour ouvrable</b>.\n\n' +
                'Pour les problèmes de compte urgents, veuillez appeler le {{phone}}.',
            RESET_CODE_ERROR: `Une erreur s'est produite avec votre code de réinitialisation. `,
            LINK_SENT: 'Un lien pour réinitialiser votre mot de passe a été envoyé à <b>{{email}}</b>.',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: 'Email ou mot de passe incorrect',
            INVALID_CREDENTIALS: "Votre combinaison nom d'utilisateur / mot de passe n'est pas reconnue.",
            GENERIC_ERROR: "Votre demande n'a pas pu être traitée pour le moment.\n",
        },
        FORMS: {
            FIRST_NAME: 'Prénom',
            LAST_NAME: 'Nom de Famille',
            PHONE_NUMBER: 'Numéro de Téléphone',
            PASSWORD: 'Mot de Passe',
            CONFIRM_PASSWORD: 'Confirmez',
            PASS_MATCH_ERROR: 'Les mots de passe ne correspondent pas',
            TOGGLE_PASSWORD_VISIBILITY: 'Basculer la visibilité du mot de passe',
            RESET_PASSWORD: 'Réinitialiser le Mot de Passe',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 Caractères',
            NUMBERS: 'Un nombre',
            UPPER: 'Une lettre majuscule',
            LOWER: 'Une lettre miniscule',
            SPECIAL: 'Un caractère spécial',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'Votre mot de passe a été réinitialisé avec succès',
            FAILURE_MESSAGE: `Votre mot de passe n'a pas pu être réinitialisé. Veuillez réessayer plus tard.`,
        },
        USER_SETTINGS: {
            Name: 'Nom',
            EMAIL: 'Email',
            PHONE_NUMBER: 'Numéro de téléphone',
            PASSWORD: 'Mot de passe',
            EMAIL_NOTIFICATION: 'Notification par e-mail',
            ENABLED: 'Activée',
            ORGANIZATION: 'Organisation',
            ORGANIZATION_NAME: "nom de l'organisation",
            ADDRESS: 'Adresse',
            CHANGE_PASSWORD: 'changer le mot de passe',
            ACCOUNT: 'Compte',
        },
        COUNTER: 'La valeur est: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Mot de passe oublié?',
        },
        ERROR_MESSAGES: {
            '2002': "Le lien d'enregistrement de l'utilisateur est déjà utilisé.",
            '9003': "L'opération demandée ne peut pas être effectuée, veuillez contacter votre administrateur",
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Mot de passe changé',
            PASSWORD: 'Changer le mot de passe',
            SUCCESS_MESSAGE:
                "Votre mot de passe a été mis à jour avec succès! Pour garantir la sécurité de votre compte, vous devrez vous connecter à l'application avec vos informations d'identification mises à jour.",
            EMAIL_CONFIRM_MESSAGE: 'Nous avons envoyé un e-mail de confirmation à <b>{{email}}</b>',
            PASSWORD_INFO:
                'Le mot de passe doit comprendre entre 8 et 16 caractères et contenir au moins trois des types de caractères suivants: lettres minuscules, lettres majuscules, chiffres ou caractères spéciaux.',
            OLD_PASSWORD: 'ancien mot de passe',
            ERROR_MESSAGE:
                'Vos informations ne correspondent pas à nos enregistrements. Veuillez saisir à nouveau vos informations pour réessayer.',
            PROBLEM_OCCURRED: 'Un problème est survenu:',
            CONFIRM_NEW_PASSWORD: 'Confirmer le nouveau mot de passe',
            CANCEL: 'Annuler',
            UPDATE: 'Mise à jour',
        },
        SETTINGS: {
            TITLE: 'Réglages',
        },
        LEGAL: {
            TITLE: 'Légale',
            TERMSANDCONDITIONS: 'Termes et conditions',
            EULA: "Contrat de licence de l'utilisateur final",
            OPENSOURCELICENSES: 'Licences Open Source',
        },
        USER_MENU: {
            LOG_OUT: 'Se déconnecter',
            CONTACT_US: 'Nous contacter',
            ACCOUNT_SETTING: 'Paramètres du compte',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'Questions générales',
            SUPPORT_MESSAGE:
                'Pour les questions, commentaires ou assistance par e-mail, veuillez nous envoyer un e-mail à ',
            EMERGENCY_SUPPORT: `Assistance d'urgence`,
            TECHNICAL_ASSISTANCE: 'Pour une assistance technique 24/7, veuillez appeler ',
        },
    },
};
export default resources;
