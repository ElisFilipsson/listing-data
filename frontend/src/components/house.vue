<template>
  <a class="button is-large is-white" :class="{'is-loading' : loading}">
    <span class="icon">
      <svg v-if="!loading" fill="#000000" height="60" viewBox="0 0 24 24" width="60">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </span>
  </a>
</template>

<script>
export default {
  name: 'House',
  props: ["loading"],
  data () {
    return {
      room: this.initialRoom,
    }
  }
}
</script>
