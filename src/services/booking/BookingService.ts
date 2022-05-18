import axios from 'axios';

import { API_BOOKINGS } from '@/helpers/apiRoutes';

import { addNewPayment } from '@/services/booking/PaymentService';

axios.defaults.headers.common = {
  Authorization: `Bearer ${
    JSON.parse(sessionStorage.getItem('user') || '{}').token
  }`,
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
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem('user') || '{}').token
      }`,
    },
  });

  return data;
};

/**
 * Listado de fechas de reserva del alojamiento con el número de registro pasado como parámetro.
 *
 * @param regNumber
 * @returns
 */
const listAccomodationBookingDates = async (regNumber: string) => {
  const { data } = await axios.get(`${API_BOOKINGS}/${regNumber}/dates`, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(sessionStorage.getItem('user') || '{}').token
      }`,
    },
  });

  return data;
};

/**
 * Creación de una nueva reserva de alojamiento.
 * @param bookingData
 * @returns
 */
export const addNewBooking = async (
  bookingData: any,
  paymentSelected: number,
  callback: CallableFunction
) => {
  try {
    const newPayment = await addNewPayment(
      paymentSelected,
      bookingData.idPayment,
      (err: any) => {
        if (err.response && callback) {
          callback(err);
        }
      }
    );

    if (newPayment) {
      await axios.post(
        `${API_BOOKINGS}/new`,
        {
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          numOfGuests: bookingData.numOfGuests,
          disccount: bookingData.disccount,
          amount: bookingData.amount,
          idAccomodation: bookingData.accomodation,
          idPayment: newPayment,
          idUser: bookingData.userHost,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(sessionStorage.getItem('user') || '{}').token
            }`,
          },
        }
      );
    }
  } catch (err: any) {
    if (err.response) {
      callback(err.response);
    }
  }
};

export { getBookingDataByBookingId, listAccomodationBookingDates };
