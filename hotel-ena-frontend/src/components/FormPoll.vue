<template>
  <div id="FormPoll">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            <span id="createPoll">Create Poll</span>
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>
        <label class="la">Title</label>
        <div id="inner-wrap">
          <input
            autocomplete="off"
            type="text"
            name="field1"
            placeholder="New poll title"
            v-model="title"
            id="field1"
            :class="{errorBorder: showTitleError, noErrorBorder: !showTitleError}"
          />
          <span v-show="showTitleError">Title size is minimum 3 characters</span>

          <br />
          <br />

          <div id="choicesList">
          <label id="choices">Choices:</label>
          <input
            type="text"
            v-for="(choice, index) in choices"
            :key="index"
            v-model="choice.choiceValue"
            :class="{noErrorBorder: true}"
            :placeholder="index+1 + '.'"
            class="choices"
          />
          </div>

          <input
            type="button"
            value="+"
            @click="addNewChoice"
            :disabled="choices.length == 5"
            id="choiceButton"
            :class="{disabledButton: (choices.length == 5)}"
          />
          <input
            type="button"
            value="-"
            @click="removeChoice"
            :disabled="choices.length == 2"
            id="choiceButton"
            :class="{disabledButton: (choices.length == 2)}"
          />

          <span v-show="showChoiceError">Choice can not be empty</span>
          <br />
          <span
            v-show="choices.length==5"
            style="color: #888"
          >Maximum number of choices have been reached</span>

          <br />

          <label id="channelname" class="la">Channel name</label>
          <select
            id="field3"
            v-model="channelName"
            @click="getChannelID"
            :class="{errorBorder: showChannelError, noErrorBorder: !showChannelError}"
          >
            <option disabled selected>{{channelName}}</option>
            <option
              v-for="channel in channelsData"
              :key="channel.channelName"
            >{{ channel.channelName }}</option>
          </select>

          <span v-show="showChannelError">Channel name is required</span>
          <br />

          <label class="la2">End date</label>
          <br />
          <div class="input-append date form_datetime">
            <div>
              <date-picker v-model="date" :lang="lang" style="margin-top: 8px"></date-picker>
            </div>
          </div>
          <br />
          <span v-show="showDateError">Date is required and must not be less then today date</span>
          <br />

          <br />
          <br />

          <input type="button" value="Save" @click="save" id="submit" class="input-options" />
          <input type="button" value="Cancel" @click="exit" id="cancle" class="input-options" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ACCESS_TOKEN,
  USER_THEME,
  USER_LANGUAGE,
  TITLE,
  CREATEPOLL,
  CANCEL,
  SAVE,
  NEWPOLLTITLE,
  CHOICES,
  SOMECHANNELNAME,
  SELECTDATE,
  ENDDATE
} from "../constants/index.js";
import axios from "axios";
import DatePicker from "vue2-datepicker";
import { API_BASE_URL } from "../constants";

const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN)
};

export default {
  name: "FormPoll",

  components: { DatePicker },

  data() {
    return {
      title: "",
      choices: [],
      liveValidation: false,
      showTitleError: false,
      showChoiceError: false,
      date: null,
      showDateError: false,
      active: true,
      channelsData: [],
      channelName: localStorage.getItem(SOMECHANNELNAME),
      channelId: "",
      targetChannel: "",
      showChannelError: false,

      time1: "",
      time2: "",
      time3: "",
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        pickers: [
          "next 7 days",
          "next 30 days",
          "previous 7 days",
          "previous 30 days"
        ],
        placeholder: {
          date: localStorage.getItem(SELECTDATE),
          dateRange: "Select Date Range"
        }
      }
    };
  },

  mounted: async function() {
    if (localStorage.getItem(USER_THEME) == "Light") {
       document.getElementById("createPoll").style.color = "black";
      document.getElementById("form-style-10").style.backgroundColor = "white";
      //document.getElementById("messages").style.backgroundColor="white";
    } else if (localStorage.getItem(USER_THEME) == "Dark") {
       document.getElementById("cancle").style.backgroundColor="#191919";
        document.getElementById("cancle").style.color="white";
      document.getElementsByClassName("mx-input")[0].style.backgroundColor="#191919";
      document.getElementById("channelname").style.backgroundColor="#191919";
      document.getElementsByClassName("la2")[0].style.backgroundColor="#191919";
      document.getElementById("createPoll").style.color="white";
      document.getElementById("form-style-10").style.backgroundColor="#191919";
       document.getElementById("inner-wrap").style.backgroundColor="#191919";
       document.getElementsByTagName("label")[0].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[1].style.backgroundColor="#191919";
       document.getElementsByTagName("label")[2].style.backgroundColor="#191919";
      document.getElementById("FormPoll").color = "black";
      //document.getElementById("messages").style.backgroundColor="black";
    }
    if (localStorage.getItem(USER_LANGUAGE) != "en") {
      document.getElementById("createPoll").innerHTML = localStorage.getItem(
        CREATEPOLL
      );
     
      document.getElementsByClassName("la")[0].innerHTML = localStorage.getItem(
        TITLE
      );
      document.getElementsByClassName(
        "la2"
      )[0].innerHTML = localStorage.getItem(ENDDATE);
      document.getElementById("channelname").innerHTML = localStorage.getItem(
        SOMECHANNELNAME
      );
      document.getElementById("cancle").value = localStorage.getItem(CANCEL);
      document.getElementById("submit").value = localStorage.getItem(SAVE);
      document.getElementById("field1").placeholder = localStorage.getItem(
        NEWPOLLTITLE
      );
      document.getElementById("choices").innerHTML = localStorage.getItem(
        CHOICES
      );
    }
    this.choices.push({ choiceValue: "" });
    this.choices.push({ choiceValue: "" });
    document.getElementsByClassName("mx-input-append")[0].style.padding = "0px";

    try {
      const res = await axios.get(API_BASE_URL + "/api/channels");
      this.channelsData = res.data;
    } catch (err) {
      this.$emit("show-notification", -1);
    }
  },

  watch: {
    date(value) {
      if (this.liveValidation == true) this.check_date(value);
    },

    choices: {
      handler: function() {
        if (this.liveValidation == true) this.check_choices(this.choices);
      },
      deep: true
    },

    title(value) {
      if (this.liveValidation == true) this.check_title(value);
    },

    channelName(value) {
      this.channelName = value;
      if (this.liveValidation == true) this.check_channelName(value);
    }
  },

  methods: {
    exit() {
      this.$router.go(-1);
    },

    addNewChoice() {
      this.choices.push({ choiceValue: "" });
    },

    removeChoice() {
      this.choices.pop();
    },

    check_title(value) {
      if (this.title.length < 3) {
        this.showTitleError = true;
        return false;
      } else {
        this.showTitleError = false;
        return true;
      }
    },

    check_choices(value) {
      var checkError = false;
      for (var i = 0; i < this.choices.length; i++) {
        if (this.choices[i].choiceValue == "") {
          document.getElementsByClassName("choices")[i].style.borderColor =
            "red";
          this.showChoiceError = true;
          checkError = true;
        } else
          document.getElementsByClassName("choices")[i].style.borderColor =
            "rgba(0, 0, 0, 0.2)";
      }
      if (checkError == true) return false;

      this.showChoiceError = false;
      return true;
    },

    check_date(value) {
      var today = new Date();
      if (this.date == null || today >= this.date) {
        var inputi = document.getElementsByClassName("mx-input")[0];
        inputi.style.borderColor = "rgb(253, 38, 38)";
        this.showDateError = true;
        return false;
      } else {
        var inputi = document.getElementsByClassName("mx-input")[0];
        inputi.style.borderColor = "rgba(0, 0, 0, 0.2)";
        this.showDateError = false;
        return true;
      }
    },

    check_channelName(value) {
      if (this.channelName == "Some channel name") {
        this.showChannelError = true;
        return false;
      } else {
        this.showChannelError = false;
        return true;
      }
    },

    async save() {
      this.liveValidation = true;
      if (this.check_title(this.title) == false) this.invalid = true;
      if (this.check_date(this.date) == false) this.invalid = true;
      if (this.check_choices(this.choices) == false) this.invalid = true;
      if (this.check_channelName(this.channelName) == false)
        if (this.invalid == true) {
          this.invalid = false;
          return;
        }

      try
      {
      await axios.post(
        API_BASE_URL + "/api/polls",
        {
          active: this.active,
          channelId: this.channelId,
          activeUntil: this.date,
          choiceList: this.choices,
          title: this.title
        },
        { headers: headers }
      );
      }catch(err)
      {
        this.$emit("show-notification", -1);
        this.$router.go(-1);        
      }
      this.$emit("show-notification");
      this.$emit("reload-poll");
      this.$router.go(-1);
    },

    getChannelID() {
      if (this.channelsData.length > 1) {
        this.targetChannel = this.channelsData.filter(
          obj => obj.channelName == this.channelName
        );
        this.channelId = this.targetChannel[0].id;
      } else this.channelId = this.channelsData[0].id;
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}
#formTitle{
  color: #4d4d4d;
}
#form-style-10 {
  width: 640px;
  height: auto;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 120;
  padding-bottom: 50px;
}

#choicesList{
  height: 130px;
  overflow: auto;
}

.mx-input {
  overflow: visible;
}

.mx-input-append {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
}

.mx-datepicker {
  width: 100%;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  padding-top: 0px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#form-style-10 label {
  font: 13px Arial, Helvetica, sans-serif;
  color: #888;
  margin-bottom: 15px;
}

#form-style-10 input[type="text"],
#form-style-10 input[type="date"],
#form-style-10 input[type="datetime"],
#form-style-10 input[type="email"],
#form-style-10 input[type="number"],
#form-style-10 input[type="search"],
#form-style-10 input[type="time"],
#form-style-10 input[type="url"],
#form-style-10 input[type="password"],
#form-style-10 textarea,
#form-style-10 select {
  padding-top: 10px;
  overflow: none;
  margin-bottom: 20px;
  display: block;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  font-size: 15px;
}

#form-style-10 #section {
  font: normal 23px "Bitter", serif;
  padding-left: 20px;
}

#form-style-10 #section p {
  width: 100%;
  height: 20%;
  font-weight: bold;
  color: black;
  margin-top: 18px;
}

#form-style-10 input[type="button"] {
  margin-right: 15px;
  float: right;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #4d4d4d;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.17);
  border: 1px solid #257c9e;
  font-size: 15px;
  border: none;
  background: #fff;
}

#form-style-10 #submit {
  float: right;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 18%;
  height: 30%;
  overflow: hidden;
  background: #0080ff;
  padding: 8px 20px 8px 20px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
  font: normal 30px "Bitter", serif;
  border: 1px solid #0080ff;
  font-size: 15px;
}

#form-style-10 #submit:hover {
  background: darkblue;
  -moz-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  -webkit-box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
  box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.28);
}

#form-style-10 .privacy-policy {
  float: right;
  width: 250px;
  font: 12px Arial, Helvetica, sans-serif;
  color: #4d4d4d;
  margin-top: 10px;
  text-align: right;
}

#textarea {
  display: block;
  overflow: none;
  height: 100%;
  width: 100%;
}

#close-icon {
  display: inline;
  text-align: right;
  float: right;
  margin: 0 20px 10px 0px;
}

#close-icon,
#submit,
#cancle:hover {
  cursor: pointer;
}

.la {
  display: inline-block;
  background-color: white;
  position: relative;
  top: 23px;
  left: 30px;
  padding: 0px 7px;
}

.input-options {
  position: relative;
  top: 10px;
}

#form-style-10 #choiceButton {
  float: right;
  height: 30px;
  width: 30px;
  background-color: #0080ff;
  color: white;
  border-radius: 50%;
  font-size: 25px;
  line-height: 10px;
  margin-right: 0px;
  margin-left: 10px;
}

.disabledButton {
  display: none;
}

.errorBorder {
  border: 1px inset rgb(253, 38, 38);
}

.noErrorBorder {
  border: 1px inset rgba(0, 0, 0, 0.2);
}

#filed1 {
  border: unset;
}

span {
  color: rgb(253, 38, 38);
  font-weight: 400;
}

.la2 {
  position: relative;
  top: 15px;
  left: 15px;
  background-color: white;
  z-index: 1;
  padding: 0px 4px;
}
</style>