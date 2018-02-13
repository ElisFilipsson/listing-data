<template>
  <div id="" class="container">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="title"></p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <template>
            <house :loading="this.loading"></house>
          </template>
        </div>
      </div>
    </div>
    <div class="tabs is-toggle">
      <ul>
        <li :class="{'is-active': selectedHome === home.name}" v-for="home in homes" :key="home.id" v-on:click="handleSelection(home.name)">
          <a>
            <span class="icon is-small"><i class="fas fa-home"></i></span>
            <span>{{ home.name }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="tile is-ancestor">
      <template v-if="rooms.length">
          <div class="tile is-12 is-vertical is-parent">
            <template v-for="room in rooms">
                <room :initialRoom="room" :key="room.id"></room>
            </template>
          </div>
      </template>
    </div>
  </div>
</template>

<script>
import { backendUrl } from "../helpers/config.js";
import axios from "axios";
import Room from "../components/room.vue";
import House from "../components/house.vue";

export default {
  components: {Room, House},
  name: "list-rooms",
  data () {
    return {
      home: {},
      rooms: [],
      count: null,
      end: 0,
      time: 15,
      timeOfFetch: null,
      selectedHome: null,
      loading: false,
      homes: []
    };
  },
  created: async function () {
    await this.getHomes();
    this.timer(this.count);
  },
  computed: {},
  methods: {
    getHomes () {
      this.loading = true;
      axios
        .get(
          backendUrl + "/homes/all/data",
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          if (data.success && data.data.length) {
            this.homes = data.data;
            this.selectedHome = data.data[0].name;
            this.getRooms(data.data[0].name);
          }
          this.loading = false;
        });
    },
    getRooms (selectedHome = this.selectedHome, oldHome) {
      this.loading = true;
      if (selectedHome === oldHome) this.timeOfFetch = null;
      axios
        .post(
          backendUrl + `/homes/${selectedHome}/data`,
          { timeOfFetch: this.timeOfFetch },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(({ data }) => {
          this.delay(data, async (data) => { // Delay function only to display updating of data
            if (data.success && data.data.length) {
              const excistingRooms = this.rooms;
              const updatedRooms = data.data[0].rooms;
              this.home = data.data[0];
              if (selectedHome === oldHome) {
                excistingRooms.forEach(excistingRoom => {
                  !!updatedRooms.length && updatedRooms.forEach(updatedRoom => {
                    if (updatedRoom.id === excistingRoom.id) {
                      excistingRoom.temperature = updatedRoom.temperature;
                      excistingRoom.humidity = updatedRoom.humidity;
                      excistingRoom.updatedAt = updatedRoom.updatedAt;
                    }
                  });
                });
                this.rooms = excistingRooms.length ? excistingRooms : updatedRooms;
                this.timeOfFetch = new Date();
              } else {
                this.rooms = updatedRooms;
              }
            }
            this.count = this.time;
            this.loading = false;
          });
        });
    },
    timer (count) {
      this.counter(count);
      setTimeout(() => {
        this.timer(this.count);
      }, 1000);
    },
    counter (count) {
      if (count === null) {
        this.countDown();
      } else if (count > this.end) {
        this.countDown();
      } else if (count === this.end) {
        this.count = this.time;
        this.getRooms(this.selectedHome);
      }
    },
    countDown () {
      if (this.count === null) this.count = this.time;
      this.count = this.count - 1;
    },
    delay (data, func) {
      setTimeout(() => {
        func(data);
      }, 1000);
    },
    handleSelection (homeName) {
      const oldHome = this.selectedHome;
      this.getRooms(homeName, oldHome);
      this.selectedHome = homeName;
    }
  },
};
</script>

<style>
.container {
  margin-top: 40px;
}
</style>
