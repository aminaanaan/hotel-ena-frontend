<template>
  <div class="tab" v-if="dataReady">
    <div id="logo" class="tablinks"></div>
    <router-link to="/dashboard/reservations" class="router-link">
      <button class="active">
        <v-icon color="white" style="margin-bottom: 10px">local_post_office</v-icon>
        <br />
        <span>Reservations</span>
      </button>
    </router-link>

    <router-link to="/dashboard/bills" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assignment_turned_in</v-icon>

        <br />
        <span>Bills</span>
      </button>
    </router-link>

  

    <router-link to="/dashboard/rooms" class="router-link">
      <button>
        <v-icon color="white" size="32" style="margin-bottom: 10px">poll</v-icon>

        <br />
        <span>Rooms</span>
      </button>
    </router-link>

    <router-link to="/dashboard/halls" class="router-link">
      <button>
        <v-icon color="white" style="margin-bottom: 10px">assistant</v-icon>
        <br />
        <span>Halls</span>
      </button>
    </router-link>

    <router-link to="/dashboard/user" class="router-link">
      <button id="usertab" v-show="user">
        <v-icon color="white" size="32" style="margin-bottom: 10px">person</v-icon>
        <br />
        <span>Users</span>
      </button>
    </router-link>
  </div>
</template>

<script>
import {
  API_BASE_URL, CURRENT_USER_ROLE, USER_ID
} from "../constants/index.js";
import {
  USER_EMAIL,USER_NAME
} from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";

import axios from "axios";
import { async } from "q";

export default {
  name: "navigation",
 
  data() {
    return {
      notificationNumber: 0,
      userId: 0,
       user:false,
       dataReady:false
    };
  },
  async mounted() {
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
        localStorage.setItem(USER_ID,response.data.id);
        localStorage.setItem(USER_NAME, response.data.name);
        localStorage.setItem(CURRENT_USER_ROLE, response.data.role);
        if (localStorage.getItem(CURRENT_USER_ROLE) == "ADMIN" || localStorage.getItem(CURRENT_USER_ROLE) == "EMPLOYEE") {
          this.user=true;
          console.log(localStorage.getItem(CURRENT_USER_ROLE));
          this.dataReady=true;

    }
    else{
       this.dataReady=true; 
    }
        
      })
      .catch(err => {
        console.log(err);
      });

    if (localStorage.getItem(CURRENT_USER_ROLE) == "ADMIN" || localStorage.getItem(CURRENT_USER_ROLE) == "EMPLOYEE" ) {
      this.user=true;
      
    }
 
    this.subscribeToNotification();
  },
  methods: {


    async subscribeToNotification() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
      let self = this;
      this.source = null;

      await axios
        .get(API_BASE_URL + "/user/me", {
          headers: headers
        })
        .then(response => {
          this.userId = response.data.id;
        })
        .catch(err => {
          console.log(err);
        });

      this.source = new EventSource(
        API_BASE_URL + "/api/logs/new-logs-stream/" + this.userId
      );

      this.source.addEventListener("new-log-event", function(event) {
        var comment = JSON.parse(event.data);
        self.notificationNumber = event.data;
      });

      this.source.onerror = function() {
        console.log("TESTERRR");
        this.close();
      };
    }
  }
};
</script>

<style>
#logo {
  margin-top: 10px;
  height: 50px;
  background-image: url("../assets/logo.png");
  background-position: center;
  margin-bottom: 10px;
}

.tab {
  text-align: center;
  float: left;
  background-color: #006bf5;
  width: 100%;
  height: 100vh;
  padding: 5px 0px;
}

.tab button {
  display: block;
  color: #fff;
  width: 100%;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  height: 80px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: rgb(45, 146, 247);
}

/* Create an active/current "tab button" class */
a.router-link.router-link-exact-active.router-link-active button {
  background-color: rgb(45, 146, 247);
}

.router-link.router-link-active button {
  background-color: rgb(45, 146, 247);
}

/* Style the tab content */
.tabcontent {
  float: left;
  width: 94%;
  border-left: none;
  height: 100%;
  padding: 13px;
}

li i {
  margin-left: 25px;
}

li .material-icons {
  font-size: 18px;
  color: gray;
  display: none;
}

li:hover .material-icons {
  display: inline;
  display: block;
}

.material-icons:hover {
  color: black;
  cursor: pointer;
}

.router-link {
  text-decoration: none;
}

.notification {
  position: relative;
  height: 0px;
}

.notification::before,
.notification::after {
  position: absolute;
  left: 20%;
  opacity: 1;
  transition: all ease 0.3s;
}

.notification::after {
  content: attr(notificationNumber);
  top: 25px;
  width: 20px;
  font-size: 16px;
  margin-left: 34px;
  padding: 11px;
  border-radius: 10px;
  color: #eee;
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  color: white;
  text-align: center;
}

#notificationNumber {
  color: white;
  position: relative;
  left: 24px;
  font-size: 15px;
}

</style>
