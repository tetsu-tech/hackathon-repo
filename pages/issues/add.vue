<template>
  <div>
    <h1 class="title mt-5">
      ISSUEの作成
    </h1>
    <v-card class="mt-3">
      <v-card-title>
        新規のISSUE
      </v-card-title>
      <v-card-text class="mt-4">
        <div class="mt-4">
          <v-select
            v-model="template"
            :items="items"
            label="Solo field"
            solo
            item-text="title"
            return-object
            @change="initBodies"
          ></v-select>
          <div v-if="selectedTemplate">
            タイトル
            <v-text-field v-model="issue.title" solo :rules="[requireString]" />
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
          :disabled="!issue.canCrete"
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
import { Issue } from '@/models/issue'
import { Template } from '@/models/template'

interface InputIssueBody {
  name: string
  description: string
}

@Component({})
export default class IssueAddPage extends Vue {
  createdNotice: boolean = false

  issue: Issue = new Issue()
  template: Template | null = null
  bodies: InputIssueBody[] = []

  get items() {
    return [Template.createMock(), Template.createMock()]
  }

  get selectedTemplate() {
    return Boolean(this.template && this.template.title)
  }

  initBodies(template: any) {
    this.bodies = template.map((item: any) => {
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
