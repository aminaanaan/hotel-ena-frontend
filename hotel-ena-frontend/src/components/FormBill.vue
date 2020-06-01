<template>
  <div id="formBill" v-if="dataReady">
    <div class="form-style-10">
      <form id="forma">
        <div class="div-title">
          <p id="section-title">
            <span id="formTitle"> Bill </span>

          </p>
        </div>
        <div class="inner-wrap">
 
          <label class="reservationId"> Reservation ID:  </label>
          <br class="clear" /> 
          <input type="text" id="reservationId" name="reservationId"   v-model="reservationId" required><br>  
  

          <label class="userId"> User ID:  </label>
          <br class="clear" /> 
          <input type="text" id="userId" name="userId"   v-model="userId" required><br>  
          
          <label class="cost"> Cost:  </label>
          <br class="clear" /> 
          <input type="number" id="cost" name="cost"   v-model="cost" required><br>

          

        
          <br class = "clear" />
          <input type="checkbox"  checked="paid" id="paidTrue" name="paid" value="paidTrue" v-model="paid">
          <label class ="true"> Paid </label><br>
          
        

        </div>

        <div class="bottom">
          <br class="clear" />
         
          <input type="button" value="Save" id="submit" @click="save" />
          <input type="button" id="cancel" value="Cancel" @click="exit" />
           <br/>
          <br class="clear" />
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import {
  API_BASE_URL,
  USER_ID
} from "../constants";
import { ACCESS_TOKEN } from "../constants/index.js";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "formaS",
  components: { DatePicker },
  data() {
    return {
      id:"",
      createdBy:"",
      created:"",
      userId:"",
       dataReady:false,
      reservationId:"",
      cost:"",
      paid:false,    
    };
  },

 async mounted() {
     if (this.$route.params.id != null) {
      await axios.get(
          API_BASE_URL + "/user/bill/" + this.$route.params.id,
            { headers: headers }
        ).then((res)=> {
        this.userId = res.data.userId;
        console.log(this.userId);
        this.paid=res.data.paid;
        this.created=res.data.created;
        this.createdBy=res.data.createdBy;
        this.cost=res.data.cost;
        this.reservationId=res.data.reservationId;
        this.userId=res.data.userId;
        
       
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
   
  },

 

  methods: {
    exit() {
      this.$emit("reload-bills");
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
      {
      }
    },
  

  

    async save() {
      const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
   
      
        if (this.$route.params.id == null) {
         
            await axios.post(
              API_BASE_URL + "/user/bill",
              {
                createdBy: localStorage.getItem(USER_ID),
              cost:this.cost,
              paid:this.paid,
              reservationId:this.reservationId,
              userId:this.userId
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
              API_BASE_URL + "/user/bill/" + this.$route.params.id,
                {
              createdBy: localStorage.getItem(USER_ID),
              cost:this.cost,
              paid:this.paid,
              reservationId:this.reservationId,
              userId:this.userId
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
    },

   
    }
  
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  color:#2c3e50;
}
#formTitle{
  color: #4d4d4d;
}
*[data-v-f2ae3234] {
  width: 100%;
  height: 13px;
  font-family: "Roboto", sans-serif;
}
#check {
  margin-top: 15px;
}
.form-style-10 #paidTrue,
#paidFalse {
  width: 10%;
  display: inline-block;
}
#cancel,
#submit {
  width: 30%;
  height: auto;
}
.mx-input {
  overflow: visible;
}
.form-style-10 #calendar, #created {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
    color:#2c3e50;
}
.form-style-10 .inline {
  display: inline;
}
.form-style-10 #created{
    margin: .4rem 0;
}
.form-style-10 created {
      color:#2c3e50;
}
.form-style-10 #billid,
#reservationId, #createdby, #userId, #cost{
  width: 100%;
  border: 0.5px solid rgb(161, 154, 154);
  padding: 12px 20px;
  margin: 5px 0;
  box-sizing: border-box;
}
.mx-input-append {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
}
#formBill {
  width: 640px;
  height: 510px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 99;
}
.form-style-10 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 99;
}
.form-style-10 .inner-wrap {
  display: block;
  padding: 0px 20px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 0px;
}
.form-style-10 .bottom {
  display: block;
  padding: 0px 0px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 40px;
  margin-right: 40px;
}
.form-style-10 label {
  font: 13px Arial, Helvetica, sans-serif;
  color: #888;
  margin-bottom: 10px;
}
.form-style-10 select {
  color: #222222;
  font: 13px Arial, Helvetica, sans-serif;
  font-weight: 400;
}
.form-style-10 input[type="text"],
.form-style-10 select,
.form-style-10 input[type="datetime"],
.form-style-10 input[type="email"],
.form-style-10 input[type="number"],
.form-style-10 input[type="search"],
.form-style-10 input[type="time"],
.form-style-10 input[type="url"],
.form-style-10 input[type="password"],
.form-style-10 textarea,
.form-style-10 select {
  overflow: none;
  margin-bottom: 0px;
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
}
.form-style-10 .div-title {
  font: normal 25px "Bitter", serif;
  padding-left: 20px;
  padding-bottom: 5px;
}
.form-style-10 .div-title p {
  height: 20%;
  width: 100%;
  font-weight: bold;
  color: black;
  margin-top: 18px;
}
.form-style-10 #submit {
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 20%;
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
  font-size: 17px;
}
.form-style-10 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}
.form-style-10 input[type="button"] {
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
  font-size: 17px;
  border: none;
  background: #fff;
  text-align: center;
}
.form-style-10 input[type="submit"]:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  
}
.form-style-10 .privacy-policy {
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
  margin-bottom: 20px;
}
#close-icon {
  font-size: 25px;
  display: inline;
  text-align: right;
  position: relative;
  left: 79%;
}
#close-icon:hover {
  cursor: pointer;
}
#active {
  margin-bottom: 50px;
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
.checkBox:hover {
  cursor: pointer;
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
.mx-datepicker {
  width: 100%;
}
.clear {
    clear:both;
    line-height:0;
}
</style>