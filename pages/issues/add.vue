<template>
  <div>
    <h1 class="title mt-5">
      ISSUEの作成
    </h1>
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
    <v-card v-if="!loading" class="mt-3">
      <v-card-title>
        新規のISSUE
      </v-card-title>
      <v-card-text class="mt-4">
        <div class="mt-4">
          <v-select
            v-model="template"
            :items="templates"
            label="Solo field"
            solo
            item-text="title"
            return-object
            @change="initBodies"
          ></v-select>
          <div v-if="selectedTemplate">
            タイトル
            <v-text-field
              v-model="issue.title"
              solo
              :rules="[issue.requireValue]"
            />
            <div v-for="(item, i) in template.templateItems" :key="i">
              <p class="black--text font-weight-bold subtitle-1">
                {{ item.name }}
              </p>
              <v-textarea
                v-model="bodies[i].description"
                solo
                :rules="[issue.requireValue]"
                @change="changeIssue"
              />
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          width="160"
          height="40"
          color="primary"
          :disabled="!issue.canCreate"
          @click="createIssue"
          >生成</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="createdNotice" right color="success">
      ISSUEを作成しました
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { TemplateRepository } from '@/repositories/templateRepository'
import { Issue } from '@/models/issue'
import { Template } from '@/models/template'

interface InputIssueBody {
  name: string
  description: string
}

@Component({})
export default class IssueAddPage extends Vue {
  createdNotice: boolean = false
  loading: boolean = false

  templateRepository: TemplateRepository = new TemplateRepository()

  issue: Issue = new Issue()
  templates: Template[] = []
  template: Template | null = null
  bodies: InputIssueBody[] = []

  async created() {
    this.loading = true
    this.templates = await this.templateRepository.find()
    this.loading = false
  }

  get selectedTemplate() {
    return Boolean(this.template && this.template.title)
  }

  initBodies(template: any) {
    this.bodies = template.templateItems.map((item: any) => {
      return {
        title: item.name,
        description: item.description
      }
    })
  }

  private get toBody() {
    return this.bodies.map((b) => `### ${b.name}\n\n${b.description}`)
  }

  changeIssue() {
    this.issue.body = this.toBody.reduce((pre: string, cur: string) => {
      return pre ? `${pre}\n\n${cur}` : cur
    }, '')
  }

  createIssue() {
    this.createdNotice = true
    console.log('ISSUEを作成しました。', this.issue)
  }
}
</script>
