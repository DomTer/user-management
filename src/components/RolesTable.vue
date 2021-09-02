<template>
  <v-data-table
      :headers="headers"
      :items="roles"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Roles</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Role</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="selectedItem.name"
                        label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="selectedItem.permissions"
                        label="Permissions"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this Role?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import ALL_ROLES          from "../graphql/GetRoles.graphql";
import ALL_PERMISSIONS    from '../graphql/GetPermissions.graphql';
import DELETE_ROLE        from '../graphql/DeleteRole.graphql';
import UPDATE_ROLE        from '../graphql/UpdateRole.graphql';

export default {
  name: "RolesTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Name', value: 'name' },
      { text: 'Permissions', value: 'permissions' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    roles: [],
    permissions: [],
    editedIndex: -1,
    selectedItem: {
      name: '',
      permissions: []
    },
    defaultItem: {
      name: '',
      permissions: [],
    },
  }),

  apollo: {
    roles: ALL_ROLES,
    permissions: ALL_PERMISSIONS
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'new' : 'edit'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize() {

    },

    async deleteRole(id) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: DELETE_ROLE,
        // Parameters
        variables: {
          id
        },
      })
    },

    async updateRole(role) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: UPDATE_ROLE,
        // Parameters
        variables: {
          id:           role.id,
          name:         role.name,
          permissions:  role.permissions
        },
      }).catch((e) => {
        alert(e);
      }).then((res) => {
        if (res) {alert(res)}
      })
      return role
    },

    editItem(item) {
      this.editedIndex = this.roles.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.roles.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.roles.splice(this.editedIndex, 1)
      this.deleteRole(this.selectedItem.id)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.selectedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.roles[this.editedIndex], this.selectedItem)
        this.updateRole(this.selectedItem)
      } else {
        this.roles.push(this.selectedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>