<template>
  <div id="app">
    <ListOfHomes/>
  </div>
</template>

<script>
import ListOfHomes from './pages/ListHomes'

export default {
  name: 'App',
  components: {
    ListOfHomes
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  color: #2c3e50;
}

button {
  font-size: 12px;
}

footer {
  width: 100%;
}
</style>
