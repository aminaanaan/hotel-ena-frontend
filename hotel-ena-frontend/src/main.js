import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from "vue-router"
import App from './App.vue'
import messages from "./components/Reservations.vue"
import schedules from "./components/Racuni.vue"
import triggers from "./components/Triggers.vue"
import FormReservation from "./components/FormReservation.vue"
import formaS from "./components/FormRacun.vue"
import FormTrigger from "./components/FormSoba.vue"
import FormUser from "./components/FormUser.vue"
import user from "./components/Users.vue"
import login from "./components/Login.vue"
import Dashboard from "./components/Dashboard.vue"
import Profil from "./components/Profile.vue"
import settings from "./components/Settings.vue"
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.vue"
import Error from "./components/Error.vue"

import Poll from "./components/Poll.vue"
import FormPoll from "./components/FormPoll.vue"
import Activity from "./components/Activity.vue"
import viewPoll from "./components/viewPoll.vue"

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
      path: "/oauth2/redirect",
      component: OAuth2RedirectHandler
    },
    {
      path: "/error",
      component: Error

    },
    {
      path: "/dashboard",
      component: Dashboard,
      children:
        [
          {
            path: "poll",
            component: Poll,
            children:
              [
                {
                  path: "newPoll",
                  component: FormPoll
                },
                {
                  path: "viewPoll/:id",
                  component: viewPoll
                }
              ]
          },
          {
            path: "rezervacije",
            component: messages,
            children:
              [
                {
                  path: "newReservation",
                  component: FormReservation
                },
                {
                  path: "newReservation/:id",
                  component: FormReservation
                },
                {
                  path: "newTrigger/:id",
                  component: FormTrigger
                },
                {
                  path: "newSchedule/:id",
                  component: formaS
                },
                {
                  path: "updateMessage/:id",
                  component: FormReservation
                }
              ]
          },
          {
            path: "racuni",
            component: schedules,
            children:
              [
                {
                  path: "newBill",
                  component: formaS
                },
                {
                  path: "newBill/:id",
                  component: formaS
                }
              ]
          },
          {
            path: "triggers",
            component: triggers,
            children:
              [
                {
                  path: "newTrigger",
                  component: FormTrigger
                },
                {
                  path: "updateTrigger/:id",
                  component: FormTrigger
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
            path: "activity",
            component: Activity,
          },
          {
            path: "/settings",
            component: settings
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
