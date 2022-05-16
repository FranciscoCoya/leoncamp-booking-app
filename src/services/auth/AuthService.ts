import axios from 'axios';
import { LOGIN_URL, SIGNUP_URL, RESET_PASSWORD_URL } from '@/helpers/apiRoutes';

// Servicio usuarios
import { getUserDataById } from '@/services/user/userService';

/**
 * Login de la aplicación mediante JWT.
 *
 * El token generado por la API se guarda en el sessionStorage para
 * las siguientes llamadas.
 *
 * @param email
 * @param password
 */
const login = async (
  email: string,
  password: string,
  callback: CallableFunction
) => {
  try {
    await axios
      .post(LOGIN_URL, {
        email,
        password,
      })
      .then((res) => {
        return res.data;
      })
      .then(async (data) => {
        const {
          token,
          email,
          id,
        }: { token: string; email: string; id: number } = data;

        sessionStorage.setItem(
          'user',
          JSON.stringify(
            {
              token,
              email,
              id,
            } || {}
          )
        );
        window.location.href = '/';
      });
  } catch (err: any) {
    if (err.response) {
      callback(err?.response);
    }
  }

  if (JSON.parse(sessionStorage.getItem('user') as string)?.id) {
    // Obtener datos de usuario
    const {
      name,
      surname,
    }: { name: Promise<string>; surname: Promise<string> } =
      await getUserDataById(
        JSON.parse(sessionStorage.getItem('user') || '{}')?.id
      );

    // Redireccionar a su cuenta personal.
    window.location.href = `/account/${name}-${surname}/profile`;
  }
};

/**
 * Registro de un usuario en la aplicación.
 *
 * @param name
 * @param surname
 * @param email
 * @param password
 * @param repeatedPassword
 * @param callback
 *
 */
const signUp = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  repeatedPassword: string,
  callback?: CallableFunction
) => {
  let res = null;
  try {
    const { data } = await axios({
      url: SIGNUP_URL,
      method: 'POST',
      data: {
        name,
        surname,
        email,
        password,
        repeatedPassword,
      },
    });

    res = data;
  } catch (err: any) {
    if (err) {
      callback(err.response);
    }
  }

  return res;
};

/**
 * Restablecimiento de contraseña.
 *
 * @param email
 * @param password
 * @param newPassword
 * @param repeatedPassword
 */
const resetPassword = async (
  email: string,
  password: string,
  newPassword: string,
  repeatedPassword: string,
  callback: CallableFunction
) => {
  await axios
    .post(RESET_PASSWORD_URL, {
      email,
      password,
      newPassword,
      repeatedPassword,
    })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      const errorMsg = 'Error al restablecer la contraseña';
      callback(errorMsg);
    });
};

/**
 * Realiza el logout de la aplicación.
 */
const logout = () => {
  sessionStorage.removeItem('user');
};

export { login, signUp, resetPassword, logout };
