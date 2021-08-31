<template>
  <form @submit="submit">
    <fieldset>
      <input type="text" placeholder="Title" v-model="forename">
      <input type="text" placeholder="Director" v-model="surname">
      <input type="text" placeholder="Composer" v-model="mail">
      <input type="text" placeholder="Release date" v-model="phone">
      <input type="text" placeholder="Release date" v-model="password">
      <v-select
          v-model="value"
          :items="roles"
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
import ADD_USER from '../graphql/AddUser.graphql';

export default {
  name: "AddUser",

  data() {
    return {
        forename: '',
        surname: '',
        mail: '',
        phone: '',
        password: '',
        roles: ['foo', 'bar'],
    };
  },
  methods: {
    submit(e) {
      e.preventDefault();
      const {forename, surname, mail, phone, password, roles } = this.$data;
      this.$apollo.mutate({
        mutation: ADD_USER,
        variables: {
          forename,
          surname,
          mail,
          phone,
          password,
          roles
        },
        refetchQueries: ["Users"]
      });
    }
  }
};
</script>