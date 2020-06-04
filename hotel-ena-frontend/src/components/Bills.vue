<template>
  <div id="Bills" class="tabcontent">
    <router-view
      @reload-bills="reloadBills()"
      @show-notification="showNotification($event)"
    ></router-view>
    <div id="header">
      <h1>Bills</h1>
    </div>
    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Id</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Cost</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Created</h5>
            <p>
              <i class="tooltip, material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column1 column">
            <h5>User Id</h5>
            <p>
              <i class="tooltip, material-icons">arrow_drop_down</i>
            </p>
          </div>
            <div class="column1 column">
            <h5>Reservation Id</h5>
            <p>
              <i class="tooltip, material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column6 column">
            <h5>Created By</h5>
            <p>
              <i class="tooltip, material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column5 column">
            <h5>Paid</h5>
            <p>
              <i class="tooltip, material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="bill in billsData" :key="bill.id">
                 <div class="column1 column">
            <p>{{ bill.id }}</p>
          </div>
          <div class="column2 column">
            <p>{{ bill.cost }}</p>
          </div>
          <div class="column3 column">
            <p>{{ bill.created }}</p>
          </div>
           <div class="column1 column">
            <p>{{ bill.userId }}</p>
          </div>
            <div class="column1 column">
            <p>{{ bill.reservationId }}</p>
          </div>
          <div class="column6 column">
            <p>{{ bill.createdBy }}</p>
          </div>
          <div class="column5 column">
          
            <input type="checkbox" class="lip" v-model="bill.paid" checked="bill.paid" disabled/>
         
          </div>
          <div class="column4 column">
            <i class="material-icons" @click="payBill(bill.reservationId)" title="Pay Bill">assistant</i>
            <i class="material-icons" @click="editBill(bill.id)" title="Edit Bill">create</i>
            <i class="material-icons" @click="deleteBill(bill.id)" title="Delete Bill">delete</i>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
     

      <div class="text-xs-center">
      </div>
    </div>

    <button @click="showBillForm" id="btn">+</button>

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
  API_BASE_URL,USER_ID
} from "../constants/index.js";
import { CURRENT_USER_ROLE, USER_THEME } from "../constants/index.js";
import { ACCESS_TOKEN, USER_LANGUAGE } from "../constants/index.js";
import axios from "axios";

import ClickOutside from "vue-click-outside";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "bills",

  data() {
    return {
      billsData: [],
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false,
    };
  },

  mounted: function() {
   
    
    this.create();
  },

  


  methods: {
    async reloadBills() {
    this.create();
    },

    showNotification(value) {
      if (value == -1) {
        this.textNoti = "Some error have occured";
        this.errorOccured = true;
      } else {
        this.errorOccured = false;
        this.textNoti = "Succes";
      }
      this.showNotificationValue = !this.showNotificationValue;
      setTimeout(this.closeNotification, 1500);
      {
      }
    },

    closeNotification() {
      this.showNotificationValue = false;
    },

    showBillForm() {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/bills/newBill");
      }
    },

    async editBill(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/bills/updateBill/" + id);
    }
    },
 async payBill(id) {
   if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
       let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
       await axios.post(API_BASE_URL + "/user/pay/bill/" + id,null,   { headers: headers }).then((response) => {
         
              console.log(response);
 this.showNotification(200);
 this.create();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
    }
 },
    async deleteBill(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
       await axios.delete(API_BASE_URL + "/user/bill/" + id,  { headers: headers }).then((response) => {
         
              console.log(response);
 this.showNotification(200);
 this.create();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
     
    }
    },

    async create() {
      //roles
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN"){
         await axios.get(
          API_BASE_URL +
             "/user/bill/all",
          { headers: headers }
        ).then((response) => {
           this.billsData = response.data;
              console.log(response);
 this.showNotification(200);
 //this.exit();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
      }
        else if(localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
     await axios.get(
          API_BASE_URL +
             "/user/bill/" + localStorage.getItem(USER_ID) + "/employee",
          { headers: headers }
        ).then((response) => {
           this.billsData = response.data;
              console.log(response);
 this.showNotification(200);
 //this.exit();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
    }
         else if(localStorage.getItem(CURRENT_USER_ROLE)=="USER"){
     await axios.get(
          API_BASE_URL +
             "/user/bill/" + localStorage.getItem(USER_ID) + "/guest",
          { headers: headers }
        ).then((response) => {
           this.billsData = response.data;
              console.log(response);
 this.showNotification(200);
 //this.exit();
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
    }
    },

  directives: {
    ClickOutside
  }
  }
};
</script>

<style scoped>
h1 {
  margin-top: 0px;
  width: 200px;
  float: left;
}
#notification {
  height: 10vh;
  width: 370px;
  position: absolute;
  right: 11%;
  bottom: 20px;
  background-color: white;
  border-radius: 10px;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#notification input {
  height: 60%;
  width: 100%;
  text-align: center;
  font-size: 25px;
}
.greenBorder {
  border: 1px solid rgb(85, 235, 85);
}

.redBorder {
  border: 1px solid rgb(248, 74, 74);
}

.redText {
  color: rgb(248, 74, 74);
}

.greenText {
  color: rgb(85, 235, 85);
}

.redBackground {
  background-color: rgb(248, 74, 74);
}

.redBackground:hover {
  background-color: rgb(241, 101, 101);
}

.greenBackground {
  background-color: rgb(85, 235, 85);
}

.greenBackground:hover {
  background-color: rgb(140, 231, 140);
}


#notification button {
  width: 100%;
  height: 40%;
  text-align: center;
  font-size: 20px;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
#header {
  display: block;
  width: 100%;
  float: right;
  background-color: white;
}

#divlist {
  width: 100%;
  height: 100vh;
}

body {
  font-family: "Lato", sans-serif;
  background: #eaeaea;
}

#Bills {
  height: 100vh;
  width: 100%;
  padding: 20px;
}

.column1 {
  width: 8%;
  margin-right: 40px;
}

.column2 {
  width: 11%;
  margin-right: 25px;
  
  right: 15px;
}

#title-li .column2 {
  position: unset;
  margin-left: 20px;
  padding-left: 15px;
}



.column3 {
  margin-left: 5px;
  margin-right: 10px;
}

.column4 {
  width: 30%;
  margin-left: 0px;
}

.column5 {
  width: 11%;
  margin-left: 0px;
  padding-left: 20px;
}

#title-li .column5 {
  padding-left: 0px;
}

.column6 {
  width: 7%;
  margin-left: 10px;
}

.linear1 {
  left: 28%;
}

.linear2 {
  left: 66%;
}
</style>
