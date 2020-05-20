<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { API_BASE_URL,ACCESS_TOKEN } from './constants';
import axios from "axios";
export default {
  name: "app",
  components: {},
  data() {
    return {
      rowSizesValue: [5, 10, 20]
    };
  },
  mounted:function(){
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
  /*  axios
      .get(API_BASE_URL + "/user/me", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem(USER_THEME, response.data.userSettings.theme);
      });
    if(localStorage.getItem(USER_THEME)=="Dark"){
      document.getElementById("app").style.color="#f1f1f1";
      document.getElementById("footer").style.backgroundColor="#191919";
    }*/
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
}

*:focus {
  outline: none;
}

html,
body {
  height: 100%;
  /*background-color: #F1F1F1;*/
  background-color: white;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#footer {
  background-color: white;
  z-index: 2;
  border-top: 2px solid grey;
  bottom: 0px;
}
</style>