<template>
  <div>
    <v-dialog :value="dialog" max-width="700" scrollable>
      <v-card class="pa-5">
        <v-card-title class="primary--text font-weight-bold">
          テンプレートの作成
        </v-card-title>
        <v-card-text class="primary--text body-1">
          ISSUEを簡単に作成するためのテンプレートを作成できます。
        </v-card-text>
        <v-card-text class="mt-4">
          <span class="primary--text body-1 font-weight-bold">タイトル</span>
          <v-text-field
            v-model="template.title"
            filled
            rounded
            dense
            class="mt-2 text_field_background"
            :rules="[template.requireValue]"
          ></v-text-field>
          <div class="mt-4">
            <div
              v-for="(item, i) in template.templateItems"
              :key="i"
              class="mb-4"
            >
              <span class="primary--text body-2 font-weight-bold">項目名</span>
              <v-text-field
                v-model="item.name"
                filled
                rounded
                dense
                class="mt-2 text_field_background"
                :rules="[item.requireValue]"
              />
              <span class="primary--text body-2 font-weight-bold">説明</span>
              <v-textarea
                v-model="item.description"
                filled
                rounded
                dense
                class="mt-2 text_field_background"
                :rules="[item.requireValue]"
              />
            </div>
            <v-btn
              color="primary"
              text
              :disabled="!template.canAddTemplateItem"
              @click="template.addTemplateItem()"
            >
              <v-icon>mdi-plus</v-icon>
              項目を追加</v-btn
            >
            <v-btn
              color="accent"
              text
              :disabled="!template.canDeleteTemplateItem"
              @click="template.deleteTemplateItem()"
            >
              <v-icon>mdi-delete-outline</v-icon>
              項目を削除</v-btn
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="font-weight-bold mr-4 grey--text text--darken-2"
            text
            :disabled="loading"
            @click="close"
            >キャンセル</v-btn
          >
          <v-btn
            :class="
              (template.canCreate && 'secondary-button') ||
                'disable-secondary-button'
            "
            color="scondary"
            width="100"
            height="42"
            :loading="loading"
            :disabled="!template.canCreate"
            @click="createIssueTemplate"
            >作成</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="createdNotice" right color="success">
      テンプレートを作成しました
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import { TemplateRepository } from '@/repositories/templateRepository'

@Component({})
export default class TemplateEdit extends Vue {
  @Prop({ default: true })
  dialog!: boolean

  createdNotice: boolean = false
  loading: boolean = false
  template: Template = new Template()
  templateRepository: TemplateRepository = new TemplateRepository()

  @Emit('close')
  close() {}

  async createIssueTemplate() {
    this.loading = true
    const newTemplate = await this.templateRepository.create(this.template)
    this.createdNotice = true
    this.close()
    this.$router.push(`/templates/${newTemplate.id}`)
    this.loading = false
  }
}
</script>
