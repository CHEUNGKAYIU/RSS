<template>
  <div class="rss-card">
    <h3 class="rss-title">{{ item.title }}</h3>
    <div 
      class="rss-content" 
      :class="{ 'full': displayMode === 'full', 'summary': displayMode === 'summary' }"
      v-html="item.content"
    ></div>
    <div class="rss-meta">
      <span class="rss-source">{{ item.source }}</span>
      <span class="rss-date">{{ formatDate(item.pubDate) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RSSCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    displayMode: {
      type: String,
      default: 'summary',
      validator: value => ['full', 'summary'].includes(value)
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>