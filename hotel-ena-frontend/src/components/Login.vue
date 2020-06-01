
<template>
  <div id="login">
    <router-view></router-view>
    <div id="right">
      <div id="right-content">
        <a id="btn btn-block social-btn google" href>
          <div id="google-sign"></div>
        </a>
        <div>
          <br />
          <br />
        </div>
        <button id="button" class="btn btn-block btn-primary" @click="showLoginForm">Login</button>
        <br />
        <button id="button2" class="btn btn-block btn-primary" @click="showRegisterForm">Sign Up</button>
      </div>
    </div>

    <div id="left">
      <h1>Hotel Ena Application</h1>
      <div></div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { GOOGLE_AUTH_URL, API_BASE_URL } from "../constants/index.js";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    showLoginForm() {
      console.log("enters");
      this.$router.push("/loginForm");
    },
    showRegisterForm() {
      console.log("enters");
      this.$router.push("/registerForm");
    }
  },
  mounted() {
    document.getElementById(
      "btn btn-block social-btn google"
    ).href = GOOGLE_AUTH_URL;
  }
};
</script>


<style scoped>
#login {
  height: 100vh;
}
#button {
  color: grey;
  background: #fff;
  height: 50px;
  width: 300px;
  background-position: center;
  background-size: cover;
}
#button2 {
  color: grey;
  background: #fff;
  height: 50px;
  width: 300px;
  background-position: center;
  background-size: cover;
}
#google-sign {
  height: 50px;
  width: 300px;
  background-image: url("../assets/google-signin.png");
  background-position: center;
  background-size: cover;
}
#button:hover {
  height: 60px;
}
#button2:hover {
  height: 60px;
}
#google-sign:hover {
  height: 60px;
}
.login-container {
  text-align: center;
}
.form-control {
  border: 2px solid grey;
}
.form-item {
  width: 200px;
}
.login-content {
  background: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  border-radius: 2px;
  width: 500px;
  display: inline-block;
  margin-top: 30px;
  vertical-align: middle;
  position: relative;
  padding: 35px;
}

#right {
  height: 100%;
  background-color: rgb(70, 142, 235);
  z-index: -1;
  clip-path: polygon(50% 0%, 100% 0, 100% 100%, 89% 100%, 10% 0, 29% 0);
  width: 100%;
  color: white;
}

#right-content {
  width: 30%;
  position: absolute;
  font-size: 20px;
  right: 15%;
  top: 30%;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
}

#right-content h1 {
  font-size: 30px;
  margin-top: 20px;
  transition: 0.3s;
  border: 1px solid white;
  padding: 5px 30px;
  border-radius: 5px;
}

#right-content h1:hover {
  cursor: pointer;
  color: rgb(233, 224, 224);
  font-size: 40px;
  background-color: white;
  color: rgb(70, 142, 235);
}

a {
  color: rgb(70, 142, 235);
  text-decoration: underline;
  display: block;
  width: auto;
  border: 1px solid white;
  background-color: white;
}

i {
  transition: 0.3s;
}

i:hover {
  cursor: pointer;
  color: rgb(233, 224, 224);
  font-size: 50px;
}

#left {
  clip-path: polygon(0 0, 0 100%, 100% 100%, 89% 100%, 10% 0);
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background-color: white;
}

#left h1 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  position: absolute;
  font-size: 68px;
  font-weight: 200;
  top: 66%;
  left: 9%;
  color: rgb(70, 142, 235);
  width: 420px;
  height: auto;
}

#logo {
  background-position: center;
  background-size: cover;
  height: 120px;
  width: 220px;
  top: 50%;
  left: 9%;
  position: absolute;
  display: block;
}

@media only screen and (max-width: 600px) {
  #login {
    display: block;
  }

  #right {
    clip-path: none;
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    text-align: center;
    background-color: white;
    color: rgb(48, 125, 226);
    position: absolute;
    top: 30%;
    z-index: 1;
  }

  #right-content {
    width: 100%;
    position: unset;
    width: 100%;
    text-align: center;
  }

  i {
    font-size: 90px;
  }

  #right-content h1 {
    font-size: 60px;
    margin-top: 20px;
    transition: 0.3s;
    border: 2px solid rgb(48, 125, 226);
  }

  #right-content h1:hover {
    background-color: rgb(48, 125, 226);
    color: white;
  }

  #right-content i:hover {
    color: rgb(116, 167, 233);
  }

  #left {
    float: none;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    height: 40%;
    clip-path: none;
    text-align: center;
    align-items: flex-end;
    padding-bottom: 20px;
    background-color: rgb(48, 125, 226);
    color: white;
    z-index: 1;
  }

  #left h1 {
    color: white;
    align-items: bottom;
    text-align: center;
    position: unset;
    width: 100%;
  }

  #logo {
    position: absolute;
    height: 70px;
    width: 220px;
    top: 10%;
    left: 50%;
    transform: translatex(-50%);
  }
}
</style>