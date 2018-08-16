<template>

  <div class="container pt-5">

    <div class="row">
      <div class="col-12 py-5">
        <h1>Add new user</h1>
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

    <UserInfo v-model="user" />

    <button
      type="button"
      class="btn btn-success"
      @click="createNewUser">
      Save new user
    </button>

  </div>

</template>

<script>
import UserForm from "@/components/UserForm.vue";
import axios from "@/axios";

export default {
  name: "UserAdd",
  component: UserForm,
  data() {
    return {
      user: {}
    };
  },
  asyncComputed: {
    lastuserId: {
      get() {
        return axios.get().then(users => {
          let indexOfLast = users.data.length - 1;
          return users.data[indexOfLast].id;
        });
      }
    }
  },
  methods: {
    createNewUser() {
      let newUserId = this.lastuserId + 1;

      this.userData.id = newUserId;
      this.userData.image = "http://placehold.it/128x128";

      axios
        .post({
          data: this.userData
        })
        .then(response => {
          if (response.status === 201) {
            this.$router.push(`/user/${newUserId}`);
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
