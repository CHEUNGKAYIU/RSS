<template>
  <div class="settings-container">
    <h2 class="settings-title">RSS设置</h2>
    
    <!-- 添加新RSS源表单 -->
    <form @submit.prevent="addRSSSource" class="rss-form">
      <div class="form-group">
        <label for="rss-url" class="form-label">RSS地址 *</label>
        <input
          id="rss-url"
          v-model="newSource.url"
          type="url"
          class="form-input"
          placeholder="https://example.com/rss.xml"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="display-mode" class="form-label">内容显示模式 *</label>
        <select
          id="display-mode"
          v-model="newSource.displayMode"
          class="form-select"
          required
        >
          <option value="summary">只显示3行详细内容</option>
          <option value="full">显示全部详细内容</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="group" class="form-label">分组 *</label>
        <input
          id="group"
          v-model="newSource.group"
          type="text"
          class="form-input"
          placeholder="例如：科技、新闻、娱乐"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="refresh-interval" class="form-label">刷新时间（分钟）*</label>
        <input
          id="refresh-interval"
          v-model.number="newSource.refreshInterval"
          type="number"
          min="1"
          class="form-input"
          placeholder="30"
          required
        />
      </div>
      
      <button type="submit" class="btn">添加RSS源</button>
    </form>
    
    <!-- RSS源列表 -->
    <div v-if="rssSources.length > 0" class="rss-sources">
      <h3 class="rss-sources-title">已添加的RSS源</h3>
      <div
        v-for="(source, index) in rssSources"
        :key="index"
        class="source-item"
      >
        <div class="source-info">
          <div class="source-url">{{ source.url }}</div>
          <div class="source-details">
            分组: {{ source.group }} | 
            显示模式: {{ source.displayMode === 'full' ? '全部内容' : '3行摘要' }} | 
            刷新间隔: {{ source.refreshInterval }}分钟
          </div>
        </div>
        <button
          @click="removeRSSSource(index)"
          class="btn btn-danger"
        >
          删除
        </button>
      </div>
    </div>
    
    <div v-else class="loading">
      <p>还没有添加任何RSS源</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'RSSSettings',
  setup() {
    const rssSources = ref([])
    const newSource = ref({
      url: '',
      displayMode: 'summary',
      group: '',
      refreshInterval: 30
    })

    // 加载已保存的RSS源
    const loadRSSSources = () => {
      const saved = localStorage.getItem('rssSources')
      if (saved) {
        rssSources.value = JSON.parse(saved)
      }
    }

    // 保存RSS源到本地存储
    const saveRSSSources = () => {
      localStorage.setItem('rssSources', JSON.stringify(rssSources.value))
    }

    // 添加新的RSS源
    const addRSSSource = () => {
      // 验证URL格式
      try {
        new URL(newSource.value.url)
      } catch {
        alert('请输入有效的RSS地址')
        return
      }

      // 检查是否已存在
      if (rssSources.value.some(source => source.url === newSource.value.url)) {
        alert('该RSS源已存在')
        return
      }

      // 验证刷新间隔
      if (newSource.value.refreshInterval < 1) {
        alert('刷新时间必须大于0分钟')
        return
      }

      // 添加新源
      rssSources.value.push({ ...newSource.value })
      saveRSSSources()

      // 重置表单
      newSource.value = {
        url: '',
        displayMode: 'summary',
        group: '',
        refreshInterval: 30
      }

      alert('RSS源添加成功！')
    }

    // 删除RSS源
    const removeRSSSource = (index) => {
      if (confirm('确定要删除这个RSS源吗？')) {
        rssSources.value.splice(index, 1)
        saveRSSSources()
      }
    }

    onMounted(() => {
      loadRSSSources()
    })

    return {
      rssSources,
      newSource,
      addRSSSource,
      removeRSSSource
    }
  }
}
</script>
