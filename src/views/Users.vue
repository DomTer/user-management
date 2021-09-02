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
        <v-tabs
            class="pa-3 grey lighten-5"
            grow
        >
          <v-tabs-slider />
          <v-tab
              class="grey lighten-5"
              @click="tab = 'create'"
          >
            create
          </v-tab>
          <v-tab
              class="grey lighten-5"
              @click="tab = 'info'"
              :key="tab"
          >
            info
          </v-tab>
          <!-- TODO: fix tab slider -->
        </v-tabs>
        <UserCreateForm v-if="tab === 'create'"/>
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
        <UsersTable />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserCreateForm from "../components/UserCreateForm";
import UsersTable from "../components/UsersTable";

export default {
  name: "Users",
  components: {UsersTable, UserCreateForm},
  data() {
    return {
      tab: 'create',
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