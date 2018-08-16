<template>

  <div class="row">
    <div class="col-12">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="form-group">
            <div
              class="card"
              style="width: 18rem;">
              <img
                :src="localUser.pictureBig"
                class="card-img-top"
                alt="localUser.firstName">
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
                  v-model="localUser.isActive"
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
                v-model="localUser.id"
                type="text"
                readonly
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Registred</label>
              <input
                v-model="localUser.registered"
                type="text"
                readonly
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>First name</label>
              <input
                v-model="localUser.firstName"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Last name</label>
              <input
                v-model="localUser.lastName"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Age</label>
              <input
                v-model.number="localUser.age"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Balance</label>
              <input
                v-model.trim="localUser.balance"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Access Level</label>
              <select
                v-model="localUser.accessLevel"
                class="custom-select">
                <option value="admin">Аdmin</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div class="form-group col-md-3 col-12">
              <label>Company</label>
              <input
                v-model="localUser.company"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-6 col-12">
              <label>Email</label>
              <input
                v-model="localUser.email"
                type="text"
                class="form-control">
            </div>
            <div class="form-group col-md-6 col-12">
              <label>Phone</label>
              <input
                v-model="localUser.phone"
                type="text"
                class="form-control">
            </div>
          </div>
        </div>
        <div class="form-group col-12">
          <label>Address</label>
          <textarea
            v-model="localUser.address"
            type="text"
            class="form-control"/>
        </div>
        <div class="form-group col-12">
          <label>About</label>
          <textarea
            v-model="localUser.about"
            type="text"
            class="form-control"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "UserForm",
  model: {
    prop: 'user',
    event: 'update'
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUser: this.user
    }
  },
  watch: {
    // user() {
    //   this.localUser = Object.assign({}, this.user);
    // },
    // localUser: {
    //   handler: 'update',
    //   deep: true
    // }
  },
  created() {
    this.localUser = Object.assign({}, this.user);
  },
  methods: {
    update() {
      this.$emit('update', Object.assign({}, this.localUser));
    }
  }
};
</script>
