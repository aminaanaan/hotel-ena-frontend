<template>

  <div id="error">
    <img id="pic" class="img-circle" width="500" height="300" src="../assets/404.png"/>
    <h1> 404 Error</h1>
    <div class="data">
      <br />
      <br />
        <p class="center1">  Error occured while loading the resources. </p> <br>  <p class="center"> | </p> <br>
         <p class="center" > | </p> <br>
          <p class="center"> | </p> <br>
           <p class="center"> | </p> <br>
         <p class="center" > | </p> <br>
          <p class="center"> | </p> <br><p class="center1" > Please login again. </p>
        <p class="center"> | </p> <br>
         <p class="center" > | </p> <br>
          <p class="center"> | </p> <br>
           <p class="center"> | </p> <br>
         <p class="center" > | </p> <br>
          <p class="center"> | </p> <br>
      <br />
<input type="button" value="Go back to the login page" id="submit" @click="goBack()" />

    </div>
  </div>
</template>
<script>
import { ACCESS_TOKEN } from "../constants/index.js";
export default {
  name: "error",
  mounted: function() {

     /* if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("H1").innerHTML=localStorage.getItem(ERROR);
    }*/
    if (localStorage.getItem(THEME) == "light") {
      document.getElementById("error").style.backgroundColor = "white";
    } else if (localStorage.getItem(THEME) == "dark") {
      document.getElementById("error").style.backgroundColor = "black";
    }
        localStorage.setItem(ACCESS_TOKEN, "");
        localStorage.setItem(CURRENT_USER_ROLE, "");
        localStorage.setItem(THEME, "");
        localStorage.setItem(CURRENT_USER_ROLE, "");
        localStorage.setItem(USER_EMAIL, "");
        //localStorage.setItem(USER_LANGUAGE, "");
        localStorage.setItem(USER_NAME, "");
        localStorage.setItem(USER_PIC, "");

  },
  methods: {
    goBack() {
      this.$router.push("/login");
    }
  }
};

</script>
<style scoped>
#error{
  margin:auto;
  width:50%;
  height:100%;
}
#submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
#submit {
  overflow: none;
  margin-top:600px;
  margin: auto;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: auto;
  height: 30px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 30%;
  overflow: hidden;
  background: #0080ff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  border: 1px solid #0080ff;
  font-size: 17px;
}
.center{
  margin:auto;
  width:2px;
}
.center1{
  width:30%;
  margin:auto;
}
</style>

