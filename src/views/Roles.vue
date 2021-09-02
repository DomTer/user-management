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
                @click="tab = 'roles'"
            >
              roles
            </v-tab>
            <v-tab
                class="grey lighten-5"
                @click="tab = 'permissions'"
                :key="tab"
            >
              permissions
            </v-tab>
            <!-- TODO: fix tab slider -->
          </v-tabs>
          <PermissionCreateForm v-if="tab === 'permissions'" />
          <RoleCreateForm v-if="tab === 'roles'" />
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
import PermissionCreateForm from "../components/PermissionCreateForm";
import RoleCreateForm from "../components/RoleCreateForm";

export default {
  name: "Roles",
  components: {RoleCreateForm, PermissionCreateForm, PermissionsTable, RolesTable},
  data: () => ({
    tab: 'roles',
  }),
}
</script>

<style scoped>

</style>