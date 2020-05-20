<template>
  <div id="poll">
    <router-view @reload-poll="reloadPoll()" @show-notification="showNotification($event)"></router-view>

    <div id="header">
      <h1>Sobe</h1>
    </div>

    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Title</h5>
            <p>
              <i class="material-icons" title="Sort by title" @click="sortBy('title')">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Channel</h5>
            <p>
              <i class="material-icons" title="Sort by channel" @click="sortBy('channel')">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Active</h5>
            <p>
              <i class="material-icons" title="Sort by active" @click="sortBy('active')">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li class="li" v-for="poll in pollData" :key="poll.pollId" @click="viewPoll(poll.pollId)">
          <div class="linear2"></div>
          <div class="linear1"></div>
          <div class="column1 column">
            <p>{{poll.title}}</p>
          </div>
          <div class="column2 column">
            <p>{{poll.channel}}</p>
          </div>
          <div class="column3 column">
            <p>{{poll.activeUntil | shortDate}}</p>
          </div>
          <div class="column4 column">
            <i class="material-icons"  @click.stop="deletePoll(poll.pollId)" title="Delete poll">delete</i>
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

    <button @click="showPollForm" id="btn">+</button>

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
import {
  Current_User_Role
} from "../constants/index.js";
import { User_Email } from "../constants/index.js";
import { ACCESS_TOKEN } from "../constants/index.js";
import axios from "axios";
import ClickOutside from "vue-click-outside";
import { setTimeout } from "timers";

export default {
  name: "poll",
  data() {
    return {
      pollData: [],
      textNoti: "",
      showNoti: false,
      rowSizesValue: [5, 10, 20],
      rowSize: 20,
      page: 1, //current active page
      pagesSize: 1, //Number of pages
      menu: false,
      sortByValue: "createdAt",
      sortType: "desc",
      textNoti: "",
      errorOccured: false,
      showNoti: false
    };
  },
  mounted: function() {
   
    
    this.create();
  },
  methods: {
    showPollForm() {
      this.$router.push("/dashboard/poll/newPoll");
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
        this.reloadPoll();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadPoll(nextPage - 1);
    },

    sortBy(value) {
      if (this.sortType == "desc") this.sortType = "asc";
      else this.sortType = "desc";

      this.sortByValue = value;
      this.reloadPoll();
    },

    async reloadPoll() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/polls?page=" +
            pg +
            "&size=" +
            this.rowSize +
            "&sort=" +
            this.sortByValue +
            "," +
            this.sortType,
          { headers: headers }
        );
        this.pollData = res.data.content;

        if (res.data.totalPages < this.page)
          this.changePage(res.data.totalPages);

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
          API_BASE_URL +
            "/api/polls?page=0&size=" +
            this.rowSize +
            "&sort=createdAt",
            {headers:headers}
        );
        this.pollData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.rowSize = res.data.size;
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
      this.showNoti = !this.showNoti;
      setTimeout(this.closeNoti, 1500);
      {
      }
    },

    async deletePoll(id) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios.delete(API_BASE_URL + "/api/polls/" + id);
      var pg = this.page - 1;

      try {
        const res = await axios.get(
          API_BASE_URL +
            "/api/polls?page=" +
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
        this.pollData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.showNotification(200);
      } catch (err) {
        this.showNotification(-1);
      }
    },

    closeNoti() {
      this.showNoti = false;
    },

    viewPoll(id) {
      this.$router.push("/dashboard/poll/viewPoll/" + id);
    }
  },
  filters: {
    shortDate(value) {
      let dateVar = new Date(value);
      let dataVar2 = dateVar.toDateString();
      let data = dataVar2.substring(4);
      return data;
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
#table{
  height:100vh;
}
#poll {
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