<template functional>
  <ApolloQuery
      :query="require('../graphql/GetRoles.graphql')"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>
      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>
      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <div v-for="role in data.roles" :key="role.id">
          {{ role }}
        </div>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  functional: true,
  name: "RolesTable"
}
</script>

<style scoped>

</style>