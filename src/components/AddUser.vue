<template>
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="Forename" v-model="forename">
      <input type="text" placeholder="Surname" v-model="surname">
      <input type="text" placeholder="E-Mailr" v-model="mail">
      <input type="text" placeholder="Phone" v-model="phone">
      <input type="text" placeholder="Password" v-model="password">
      <v-select
          v-model="value"
          :items="user.roles"
          label="Select Role(s)"
          multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item }}</span>
          </v-chip>
          <span
              v-if="index === 2"
              class="grey--text text-caption"
          >
          (+{{ value.length - 2 }} others)
        </span>
        </template>
      </v-select>
    </fieldset>
    <input class="button-primary" type="submit" value="Send">
  </form>
</template>

<script>
import CREATE_USER from '../graphql/CreateUser.graphql';

export default {
  name: "AddUser",

  data() {
    return {
      user: {
        forename: 'fdgdfg',
        surname: 'fdgdf',
        mail: 'dfgdf',
        phone: 'fdgdfg',
        password: 'dfgdfg',
        roles: [{id: "cKEOTt1h8"}],
      }
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const {forename, surname, mail, phone, password, roles } = this.$data;
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          forename,
          surname,
          mail,
          phone,
          password,
          roles
        },
      });
    }
  }
};
</script>