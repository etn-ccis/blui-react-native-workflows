import { CommonTranslationsFile } from './types';

const resources: CommonTranslationsFile = {
    translation: {
        ACTIONS: {
            FINISH: 'Terminar',
            NEXT: 'Siguiente',
            BACK: 'Atrás',
            CREATE_ACCOUNT: 'Crear una cuenta',
            OKAY: 'Okey',
            CANCEL: 'Cancelar',
            CONTINUE: 'Seguir',
            DONE: 'Hecho',
            LOG_IN: 'Iniciar sesión',
            LOG_OUT: 'Cerrar sesión',
            CLICK_BUTTON: '¡Haga clic en el botón',
            UPDATE_REDUX: '¡Haga clic en el botón para actualizar el valor de la tienda redux!',
            CHANGE_LANGUAGE: '¡Cambie el idioma aquí!',
            GO_HOME: 'Ir a casa',
            GO_TEST: 'Ir a la página de prueba',
            RESEND: 'Enviar de nuevo',
            UPDATE: 'Actualizar',
            REMEMBER: 'Recordar contraseña',
            SUBMIT: 'Entregar',
            CLOSE: 'Cerca',
        },
        LABELS: {
            EMAIL: 'Correo electrónico',
            USERNAME: 'Nombre de usuario',
            PASSWORD: 'Contraseña',
            CURRENT_PASSWORD: 'Contraseña actual',
            NEW_PASSWORD: 'Nueva contraseña',
            OPTIONAL: 'Opcional',
            FORGOT_PASSWORD: '¿Ha olvidado su contraseña?',
            NEED_ACCOUNT: '¿Necesitas una cuenta?',
            VIEW_ALL_EVENTS: 'Ver todos los {{count}} eventos',
        },
        MESSAGES: {
            EMAIL_SENT: 'Correo electrónico enviado',
            WELCOME: 'Bienvenido',
            WELCOME_PROJECT: 'Bienvenido a {{project}}',
            LOGIN_MESSAGE: 'Has iniciado sesión',
            CONGRATS: '¡Felicitaciones!',
            CONTACT: 'Contactar un representante de soporte de Eaton',
            ERROR: '¡Error!',
            EMAIL_ENTRY_ERROR: 'Ingrese un correo electrónico válido',
            USERNAME_ENTRY_ERROR: 'Introduzca un nombre de usuario válido',
            SUCCESS: 'Éxito',
            FAILURE: 'Fallo',
            LOADING: 'Cargando...',
            REQUEST_ERROR: 'Lo sentimos, hubo un problema al enviar su solicitud.',
            PASSWORD_REQUIRED_ERROR: 'Se requiere contraseña',
            RETRY: 'Rever',
        },
        FORMS: {
            FIRST_NAME: 'Nombre',
            LAST_NAME: 'Apellido',
            PHONE_NUMBER: 'Número de teléfono',
            PASSWORD: 'Contraseña',
            CONFIRM_PASSWORD: 'Confirmar contraseña',
            PASS_MATCH_ERROR: 'Las contraseñas no coinciden',
            PASS_MATCH: 'Coincidencias de contraseña',
            TOGGLE_PASSWORD_VISIBILITY: 'Alternar visibilidad de contraseña',
            RESET_PASSWORD: 'Restablecer contraseña',
            FIRST_NAME_LENGTH_ERROR: 'El nombre debe tener al menos 1 caracteres',
            LAST_NAME_LENGTH_ERROR: 'El apellido debe tener al menos 1 caracteres',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 caracteres',
            NUMBERS: 'Un número',
            UPPER: 'Una letra mayúscula',
            LOWER: 'Una letra minúscula',
            SPECIAL: 'Un carácter especial',
        },
    },
};
export default resources;
