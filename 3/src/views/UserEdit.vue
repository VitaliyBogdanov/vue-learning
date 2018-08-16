<template>

  <div class="container pt-5">

    <div class="row">
      <div class="col-12 py-5">
        <h1>{{ title }}</h1>
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

    <h2 v-if="!userData">Loading...</h2>
    <UserForm v-else v-model="userData" @update="updateUser"/>
    <!--<UserForm v-else v-model="userData" />-->

    <div class="row">
      <div class="form-group col-12 text-right">
        <button
          type="button"
          class="btn btn-danger"
          @click="removeUserFromDb">
          Remove user
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import UserForm from "@/components/UserForm.vue";
import debounce from "lodash.debounce";
import axios from "@/axios";

export default {
  name: "UserEdit",
  components: {
    UserForm
  },
  data() {
    return {
      userData: null,
      fullName: 'Loading...'
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.userId, 10);
    },
    title() {
      return `User info - ${this.fullName} #${this.id}`;
    }
  },
  watch: {
    userData() {
      this.fullName = `${this.userData.firstName} ${this.userData.lastName}`;
    }

  },
  asyncComputed: {
    userData: {
      get() {
        return axios.get(`/${this.id}`).then(response => {
          return response.data;
        }).catch(error => console.log(error));
      },
      set: debounce(function() {
        this.saveUserDataToDb();
      }, 300),
      default: {}
    }
  },
  methods: {
    updateUser(newData) {
      this.userData = newData;
      this.saveUserDataToDb();
    },
    saveUserDataToDb() {
      axios.put(`/${this.id}`,{
        data: this.userData
      }).then(() => {
        this.$message({
          type: "success",
          message: "User updated successful"
        });
      });
    },
    removeUserFromDb() {
      let confirmation = confirm("Are you sure you want to delete the user?");
      if (!confirmation) {
        return;
      }

      axios.delete(`/${this.id}`).then(() => {
        this.$router.push("users");
      }).catch(error => console.log(error));
    }
  }
};
</script>
