<template>
  <v-card flat>
    <v-card-text class="primary--text text-center">
      <v-container
        fill-height
        align-center
        justify-center
        class="mx-auto"
        style="height: 90vh"
      >
        <v-row>
          <v-col cols="12">
            <v-img
              src="/add_template.png"
              max-width="360"
              contain
              class="mx-auto"
            />
          </v-col>
          <v-col cols="12" class="mt-4 py-0">
            <h3 class="title font-weight-bold">テンプレートを追加</h3>
          </v-col>
          <v-col cols="12" class="py-0">
            <p>
              Issueを簡単に作成できるテンプレートを追加します
            </p>
          </v-col>
          <v-col cols="12" class="mt-3">
            <v-btn
              class="white--text font-weight-bold secondary-button"
              color="scondary"
              width="170"
              height="42"
              @click="templateDialog = true"
              >追加する</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <TemplateEdit
      :dialog="templateDialog"
      @close="templateDialog = false"
      @created-template="goToTemplatePage"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import TemplateEdit from '@/components/TemplateEdit.vue'

@Component({
  components: {
    TemplateEdit
  }
})
export default class TemplatePage extends Vue {
  templateDialog: boolean = false

  goToTemplatePage(template: Template) {
    this.$router.push(`/templates/${template.id}`)
  }
}
</script>
