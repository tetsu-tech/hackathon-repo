<template>
  <v-card flat>
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
    <div v-if="!loading">
      <v-card-actions>
        <h1 class="title primary--text font-weight-bold">
          {{ template.title }}
        </h1>
        <v-spacer></v-spacer>
        <v-btn
          class="accent--text font-weight-bold mr-3 accent-button"
          color="white"
          width="170"
          height="42"
          >テンプレートの削除</v-btn
        >
        <v-btn
          class="white--text font-weight-bold secondary-button"
          color="scondary"
          width="170"
          height="42"
          @click="issueDialog = true"
          >ISSUEの作成</v-btn
        >
      </v-card-actions>
      <v-divider class="my-5" />
      <v-card-title class="title primary--text font-weight-bold">
        項目
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(item, i) in template.templateItems"
            :key="i"
            class="pl-0"
          >
            <v-list-item-content class="primary--text">
              <v-list-item-title class="font-weight-bold" v-text="item.name" />
              <v-list-item-subtitle
                class="mt-4 body-2 primary--text"
                v-text="item.description"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </div>
    <IssueEdit
      :dialog="issueDialog"
      :template="template"
      @close="issueDialog = false"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import { TemplateRepository } from '@/repositories/templateRepository'
import IssueEdit from '@/components/IssueEdit.vue'

@Component({
  components: {
    IssueEdit
  }
})
export default class TemplatePage extends Vue {
  loading: boolean = false
  issueDialog: boolean = false
  template: Template = new Template()
  templateRepository: TemplateRepository = new TemplateRepository()

  async created() {
    this.loading = true
    this.template = await this.templateRepository.get(
      this.$route.params.templateId
    )
    this.issueDialog = true
    this.loading = false
  }
}
</script>
