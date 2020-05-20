<template>
  <div id="profile1">
    <div id="header">
      <h1>Profile</h1>
    </div>
    <br />
    <div class="data" id="profile">
      <img id="pic1" class="img-circle" width="100" height="100" />
      <br />
      <br />
      <p>
        <strong>Name:</strong>
      </p>
      <p id="name1"></p>
      <br />
      <p>
        <strong>Email:</strong>
      </p>
      <p id="email1"></p>
      <br />
      <p>
        <strong>Language:</strong>
      </p>
      <p id="language1"></p>
      <br />
      <p>
        <strong>Theme:</strong>
      </p>
      <p id="theme1"></p>
      <br />
      <p>
        <strong>Role:</strong>
      </p>
      <p id="role1"></p>
      <br />
    </div>
  </div>
</template>
<script>
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  USER_EMAIL,
  LANGUAGE,
  USER_THEME,
  CURRENT_USER_ROLE,
  NAME,
  USER_LANGUAGE,
  THEMEPARAGRAPH,
  ROLE,
  PROFILE,
  COLOR,
  LOGOUT,
  THEME,
  USER_NAME,
  USER_PIC
} from "../constants/index.js";
export default {
  name: "profil",
  mounted: function() {
    document.getElementById("email1").innerHTML = localStorage.getItem(
      USER_EMAIL
    );
    document.getElementById("name1").innerHTML = localStorage.getItem(
      USER_NAME
    );
    document.getElementById("pic1").src = localStorage.getItem(USER_PIC);
    document.getElementById("language1").innerHTML = localStorage.getItem(
      "language" + localStorage.getItem(USER_LANGUAGE).toUpperCase()
    );
    document.getElementById("theme1").innerHTML = localStorage.getItem(
      USER_THEME
    );
    document.getElementById("role1").innerHTML = localStorage.getItem(
      CURRENT_USER_ROLE
    );
    if (localStorage.getItem(USER_THEME) == "Light") {
      this.$emit("change-light");
      document.getElementById("profile1").style.backgroundColor = "white";
      document.getElementById("profile1").style.color = "black";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
      this.$emit("change-dark");
      document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("profile").style.backgroundColor = "#191919";
      document.getElementById("profile").style.color = "black";
      //document.getElementById("profile").style.backgroundColor = "black";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("table").style.backgroundColor = "black";
      document.getElementById("profile").style.color = "white";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
        PROFILE
      );
      document.getElementsByTagName("P")[4].innerHTML =
        localStorage.getItem(NAME) + ":";
      document.getElementsByTagName("P")[8].innerHTML =
        localStorage.getItem(LANGUAGE) + ":";
      document.getElementsByTagName("P")[10].innerHTML = localStorage.getItem(
        THEME
      );
      document.getElementsByTagName("P")[12].innerHTML =
        localStorage.getItem(ROLE) + ":";
      document.getElementById("submit").innerHTML = localStorage.getItem(
        LOGOUT
      );
    }
  },
  methods: {
    signOut() {
      localStorage.setItem(ACCESS_TOKEN, "");
      localStorage.setItem(CURRENT_USER_ROLE, "");
      localStorage.setItem(THEME, "");
      localStorage.setItem(CURRENT_USER_ROLE, "");
      localStorage.setItem(USER_EMAIL, "");
      localStorage.setItem(USER_LANGUAGE, "");
      localStorage.setItem(USER_NAME, "");
      localStorage.setItem(USER_PIC, "");
      alert("You're safely logged out!");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.data p[data-v-47aa12d3] {
  text-align: left;
  display: inline;
}

#profile .data {
  padding-bottom: 0px;
  height: auto;
  background-color: #f1f1f1;
}
p {
  font-size: 16.8px;
}
#profile1 {
  padding: 20px;
  height: 100%;
  width: 100%;
}
#profile {
  background-color: #f1f1f1;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 0px;
  height: auto;
}

h1 {
  text-align: left;
  color: #2c3e50;
  margin-top: 0px;
  margin-bottom: 0px;

  width: 200px;
  float: left;
}

#header {
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}
.data p {
  margin-left: 20px;
  float: left;
  text-align: left;
}
.data {
  margin-left: 0px;
  width: 100%;
}
#email {
  float: left;
  width: 30%;
  color: black;
}
#name {
  float: left;
  width: 30%;
}
#profile {
  display: flex;
  flex-direction: column;
  text-align: left;
}
#pic {
  float: left;
}
button {
  float: left;
  padding-top: 30px;
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
#submit {
  position: absolute;
  bottom: 420px;
  right: 100px;
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
#submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.data {
  background-color: #f1f1f1;
  width: 100%;
}
#name1,
#language1,
#role1,
#theme1,
#email1 {
  font-weight: 300;
}
</style>