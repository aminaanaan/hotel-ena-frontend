<template>
  <div id="FormHall" v-if="dataReady">
        <router-view  @show-notification="showNotification($event)"></router-view>
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            
            <span id="formTitle">Hall</span>
          </p>
        </div>
        <label class="la">Number Of People</label>
        <div id="inner-wrap">
          <input
            autocomplete="off"
            type="text"
            name="field1"
            placeholder="New hall number of people"
            v-model="numOfPpl"
            id="field1"
            :class="{errorBorder: showTitleError, noErrorBorder: !showTitleError}"
          />

          <br />
          <br />

          
         <label class="container">
            <p class="checkText">Busy</p>

            <input
              type="checkbox"
              checked="busy"
              v-model="busy"
            />
            <span class="checkmark"></span>
          </label>  
          <br />

          <br />
          <br />

          <input type="button" value="Save" @click="save" id="submit" class="input-options" />
          <input type="button" value="Cancel" @click="exit" id="cancle" class="input-options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ACCESS_TOKEN
} from "../constants/index.js";
import axios from "axios";
import DatePicker from "vue2-datepicker";
import { API_BASE_URL } from "../constants";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "FormHall",

  components: { DatePicker },

  data() {
    return {
      numOfPpl:"",
      liveValidation: false,              
busy:false,
dataReady:false,
  textNoti: "",
        showNotificationValue: false,
         error:"",
      errorOccured: false,
      showNoti: false,
    };
  },

  mounted: async function() {
   if (this.$route.params.id != null) {
      await axios.get(
          API_BASE_URL + "/user/reservation/hall/" + this.$route.params.id,
          {headers:headers}
        ).then((res)=> {
        this.numOfPpl = res.data.numberOfPeople;
        //console.log(this.numOfBeds);
        this.busy=res.data.busy;       
     console.log(res);
 this.showNotification(200,res);
 this.dataReady=true;
}, (error) => {
  console.log(error.message);
  this.showNotification(-1,error.message);
  this.dataReady=true;
});;
  }
   else{
       this.dataReady=true;
     }
  }
   ,

  methods: {
     closeNotification(){
      this.showNotificationValue = false;
    },

       showNotification(value,text) {
      if (value == -1) {
        this.textNoti = text;
        this.errorOccured = true;
      } else {
        this.errorOccured = false;
        this.textNoti = text;
      }
      this.showNoti = !this.showNoti;
      setTimeout(this.closeNoti, 1500);
      {
      }
    },
    exit() {
      this.$emit("reload-halls");
      this.$router.go(-1);
    },
    async save() {
      if (this.$route.params.id == null) {
         
            await axios.post(
              API_BASE_URL + "/user/reservation/hall",
              {
                
              
                numberOfPeople: this.numOfPpl,
                busy: this.busy,
               
              },
              { headers: headers }
            ).then((response) => {
              console.log(response);
 this.showNotification(200,response);
 this.exit();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1,error.message);
});;
         
          
        } else {
            await axios.put(
              API_BASE_URL + "/user/reservation/hall/" + this.$route.params.id,
                {
              
               numberOfPeople: this.numOfPpl,
                busy: this.busy,
               
              },
                 { headers: headers }
            ).then((response) => {
              console.log(response);
 this.showNotification(200,response);
 this.exit();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1,error.message);
});;
      
    }
    }

  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
#formTitle{
  color: #4d4d4d;
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

#choicesList{
  height: 130px;
  overflow: auto;
}

.mx-input {
  overflow: visible;
}

.mx-input-append {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
}

.mx-datepicker {
  width: 100%;
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
  left: 30px;
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
  margin-right: 0px;
  margin-left: 10px;
}

.disabledButton {
  display: none;
}

.errorBorder {
  border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder {
  border: 1px inset rgba(0, 0, 0, 0.2);
}

#filed1 {
  border: unset;
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

.la2 {
  position: relative;
  top: 15px;
  left: 15px;
  background-color: white;
  z-index: 1;
  padding: 0px 4px;
}
</style>