<template>
  <div>
    <h1 class="title mt-5">
      ISSUEの一覧
    </h1>
    <v-card class="mt-5">
      <v-data-table
        :headers="headers"
        :items="issues"
        hide-default-header
        hide-default-footer
        class="elevation-1"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
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
    return [{ text: 'Title', value: 'title' }]
  }

  async created() {
    await this.findIssues()
  }

  async findIssues() {
    this.loading = true
    this.issues = await this.issueRepository.find()
    this.loading = false
  }
}
</script>
