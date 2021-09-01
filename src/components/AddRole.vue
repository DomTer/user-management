<template functional>
 <div>
   {{ role.name }}
 </div>
</template>

<script>

export default {
  functional: true,
  name: "AddRole",
  data() {
    return {
      role: {
        name: "sad",
        permissions: [{id: "cKEOTt1h8"}],
      }
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>