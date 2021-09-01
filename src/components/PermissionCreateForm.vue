<template>
  <ApolloMutation
      :mutation="require('../graphql/CreatePermission.graphql')"
      :variables="permission"
      @done="onDone"
  >
    <template v-slot="{ mutate, loading, error }">
      <v-form v-model="valid">
        <v-container>
            <v-text-field
                v-model="permission.name"
                label="Name"
                required
            ></v-text-field>
            <v-text-field
                v-model="permission.description"
                label="Description"
                required
            ></v-text-field>
          <v-btn class="primary " :disabled="loading" @click="mutate()">Create new</v-btn>
          <v-btn class="ml-4" @click="clear">Clear</v-btn>
          <p class="error--text mt-4 px-2 py-2" v-if="error">An error occurred: {{ error }}</p>
        </v-container>
      </v-form>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  name: "PermissionForm",
  data() {
    return {
      permission: {
        name: '',
        description: '',
      }
    };
  },
  methods: {
    onDone: (res) => {
      alert("SUCCESS! Permission with id '" + res.data.createPermission.id + "' created.")
      location.reload()
    },
    clear: () => {
      /* TODO change this in the course of form validation */
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>