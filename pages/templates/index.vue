<template>
  <v-card flat>
    <v-card-title>
      <h1 class="title">
        テンプレートの一覧
      </h1>
    </v-card-title>
    <v-card-text>
      <v-btn
        class="mt-3"
        color="primary"
        width="160"
        height="40"
        to="/templates/add"
        >追加</v-btn
      >
      <v-container
        v-if="loading"
        fill-height
        align-center
        justify-center
        ma-0
        class="mx-auto"
        style="height: 260px"
      >
        <v-progress-circular indeterminate color="black" width="1" size="50" />
      </v-container>
      <v-card v-if="!loading" class="mt-5">
        <v-data-table
          :headers="headers"
          :items="templates"
          hide-default-header
          hide-default-footer
        />
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import { TemplateRepository } from '@/repositories/templateRepository'

@Component({})
export default class TemplatePage extends Vue {
  loading: boolean = false
  headers: any[] = [{ text: 'Title', value: 'title' }]
  templates: Template[] = []
  templateRepository: TemplateRepository = new TemplateRepository()

  async created() {
    this.loading = true
    this.templates = await this.templateRepository.find()
    this.loading = false
  }
}
</script>
