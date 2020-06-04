<template>
  <div id="room">
    <router-view @reload-room="reloadRoom()" @show-notification="showNotification($event)"></router-view>

    <div id="header">
      <h1>Rooms</h1>
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
            <h5>Beds</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Busy</h5>
            <p>
              <i class="material-icons">arrow_drop_down</i>
            </p>
          </div>

          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li class="li" v-for="room in roomData" :key="room.id" @click="viewRoom(room.id)">
          <div class="column1 column">
            <p>{{room.id}}</p>
          </div>
          <div class="column2 column">
            <p>{{room.numberOfBeds}}</p>
          </div>
          <div class="column3 column">
            <input type="checkbox" class="lip" v-model="room.busy" checked="room.busy" disabled />
          </div>
          <div class="column4 column">
            <i class="material-icons" @click="editRoom(room.id)" title="Edit Room">create</i>
            <i class="material-icons" @click.stop="deleteRoom(room.id)" title="Delete Room">delete</i>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <button @click="showRoomForm" id="btn">+</button>

    <div
      id="notification"
      v-show="showNoti"
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

<script scoped>
import { API_BASE_URL } from "../constants/index.js";
import { ACCESS_TOKEN,CURRENT_USER_ROLE } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";

export default {
  name: "room",
  data() {
    return {
      roomData: [],
      textNoti: "",
      showNoti: false,
      errorOccured: false
    };
  },
  mounted: function() {
    this.create();
  },
  methods: {
    showRoomForm() {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/rooms/newRoom");
    }
    },

    async editRoom(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/rooms/updateRoom/" + id);
    }
    },
    changePage(nextPage) {
      this.page = nextPage;
      this.reloadRoom(nextPage - 1);
    },

    async reloadRoom() {
      this.create();
    },

    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios
        .get(API_BASE_URL + "/user/reservation/room/all", {
          headers: headers
        })
        .then(
          response => {
            this.roomData = response.data;
             this.showNotification(200, response);
            this.exit();
          },
          error => {
           
            this.showNotification(-1, error.message);
          }
        );
    },

    showNotification(value) {
      if (value == -1) {
        this.textNoti = "Some error have occured";
        this.errorOccured = true;
      } else {
        this.errorOccured = false;
        this.textNoti = "Succes";
      }
      this.showNoti = !this.showNoti;
      setTimeout(this.closeNoti, 1500);
   
    },

    async deleteRoom(id) {
         let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
     
      await axios
        .delete(API_BASE_URL + "/user/reservation/room/" + id,{headers:headers})
        .then(
          response => {
        
            this.showNotification(200, response);
            this.create();
          },
          error => {
           
            this.showNotification(-1, error.message);
          }
        );
    }
    },

    closeNoti() {
      this.showNoti = false;
    },

    viewRoom(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/rooms/updateRoom/" + id);
    }
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
#table {
  height: 100vh;
}
#room {
  padding: 20px;
  height: 100%;
}

#header[data-v-040e3608] {
  margin-left: 15px;
  margin-right: 10px;
  display: block;
  width: 99%;
  float: right;
  background-color: white;
}

.column1 {
  width: 35%;
}

.column2 {
  width: 10%;
  margin-left: 35px;
}

.column3 {
  width: 9%;
  padding: 15px;
}

.linear1 {
  left: 34%;
}

.linear2 {
  left: 44%;
}

li:hover {
  cursor: pointer;
}
</style>