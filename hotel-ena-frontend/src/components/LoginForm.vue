<template>
  <div id="pollView">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p id="pollViewTitle">
            Login
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>
        <div id="inner-wrap">
          <label class="la">Email</label>
          <input type="text" name="field1" id="field1" v-model="email" placeholder="Enter your email"/>
 <label class="la">Password</label>
          <input type="password" name="field1" id="field1" v-model="password" placeholder="Enter your password"/>
         
 <input type="button" value="Save" id="submit" @click="save" />
          <input type="button" value="Cancel" @click="exit" id="cancle" class="input-options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL,ACCESS_TOKEN } from "../constants/index.js";

import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";
/*const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + //localStorage.getItem(ACCESS_TOKEN)
};*/

export default {
  name: "pollView",
  data() {
    return {
      title: "",
      choiceList: [],
      password:"",
      email:"",
    };
  },

  mounted: function() {
  
    this.create();
  },
  methods: {
    exit() {
      this.$router.go(-1);
    },
    async save(){
 try {
           const res= await axios.post(
              API_BASE_URL + "/auth/login",
              {
              email:this.email,
              password:this.password
              },
              //{ headers: headers }
            );
            if(res.status==200){
            localStorage.setItem(ACCESS_TOKEN,res.data.accessToken)
            this.$router.push("/dashboard/rezervacije")
            }
            else {
      this.$router.push("/error");
    }
            this.$emit("show-notification");
          } catch (err) {
            this.$emit("show-notification", -1);
          }
    },
   /* async create() {
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/polls/" + this.$route.params.id
        );
        this.title = res.data.title;
        this.choiceList = res.data.choiceList;
      } catch (err) {
        this.$emit("show-notification", -1);
      }*/
    //}
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

#form-style-10 {
  width: 640px;
  height: auto;
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
  z-index: 120;
  padding-bottom: 50px;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  padding-top: 0px;
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
  border: 1px inset rgba(0, 0, 0, 0.2);
  font-size: 15px;
}

ul li {
  padding-top: 10px;
  margin-bottom: 20px;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 40%;
  padding: 10px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border: 1px inset rgba(0, 0, 0, 0.2);
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  top: 10px;
}

#form-style-10 #choiceButton {
  float: right;
  height: 30px;
  width: 30px;
  background-color: #0080ff;
  color: white;
  border-radius: 50%;
  font-size: 25px;
  line-height: 10px;
}
</style>