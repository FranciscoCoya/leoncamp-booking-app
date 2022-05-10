import axios from "axios";
import { LOGIN_URL, SIGNUP_URL, RESET_PASSWORD_URL } from "@/helpers/apiRoutes";

// Servicio usuarios
import { getUserDataById } from "@/services/user/UserService";

/**
 * Login de la aplicación mediante JWT. 
 * 
 * El token generado por la API se guarda en el sessionStorage para 
 * las siguientes llamadas.
 * 
 * @param email 
 * @param password 
 */
const login = async (email: string, password: string, callback: CallableFunction) => {
    try {
        await axios.post(LOGIN_URL, {
            email,
            password
        }
        ).then(res => {
            console.log(res);
            return res.data;
        })
            .then(async data => {
                const { token, email, id } = data;
                sessionStorage.setItem('user', JSON.stringify({
                    token,
                    email,
                    id
                }));
                window.location.href = '/';
            });
    } catch (err) {
        callback(err.response.data.message);
    }

    if (JSON.parse(sessionStorage.getItem('user')).id) {
        // Obtener datos de usuario
        const { name, surname } = getUserDataById(JSON.parse(sessionStorage.getItem('user') || '{}').id);
        sessionStorage.setItem('data', JSON.stringify({
            name,
            surname
        }));

        // Redireccionar a su cuenta personal.
        if (name && surname) {
            window.location.href = `/account/${name.toLowerCase()}-${surname.toLowerCase()}/profile`;
        }
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
const signUp = async (name: string, surname: string,
    email: string, password: string, repeatedPassword: string,
    callback: CallableFunction) => {
    await axios.post(SIGNUP_URL, {
        name,
        surname,
        email,
        password,
        repeatedPassword
    }).then((res) => res.data)
        .then(() => window.location.href = `/signin`
        ).catch(err => {
            let errorMsg = "Error al iniciar sesión";
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        window.location.href = "/signin";
                        break;
                    case 500:
                        errorMsg = "Error en el servidor";
                        break;
                    default:
                        break;
                }
            }
            callback(errorMsg);
        });
};

/**
 * Restablecimiento de contraseña.
 * 
 * @param email 
 * @param password
 * @param newPassword
 * @param repeatedPassword
 */
const resetPassword = async (email: string,
    password: string, newPassword: string,
    repeatedPassword: string, callback: CallableFunction) => {
    await axios.post(RESET_PASSWORD_URL, {
        email,
        password,
        newPassword,
        repeatedPassword
    }).then((res) => res.data)
        .then(data => {
            console.log(data);
        }).catch(() => {
            const errorMsg = "Error al restablecer la contraseña";
            callback(errorMsg);
        });
};

/**
 * Realiza el logout de la aplicación.
 */
const logout = () => {
    sessionStorage.removeItem('user');
};

export {
    login,
    signUp,
    resetPassword,
    logout
};