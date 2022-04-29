
// -- Rutas de autenticación
const API_BASE_URL: string = import.meta.env.VITE_API_URI;

const LOGIN_URL = `${API_BASE_URL}${import.meta.env.VITE_API_LOGIN_URL}`;
const SIGNUP_URL = `${API_BASE_URL}${import.meta.env.VITE_API_SIGNUP_URL}`;
const RESET_PASSWORD_URL = `${API_BASE_URL}${import.meta.env.VITE_API_RESET_PASSWORD_URL}`;

// -----------------------------------------------------------------------------

// -- Rutas de usuario
const API_USERS = `${API_BASE_URL}${import.meta.env.VITE_API_USERS}`;

// -----------------------------------------------------------------------------

// --Rutas de alojamiento
const API_ACCOMODATIONS = `${API_BASE_URL}${import.meta.env.VITE_API_ACCOMODATIONS}`;
// -----------------------------------------------------------------------------

// -- Rutas de reservas
const API_BOOKINGS = `${API_BASE_URL}${import.meta.env.VITE_API_BOOKINGS}`;


export{
    LOGIN_URL,
    SIGNUP_URL,
    RESET_PASSWORD_URL,
    API_USERS,
    API_ACCOMODATIONS,
    API_BOOKINGS
}