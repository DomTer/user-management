<template>
  <v-data-table
      :headers="headers"
      :items="users"
      sort-by="name"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Users</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="selectedItem.forename"
                        label="Forename"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="selectedItem.surname"
                        label="Surname"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="selectedItem.mail"
                        label="Mail"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="selectedItem.phone"
                        label="Phone"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                        :type="'password'"
                        v-model="selectedItem.password"
                        label="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="selectedItem.roles"
                        label="Roles"
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
            <v-card-title class="text-h5">Are you sure you want to delete this User?</v-card-title>
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
import ALL_USERS         from "../graphql/GetUsers.graphql";
import ALL_ROLES         from '../graphql/GetRoles.graphql';
import DELETE_USER       from '../graphql/DeleteUser.graphql';
import UPDATE_USER       from '../graphql/UpdateUser.graphql';

export default {
  name: "UsersTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Forename', value: 'forename' },
      { text: 'Surname', value: 'surname' },
      { text: 'E-Mail', value: 'mail' },
      { text: 'Phone', value: 'phone', sortable: false  },
      { text: 'Roles', value: 'roles', sortable: false  },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    roles: [],
    editedIndex: -1,
    selectedItem: {
      forename: '',
      surname: '',
      mail: '',
      phone: '',
      roles: [],
    },
    defaultItem: {
      forename: '',
      surname: '',
      mail: '',
      phone: '',
      roles: [],
    },
  }),

  apollo: {
    users: ALL_USERS,
    roles: ALL_ROLES
  },

  computed: {
    roleNames() {
       return '22'
    }
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

    async deleteUser(id) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: DELETE_USER,
        // Parameters
        variables: {
          id
        },
      })
    },

    async updateUser(user) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: UPDATE_USER,
        // Parameters
        variables: {
          id:       user.id,
          forename: user.forename,
          surname:  user.surname,
          mail:     user.mail,
          phone:    user.phone,
          roles:    user.roles,
        },
      }).catch((e) => {
        alert(e);
      }).then((res) => {
        if (res) {alert(res)}
      })
      return user
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.selectedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.deleteUser(this.selectedItem.id)
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
        Object.assign(this.users[this.editedIndex], this.selectedItem)
        this.updateUser(this.selectedItem)
      } else {
        this.users.push(this.selectedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>

</style>