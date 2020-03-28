<template>
  <div>
    <h1 class="title mt-5">
      ISSUEの一覧
    </h1>
    <v-divider class="my-5" />
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
    <v-card v-if="!loading" class="mx-4" style="margin-top: 40px">
      <v-data-table
        id="issue_list"
        :headers="headers"
        :items="issues"
        hide-default-footer
      >
        <template v-slot:item.title="{ item }">
          <span class="primary--text subtitle-1">
            {{ item.title }}
          </span>
        </template>
        <template v-slot:item.state="{ item }">
          <v-btn
            :color="item.isOpen ? 'success' : 'red'"
            fab
            width="10"
            height="10"
            class="elevation-0 ml-1"
            :ripple="false"
          />
        </template>
        <template v-slot:item.firstAssign.name="{ item }">
          <v-avatar size="40" class="mr-3">
            <v-img :src="item.firstAssign.icon" />
          </v-avatar>
          <span class="primary--text">
            {{ item.firstAssign.name || '-' }}
          </span>
        </template>
        <template v-slot:item.labels="{ item }">
          <template v-for="(label, i) in item.labels">
            <v-chip
              :key="i"
              :color="label.color"
              outlined
              x-small
              label
              class="mr-1"
            >
              {{ label.name }}
            </v-chip>
          </template>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ displayDate(item.createdAt) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Vue } from 'nuxt-property-decorator'
import { Issue } from '@/models/issue'
import { IssueRepository } from '@/repositories/issueRepository'

@Component({})
export default class IssueListPage extends Vue {
  loading: boolean = false
  issueDialog: boolean = false
  issues: Issue[] = []
  issueRepository: IssueRepository = new IssueRepository()

  get headers() {
    return [
      { text: '状況', value: 'state' },
      { text: 'ISSUE タイトル', value: 'title' },
      { text: '担当者', value: 'firstAssign.name' },
      { text: 'ラベル', value: 'labels' },
      { text: '作成日時', value: 'createdAt' }
    ]
  }

  async created() {
    await this.findIssues()
  }

  async findIssues() {
    this.loading = true
    this.issues = await this.issueRepository.find()
    console.log(this.issues)
    this.loading = false
  }

  displayDate(originDate: Date) {
    return moment(originDate).format('YYYY/MM/DD HH:mm')
  }

  clickIssue(issue: Issue) {
    console.log(issue)
    this.issueDialog = true
  }
}
</script>

<style lang="scss">
#issue_list {
  tr {
    height: 64px;
  }
}
</style>
