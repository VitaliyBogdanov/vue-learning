<template id="users-list">
  <div class="container pt-5">
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
          <tr v-for="user in users" :key="user.id">
            <td>
              {{ user.id }}
            </td>
            <td>
              <img :src="user.picture" :alt="user.firstName">
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
              <button type="button" @click="showUser(user.id)" class="btn btn-outline-primary">Edit
              </button>
              <hr>
              <button @click="removeUser(user.id)" type="button" class="btn btn-outline-danger">Remove
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
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
