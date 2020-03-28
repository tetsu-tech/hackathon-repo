<template>
  <v-layout column justify-center align-center>
    <Markdown v-model="data" />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Markdown from '@/components/Markdown.vue'

@Component({
  components: {
    Markdown
  }
})
export default class Page extends Vue {
  data: string = ''
}
</script>
