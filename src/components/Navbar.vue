
<template>
  <div class="navbar">
    <nav class="nav-extended orange darken-1">
      <div class="nav-content">
        <router-link :to="{name: 'Index'}">
          <span class="nav-title">Midday Grain Bowls</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab grey">
          <router-link :to= "{name: 'AddBowl'}">
            <i class ="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return {

    }
  }
}
</script>

<style>
.navbar nav {
  padding: 0 20px;
}

</style>
