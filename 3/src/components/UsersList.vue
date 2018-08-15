<template>
  <div class="container nprogress-container pt-5">
    <div class="row">
      <div class="col-12 py-5">
        <h1> {{ title }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <td>
                ID
              </td>
              <td>
                Picture
              </td>
              <td>
                Name
              </td>
              <td>
                Company
              </td>
              <td>
                Registered
              </td>
              <td>
                Balance
              </td>
              <td>
                Active
              </td>
              <td>
                Action
              </td>
            </tr>
          </thead>
          <tbody class="table-striped table-hover">
            <tr
              v-for="user in users"
              :key="user.id">
              <td>
                {{ user.id }}
              </td>
              <td>
                <img
                  :src="user.picture"
                  :alt="user.firstName">
              </td>
              <td>
                {{ user.firstName }} {{ user.lastName }}
              </td>
              <td>
                {{ user.company }}
              </td>
              <td>
                {{ user.registered }}
              </td>
              <td>
                {{ user.balance }}
              </td>
              <td>
                {{ user.isActive ? 'Yes' : 'No' }}
              </td>
              <td>
                <router-link
                  :to="`/user/${user.id}`"
                  class="btn btn-outline-primary"
                  tag="span">Edit</router-link>
                <hr>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="removeUser(user.id)">Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "UsersList",
  data: function() {
    return {
      APIpath: "http://localhost:3000/users",
      usersTotal: 0,
      users: []
    };
  },
  asyncComputed: {
    users: {
      get: function() {
        return fetch(this.APIpath).then(response => {
          return response.json();
        });
      },
      default: "Loading..."
    }
  },
  computed: {
    title: function() {
      return `Users list (${this.usersTotal})`;
    }
  },
  watch: {
    users: function() {
      this.usersTotal = this.users.length;
      console.log("User data is loaded - ", this.users);
    }
  },
  methods: {
    removeUser: function(userId) {
      userId = parseInt(userId, 10);

      let confirmation = confirm("Are you sure you want to delete the user?");
      if (!confirmation) {
        return;
      }

      let removeOptions = {
        method: "delete",
        url: `${this.APIpath}/${userId}`
      };

      axios(removeOptions).then(() => {
        this.removeFromList(userId);
      });
    },
    removeFromList: function(userId) {
      this.users = this.users.filter(user => user.id !== userId);
    },
    showUser: function(userId) {
      this.$root.router.push({ path: `/user/${userId}` });
    }
  }
};
</script>
