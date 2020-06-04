<template>
  <div id="reservations">
    <router-view @reload-reservations="reloadReservations()" @show-notification="showNotification($event)"></router-view>
    <div id="header">
      <h1>Reservations</h1>
    </div>
    <div id="divlist">
      <ul id="list">
        <li id="title-li">
             <div class="column1 column">
            <h5>Id</h5>
           
          </div>
          <div class="column1 column">
            <h5>Valid From</h5>
           
          </div>
          <div class="column2 column">
            <h5>Valid To</h5>
          
          </div>
           <div class="column2 column">
            <h5>Done</h5>
          
          </div>
          <div class="column3 column">
            <h5>Created At</h5>
           
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="reservation in reservationsData" :key="reservation.id">
           <div class="column1 column">
            <p>{{reservation.id}}</p>
          </div>
          <div class="column1 column">
            <p>{{reservation.validFrom}}</p>
          </div>
          <div class="column2 column">
            <p class="lip">{{reservation.validTo}}</p>
          </div>
           <div class="column2 column">
            <input type="checkbox" class="lip" v-model="reservation.done" checked="reservation.done" disabled/>
          </div>
          <div class="column3 column">
            <p class="lip">{{reservation.created}}</p>
          </div>
          <div class="column4 column">
            <i class="material-icons" @click="editReservation(reservation.id)" title="Edit reservation">create</i>
            <i class="material-icons" @click="deleteReservation(reservation.id)" title="Delete reservation">delete</i>
          </div>
        </li>
      </ul>
    </div>
    <div id="footer">

      <div class="text-xs-center">
        <v-pagination></v-pagination>
      </div>
    </div>

    <button @click="showReservationForm" id="btn">+</button>

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
/* eslint-disable */
import {
  API_BASE_URL,
  USER_NAME,
  USER_ID,
  CURRENT_USER_ROLE
} from "../constants/index.js";
import { USER_EMAIL } from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";
export default {
  name: "reservations",
  data() {
    return {
      reservationsData: [],
    textNoti: "",
      errorOccured: false,
      showNotificationValue: false,
      uri:"",
    };
  },
  mounted: async function() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
    await axios

      .get(API_BASE_URL + "/user/me", {
        headers: headers
      })
      .then(response => {
        localStorage.setItem(USER_EMAIL, response.data.email);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        localStorage.setItem(USER_ID,response.data.id);
       
      
      })
      .catch(err => {
        console.log(err);
      });
   
  
    this.create();
  },
  methods: {
    async reloadReservations() {
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

    showReservationForm() {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/reservations/newReservation");
      }
    },

    async editReservation(id) {
       if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/reservations/updateReservation/" + id);
       }
    },

    async deleteReservation(id) {
       if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
           let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
      await axios.delete(API_BASE_URL + "/user/reservation/" + id,  { headers: headers })
        .then(
          response => {
            console.log(response);
            this.showNotification(200, response);
            this.create();
          },
          error => {
            console.log(error.message);
            this.showNotification(-1);
          }
        );
       }
    },

    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      console.log(localStorage.getItem(CURRENT_USER_ROLE));
      
      if(localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
        await axios.get(
          API_BASE_URL +
             "/user/reservation/employee/" + localStorage.getItem(USER_ID),
          { headers: headers }
        ).then((response) => {
           this.reservationsData = response.data;
              console.log(response);
 this.showNotification(200,response);
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
      }
      else if(localStorage.getItem(CURRENT_USER_ROLE)=="USER"){
           await axios.get(
          API_BASE_URL +
             "/user/reservation/guest/" + localStorage.getItem(USER_ID),
          { headers: headers }
        ).then((response) => {
           this.reservationsData = response.data;
              console.log(response);
 this.showNotification(200);
}, (error) => {
  console.log(error.message);
  this.showNotification(-1);
});
      }
      else if (localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN"){
         await axios.get(
          API_BASE_URL +
             "/user/reservation/all",
          { headers: headers }
        ).then((response) => {
           this.reservationsData = response.data;
              console.log(response);
 this.showNotification(200);
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

<style>
h1 {
  margin-top: 0px;
  width: 200px;
  float: left;
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

* {
  box-sizing: border-box;
  margin: 0px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
}

*:focus {
  outline: none;
}

#menu {
  width: 105px;
  position: absolute;
  float: left;
  bottom: 69%;
}

.text-xs-center {
  width: 400px;
  float: right;
  position: relative;
  right: 50%;
  transform: translateX(50%);
}

.menu-article {
  border: 1px solid white;
  width: 100%;
  display: flex;
  background-color: rgb(192, 188, 188);
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  z-index: 99;
  padding: 10px 0px;
}

.menu-article:hover {
  cursor: pointer;
  background-color: lightgray;
}

#reservations {
  padding: 20px;
  padding-bottom: 0px;
  height: 100vh;
}

#list {
  height: 83%;
  overflow: auto;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#btn {
  position: absolute;
  bottom: 100px;
  right: 50px;
}

ul {
  width: 100%;
  height: 100%;
  padding: 0px;
}

#title-li {
  border-radius: 3px 3px 0px 0px;
  background-color: #f1f1f1;
  position: sticky;
  top: 0;
}

#title-li .column {
  overflow: unset;
}

#title-li .material-icons {
  display: block;
}

li {
  display: flex;
  height: 48px;
  width: 100%;
  /*background-color: white;*/
  border: 0.5px solid lightgray;
  border-bottom: 0px;
  overflow: hidden;
}

li:last-child {
  border-bottom: 0.5px solid lightgray;
}

li p {
  font-size: 13px;
}

.column {
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 300;
}

#title-li .column h5 {
  font-size: 14px;
}

#title-li .column {
  margin-left: 20px;
  color: black;
}

#title-li .column4 {
  padding-right: 20px;
}

li p {
  margin: 0px;
  /*color: rgb(70, 67, 67);*/
}

.column1 {
  width: 13%;
}

.column2 {
  width: 35%;
}

.column3 {
  width: 7%;
  margin-left: 30px;
}

.column4 {
  width: 45%;
}

.column4 p {
  margin-left: 20px;
}

.column4 {
  justify-content: flex-end;
  padding-right: 55px;
}

li:hover {
  color: #2c3e50;
  background-color: #f1f1f1;
}

li:hover .linear1 {
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    rgb(241, 238, 238) 100%
  );
}

li:hover .linear2 {
  background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    rgb(241, 238, 238) 100%
  );
}

.linear1 {
  /*background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );*/
  width: 60px;
  height: 40px;
  margin-top: 5px;
  position: absolute;
  left: 16%;
}

.linear2 {
  /*background-image: linear-gradient(
    90deg,
    rgba(236, 236, 236, 0) 0%,
    white 100%
  );*/
  width: 60px;
  height: 39px;
  margin-top: 5px;
  position: absolute;
  left: 45%;
}

#btn {
  float: right;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 30px;
  position: absolute;
  bottom: 4%;
  right: 5%;
  background-color: #006bf5;
  color: white;
  border: 1px solid white;
  font-family: "Courier New", Courier, monospace;
  line-height: 60px;
  z-index: 95;
}

#btn:hover {
  cursor: pointer;
}

#footer {
  height: 7%;
  position: relative;
  bottom: 15%;
  background-color: white;
  z-index: 0;
  border: 1px solid lightgray;
  padding: 0px 20px;
}

#footer {
  position: absolute;
  bottom: -10px;
  width: calc(87.5% - 20px);
  margin-right: 20px;
}

#footer-btn {
  border: 1px solid grey;
  padding: 5px 5px;
  width: 105px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
}

#footer ul li {
  display: block;
  border: 0px;
}

#footer ul li:hover {
  background-color: white;
}

#footer ul li button {
  height: 100%;
}

#footer li .material-icons {
  /* for right and left nav icons */
  display: block;
}

.theme--light.v-pagination .v-pagination__item--active {
  /* for active page */
  color: lightgray;
}
.text-xs-center {
  height: 100%;
}

.v-pagination__item {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.v-pagination__navigation {
  -webkit-box-shadow: none;
  box-shadow: none;
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

#notification button {
  width: 100%;
  height: 40%;
  text-align: center;
  font-size: 20px;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
