<template>
  <v-layout column justify-center align-center> </v-layout>
</template>

<script>
export default {
  asyncData({ redirect }) {
    redirect('/templates')
  }
}
</script>
