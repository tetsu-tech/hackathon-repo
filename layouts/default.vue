<template>
  <v-app dark>
    <v-navigation-drawer clipped fixed app class="primary pa-3">
      <v-list-item class="mt-5">
        <v-list-item-action class="mr-3">
          <v-img src="/github-icon.png" width="20" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="title font-weight-bold white--text">
            Github issue
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list class="mt-5">
        <v-list-item class="mb-4">
          <v-list-item-content class="body-2 font-weight-bold white--text">
            <v-list-item-title v-text="organaization"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="my-0">
            <v-btn icon @click="templateDialog = true">
              <v-icon color="#929BAB" size="20">
                mdi-plus-circle
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(template, i) in templates"
          :key="i"
          :to="`/templates/${template.id}`"
        >
          <v-list-item-action class="mr-3">
            <v-icon color="white" size="20">mdi-file-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content class="white--text font-weight-bold my-0">
            <v-list-item-title v-text="template.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content class="primary">
      <v-container class="pa-0 mt-0 mr-0">
        <v-card id="content_base_card" height="100vh" class="pa-5">
          <div>
            <nuxt />
          </div>
        </v-card>
      </v-container>
    </v-content>
    <TemplateEdit :dialog="templateDialog" @close="templateDialog = false" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Template } from '@/models/template'
import { TemplateRepository } from '@/repositories/templateRepository'
import TemplateEdit from '@/components/TemplateEdit.vue'

@Component({
  components: {
    TemplateEdit
  }
})
export default class Default extends Vue {
  organaization: string = 'tetsu-tech'
  loading: boolean = false
  templateDialog: boolean = false
  templates: Template[] = []
  templateRepository: TemplateRepository = new TemplateRepository()

  async created() {
    this.loading = true
    this.templates = await this.templateRepository.find()
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
// vuetify container調整
.container {
  max-width: 100vw;
  padding: 0px;
}
#content_base_card {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  overflow: hidden;
}
</style>
<style lang="scss">
.accent-button {
  box-shadow: 0px 0px 15px -10px #b53c31;
  border-radius: 10px;
}
.secondary-button {
  color: white !important;
  font-weight: bold !important;
  box-shadow: 0px 0px 13px -4px #2150b7;
  border-radius: 10px;
}
.disable-secondary-button {
  border-radius: 10px;
}
.v-text-field--rounded {
  border-radius: 12px;
}
.v-text-field--filled.v-input--dense.v-text-field--single-line
  > .v-input__control
  > .v-input__slot {
  border: solid 1.4px #cecccc;
}
.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
  background-color: #f4f6fb !important;
}
</style>
