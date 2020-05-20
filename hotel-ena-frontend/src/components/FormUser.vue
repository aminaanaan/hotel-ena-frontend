<template>
  <div id="formaU">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            <span id="createUser">Create User</span>

            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>
        <div id="inner-wrap">
          <label class="la">Email</label>
          <input
            type="text"
            name="field1"
            v-model="email"
            id="field1"
            :class="{errorBorder: emailError, noErrorBorder: !emailError}"
            placeholder="New user email"
            autocomplete="off"
          />
          <span v-show="emailError">Email address is not valid</span>
          <br />
          <label class="la">Role</label>

          <select
            id="field2"
            v-model="roleType"
            :class="{errorBorder: roleError, noErrorBorder: !roleError}"
          >
            <option disabled selected>{{roleType}}</option>

            <option v-for="rol in role" :key="rol.name">{{ rol }}</option>
          </select>
          <span v-show="roleError">User role is required</span>

          <input type="button" value="Save" @click="save" id="submit" class="input-options" />
          <input type="button" value="Cancel" @click="exit" id="cancle" class="input-options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ACCESS_TOKEN,
  USER_LANGUAGE,
  USER_THEME,
  ROLE,
  CREATEUSER,
  CANCEL,
  SAVE,
  NEWUSERROLE,
  NEWUSEREMAIL,
  USER,
  API_BASE_URL
} from "../constants/index.js";

import axios from "axios";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "formaU",
  data() {
    return {
      email: "",
      role: ["ADMIN", localStorage.getItem(USER)],
      roleType: localStorage.getItem(NEWUSERROLE),
      emailError: false,
      roleError: false,
      liveValidation: false,
      invalid: false,
      formType: "Create",
      rule: /.*\@\w{1,}\.\w{1,}/
    };
  },
  mounted: async function() {
    if (localStorage.getItem(USER_THEME) == "light") {
      document.getElementById("form-style-10").style.backgroundColor = "white";
      //document.getElementById("messages").style.backgroundColor="white";
    } else if (localStorage.getItem(USER_THEME) == "dark") {
      document.getElementById("form-style-10").style.backgroundColor = "black";
      //document.getElementById("messages").style.backgroundColor="black";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementById("createUser").innerHTML = localStorage.getItem(
        CREATEUSER
      );
      document.getElementById("field1").placeholder = localStorage.getItem(
        NEWUSEREMAIL
      );
      document.getElementById("createUser").style.color = "black";
      document.getElementsByTagName(
        "LABEL"
      )[2].innerHTML = localStorage.getItem(ROLE);
      document.getElementById("cancle").value = localStorage.getItem(CANCEL);

      document.getElementsByTagName("INPUT")[1].value = localStorage.getItem(
        SAVE
      );
    }
     if(localStorage.getItem(USER_THEME)=="Dark"){
        document.getElementById("cancle").style.backgroundColor="#191919";
        document.getElementById("cancle").style.color="white";
      document.getElementById("createUser").style.color="white";
      document.getElementById("form-style-10").style.backgroundColor="#191919";
       document.getElementById("inner-wrap").style.backgroundColor="#191919";
       document.getElementsByTagName("label")[0].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[1].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[2].style.backgroundColor="#191919";

    }
  },
  methods: {
    exit() {
      this.$router.go(-1);
    },
    async save() {
    if(this.roleType=="KORISNIK") this.roleType="USER";
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      this.liveValidation = true;
      if (this.check_email(this.email) == false) this.invalid = true;
      if (this.check_roleType(this.roleType) == false) this.invalid = true;
      if (this.invalid == true) {
        this.invalid = false;
        return;
      } else {
        if (this.$route.params.id == null) {
          try {
            await axios.post(
              API_BASE_URL + "/user/create",
              {
                email: this.email,
                role: this.roleType
              },
              { headers: headers }
            );
          } catch (err) {
            this.$emit("show-notification", -1);
            this.$router.go(-1);
            return;
          }
        } else {
          try {
            await axios.get(
              API_BASE_URL + "/user/getAllUsers/" + this.$route.params.id,
              { title: this.title, text: this.text },
              { headers: headers }
            );
          } catch (err) {
            this.$emit("show-notification", -1);
            this.$router.go(-1);
            return;
          }
        }
        this.$emit("reload-users");
        this.$emit("show-notification");
        this.$router.go(-1);
      }
    },
    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      try {
        const res = await axios.get(
          API_BASE_URL + "/user/getAllUsers/" + this.$route.params.id, 
          { headers: headers }
        );
        this.title = res.data.title;
        this.text = res.data.text;
      } catch (err) {
        this.$emit("show-notification", -1);
      }
    },

    check_email(value) {
      if (!this.rule.test(value)) {
        this.emailError = true;
        return false;
      } else {
        this.emailError = false;
        return true;
      }
    },

    check_roleType(value) {
      if (this.roleType == "New user role") {
        this.roleError = true;
        return false;
      } else {
        this.roleError = false;
        return true;
      }
    }
  },
  watch: {
    email(value) {
      this.email = value;
      if (this.liveValidation == true) this.check_email(value);
    },

    roleType(value) {
      this.triggerType = value;
      if (this.liveValidation == true) this.check_roleType(value);
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
#createUser{
  color: #4d4d4d;
}
#form-style-10 {
  width: 640px;
  height: 480px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 99;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#form-style-10 label {
  font: 13px Arial, Helvetica, sans-serif;
  color: #888;
  margin-bottom: 15px;
}

#form-style-10 input[type="text"],
#form-style-10 input[type="date"],
#form-style-10 input[type="datetime"],
#form-style-10 input[type="email"],
#form-style-10 input[type="number"],
#form-style-10 input[type="search"],
#form-style-10 input[type="time"],
#form-style-10 input[type="url"],
#form-style-10 input[type="password"],
#form-style-10 textarea,
#form-style-10 select {
  padding-top: 10px;
  overflow: none;
  margin-bottom: 20px;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  height: 40%;
  padding: 8px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  font-size: 15px;
}

#form-style-10 #section {
  font: normal 23px "Bitter", serif;
  padding-left: 20px;
}

#form-style-10 #section p {
  width: 100%;
  height: 20%;
  font-weight: bold;
  color: black;
  margin-top: 18px;
}

#form-style-10 input[type="button"] {
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
}

#form-style-10 #submit {
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 18%;
  height: 30%;
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

#form-style-10 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}

#form-style-10 .privacy-policy {
  float: right;
  width: 250px;
  font: 12px Arial, Helvetica, sans-serif;
  color: #4d4d4d;
  margin-top: 10px;
  text-align: right;
}

#textarea {
  display: block;
  overflow: none;
  height: 100%;
  width: 100%;
}

#close-icon {
  display: inline;
  text-align: right;
  float: right;
  margin: 0 20px 10px 0px;
}

#close-icon,
#submit,
#cancle:hover {
  cursor: pointer;
}

.la {
  display: inline-block;
  background-color: white;
  position: relative;
  top: 23px;
  left: 13px;
  padding: 0px 7px;
}

.input-options {
  position: relative;
  top: 100px;
}

.errorBorder {
  border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder {
  border: 1px inset rgba(0, 0, 0, 0.2);
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}
</style>
