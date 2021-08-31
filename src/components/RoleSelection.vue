<template>
  <v-container fluid>
    <h1>{{this.roles ? this.roles : []}}</h1>

    <v-select
        v-model="value"
        :items="items"
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
  </v-container>
</template>

<script>
export default {
  name: "RoleSelection",
  props: ['roles'],
  data: () => ({
    items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
    value: this.roles ? this.roles : []
  }),
}
</script>

<style scoped>

</style>