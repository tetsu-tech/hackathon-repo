<template>
  <div>
    <h1 class="title mt-5">
      ISSUEの一覧
    </h1>
    <v-btn class="mt-3" color="primary" width="160" height="40" to="/issues/add"
      >追加</v-btn
    >
    <v-card class="mt-5">
      <v-data-table
        :headers="headers"
        :items="desserts"
        hide-default-header
        hide-default-footer
        class="elevation-1"
      />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [{ text: 'Title', value: 'title' }],
      desserts: [
        {
          title: 'hogheogheo',
          template_items: [
            {
              order: 1,
              name: 'cghoaghoah',
              description: 'hgoehogh'
            }
          ]
        }
      ]
    }
  }
}
</script>
