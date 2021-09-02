<template>
  <v-form>
    <v-container>
      <v-text-field
          v-model="role.name"
          label="Name"
          required
      ></v-text-field>
      <v-select
          v-model="selectedPermissions"
          :items="permissionNames"
          label="Select Item"
          multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span
              v-if="index === 1"
              class="grey--text text-caption"
          >
          (+{{ selectedPermissions.length - 1 }} others)
        </span>
        </template>
      </v-select>
      <v-btn class="primary" @click="create" >Create new</v-btn>
      <v-btn class="ml-4" @click="clear">Clear</v-btn>
      <p class="error--text mt-4 px-2 py-2" v-if="error">An error occurred: {{ error }}</p>
    </v-container>
  </v-form>
</template>

<script>
import ALL_PERMISSIONS from "../graphql/GetPermissions.graphql";
import CREATE_ROLE from "../graphql/CreateRole.graphql";

export default {
  name: "RoleCreateForm",
  data() {
    return {
      error: false,
      role: {
        name: '',
        permissions: [],
      },
      permissions: [],
      selectedPermissions: []
    };
  },
  apollo: {
    permissions: ALL_PERMISSIONS
  },
  computed: {
    permissionNames() {
        return this.permissions.map(permission => permission.name)
    },

  },
  methods: {
    async createRole(role) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: CREATE_ROLE,
        // Parameters
        variables: {
          name: role.name,
          permissions: role.permissions
        },
      }).catch((e) => {
        this.error = e
      }).then((res) => {
        this.done(res)
      })
    },
    create () {
      let permissionIds = []
      this.selectedPermissions.forEach((selectedPermission) => {
        let id = this.permissions.find(permission => permission.name === selectedPermission).id
        permissionIds.push({id})
      })
      this.role.permissions = permissionIds
      this.createRole(this.role)
    },
    done: (res) => {
      alert("SUCCESS! Role with id '" + res.data.createRole.id + "' created.")
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