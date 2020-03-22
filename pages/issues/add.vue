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
        <v-form v-model="validIssue" class="mt-4">
          <v-select
            v-model="issueTemplate"
            :items="items"
            label="Solo field"
            solo
            item-text="title"
            return-object
            @change="initBodies"
          ></v-select>
          {{ bodies }}
          <div v-if="selectedItem">
            タイトル
            <v-text-field v-model="title" solo :rules="[requireString]" />
            <div v-for="(item, i) in issueTemplate.template_items" :key="i">
              <p class="black--text font-weight-bold subtitle-1">
                {{ item.name }}
              </p>
              <v-textarea
                v-model="bodies[i].description"
                solo
                :rules="[requireString]"
              />
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          width="160"
          height="40"
          color="primary"
          :disabled="!validIssue"
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

<script>
export default {
  data() {
    return {
      createdNotice: false,
      validIssue: false,

      title: '',
      body: '',

      issueTemplate: null,
      bodies: []
    }
  },
  computed: {
    issue() {
      return {
        title: this.title,
        body: this.bodies.map((val) => {
          return `### ${val.name}\n\n${val.description}`
        })
      }
    },
    items() {
      return [
        {
          title: 'バグ報告',
          template_items: [
            {
              name: 'バグの内容',
              description: '- XXができない\n- XXがおかしい'
            },
            {
              name: '関連するURL',
              description: '- XXができない\n- XXがおかしい'
            }
          ]
        },
        {
          title: '機能リクエスト',
          template_items: [
            {
              name: 'バグの内容',
              description: '- XXができない\n- XXがおかしい'
            },
            {
              name: '関連するURL',
              description: '- XXができない\n- XXがおかしい'
            }
          ]
        }
      ]
    },
    selectedItem() {
      return Boolean(this.issueTemplate && this.issueTemplate.title)
    }
  },
  methods: {
    initBodies(issueTemplate) {
      this.bodies = issueTemplate.template_items.map((item) => {
        return {
          title: item.name,
          description: item.description
        }
      })
    },
    createIssue() {
      this.createdNotice = true
      console.log('ISSUEを作成しました。', this.issue)
    },
    requireString(v) {
      return !!v || '必須項目です'
    }
  }
}
</script>
