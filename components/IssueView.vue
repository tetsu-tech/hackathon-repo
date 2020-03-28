<template>
  <div>
    <v-dialog :value="dialog" max-width="700" scrollable>
      <v-card v-if="dialog" class="pa-5">
        <v-card-title class="primary--text">
          <span class="font-weight-bold">
            {{ issue.title }}
          </span>
          <v-btn
            :color="issue.isOpen ? 'success' : 'red'"
            fab
            width="10"
            height="10"
            class="elevation-0 ml-5 mr-2"
            :ripple="false"
          />
          <span
            class="body-1 primary--text font-weight-bold"
            style="font-style: italic"
            >Open</span
          >
        </v-card-title>
        <v-card-text class="primary--text body-2">
          <p class="mt-4 mb-2 primary--text font-weight-bold subtitle-1">
            担当者
          </p>
          <v-row class="pb-5">
            <v-avatar
              v-for="issue in issue.assigns"
              :key="issue.id"
              size="40"
              class="ml-3"
            >
              <v-img :src="issue.icon" />
            </v-avatar>
          </v-row>
          <p class="mt-4 mb-2 primary--text font-weight-bold subtitle-1">
            Issue概要
          </p>
          <div style="line-height: 1.8" v-html="$md.render(issue.body)"></div>
        </v-card-text>
        <v-card-text>
          <p class="mt-3 mb-2 primary--text font-weight-bold subtitle-1">
            ラベル
          </p>
          <template v-for="(label, i) in issue.labels">
            <v-chip :key="i" :color="label.color" outlined label class="mr-1">
              {{ label.name }}
            </v-chip>
          </template>
        </v-card-text>
        <v-card-text>
          <p class="mt-3 mb-2 primary--text font-weight-bold subtitle-1">
            作成日時
          </p>
          {{ displayDate(issue.createdAt) }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="font-weight-bold mr-4 grey--text text--darken-2"
            text
            @click="close"
            >キャンセル</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Component, Prop, Emit, Vue } from 'nuxt-property-decorator'
import { Issue } from '@/models/issue'
import Markdown from '@/components/Markdown.vue'

@Component({
  components: {
    Markdown
  }
})
export default class IssueView extends Vue {
  @Prop({ default: false })
  dialog!: boolean

  @Prop({ required: true })
  issue!: Issue

  @Emit('close')
  close() {}

  displayDate(originDate: Date) {
    return moment(originDate).format('YYYY/MM/DD HH:mm')
  }
}
</script>
