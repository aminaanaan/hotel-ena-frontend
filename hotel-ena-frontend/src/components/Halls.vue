<template>
  <div id="Halls" class="tabcontent">
    <div id="header">
      <h1>Halls</h1>
    </div>
    <router-view @reload-halls="reloadHalls()" @show-notification="showNotification($event)"></router-view>

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
            <h5>People</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>

          <div class="column3 column">
            <h5>Busy</h5>
            <p>
              <i class="tooltip material-icons">arrow_drop_down</i>
            </p>
          </div>

          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="hall in hallsData" :key="hall.id">
          <div class="column1 column">
            <p>{{ hall.id }}</p>
          </div>
          <div class="column2 column">
            <p>{{ hall.numberOfPeople }}</p>
          </div>
          <div class="column3 column">
            <input type="checkbox" class="lip" v-model="hall.busy" checked="hall.busy" disabled />
          </div>

          <div class="column4 column">
            <i class="material-icons" @click="editHall(hall.id)" title="Edit Hall">create</i>
            <i class="material-icons" @click="deleteHall(hall.id)" title="Delete Hall">delete</i>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <button @click="showHallForm" id="btn">+</button>

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
import { API_BASE_URL } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { ACCESS_TOKEN,CURRENT_USER_ROLE } from "../constants/index.js";

export default {
  name: "Halls",
  data() {
    return {
      hallsData: [],
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false
    };
  },

  mounted: function() {
    this.create();
  },

  methods: {
    showHallForm() {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/halls/newHall");
    }
    },

    async reloadHalls() {
      this.create();
    },

    showNotification(value) {
      console.log("happens");
      if (value == -1) {
        this.textNoti = "Some error have occured";
        this.errorOccured = true;
      } else {
        this.errorOccured = false;
        this.textNoti = "Succes";
      }
      this.showNotificationValue = !this.showNotificationValue;
      setTimeout(this.closeNotification, 1500);
      
    },

    closeNotification() {
      this.showNotificationValue = false;
    },

    async editHall(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/halls/updateHall/" + id);
    }
    },

    async deleteHall(id) {
      let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios
        .delete(API_BASE_URL + "/user/reservation/hall/" + id,{headers:headers})
        .then(
          response => {
           
            this.showNotification(200);
            this.create();
          },
          error => {
           
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
      await axios
        .get(API_BASE_URL + "/user/reservation/hall/all", {
          headers: headers
        })
        .then(
          response => {
            this.hallsData = response.data;
           
            this.showNotification(200);
          },
          error => {
         
            this.showNotification(-1);
          }
        );
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
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
#pic {
  border-radius: 50%;
  float: right;
  margin-top: 0px;
}
#slika {
  margin-top: 0px;
  float: right;
}
#divlist {
  width: 100%;
  height: 100vh;
}

body {
  font-family: "Lato", sans-serif;
  background: #eaeaea;
}

#Halls {
  height: 100vh;
  padding: 20px;
  padding-bottom: 0px;
  width: 100%;
}

.column1 {
  width: 31.5%;
  margin-right: 15px;
}

.column2 {
  width: 8%;
  margin-left: 32px;
}

.column3 {
  width: 8%;
  margin-right: 20px;
  margin-left: 20px;
}

.column5 {
  width: 6%;
}

.column4 {
  width: 40%;
}

.linear1 {
  width: 88px;
  left: 30%;
}

.linear2 {
  left: 50%;
}
</style>
