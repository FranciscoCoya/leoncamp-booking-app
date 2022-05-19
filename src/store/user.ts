import { defineStore } from 'pinia';

// Modelo
import type { User } from '@/models/user/user.model';

// Servicio de autenticación
import { login, signUp } from '@/services/auth/AuthService';

// Servicio de usuarios
import {
  getUserDataById,
  updateUserData,
  updateUserHostData,
  getUserConfigurationByUserId,
} from '@/services/user/userService';

// Servicio de alojamientos
import { getAllUserAccomodations } from '@/services/accomodation/AccomodationService';

const useUserStore = defineStore({
  id: 'user',
  state: (): User => ({
    id: 0,
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    newPassword: '',
    repeatedPassword: '',
    userConfiguration: {
      language: 'es',
      currency: {
        alphanumericCode: 'EUR',
        name: 'Euro',
        code: 'EUR',
      },
    },
    profileImage: '',
    datosHost: {
      dni: '',
      bio: '',
      direction: '',
      emailVerified: false,
      dniVerified: false,
      phoneVerified: false,
      verified: false,
    },
    createdAt: new Date(),
  }),

  getters: {
    /**
     * Comprueba que las contraseñas coincidan.
     */
    isPasswordsMatch(state): boolean {
      return state.password === state.repeatedPassword;
    },
  },

  actions: {
    /**
     * Realiza el login de la aplicación con los datos de email y password.
     */
    async login() {
      let loginError = '';
      await login(this.email, this.password, (err: any) => {
        loginError = [400, 401, 402].includes(err.status)
          ? 'Correo electrónico o contraseña no válidos'
          : err.data.message;
      });

      return loginError;
    },

    /**
     * Realiza el registro de la aplicación con los datos del formulario.
     */
    async signUp() {
      const signUpError = '';

      await signUp(
        this.name,
        this.surname,
        this.email,
        this.password,
        this.repeatedPassword || '',
        (err: any) => {
          err.data.errors.forEach((msg: any) => {
            console.log(msg.defaultMessage);
          });
        }
      );

      return signUpError;
    },

    logout() {
      // Eliminar token y datos del usuario.
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('data');
      window.location.href = '/';
    },

    /**
     * Restablece la contraseña de un usuario.
     */
    // resetPass(){
    //   resetPassword(this.email, this.password, this.newPassword, this.repeatedPassword, (err: string) => {
    //     console.error(err);
    //   });
    // }

    /**
     * Obtención de los datos del usuario en sesión
     *
     * @param email
     */
    async loadUserData() {
      const userId = JSON.parse(sessionStorage.getItem('user') || '{}').id;

      const userData = await getUserDataById(userId);

      this.id = userId;
      this.name = userData.name;
      this.surname = userData.surname;
      this.email = userData.email;

      if (userData.profileImage) {
        this.profileImage = await decodeURI(userData.profileImage);
      }

      // Si el usuario es host, se mostrarán los siguientes datos.
      const {
        dni,
        bio,
        direction,
        emailVerified,
        dniVerified,
        phoneVerified,
        verified,
      } = userData;

      this.datosHost = {
        dni,
        bio,
        direction,
        emailVerified,
        dniVerified,
        phoneVerified,
        verified,
      };

      return userData;
    },

    /**
     * Datos del usuario con el id especificado.
     *
     * @param userId
     */
    async getUserDataById(userId: number) {
      const userData = await getUserDataById(userId);
      return userData;
    },

    /**
     * Idioma del usuario con el id especificado.
     *
     * @param userId
     * @returns
     */
    async getUserLanguageById(userId: number) {
      const userConfig = await getUserConfigurationByUserId(userId);
      return userConfig;
    },

    /**
     * Listado de todos los alojamientos de un usuario.
     */
    async loadUserAccomodations() {
      return await getAllUserAccomodations(this.id);
    },

    /**
     * Listado de todos los alojamientos del usuario con el id especificado.
     *
     * @param userId
     * @returns
     */
    async getAllAccomodationsByUserdId(userId: number) {
      return await getAllUserAccomodations(userId);
    },
  },
});

export { useUserStore };
