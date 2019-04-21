<template>
  <div class="demo">
    <p>This is {{ this.$route.name }} page</p>
    <p>Current route path: {{ this.$route.path }}</p>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      //
    }
  },
  methods:{
    printRouteMatched() {
      console.log(this.$route.matched)
    }
  }
}
</script>
