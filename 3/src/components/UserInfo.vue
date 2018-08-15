<template>
  <div class="container pt-5">

    <div class="row">
      <div class="col-12 py-5">
        <h1> {{ title }}</h1>
      </div>
      <div class="col-12 pb-5 text-left">
        <router-link
          tag="button"
          class="btn btn-outline-primary"
          type="button"
          to="/users">
          Back to users list
        </router-link>
      </div>
    </div>
    <div class="row">
      <form
        action=""
        class="col-12">
        <div
          v-if="userData"
          class="row">
          <div class="col-12 col-lg-4">
            <div class="form-group">
              <div
                class="card"
                style="width: 18rem;">
                <img
                  :src="userData.pictureBig"
                  class="card-img-top"
                  alt="userData.firstName">
                <div class="card-body">
                  <p class="card-text">Photography</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-12">
            <div class="row">
              <div class="form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    id="customCheck1"
                    v-model="userData.isActive"
                    type="checkbox"
                    class="custom-control-input">
                  <label
                    class="custom-control-label"
                    for="customCheck1">Active</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 col-12">
                <label>ID</label>
                <input
                  v-model="userData.id"
                  type="text"
                  readonly
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Registred</label>
                <input
                  v-model="userData.registered"
                  type="text"
                  readonly
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>First name</label>
                <input
                  v-model="userData.firstName"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Last name</label>
                <input
                  v-model="userData.lastName"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Age</label>
                <input
                  v-model.number="userData.age"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Balance</label>
                <input
                  v-model.trim="userData.balance"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Access Level</label>
                <select
                  v-model="userData.accessLevel"
                  class="custom-select">
                  <option value="admin">Аdmin</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <div class="form-group col-md-3 col-12">
                <label>Company</label>
                <input
                  v-model="userData.company"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-6 col-12">
                <label>Email</label>
                <input
                  v-model="userData.email"
                  type="text"
                  class="form-control">
              </div>
              <div class="form-group col-md-6 col-12">
                <label>Phone</label>
                <input
                  v-model="userData.phone"
                  type="text"
                  class="form-control">
              </div>
            </div>
          </div>
          <div class="form-group col-12">
            <label>Address</label>
            <textarea
              v-model="userData.address"
              type="text"
              class="form-control"/>
          </div>
          <div class="form-group col-12">
            <label>About</label>
            <textarea
              v-model="userData.about"
              type="text"
              class="form-control"/>
          </div>
          <div class="form-group col-12 text-right">
            <button
              v-if="isNewUser"
              type="button"
              class="btn btn-success"
              @click="createNewUser">
              Save new user
            </button>
            <button
              v-else
              type="button"
              class="btn btn-danger"
              @click="removeUserFromDb">
              Remove user
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash.debounce";

export default {
  name: "UserInfo",
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      APIpath: "http://localhost:3000/users",
      title: "Error. User Id is undefined"
    };
  },
  computed: {
    isNewUser() {
      return this.user === "add";
    }
  },
  watch: {
    userData: {
      handler: debounce(function() {
        if (this.isNewUser) {
          return;
        }
        this.saveUserDataToDb();
      }, 300),
      deep: true
    }
  },
  mounted() {
    if (this.isNewUser) {
      this.userData = {};
      this.title = "Add new user";
    }
  },
  asyncComputed: {
    userData: {
      get() {
        return axios({
          url: `${this.APIpath}/${this.user}`,
          method: "get",
          dataType: "json"
        }).then(response => {
          let fullName = `${response.data.firstName} ${response.data.lastName}`;
          this.title = `User info - ${fullName} #${response.data.id}`;

          return response.data;
        });
      },
      shouldUpdate() {
        return !this.isNewUser;
      }
    },
    lastuserId: {
      get() {
        return axios.get(this.APIpath).then(users => {
          let indexOfLast = users.data.length - 1;
          return users.data[indexOfLast].id;
        });
      }
    }
  },
  methods: {
    showUsersList() {
      this.$root.$emit("showUsersList");
    },
    saveUserDataToDb() {
      axios({
        url: `${this.APIpath}/${this.user}`,
        method: "PUT",
        data: this.userData
      }).then(() => {
        this.$message({
          type: "success",
          message: "User updated successful"
        });
      });
    },
    removeUserFromDb() {
      let userId = parseInt(this.user, 10);

      let confirmation = confirm("Are you sure you want to delete the user?");
      if (!confirmation) {
        return;
      }

      let removeOptions = {
        method: "DELETE",
        url: `${this.APIpath}/${userId}`
      };

      axios(removeOptions).then(() => {
        this.$router.push("users");
      });
    },
    createNewUser() {
      let newUserId = this.lastuserId + 1;

      this.userData.id = newUserId;
      this.userData.image = "http://placehold.it/128x128";

      axios({
        url: `${this.APIpath}`,
        method: "POST",
        data: this.userData,
        dataType: "JSON"
      }).then(response => {
        if (response.status === 201) {
          this.$router.push(`/user/${newUserId}`);
        }
      });
    }
  }
};
</script>
