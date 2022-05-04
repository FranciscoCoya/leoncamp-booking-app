import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home/HomeView.vue';

// -----------------------------------------------------------------------------

import AccountView from '@/views/Account/AccountView.vue';
import UserProfileView from '@/views/Account/UserProfileView.vue';
import AccomodationsAdsView from '@/views/Account/AccomodationsAdsView.vue';
import UserBookingsView from '@/views/Account/UserBookingsView.vue';

// -----------------------------------------------------------------------------

import SavedAccomodationsView from '@/views/SavedAccomodations/SavedAccomodationsView.vue';

import BookingsView from '@/views/Bookings/BookingsView.vue';
import BookingDetailView from '@/views/Bookings/BookingDetailView.vue';

import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import ForgotPasswordView from '@/views/Auth/ForgotPasswordView.vue';

// Rutas públicas
const authRoutes = ['/signin', '/signup', '/password/reset'];
const publicRoutes = [...authRoutes, '/', 'accomodation/:registerNumber'];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      // Inicio de sesión
      path: '/signin',
      name: 'signin',
      component: LoginView,
    },
    {
      // Registro
      path: '/signup',
      name: 'signup',
      component: RegisterView,
    },
    {
      // Restablecer contraseña
      path: '/password/reset',
      name: 'reset-password',
      component: ForgotPasswordView,
    },
    {
      // Inicio
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // Alojamientos guardados por el usuario en sesión
      path: '/saved',
      name: 'saved',
      component: SavedAccomodationsView,
    },
    {
      path: '/account/:accUser/accomodation/:registerNumber/edit',
      name: 'accomodation-edit',
      component: () => import('@/views/Accomodations/AccomodationEditView.vue'),
    },
    {
      // Perfil del usuario en sesión
      path: '/account/:username',
      name: 'account',
      redirect: to => {
        return {
          name: 'user-profile',
        }
      },
      component: AccountView,
      children: [
        // Detalles del perfil personal del usuario.
        {
          path: 'profile',
          name: 'user-profile',
          component: UserProfileView,
        },
        {
          // Alojamientos publicados por el usuario
          path: 'accomodations',
          name: 'user-ads',
          component: AccomodationsAdsView,
        },
        {
          // Reservas realizadas por el usuario en sesión
          path: 'bookings',
          name: 'user-bookings',
          component: UserBookingsView,
        },
      ],
    },
    {
      // Detalle de la reserva de un alojamiento
      path: '/bookings/:bookingId',
      name: 'booking-detail',
      component: BookingDetailView,
    },
    {
      // Detalle de un alojamiento
      path: '/accomodation/:registerNumber',
      name: 'accomodation-detail',
      component: () =>
        import('@/views/Accomodations/AccomodationDetailView.vue'),
    },
    {
      // Perfil de un usuario
      path: '/u/:userId',
      name: 'user-profile-public',
      component: () => import('@/views/UserProfile/UserProfilePublicView.vue'),
    },
    {
      // Ayuda de la aplicacion
      path: '/help',
      name: 'app-help',
      component: () => import('@/views/Help/HelpView.vue'),
    },
    {
      // Ruta para la página de error
      path: '/404',
      name: 'error-404',
      component: () => import('@/views/Error/404View.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: {
        name: 'error-404',
      }
    }
  ],
});

// Middleware autenticación
router.beforeEach((to, from, next) => {
  const authRequired = !publicRoutes.includes(to.path);
  const isLogged = JSON.parse(sessionStorage.getItem('user'))?.token;

  if (authRequired && !isLogged) {
    next('/signin');
  } else {
    // Si el usuario está logeado, no podrá acceder a las rutas de autenticación (signin y signup).
    authRoutes.includes(to.path) && isLogged ? next('/') : next();
  }
});

export default router;
