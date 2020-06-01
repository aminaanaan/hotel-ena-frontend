import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from "vue-router"
import App from './App.vue'
import reservations from "./components/Reservations.vue"
import bills from "./components/Bills.vue"
import sale from "./components/Halls.vue"
import FormReservation from "./components/FormReservation.vue"
import formBill from "./components/FormBill.vue"
import FormSoba from "./components/FormRoom.vue"
import FormUser from "./components/FormUser.vue"
import user from "./components/Users.vue"
import login from "./components/Login.vue"
import Dashboard from "./components/Dashboard.vue"
import Profil from "./components/Profile.vue"
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue"
import Error from "./components/Error.vue"
import registration from "./components/FormRegistration.vue"
import Sobe from "./components/Rooms.vue"
import FormSala from "./components/FormHall.vue"
import loginForm from "./components/FormLogin.vue"
import Navigation from "./components/Navigation.vue"

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [
    {
      path: "/",
    
      component: login,
      redirect: "/login",
      
    },
    {
      path: "/login",
      component: login
    },
  {
    path:"/loginForm",
    component:loginForm
  },
  {
    path:"/registerForm",
    component:registration
  },
    {
      path: "/oauth2/redirect",
      component: OAuth2RedirectHandler
    },
    {
      path: "/error",
      component: Error

    },
    {
      path:"/navigation",
      component: Navigation
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children:
        [
          {
            path: "rooms",
            component: Sobe,
            children:
              [
                {
                  path: "newRoom",
                  component: FormSoba
                },
                {
                  path: "updateRoom/:id",
                  component: FormSoba
                }
              ]
          },
          {
            path: "reservations",
            component: reservations,
            children:
              [
                {
                  path: "newReservation",
                  component: FormReservation
                },
                {
                  path: "updateReservation/:id",
                  component: FormReservation
                }
              ]
          },
          {
            path: "bills",
            component: bills,
            children:
              [
                {
                  path: "newBill",
                  component: formBill
                },
                {
                  path: "updateBill/:id",
                  component: formBill
                }
              ]
          },
          {
            path: "halls",
            component: sale,
            children:
              [
                {
                  path: "newHall",
                  component: FormSala
                },
                {
                  path: "updateHall/:id",
                  component: FormSala
                }
              ]
          },
          {
            path: "user",
            component: user,
            children:
              [
                {
                  path: "newUser",
                  component: FormUser
                }
              ]
          },
         
          {
            path: "/profile",
            component: Profil
          },
        ]
    },
  ],
  mode: "history"
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
