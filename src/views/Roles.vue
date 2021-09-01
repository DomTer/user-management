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
                @click="tab = 'permissions'"
                :key="tab"
            >
              permissions
            </v-tab>
            <!-- TODO: fix tab slider -->
            <v-tab
                class="grey lighten-5"
                @click="tab = 'roles'"
            >
              roles
            </v-tab>
          </v-tabs>
          <PermissionForm v-if="tab === 'permissions'" />
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
      <RolesTable v-if="tab === 'roles'"/>
      <PermissionsTable v-if="tab === 'permissions'"/>
        </v-card>
      </v-col>
    </v-row>
</template>

<script>
import RolesTable from "../components/RolesTable";
import PermissionsTable from "../components/PermissionsTable";

import GET_ROLES from '../graphql/CreateUser.graphql';
import GET_PERMISSIONS from '../graphql/CreateUser.graphql';
import PermissionForm from "../components/PermissionCreateForm";


export default {
  name: "Roles",
  components: {PermissionForm, PermissionsTable, RolesTable},
  data: () => ({
    tab: 'permissions',
    permissions: '',
  }),

  apollo: {
    permissions: GET_PERMISSIONS,
    roles: GET_ROLES
  },

  computed: {

  },

  watch: {
  },

  created () {

  },

  methods: {


  },
}
</script>

<style scoped>

</style>