<template>
  <div id="Bills" class="tabcontent">
    <router-view
      @reload-bills="reloadBills()"
      @show-notification="showNotification($event)"
    ></router-view>
    <div id="header">
      <h1>Racuni</h1>
    </div>
    <div id="divlist">
      <ul id="list">
        <li id="title-li">
          <div class="column1 column">
            <h5>Id</h5>
            <p>
              <i class="material-icons" @click="sortBy('id.title')" title="Sort by id title">arrow_drop_down</i>
            </p>
          </div>
          <div class="column2 column">
            <h5>Created</h5>
            <p>
              <i class="material-icons" @click="sortBy('created')" title="Sort by created">arrow_drop_down</i>
            </p>
          </div>
          <div class="column3 column">
            <h5>Created by</h5>
            <p>
              <i class="tooltip, material-icons" @click="sortBy('createdBy')" title="Sort by created by">arrow_drop_down</i>
            </p>
          </div>
          <div class="column4 column">
            <h5>Reservation id</h5>
            <p>
              <i class="tooltip, material-icons" @click="sortBy('reservationId')" title="Sort by reservation id">arrow_drop_down</i>
            </p>
          </div>
          <div class="column5 column">
            <h5>Cost</h5>
            <p>
              <i class="tooltip, material-icons" @click="sortBy('cost')" title="Sort by cost">arrow_drop_down</i>
            </p>
          </div>
          <div class="column6 column">
            <h5>Paid</h5>
            <p>
              <i class="tooltip, material-icons" @click="sortBy('paid')" title="Sort by paid">arrow_drop_down</i>
            </p>
          </div>
          <div class="column7 column">
            <p>
              <i class="material-icons">filter_list</i>
            </p>
          </div>
        </li>

        <li v-for="bill in billsData" :key="bill.id">
          <div class="linear1"></div>
          <div class="linear2"></div>
          <div class="column1 column">
            <p>{{ bill.id }}</p>
          </div>
          <div class="column2 column">
            <p>{{ bill.created }}</p>
          </div>
          <div class="column3 column">
            <p>{{ bill.createdBy }}</p>
          </div>
          <div class="column4 column">
            <p>{{ bill.reservationId | repeatView }}</p>
          </div>
          <div class="column5 column">
            <p>{{ bill.cost }}</p>
          </div>
          <div class="column6 column">
            <p>{{ bill.paid }}</p>
          </div>
          <div class="column7 column">
            <i class="material-icons" @click="editBill(bill.id)" title="Edit bill">editBill</i>
            <i class="material-icons" @click="deleteBill(bill.id)" title="Delete bill">delete</i>
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
  API_BASE_URL
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
      rowSize: 20, //Number of rows
      pagesSize: 1, //Number of pages
      page: 1, //current active page
      menu: false,
      rowSizesValue: [5, 10, 20],
      sortType: "desc",
      textNoti: "",
      errorOccured: false,
      showNotificationValue: false,
      sortByValue: "created"
    };
  },

  mounted: function() {
   
    
    this.create();
  },

  filters: {
    created(value) {
      let dateVar = new Date(value);
      let dataVar2 = dateVar.toString();
      let data = dataVar2.substring(4, 21);
      return data;
    },
    paid(value) {
      if (value == true) return "Paid";
      else return "Not paid";
    },
    
  },


  methods: {
    async reloadBills() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      var pg = this.page - 1;
      try {
        const res = await axios.get(
          "http://localhost:8080/" +
            "korisnik/racun/all",
          { headers: headers }
        );

      

        this.billsData = res.data;
        
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

    showBillForm() {
      this.$router.push("/dashboard/racuni/newBill");
    },

    async editBill(id) {
      this.$router.push("/dashboard/racuni/updateBill/" + id);
    },
    

    async deleteBill(id) {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      await axios.delete(API_BASE_URL + "/dashboard/racuni/deleteBill/" + id);
      var pg = this.page - 1;
      try {
        //api base url nisam sigurna
        const res = await axios.get(
          API_BASE_URL +
            "/dashboard/racuni/deleteBill/?page=" +
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
        this.billsData = res.data.content;
        if (res.data.totalPages == 0) this.pagesSize = 1;
        else this.pagesSize = res.data.totalPages;
        this.showNotification();
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
        this.reloadBills();
      }
      this.menu = !this.menu;
    },

    changePage(nextPage) {
      this.page = nextPage;
      this.reloadBills(nextPage - 1);
    },

    async create() {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
      };
      try {
      
           const res = await axios.get(
          "http://localhost:8080/" +
            "korisnik/racun/all",
          { headers: headers }
        );

      

        this.billsData = res.data;
      
       
      } catch (err) {
        this.showNotification(-1);
      }
    },

    sortBy(value) {
      if (this.sortType == "desc") this.sortType = "asc";
      else this.sortType = "desc";

      this.sortByValue = value;
      this.reloadBills();
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
  width: 5%;
  margin-right: 0px;
}

.column2 {
  width: 11%;
  margin-right: 20px;
  margin-left: 0 px;
  text-align: center;
}

.column3 {
  width: 11%;
  margin-right: 20px;
  margin-left: 0 px;
  text-align: center;
}

.column4 {
  width: 11%;
  margin-right: 20px;
  margin-left: 0 px;
  text-align: center;
}
.column5 {
  width: 11%;
  margin-right: 20px;
  margin-left: 0 px;
  text-align: center;
}
.column6 {
  width: 11%;
  margin-right: 20px;
  margin-left: 0 px;
  text-align: center;
}
/* .column3 {
  width: 11%;
  text-align: center;
  margin-left: 20px;
}
 */
/* .column4 {
  width: 15%;
  text-align: center;
  margin-left: 20px;
}


.column5 {
  width: 11%;
  margin-left: 10 px;
}


.column6 {
  width: 10%;
  margin-left: 40px;
  margin-right: 80 px;
} */

#title-li .column2 {
  text-align: center;
  padding: 10px;
}


#title-li .column3 {
  text-align: center;
  padding: 10px;
}

#title-li .column4 {
  text-align: center;
  margin-right: 20px;
  padding: 10px;
}
/* #title-li .column4 {
  position: center;
  margin-left: 90 px;
  margin-right: 40 px;
} */

#title-li .column5 {
  text-align: center;
  padding: 10px;
}

#title-li .column {
  text-align: center;
  padding: 10px;
}

/* #title-li .column5 {
  position: center;
  margin-right: 100 px;
  padding-left: 15px;
}
 */

.linear1 {
  left: 28%;
}

.linear2 {
  left: 66%;
}
</style>
