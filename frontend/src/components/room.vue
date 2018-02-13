<template>
  <div class="tile is-child box">
    <div class="level">
      <div class="level-left">
        <div class="control level-item">
          <p class="title">{{ room.name }}</p>
        </div>
      </div>
      <div class="level-right">
        <div class="control level-item">
          <p class="subtitle">{{ room.updatedAt | moment("from", "now") }}</p>
        </div>
        <div class="level-item">
          <div class="control tags has-addons">
            <span class="tag is-dark">Temperatur</span>
            <span class="tag is-info">{{ room.temperature }}</span>
          </div>
        </div>
        <div class="level-item">
          <div class="control tags has-addons">
            <span class="tag is-dark">Luftfuktighet</span>
            <span class="tag is-success">{{ room.humidity }}</span>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  props: ["initialRoom"],
  data () {
    return {
      room: this.initialRoom,
    }
  },
  watch: {
    initialRoom (room) {
      this.room = room;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
