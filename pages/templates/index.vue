<template>
  <div>
    <h1 class="title mt-5">
      テンプレートの作成
    </h1>
    <v-card class="mt-3">
      <v-card-title>
        新規のテンプレート
      </v-card-title>
      <v-card-text class="mt-4">
        タイトル
        <v-text-field v-model="title" solo :rules="[requireString]" />
        <v-form v-model="validIssueTemplate" class="mt-4">
          <div v-for="(item, i) in template_items" :key="i">
            項目名
            <v-text-field v-model="item.name" solo :rules="[requireString]" />
            説明
            <v-textarea
              v-model="item.description"
              solo
              :rules="[requireString]"
            />
          </div>
        </v-form>
        <v-card-actions class="px-0">
          <v-btn
            width="160"
            height="40"
            color="primary"
            @click="addTemplateItems"
            >項目を追加</v-btn
          >
          <v-spacer />
          <v-btn
            width="160"
            height="40"
            color="primary"
            :disabled="!validIssueTemplate"
            @click="createIssueTemplate"
            >生成</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="createdNotice" right color="success">
      テンプレートを作成しました
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createdNotice: false,
      validIssueTemplate: false,
      title: '',
      template_items: [
        {
          name: '',
          description: ''
        }
      ]
    }
  },
  computed: {
    issueTemaplate() {
      return {
        title: this.title,
        template_items: this.template_items
      }
    }
  },
  methods: {
    addTemplateItems() {
      this.template_items.push({
        name: '',
        description: ''
      })
    },
    createIssueTemplate() {
      this.createdNotice = true
      alert(
        `テンプレートを作成しました。\n${JSON.stringify(this.issueTemaplate)}`
      )
    },
    requireString(v) {
      return !!v || '必須項目です'
    }
  }
}
</script>
