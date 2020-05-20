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
      <button id="footer-btn" @click="toggleMenu">{{ this.rowSize }} Rows</button>
      <div id="menu" v-show="menu">
        <div
          class="menu-article"
          v-for="rowValue in rowSizesValue"
          :key="rowValue"
          @click="setRows(rowValue)"
        >{{ rowValue }}</div>
      </div>

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
import { API_BASE_URL, NAME, ROLE, USER_LANGUAGE } from "../constants/index.js";
import {
  Current_User_Role,
  THEME_ID,
  USER_THEME,
  USERS
} from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

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
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false
    };
  },

  mounted: function() {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    };
    if (localStorage.getItem(USER_THEME) == "Light") {
      this.$emit("change-light");
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("divlist").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
      this.$emit("change-dark");
       document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("user").style.color = "#f1f1f1";
document.getElementById("footer").style.backgroundColor="#191919";
      document.getElementById("divlist").style.backgroundColor="#4c4c4c";
      document.getElementById("header").style.backgroundColor = "#191919";
      document.getElementById("user").style.backgroundColor = "#191919";
      document.getElementById("title-li").style.backgroundColor="#323232";
      document.getElementById("title-li").style.color="#f1f1f1";
      document.getElementsByTagName("H5")[0].style.color="#f1f1f1";
       document.getElementsByTagName("H5")[1].style.color="#f1f1f1";
        document.getElementsByTagName("H5")[2].style.color="#f1f1f1";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
        USERS
      );
      document.getElementsByTagName("H5")[0].innerHTML = localStorage.getItem(
        NAME
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        ROLE
      );
    }
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
      {
      }
    },

    async editUser(id) {
      this.$router.push("/dashboard/messages/updateUser/" + id);
    },
    async deleteUser(id) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios.delete(API_BASE_URL + "/user/" + id,{headers:headers});
      var pg = this.page - 1;
      try {
        //var res;
        /*if (this.titleSort == true)
          res = await axios.get(
            API_BASE_URL +
              "/user/getAllUsers?page=" +
              pg +
              "&size=" +
              this.rowSize +
              "&sort=title," +
              this.sortType,
            { headers: headers }
          );
        else if (this.textSort == true)
          res = await axios.get(
            API_BASE_URL +
              "/user/getAllUsers?page=" +
              pg +
              "&size=" +
              this.rowSize +
              "&sort=text," +
              this.sortType,
            { headers: headers }
          );
        else
          res = await axios.get(
            API_BASE_URL +
              "/user/getAllUsers?page=" +
              pg +
              "&size=" +
              this.rowSize +
              "&sort=createdAt," +
              this.sortType,
            { headers: headers }
          );*/
 const res = await axios.get(
          API_BASE_URL +
            "/user/getAllUsers?page=" +
            pg +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );
        if (res.data.numberOfElements == 0) {
          if (this.page != 1) this.changePage(this.page - 1);
        }
        this.usersData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.showNotification(200);
      } catch (err) {
        this.showNotification(-1);
      }
    },
    async reloadUsers() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/user/getAllUsers?page=" +
            pg +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

        this.usersData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } catch (err) {
        this.showNotification(-1);
      }
    },
    showUserForm() {
      this.$router.push("/dashboard/user/newUser");
    },
    
    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/user/getAllUsers?page=0" +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );
        this.usersData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      } catch (err) {
        this.showNotification(-1);
      }
    },
    sortBy(value) {
      if (this.sortType == "desc") this.sortType = "asc";
      else this.sortType = "desc";

      this.sortByValue = value;
      this.reloadUsers();
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
