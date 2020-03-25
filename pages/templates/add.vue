<template>
  <div>
    <h1 class="title mt-5">
      テンプレートの作成
    </h1>
    <v-card class="mt-3">
      <v-card-title>
        新規のテンプレート
      </v-card-title>
      <v-card-text class="mt-4">
        タイトル
        <v-text-field
          v-model="template.title"
          solo
          :rules="[template.requireValue]"
        />
        <div class="mt-4">
          <div v-for="(item, i) in template.templateItems" :key="i">
            項目名
            <v-text-field
              v-model="item.name"
              solo
              :rules="[item.requireValue]"
            />
            説明
            <v-textarea
              v-model="item.description"
              solo
              :rules="[item.requireValue]"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          width="160"
          height="40"
          color="primary"
          @click="template.addTemplateItem()"
          >項目を追加</v-btn
        >
        <v-spacer />
        <v-btn
          width="160"
          height="40"
          color="primary"
          :disabled="!template.canCreate"
          @click="createIssueTemplate"
          >生成</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="createdNotice" right color="success">
      テンプレートを作成しました
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import { TemplateRepository } from '@/repositories/templateRepository'

@Component({})
export default class TemplateAddPage extends Vue {
  createdNotice: boolean = false
  loading: boolean = false
  template: Template = new Template()
  templateRepository: TemplateRepository = new TemplateRepository()

  async createIssueTemplate() {
    this.loading = true
    await this.templateRepository.create(this.template)
    this.createdNotice = true
    this.loading = false
    alert(`テンプレートを作成しました。`)
    this.$router.push('/templates')
  }
}
</script>
