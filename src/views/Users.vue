<template>
  <v-row no-gutters style="height: 100%;">
    <v-col
        cols="5"
        md="3"
        height="100%"
    >
      <v-card
          class="pa-2 grey lighten-5"
          height="100%"
          flat
          tile
      >
        <UserCreateForm />
      </v-card>
    </v-col>
    <v-col
        cols="12"
        sm="6"
        md="9"
    >
      <v-card
          class="pa-2"
          flat
          tile
      >
        <h1>Users</h1>
        <ApolloQuery
            :query="require('../graphql/GetUsers.graphql')"
        >
          <template v-slot="{ result: { loading, error, data } }">
            <!-- Loading -->
            <div v-if="loading" class="loading apollo">Loading...</div>
            <!-- Error -->
            <div v-else-if="error" class="error apollo">An error occured</div>
            <!-- Result -->
            <div v-else-if="data" class="result apollo">
              <div v-for="user in data.users" :key="user.id">
                {{ user}}
              </div>
            </div>
            <!-- No result -->
            <div v-else class="no-result apollo">No result :(</div>
          </template>
        </ApolloQuery>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserCreateForm from "../components/UserCreateForm";
export default {
  name: "Users",
  components: {UserCreateForm},
  data() {
    return {
      user: {
        forename: '',
        surname: '',
        mail: '',
        phone: '',
        password: '',
        roles: [{id: "cKEOTt1h8"}],
      }
    };
  },
}
</script>

<style scoped>

</style>