<template>
  <div id="Activity">
    <div id="header">
      <h1>Activity</h1>
    </div>

    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>ID</h5>
            <p>
              <i class="material-icons" @click="sortByValue('auditId')" title="Sort by id">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Action</h5>
            <p>
              <i class="material-icons" @click="sortByValue('cause')" title="Sort by action">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Result</h5>
            <p>
              <i class="material-icons" @click="sortByValue('consequence')" title="Sort by result">arrow_drop_down</i>
            </p>
          </div>
        </li>

          <li v-for="audit in auditData" :key="audit.id"  :class="{notSeen: audit.seen}" >
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{ audit.auditId }}</p>
          </div>
          <div class="column2 column">
            <p>{{ audit.cause}}</p>
          </div>
          <div class="column3 column">
            <p>{{ audit.consequence}}</p>
          </div>
        </li>
      </ul>
    </div>

    <div id="footer">
      <button id="footer-btn" @click="toggleMenu" v-click-outside="hideMenu">{{ this.rowSize }} Rows</button>
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
import { Current_User_Role, THEME_ID, USER_THEME } from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN, CAUSE ,CONSEQUENCE ,USER_LANGUAGE, ACTIVITY_LOG } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "Activity",
  data(){
      return{
        auditData: [],
        textNoti: "",
        rowSizesValue: [5, 10, 20],
        rowSize: 20,
        page: 1, //current active page
        pagesSize: 1, //Number of pages
        menu: false,
        sortByValue: "createdAt",
        sortType: "desc",
        textNoti: "",
        errorOccured: false,
        showNotificationValue: false
      }
  },
  mounted: function(){
     if (localStorage.getItem(USER_THEME) == "Light") {
       this.$emit("change-light");
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("divlist").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
      this.$emit("change-dark");
       document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("Activity").style.color = "#f1f1f1";
document.getElementById("footer").style.backgroundColor="#191919";
      document.getElementById("divlist").style.backgroundColor="#4c4c4c";
      document.getElementById("header").style.backgroundColor = "#191919";
      document.getElementById("Activity").style.backgroundColor = "#191919";
      document.getElementById("title-li").style.backgroundColor="#323232";
      document.getElementById("title-li").style.color="#f1f1f1";
      document.getElementsByTagName("H5")[0].style.color="#f1f1f1";
       document.getElementsByTagName("H5")[1].style.color="#f1f1f1";
        document.getElementsByTagName("H5")[2].style.color="#f1f1f1";


    }
     if (localStorage.getItem(USER_LANGUAGE) != "en") {
       document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
       ACTIVITY_LOG
      );
      document.getElementsByTagName("H5")[1].innerHTML = localStorage.getItem(
        CAUSE
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        CONSEQUENCE
      );
     
    }
    this.create();
  },
  methods:{
      toggleMenu() {
      this.menu = !this.menu;
    },

    hideMenu() {
      this.menu = false;
    },

    setRows(value) {
      if (value != this.rowSize) {
        this.rowSize = value;
        this.reloadActivity();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadActivity(nextPage - 1);
    },

    async reloadActivity() {
      let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/logs?page=" + pg + "&size=" + this.rowSize,
          { headers: headers }
        );

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);
          
        this.auditData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } catch (err) {
        this.showNotification(-1);
      }
    },

    async create() {
      let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      try {
        const res = await axios.get(
          API_BASE_URL + "/api/logs?page=0&size=" + this.rowSize + "&sort=createdAt,asc",
          { headers: headers }
        );
        this.auditData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      } catch (err) {
        this.showNotification(-1);
      }
    },

    closeNotification(){
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
      setTimeout(this.closeNotification, 1500)
      {}
    },

    sortBy(value) {
      if (this.sortType == "desc") this.sortType = "asc";
      else this.sortType = "desc";

      this.sortByValue = value;
      this.reloadActivity();
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

.notSeen{
  opacity: 0.8;
}

#divlist {
    width: 100%;
    height: 100vh;
}

#table {
  background-color: white;
}


#Activity {
  padding: 20px;
  background-color: white;
}

body {
  font-family: "Lato", sans-serif;
}

.column1{
  width: 15%;
}

.column2{
  width: 35%;
}

.column3{
  width: 45%;
  margin-left: 20px;
}

</style>