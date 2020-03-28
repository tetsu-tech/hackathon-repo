<template>
  <div class="mavonEditor">
    <client-only>
      <mavon-editor
        v-model="markdownText"
        :value="value"
        :toolbars="markdownOption"
        :language="'ja'"
        :box-shadow="false"
        @change="changeMarkdownText"
      />
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        // underline: false,
        // strikethrough: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        code: true,
        table: true,
        fullscreen: true
      },
      markdownText: ''
    }
  },
  methods: {
    changeMarkdownText() {
      this.$emit('input', this.markdownText)
    }
  }
}
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}

.markdown-body {
  border: solid 1.4px #cecccc;
}

</style>
