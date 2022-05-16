import { createRouter, createWebHistory } from 'vue-router';

import { getUserDataById } from '@/services/user/userService';

import {
  USER_SIGNIN_ROUTE,
  USER_SIGNUP_ROUTE,
  RESET_PASSWORD_ROUTE,
  SAVED_ACCOMODATIONS_ROUTE,
  UPLOAD_ACCOMODATION_ROUTE,
  HELP_ROUTE,
  ERROR_401_ROUTE,
  ERROR_404_ROUTE,
  ERROR_500_ROUTE,
  ERROR_503_ROUTE,
  BOOKING_ACCOMODATION_ROUTE,
  UPLOAD_ACCOMODATION_BASIC_DATA,
  UPLOAD_ACCOMODATION_LOCATION,
  UPLOAD_ACCOMODATION_SERVICES,
  UPLOAD_ACCOMODATION_RULES,
  UPLOAD_ACCOMODATION_IMAGES,
} from '@/helpers/appRoutes';

// Rutas públicas
const authRoutes: string[] = ['/signin', '/signup', '/password/reset'];
const publicRoutes: string[] = [...authRoutes, '/'];
const publicRoutesNames: string[] = [
  'accomodation-detail',
  'user-profile-public',
  'app-help',
  'error-404',
  'error-500',
  'home',
];

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
  routes: [
    {
      // Inicio de sesión
      path: USER_SIGNIN_ROUTE,
      name: 'signin',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      // Registro
      path: USER_SIGNUP_ROUTE,
      name: 'signup',
      component: () => import('@/views/Auth/RegisterView.vue'),
    },
    {
      // Restablecer contraseña
      path: RESET_PASSWORD_ROUTE,
      name: 'reset-password',
      component: () => import('@/views/Auth/ForgotPasswordView.vue'),
    },
    {
      // Inicio
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      // Alojamientos guardados por el usuario en sesión
      path: SAVED_ACCOMODATIONS_ROUTE,
      name: 'saved',
      component: () =>
        import('@/views/SavedAccomodations/SavedAccomodationsView.vue'),
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
      redirect: () => {
        return {
          name: 'user-profile',
        };
      },
      component: () => import('@/views/Account/AccountView.vue'),
      children: [
        // Detalles del perfil personal del usuario.
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import('@/views/Account/UserProfileView.vue'),
        },
        {
          // Alojamientos publicados por el usuario
          path: 'accomodations',
          name: 'user-ads',
          component: () => import('@/views/Account/AccomodationsAdsView.vue'),
        },
        {
          // Reservas realizadas por el usuario en sesión
          path: 'bookings',
          name: 'user-bookings',
          component: () => import('@/views/Account/UserBookingsView.vue'),
        },
      ],
    },
    {
      // Publicación de un alojamiento
      path: `/account/:username${UPLOAD_ACCOMODATION_ROUTE}`,
      name: 'account-accomodation-upload',
      redirect: () => {
        return {
          name: 'accomodation-upload-basic-data',
        };
      },
      component: () =>
        import(
          '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadView.vue'
        ),
      children: [
        {
          // Subida alojamiento - Paso 1: Datos básicos
          path: UPLOAD_ACCOMODATION_BASIC_DATA,
          name: 'accomodation-upload-basic-data',
          component: () =>
            import(
              '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadBasicDataView.vue'
            ),
        },
        {
          // Subida alojamiento - Paso 2: Ubicación
          path: UPLOAD_ACCOMODATION_LOCATION,
          name: 'accomodation-upload-location',
          component: () =>
            import(
              '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadLocationView.vue'
            ),
        },
        {
          // Subida alojamiento - Paso 3: Servicios
          path: UPLOAD_ACCOMODATION_SERVICES,
          name: 'accomodation-upload-services',
          component: () =>
            import(
              '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadServicesView.vue'
            ),
        },
        {
          // Subida alojamiento - Paso 4: Normas
          path: UPLOAD_ACCOMODATION_RULES,
          name: 'accomodation-upload-rules',
          component: () =>
            import(
              '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadRulesView.vue'
            ),
        },
        {
          // Subida alojamiento - Paso 5: Imágenes
          path: UPLOAD_ACCOMODATION_IMAGES,
          name: 'accomodation-upload-images',
          component: () =>
            import(
              '@/views/Accomodations/AccomodationUpload/AccomodationAdUploadImagesView.vue'
            ),
        },
      ],
    },
    {
      // Detalle de la reserva de un alojamiento
      path: '/bookings/:bookingId',
      name: 'booking-detail',
      component: () => import('@/views/Bookings/BookingDetailView.vue'),
    },
    {
      // Reserva del alojamiento indicado
      path: BOOKING_ACCOMODATION_ROUTE,
      name: 'booking-accomodation',
      component: () => import('@/views/Bookings/BookingTaskView.vue'),
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
      path: HELP_ROUTE,
      name: 'app-help',
      component: () => import('@/views/Help/HelpView.vue'),
    },
    {
      // Ruta para la página de error 404
      path: ERROR_401_ROUTE,
      name: 'error-401',
      component: () => import('@/views/Error/401View.vue'),
    },
    {
      // Ruta para la página de error 404
      path: ERROR_404_ROUTE,
      name: 'error-404',
      component: () => import('@/views/Error/404View.vue'),
    },
    {
      // Ruta para la página de error 500
      path: ERROR_500_ROUTE,
      name: 'error-500',
      component: () => import('@/views/Error/500View.vue'),
    },
    {
      // Ruta para la página de error 503
      path: ERROR_503_ROUTE,
      name: 'error-503',
      component: () => import('@/views/Error/503View.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: {
        name: 'error-404',
      },
    },
  ],
});

// Middleware autenticación
router.beforeEach((to, from, next) => {
  const authRequired = !publicRoutes.includes(to.path);
  const isLogged = JSON.parse(sessionStorage.getItem('user'))?.token;
  if (!publicRoutesNames.includes(to.name) && authRequired && !isLogged) {
    next('/signin');
  } else {
    // Si el usuario está logeado, no podrá acceder a las rutas de autenticación (signin y signup).
    // authRoutes.includes(to.path) && isLogged ? next('/') : next();
    next();
  }
});

// Middleware rutas usuarios hosts
// Accomodation ads, publish new ad, edit ad, delete ad
// router.beforeEach(async (to, from, next) => {
//   const idUser: number = JSON.parse(sessionStorage.getItem('user'))?.id;
//   const userData: any = await getUserDataById(idUser);

//   const hostRouteNames: string[] = [
//     'account-accomodation-upload',
//     'user-ads',
//     'accomodation-edit',
//   ];

//   if (hostRouteNames.includes(to.name) && !userData.dni) {
//     next('/403');
//   } else {
//     next();
//   }
// });

export default router;
