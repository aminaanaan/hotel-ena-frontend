<template>
  <div id="settings2">
    <router-view></router-view>
    <div id="header">
      <h1 id="title">Settings</h1>
    </div>
    <div class="data" id="profile">
      <br />
      <br />
      <div id="select1">
            <button
              id="color"
            >Select Theme</button>
            <br />
            <br />
         <input type="radio" id="one" value="Dark" v-model="picked1" @click="showThemeSettings('Dark')">
<label id="dark" for="one">Dark</label>
<br>
<br>
<input type="radio" id="two" value="Light" v-model="picked1" @click="showThemeSettings('Light')">
<label id="light" for="two">Light</label>
<br>
<br>
<br>
      </div>
      <br />
      <div id="select2">
            <button
              id="language" 
            >Select Language</button>
            <br />
            <br />
         <input type="radio" id="one1" value="English" v-model="picked2" @click="showLanguageSettings('en')" >
<label id="english" for="one1">English</label>
<br>
<br>
<input type="radio" id="two1"  value="Bosnian" v-model="picked2" @click="showLanguageSettings('fr')">
<label id="bosnian" for="two1">Bosnian</label>
<br>
<br>
<br>
</div>
      <input type="button" value="Save" @click="Save()" id="submit" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  API_BASE_URL,
  MESSAGES,
  SCHEDULES,
  USERS,
  TITLE,
  TEXT,
  MESSAGE,
  NEXTRUN,
  REPEAT,
  CHANNEL,
  TRIGGER,
  ACTIVE,
  NAME,
  ROLE,
  CREATEDAT,
  LANGUAGEFR,
  LANGUAGEEN,
  DARK,
  LIGHT
} from "../constants/index.js";
import {
  USER_EMAIL,
  USER_THEME,
  SETTINGS,
  THEME,
  LANGUAGE,
  SELECTCOLOR,
  SELECTLANGUAGE,
  USER_LANGUAGE,
  PICKED
} from "../constants/index.js";
import { ACCESS_TOKEN, TRIGGERS, ACTIVEAT } from "../constants/index.js";
import { SAVE } from "../constants/index.js";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "settings2",
  data() {
    return {
      picked1:"",
      picked2:"",
    };
  },
  mounted: function() {
   
    if (localStorage.getItem(USER_THEME)=="Light") {
      document.getElementById("two").checked=true;
      this.$emit("change-light");
      document.getElementById("settings2").style.backgroundColor = "white";
      document.getElementById("settings2").style.color = "black";
      document.getElementById("header").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME)=="Dark") {
      document.getElementById("one").checked=true;
       this.$emit("change-dark");
      document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("settings2").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("profile").style.backgroundColor = "#191919";
      document.getElementById("select1").style.color= "white";
       document.getElementById("select2").style.color= "white";
    }
  document.getElementById("one1").checked=true;
    if(localStorage.getItem(USER_LANGUAGE)=="fr"){
       document.getElementById("two1").checked=true;
       document.getElementById("one1").checked=false;
          document.getElementById("color").innerHTML = localStorage.getItem(
           SELECTCOLOR
          );
          document.getElementById("language").innerHTML = localStorage.getItem(
            SELECTLANGUAGE
          );
          document.getElementById("title").innerHTML = localStorage.getItem(
            SETTINGS
          );
          document.getElementById("submit").value = localStorage.getItem(SAVE);
          document.getElementById("english").innerHTML= localStorage.getItem(LANGUAGEEN);
          document.getElementById("bosnian").innerHTML= localStorage.getItem(LANGUAGEFR);
          document.getElementById("dark").innerHTML=localStorage.getItem(DARK);
          document.getElementById("light").innerHTML=localStorage.getItem(LIGHT);
  }
        },
  methods: {
    showLanguageSettings(value){
      document.getElementById("one1").checked=false;
      document.getElementById("two1").checked=false;
  if(value=="en")
   document.getElementById("one1").checked=true;
   else
   document.getElementById("two1").checked=true;


    },
    showThemeSettings(value) {
      document.getElementById("one").checked=false;
      document.getElementById("two").checked=false;
      if (value=="Dark") {
        document.getElementById("one").checked=true;
        this.$emit("change-dark");
        document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("settings2").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("profile").style.backgroundColor = "#191919";
      document.getElementById("select1").style.color= "white";
       document.getElementById("select2").style.color= "white";
       //document.getElementById("profile").style.color="white";
      } else if (value=="Light") {
         document.getElementById("two").checked=true;
        this.$emit("change-light");
        document.getElementsByTagName("H1")[0].style.color="black";
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("settings2").style.backgroundColor = "white";
        document.getElementById("settings2").style.color = "black";
        document.getElementById("profile").style.backgroundColor = "#f1f1f1";
        document.getElementById("select1").style.color= "black";
       document.getElementById("select2").style.color= "black";
      }

    },
    Save() {
       let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      if(this.picked2=="English")
      localStorage.setItem(USER_LANGUAGE,"en");
      else if(this.picked2=="Bosnian")
      localStorage.setItem(USER_LANGUAGE,"fr");
       if(this.picked1!="")
      localStorage.setItem(USER_THEME,this.picked1);
         axios
        .post(
          API_BASE_URL + "/user/userSettings",
          { theme: localStorage.getItem(USER_THEME), language: localStorage.getItem(USER_LANGUAGE)},
          {
            headers: headers
          }
        )
        .then(
          response => {
            localStorage.setItem(USER_THEME, response.data.theme);
            localStorage.setItem(USER_LANGUAGE, response.data.language);
            console.log(response);
              return    axios
      .get(API_BASE_URL + "/user/translation", {
        params: {
          language: localStorage.getItem(USER_LANGUAGE)
        },
        headers: headers
      })
      .then(
        response => {
          for (var key in response.data) {
    if (response.data.hasOwnProperty(key)) {
        localStorage.setItem(key,response.data[key]);
    }
}
document.getElementById("color").innerHTML = localStorage.getItem(
           SELECTCOLOR
          );
          document.getElementById("language").innerHTML = localStorage.getItem(
            SELECTLANGUAGE
          );
          document.getElementById("title").innerHTML = localStorage.getItem(
            SETTINGS
          );
          document.getElementById("submit").value = localStorage.getItem(SAVE);
          document.getElementById("english").innerHTML= localStorage.getItem(LANGUAGEEN);
          document.getElementById("bosnian").innerHTML= localStorage.getItem(LANGUAGEFR);
          document.getElementById("dark").innerHTML=localStorage.getItem(DARK);
          document.getElementById("light").innerHTML=localStorage.getItem(LIGHT);
            this.picked1="";
        this.picked2="";
  
       if(localStorage.getItem(USER_LANGUAGE)!="en"){
         document.getElementById("one1").checked=false;
       document.getElementById("two1").checked=true;
          
  }
    if (localStorage.getItem(USER_THEME) == "Light") {
      document.getElementById("two").checked=true;
    }
    else if (localStorage.getItem(USER_THEME) == "Dark") {
      document.getElementById("one").checked=true;
    }
      this.$emit("change-language");
      window.location.reload();
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
          },
          error => {
            console.log(error);
          }
        );
       
      }


      
  }
};
</script>
<style scoped>
#settings2 {
  padding: 20px;
  padding-bottom: 0px;
  height: 100vh;
}
#header[data-v-47aa12d3] {
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}
h1[data-v-47aa12d3] {
  margin-left: 0px;
  color: #2c3e50;
  margin-top: 0px;
  width: 200px;
  float: left;
}
#header {
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}
.data p[data-v-47aa12d3] {
  margin-left: 20px;
  text-align: left;
  display: inline;
}
button[data-v-47aa12d3] {
  float: left;
  text-align: center;
}
#option {
  width: 100%;
  text-align: center;
  padding-top: 5px;
}
#settings2 input[type="button"] {
  margin-right: 15px;
  float: right;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #4d4d4d;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  border: 1px solid #257c9e;
  font-size: 15px;
  border: none;
  background: #fff;
  margin-top: 30px;
  margin-left: 20px;
}

#settings2 #submit {
  position: absolute;
  bottom: 40%;
  right: 10%;
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 18%;
  overflow: hidden;
  background: #0080ff;
  padding: 8px 20px 8px 20px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  border: 1px solid #0080ff;
  font-size: 15px;
}

#settings2 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
#usersdata {
  float: right;
  height: 72px;
  margin-top: 0px;
}
#usersdata:hover {
  background-color: #f1f1f1;
}
h1 {
  float: left;
}
#settings2 {
  width: 100%;
  height: 100%;
  background-color: white;
}
.data p {
  margin-left: 20px;
  float: left;
  text-align: left;
  display: inline;
}
.data {
  background-color: #f1f1f1;
  margin-top: 20px;
  width: 100%;
  margin-right: 20px;
}
#email {
  float: left;
  width: 30%;
}
#ime {
  float: left;
  width: 30%;
}
#profile {
  display: flex;
  flex-direction: column;
  height: 60%;

  text-align: left;
}
#pic {
  margin-top: 10px;
  margin-left: 10px;
  float: left;
}
button {
  float: left;
}
#select1,#select2 {
  display: inline;
  margin-left: 3%;
  padding-top:2%;
  color:#2c3e50;
  font-size:120%;
}
input{
  font-size:30%;
}
label{
  text-align:center;
  font-weight:300;

}
span{
  font-weight:100;
}

</style>
