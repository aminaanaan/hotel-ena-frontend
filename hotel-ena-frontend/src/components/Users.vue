<template>
  <div id="user">
    <router-view @reload-users="reloadUsers()"></router-view>
    <div id="header">
      <h1>Users</h1>
    </div>
    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Name</h5>
            <p>
              <i class="material-icons" @click="sortBy('name')" title="Sort by name">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Email</h5>
            <p>
              <i class="material-icons" @click="sortBy('email')" title="Sort by email">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Role</h5>
            <p>
              <i class="material-icons" @click="sortBy('role')" title="Sort by role">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="user in usersData" :key="user.id">
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{user.name}}</p>
          </div>
          <div class="column2 column">
            <p>{{user.email}}</p>
          </div>
          <div class="column3 column">
            <p>{{user.role}}</p>
          </div>
          <div class="column4 column">
            <i class="material-icons" @click="deleteUser(user.id)" title="Delete user">delete</i>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
    

      <div class="text-xs-center">
        <v-pagination v-model="page" :length="pagesSize" :total-visible="5" @input="changePage"></v-pagination>
      </div>
    </div>

    <button @click="showUserForm" id="btn">+</button>

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
import { API_BASE_URL,CURRENT_USER_ROLE } from "../constants/index.js";

import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";

export default {
  name: "user",
  data() {
    return {
      usersData: [],
      textNoti: "",
      showNoti: false,
      rowSizesValue: [5, 10, 20],
      rowSize: 20,
      page: 1, //current active page
      pagesSize: 1, //Number of pages
      menu: false,
      sortByValue: "role",
      sortType: "desc",
   
      errorOccured: false,
      showNotificationValue: false
    };
  },

  mounted: function() {
    
  
    this.create();
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    },

    hideMenu() {
      this.menu = false;
    },

    setRows(value) {
      if (value != this.rowSize) {
        this.rowSize = value;
        this.reloadUsers();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadUsers(nextPage - 1);
    },

    closeNotification() {
      this.showNotificationValue = false;
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
      
    },

    async editUser(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/messages/updateUser/" + id);
      }
    },
    async deleteUser(id) {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios.delete(API_BASE_URL + "/user/" + id,{headers:headers}).then((response) => {
              
 this.showNotification(200,response);
 this.create();
}, (error) => {
  
  this.showNotification(-1,error.message);
});
      }
    },
    async reloadUsers() {
      this.create();
     
    },
    showUserForm() {
      if(localStorage.getItem(CURRENT_USER_ROLE)=="ADMIN" || localStorage.getItem(CURRENT_USER_ROLE)=="EMPLOYEE"){
      this.$router.push("/dashboard/user/newUser");
    }
    },
    
    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
   if (localStorage.getItem(CURRENT_USER_ROLE) == "ADMIN" ) {
     
      
    
        await axios.get(
          API_BASE_URL +
            "/user/all",
          { headers: headers }
        ).then((response) => {
           this.usersData = response.data;
              
 this.showNotification(200,response);
 this.exit();
}, (error) => {
  this.showNotification(-1,error.message);
});
   }else if(localStorage.getItem(CURRENT_USER_ROLE) == "EMPLOYEE") {
       await axios.get(
          API_BASE_URL +
            "/user/guests",
          { headers: headers }
        ).then((response) => {
           this.usersData = response.data;
             
 this.showNotification(200,response);
 this.exit();
}, (error) => {
  
  this.showNotification(-1,error.message);
   });
    }
    },
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

#divlist {
  width: 100%;
  height: 100vh;
}

#table {
  background-color: white;
}

#user {
  padding: 20px;
  background-color: white;
}

body {
  font-family: "Lato", sans-serif;
}

.column3 {
  width: 4%;
  margin-left: 15px;
}
</style>
