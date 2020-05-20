<template>
  <div id="Dashboard">
    <div id="nav-bar">
      <navigation />
    </div>
    <div id="dropdown">
      <v-menu open-on-hover top offset-y offset-x left>
        <template v-slot:activator="{ on }">
          <div id="usersdata" v-on="on">
            <i id="icon" class="material-icons">arrow_drop_down</i>
            <button id="picture">
              <img id="pic" class="img-circle" width="80" height="70" />
            </button>
            <div id="credentials">
              <h3 id="name"></h3>
              <br />
              <p id="email"></p>
            </div>
          </div>
        </template>
        <ul id="settings">
          <li
            class="options"
            v-for="(item, index) in items"
            :key="index"
            @click="showDropdown(index)"
          >
            <p class="option">{{ item.title }}</p>
          </li>
        </ul>
      </v-menu>
    </div>
    <div id="dashboard">
      <div id="table">
        <router-view
          @change-language="Translate()"
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL, USER_LANGUAGE, SETTINGS } from "../constants/index.js";
import { USER_EMAIL } from "../constants/index.js";
import {
  CURRENT_USER_ROLE,
  THEME_ID,
  USER_THEME,
  THEME,
  USER_NAME,
  USER_PIC,
  LOGOUT,
  PROFILE
} from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";
import navigation from "./Navigation.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: {
    navigation
  },
  data() {
    return {
      items: [{ title: "Profile" }, { title: "Settings" }, { title: "Log Out" }]
    };
  },

  mounted: async function() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
    await axios
      .get(API_BASE_URL + "/korisnik/me", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem(USER_EMAIL, response.data.email);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(USER_PIC, response.data.imageUrl);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        localStorage.setItem(USER_THEME, response.data.userSettings.theme);
        localStorage.setItem(
          USER_LANGUAGE,
          response.data.userSettings.language
        );
        
      })
      .catch(err => {
        console.log(err);
      });


   
  },
  methods: {
    showDropdown(index) {
      if (index == 0) {
        this.$router.push("/profile");
      } else if (index == 1) {
        this.$router.push("/settings");
      } else if (index == 2) {
        localStorage.setItem(ACCESS_TOKEN, "");
        localStorage.setItem(CURRENT_USER_ROLE, "");
        localStorage.setItem(USER_THEME, "");
        localStorage.setItem(CURRENT_USER_ROLE, "");
        localStorage.setItem(USER_EMAIL, "");
        localStorage.setItem(USER_LANGUAGE, "");
        localStorage.setItem(USER_NAME, "");
        localStorage.setItem(USER_PIC, "");
        this.$router.push("/login");
      }
    },
    Translate() {
      if (localStorage.getItem(USER_LANGUAGE) == "fr") {
        this.items[0].title = localStorage.getItem(PROFILE);
        this.items[1].title = localStorage.getItem(SETTINGS);
        this.items[2].title = localStorage.getItem(LOGOUT);
      }
      navigation.methods.Translate();
    }
  }
};
</script>

<style scoped>
#dropdown{
  width: 5%;
  height: 100vh;
  margin-bottom: 0px;
  float: right;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  color: #2c3e50;
}

#settings {
  background-color: #006bf5;
  border-collapse: collapse;
}

#name {
  margin-right: 10px;
  margin-top: 10px;
  float: right;
}
#email {
  margin-left: 10px;
  margin-top: 10px;
  float: right;
}
#pic {
    border-radius: 50%;
    float: right;
    margin-top: 20px;
    height: 60px;
    width: 60px;
}
.options {
  width: 100%;
  height: 30px;
  text-align: center;
  border-collapse: collapse;
  border-width: 0 0 1px 1px;
  border-radius: 1px;
  background-color: #f1f1f1;
}
.option {
  padding-top: 5px;
  box-sizing: border-box;
  width: 300px;
  height: 100%;
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  text-decoration: bold;
  border-collapse: collapse;
}
.option:hover {
  color: white;
  background-color: #006bf5;
  cursor: pointer;
}
#usersdata {
  float: right;
  height: 0px;
  margin-top: 0px;
}

#credentials {
  height: inherit;
  float: right;
  margin-right: 10px;
  margin-top: 5px;
  display: none;
}
#icon {
  float: right;
  margin-top: 25px;
  display: none;
  margin-right: 10px;
}
* {
  box-sizing: border-box;
  margin: 0px;
}

html,
body {
  height: 100%;
  background-color: #f1f1f1;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav-bar {
  height: 100%;
  width: 6%;
  float: left;
}

#dashboard {
  width: 89%;
  height: 100%;
  float: left;
}

#table {
  height: 100vh;
}

#footer {
  background-color: white;
  z-index: 2;
  border-top: 2px solid grey;
  bottom: 0px;
}
#picture {
  margin-top: 0px;
  float: right;
}
</style>