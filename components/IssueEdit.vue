<template>
  <div>
    <v-dialog :value="dialog" max-width="700" scrollable>
      <v-card v-if="dialog" class="pa-5">
        <v-card-title class="primary--text font-weight-bold">
          ISSUEの作成
        </v-card-title>
        <v-card-text class="primary--text body-1">
          ISSUEを簡単に作成するためのテンプレートを作成できます。
        </v-card-text>
        <v-card-text class="mt-4">
          <span class="primary--text body-1 font-weight-bold">タイトル</span>
          <v-text-field
            v-model="issue.title"
            filled
            rounded
            dense
            class="mt-2 "
            :rules="[issue.requireValue]"
          ></v-text-field>
          <div class="mt-4">
            <div
              v-for="(item, i) in template.templateItems"
              :key="i"
              class="mb-4"
            >
              <span class="primary--text body-2 font-weight-bold">{{
                item.name
              }}</span>
              <p class="mt-2 primary--text body-2">
                {{ item.description }}
              </p>
              <v-textarea
                v-model="bodies[i].description"
                class="mt-2 "
                filled
                rounded
                dense
                :rules="[issue.requireValue]"
                @input="changeIssue"
              />
            </div>
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
              (issue.canCreate && 'secondary-button') ||
                'disable-secondary-button'
            "
            color="scondary"
            width="100"
            height="42"
            :loading="loading"
            :disabled="!issue.canCreate"
            @click="createIssue"
            >作成</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="createdNotice"
      right
      color="success"
      class="font-weight-bold"
    >
      ISSUEを作成しました
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Emit, Vue } from 'nuxt-property-decorator'
import { TemplateItem } from '../models/templateItem'
import { Issue } from '@/models/issue'
import { IssueRepository } from '@/repositories/issueRepository'
import { Template } from '@/models/template'

interface InputIssueBody {
  name: string
  description: string
}

@Component({})
export default class IssueEdit extends Vue {
  @Prop({ default: false })
  dialog!: boolean

  @Prop({ required: true })
  template!: Template

  bodies: InputIssueBody[] = []
  createdNotice: boolean = false
  loading: boolean = false
  issue: Issue = new Issue()
  issueRepository: IssueRepository = new IssueRepository()

  @Watch('dialog')
  initData(newValue: boolean) {
    if (newValue) {
      this.initBodies()
      this.changeIssue()
      return
    }
    this.resetValue()
  }

  resetValue() {
    this.issue.title = ''
    this.issue.body = ''
    this.bodies = []
  }

  initBodies() {
    this.bodies = this.template.templateItems.map((item: TemplateItem) => {
      return {
        name: item.name,
        description: ''
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

  @Emit('close')
  close() {}

  @Emit('created-issue')
  createdIssue(issue: Issue) {
    return issue
  }

  async createIssue() {
    this.loading = true
    await this.issueRepository.create(this.issue)
    this.createdNotice = true
    // this.createdIssue(newIssue)
    this.close()
    this.loading = false
  }
}
</script>
