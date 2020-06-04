<template>
  <div id="formaM" v-if="dataReady">
     <router-view  @show-notification="showNotification($event)"></router-view>
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            <span id="formTitle"> Reservation</span>
           
          </p>
        </div>

        <div id="inner-wrap">
          <label>User Id</label>
          <div>
          <input
          
            type="text"
            name="field1"
            v-model="userId"
            value="userId"
            id="field1"
            
          /> 
          </div>
          <br />
         

          <label >Valid From</label>
          <input type="date" v-model="validFrom" /> 
           <label >Valid To</label>
          <input type="date" v-model="validTo" />
            
        <div v-if="create">
           <label >Cost</label>
         <input type="text" v-model="cost" />
        </div> 
          <label >Room Id</label>
         <input type="text" v-model="roomId" /> 
          <label >Hall Id</label>
         <input type="text" v-model="hallId" />
          <label class="container">
            <p class="checkText">Done</p>

            <input
              type="checkbox"
              checked="done"
              v-model="done"
            />
            <span class="checkmark"></span>
          </label>
          <br />
          <br />
          <input type="button" value="Save" @click="save" id="submit" />
          <input type="button" value="Cancel" @click="exit" id="cancle" />
        </div>
      </form>
    </div>
    <div
      id="notification"
      v-show="showNotificationValue"
      :class="{redBorder: errorOccured, greenBorder: !errorOccured}"
    >
      <input
        type="text"
        v-model="textNoti"
        readonly
        :class="{redText: errorOccured, greenText: !errorOccured}"
      />
      <button
        @click="showNotification"
        :class="{redBackground: errorOccured, greenBackground: !errorOccured}"
      >OK</button>
    </div>
  </div>
</template>

<script>
import {
  ACCESS_TOKEN, USER_ID,
 
} from "../constants/index.js";
import axios from "axios";

import { API_BASE_URL } from "../constants";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "FormReservation",
  data() {
    return {
      validTo:"",
      validFrom:"",
      userId:"",
       textNoti: "",
        showNotificationValue: false,
         error:"",
         cost:"",
      errorOccured: false,
      showNoti: false,
      dataReady:false,
      done:false,
      roomId:"",
      hallId:"",
      create:false
    };
  },

  async mounted() {
        const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
     if (this.$route.params.id != null) {
      await axios.get(
          API_BASE_URL + "/user/reservation/" + this.$route.params.id,
            { headers: headers }
        ).then((res)=> {
        this.userId = res.data.userId;
        console.log(this.userId);
        this.validTo = res.data.validTo;
        this.validFrom=res.data.validFrom;
        this.done=res.data.done;
        this.roomId=res.data.roomId;
        this.hallId=res.data.hallId;
     console.log(res);
 this.showNotification(200,res);
 this.dataReady=true;
}, (error) => {
  console.log(error.message);
  this.showNotification(-1,error.message);
  this.dataReady=true;
});
     }
     else{
       this.create=true;
       this.dataReady=true;
     }
   
  },


  methods: {
    exit() {
      this.$emit("reload-reservations");
      this.$router.go(-1);
    },
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
   
    },

  

    async save() {
          const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
        if (this.$route.params.id == null) {
         
            await axios.post(
              API_BASE_URL + "/user/reservation/" + localStorage.getItem(USER_ID) ,
              {
                
                validTo: this.validTo,
                validFrom: this.validFrom,
                userId: this.userId,
                done: this.done,
                cost:this.cost,
                roomId:this.roomId,
                hallId:this.hallId,
                createdBy:localStorage.getItem(USER_ID),
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
              const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
            await axios.put(
              API_BASE_URL + "/user/reservation/" + this.$route.params.id,
                {
                createdBy: localStorage.getItem(USER_ID),
                validTo: this.validTo,
                validFrom: this.validFrom,
                userId: this.userId,
                done: this.done,
                  roomId:this.roomId,
                hallId:this.hallId,
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
  height: 740px;
  padding: 20px;
  position: absolute;
  text-align: left;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 95;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  padding-top: 0px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#style-options {
  display: flex;
  padding-left: 20px;
  margin-top: 15px;
}

.style-option {
  width: 50px;
  height: 35px;
  border: 1px inset rgba(0, 0, 0, 0.2);
  margin-right: 15px;
  line-height: 35px;
  border-radius: 7px;
}

.style-option:hover {
  cursor: pointer;
  background-color: rgb(226, 217, 217);
  border: none;
}

.styleOptionSelected {
  cursor: pointer;
  background-color: rgb(226, 217, 217);
  border: none;
}

#form-style-10 label {
  display: block;
  font: 13px Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-box-flex: 1;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
  padding: 0px;
  width: 100%;
}
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.container:hover input ~ .checkmark {
  background-color: #ccc;
}
.checkBox:hover {
  cursor: pointer;
}

.la {
  display: inline;
  background-color: white;
  position: relative;
  top: 15px;
  left: 10px;
  z-index: 99;
  padding: 0px 5px;
  text-align: left;
}

.checkText {
  position: relative;
  left: 45px;
  bottom: 3px;
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
text-align:left;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 100%;
  flex: 1 1 100%;
  padding: 0px;
  width: 100%;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: -5px;
  left: 8px;
  height: 15px;
  width: 15px;
  background-color: white;
  border: 2px solid grey;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
  border-color: #2196f3;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  margin-left: 3px;
  display: none;
  text-align: center;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
  border-color: #2196f3;
}
.container input:checked ~ .checkmark:after {
  display: block;
}
.checkmark {
  position: absolute;
  top: -5px;
  left: 8px;
  height: 15px;
  width: 15px;
  background-color: white;
  border: 2px solid grey;
}
/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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
  margin-bottom: 10px;
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

input,
textarea {
  border: 1px inset;
  border-color: rgba(0, 0, 0, 0.2);
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
  margin-bottom: 20px;
}
.checkText {
  position: relative;
  left: 45px;
  bottom: 3px;
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
  position: unset;
}

#close-icon,
#submit,
#cancle:hover {
  cursor: pointer;
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

label {
  width:10%;
  position: relative;
  top: 20px;
  left: 13px;
  background-color: white;
  text-align: center;
  color: #888;
}

.errorBorder {
  border-color: red;
}
</style>
