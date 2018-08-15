<template>
  <div id="app">
    <nav
      id="nav"
      class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link
        class="navbar-brand"
        to="/"
        exact>
        Vue cli app
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"/>
      </button>
      <div
        id="navbarCollapse"
        class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">

          <router-link
            class="nav-item"
            tag="li"
            to="/"
            exact>
            <a
              class="nav-link"
              href="#">Home</a>
          </router-link>
          <router-link
            class="nav-item"
            tag="li"
            to="/users">
            <a
              class="nav-link"
              href="#">Users</a>
          </router-link>
          <router-link
            class="nav-item"
            tag="li"
            to="/user/add">
            <a
              class="nav-link"
              href="#">Add</a>
          </router-link>

        </ul>
      </div>
    </nav>
    <router-view/>

  </div>
</template>


<style lang="stylus">
#app
  font-family: "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  padding-top: 80px

  a
    color: #2c3e50
    opacity: 0.5

#nav
  a
    color: #fff
    font-weight: bold
    &:hover
      color: #fff
      opacity: 0.5

  li.active a
    color: #42b983
    opacity: 1
</style>
