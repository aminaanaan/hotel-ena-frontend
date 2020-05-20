<template>
  <div id="Triggers" class="tabcontent">
    <div id="header">
      <h1>Triggers</h1>
    </div>
    <router-view @reload-triggers="reloadTriggers()" @show-notification="showNotification($event)"></router-view>

    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Message</h5>
            <p>
              <i class="material-icons" @click="sortBy('message.title')" title="Sort by message title">arrow_drop_down</i>
            </p>
          </div>

          <div class="column2 column">
            <h5>Trigger</h5>
            <p>
              <i class="material-icons" @click="sortBy('createdAt')" title="Sort by date">arrow_drop_down</i>
            </p>
          </div>

          <div class="column3 column">
            <h5>Channel</h5>
            <p>
              <i class="tooltip material-icons" @click="sortBy('channel')" title="Sort by channel">arrow_drop_down</i>
            </p>
          </div>

          <div class="column5 column">
            <h5>Active</h5>
            <p>
              <i class="tooltip material-icons" @click="sortBy('active')" title="Sort by active">arrow_drop_down</i>
            </p>
          </div>

          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="trigger in triggersData" :key="trigger.triggerId">
          <div class="linear1"></div>
          <div class="linear2"></div>
          <div class="column1 column">
            <p>{{ trigger.message.title }}</p>
          </div>
          <div class="column2 column">
            <p>{{ trigger.createdAt | shortDate }}</p>
          </div>
          <div class="column3 column">
            <p>{{ trigger.channel }}</p>
          </div>

          <div class="column5 column">
            <p>{{ trigger.active | activeView }}</p>
          </div>
          <div class="column4 column">
            <i class="material-icons" @click="editTrigger(trigger.triggerId)" title="Edit tigger">create</i>
            <i class="material-icons" @click="deleteTrigger(trigger.triggerId)" title="Delete trigger">delete</i>
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

    <button @click="showTriggerForm" id="btn">+</button>

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
  API_BASE_URL,
  TRIGGERS,
  TRIGGER,
  CHANNEL,
  ACTIVE,
  MESSAGE,
  USER_LANGUAGE,
  USER_THEME
} from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { Current_User_Role, THEME_ID, THEME } from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN, LANGUAGE } from "../constants/index.js";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
export default {
  name: "Triggers",
  data() {
    return {
      triggersData: [],
      rowSize: 20, //Number of rows
      pagesSize: 1, //Number of pages
      page: 1, //current active page
      menu: false,
      rowSizesValue: [5, 10, 20],
      sortType: "desc",
      sortByValue: "createdAt",
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false
    };
  },

  filters: {
    shortDate(value) {
      let dateVar = new Date(value);
      let dataVar2 = dateVar.toDateString();
      let data = dataVar2.substring(4);
      return data;
    },
    activeView(value) {
      if (value == true) return "Active";
      else return "Not active";
    }
  },

  mounted: function() {
    if (localStorage.getItem(USER_THEME) == "Light") {
      this.$emit("change-light");
      document.getElementById("header").style.backgroundColor = "white";
      document.getElementById("Triggers").style.backgroundColor = "white";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
      this.$emit("change-dark");
      document.getElementsByTagName("H1")[0].style.color="#f1f1f1";
      document.getElementById("Triggers").style.color = "#f1f1f1";
document.getElementById("footer").style.backgroundColor="#191919";
      document.getElementById("divlist").style.backgroundColor="#4c4c4c";
      document.getElementById("header").style.backgroundColor = "#191919";
      document.getElementById("Triggers").style.backgroundColor = "#191919";
      document.getElementById("title-li").style.backgroundColor="#323232";
      document.getElementById("title-li").style.color="#f1f1f1";
      document.getElementsByTagName("H5")[0].style.color="#f1f1f1";
       document.getElementsByTagName("H5")[1].style.color="#f1f1f1";
        document.getElementsByTagName("H5")[2].style.color="#f1f1f1";
        document.getElementsByTagName("H5")[3].style.color="#f1f1f1";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementsByTagName("H1")[0].innerHTML = localStorage.getItem(
        TRIGGERS
      );
      document.getElementsByTagName("H5")[0].innerHTML = localStorage.getItem(
        MESSAGE
      );
      document.getElementsByTagName("H5")[1].innerHTML = localStorage.getItem(
        TRIGGER
      );
      document.getElementsByTagName("H5")[2].innerHTML = localStorage.getItem(
        CHANNEL
      );
      document.getElementsByTagName("H5")[3].innerHTML = localStorage.getItem(
        ACTIVE
      );
    }
    this.create();
  },

  methods: {
    showTriggerForm() {
      this.$router.push("/dashboard/triggers/newTrigger");
    },

    async reloadTriggers() {
         let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/triggers?page=" +
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

        this.triggersData = res.data.content;
        this.pagesSize = res.data.totalPages;
      } catch (err) {
        this.showNotification(-1);
      }
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

    async editTrigger(id) {
      this.$router.push("/dashboard/triggers/updateTrigger/" + id);
    },

    async deleteTrigger(id) {
      await axios.delete(API_BASE_URL + "/api/triggers/" + id);
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/triggers?page=" +
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
        this.messagesData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.reloadTriggers();
        this.showNotification(200);
      } catch (err) {
        this.showNotification(-1);
      }
    },

    toggleMenu() {
      this.menu = !this.menu;
    },

    hideMenu() {
      this.menu = false;
    },

    setRows(value) {
      if (value != this.rowSize) {
        this.rowSize = value;
        this.reloadTriggers();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadTriggers(nextPage - 1);
    },

    async create() {
      let headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/triggers?page=0&size=" +
            this.rowSize +
            "&sort=createdAt," +
            this.sortType,
          { headers: headers }
        );
        this.triggersData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
      } catch (err) {
        this.showNotification(-1);
      }
    },

    changeSortType() {
      if (this.sortType == "asc") this.sortType = "desc";
      else this.sortType = "asc";
    },

    sortBy(value) {
      if (this.sortType == "asc") this.sortType = "desc";
      else this.sortType = "asc";

      this.sortByValue = value;
      this.reloadTriggers();
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

#Triggers {
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
