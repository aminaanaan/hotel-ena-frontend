<template>
  <div id="formaEU">
    <div id="form-style-10">
      <form id="forma">
        <div id="section">
          <p>
            Edit User
            <label id="close-icon" @click="exit" style="font-size: 20px">X</label>
          </p>
        </div>
        <div id="inner-wrap">
          <label>Email</label>
          <input type="text" name="field1" placeholder="New user email" v-model="title" id="field1" />
          <label>Role</label>
          <input type="text" name="field1" placeholder="New user role" v-model="title" id="field2" />
          <input type="button" value="Save" @click="save" id="submit" />
          <input type="button" value="Cancel" @click="exit" id="cancle" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default {
  name: "formaEU",
  data() {
    return {
      title: "",
      text: ""
    };
  },
  mounted: function() {
    /*if(this.$route.params.id == null)
			console.log("Nije prosljedjen parametar");
		else
		{
			console.log(this.$route.params.id)
			this.create();
		}*/
  },
  methods: {
    exit() {
      this.$router.go(-1);
    },
    save() {
      axios
        .post(API_BASE_URL + "/user/edit", {
          email: document.getElementById("field1").nodeValue.toString(),
          role: document.getElementById("field2").nodeValue.toString()
        })
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      /*if(this.$route.params.id == null)
			{
				alert("Sacuvaj");
			}
			else
			{
				alert("Update -> " + this.$route.params.id);
			}*/
      this.$router.go(-1);
    },
    async create() {
      const res = await axios.get("../../jsonM.txt");
      this.title = res.data.title;
      this.text = res.data.text;
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
}

#form-style-10 {
  width: 640px;
  height: 480px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
  display: block;
  -webkit-border-radius: 1px;
  -moz-border-radius: 1px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
  z-index: 99;
}

#form-style-10 #inner-wrap {
  display: block;
  padding: 20px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
}

#form-style-10 label {
  display: block;
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
  height: 40%;
  padding: 8px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border: 1px inset rgba(0, 0, 0, 0.2);
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
</style>