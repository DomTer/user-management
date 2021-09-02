<template>
  <v-form>
    <v-container>
      <v-text-field
          v-model="user.forename"
          label="Forename"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.surname"
          label="Surname"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.mail"
          label="E-Mail"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.phone"
          label="Phone"
          required
      ></v-text-field>
      <v-text-field
          v-model="user.password"
          label="Password"
          required
      ></v-text-field>
      <v-select
          v-model="selectedRoles"
          :items="roleNames"
          label="Select Roles"
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
          (+{{ selectedRoles.length - 1 }} others)
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
import ALL_ROLES    from "../graphql/GetRoles.graphql";
import CREATE_USER  from "../graphql/CreateUser.graphql";

export default {
  name: "UserCreateForm",
  data() {
    return {
      error: false,
      user: {
        forename: '',
        surname: '',
        mail: '',
        phone: '',
        password: '',
        roles: [],
      },
      roles: [],
      selectedRoles: []
    };
  },
  apollo: {
    roles: ALL_ROLES
  },
  computed: {
    roleNames() {
        return this.roles.map(role => role.name)
    },

  },
  methods: {
    async createUser(user) {
      // Call to the graphql mutation
      await this.$apollo.mutate({
        // Query
        mutation: CREATE_USER,
        // Parameters
        variables: {
          forename:   user.forename,
          surname:    user.surname,
          mail:       user.mail,
          phone:      user.phone,
          password:   user.password,
          roles:      user.roles,
        },
      }).catch((e) => {
        this.error = e
      }).then((res) => {
        this.done(res)
      })
    },
    create () {
      console.log(this.roles)
      let roleIds = []
      this.selectedRoles.forEach((selectedRole) => {
        let id = this.roles.find(role => role.name === selectedRole).id
        roleIds.push({id})
      })
      this.user.roles = roleIds
      this.createUser(this.user)
    },
    done: (res) => {
      alert("SUCCESS! User with id '" + res.data.createUser.id + "' created.")
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