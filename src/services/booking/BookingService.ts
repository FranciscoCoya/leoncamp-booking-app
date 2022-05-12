import axios from 'axios';

import { API_BOOKINGS } from "@/helpers/apiRoutes";

axios.defaults.headers.common = {
    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
};

/**
 * Obtención de la reserva con el id pasado como parámetro.
 * 
 * @param bookingId
 * 
 * @returns
 */
const getBookingDataByBookingId = async (bookingId: string) => {
    const { data } = await axios.get(`${API_BOOKINGS}/${bookingId}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    });

    return data;
}

/**
 * Listado de fechas de reserva del alojamiento con el número de registro pasado como parámetro.
 * 
 * @param regNumber 
 * @returns 
 */
const listAccomodationBookingDates = async (regNumber: string) => {
    const { data } = await axios.get(`${API_BOOKINGS}/${regNumber}/dates`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('user') || '{}').token}`
        }
    });

    return data;
};


export {
    getBookingDataByBookingId,
    listAccomodationBookingDates
}