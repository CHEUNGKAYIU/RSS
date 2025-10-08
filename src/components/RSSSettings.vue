<template>
  <div class="settings-container">
    <h2 class="settings-title">RSS设置</h2>
    
    <!-- 添加/编辑RSS源表单 -->
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
          @blur="autoDetectTitle"
        />
      </div>
      
      <div class="form-group">
        <label for="rss-name" class="form-label">RSS源名称</label>
        <input
          id="rss-name"
          v-model="newSource.name"
          type="text"
          class="form-input"
          placeholder="将自动识别RSS标题"
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
      
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="newSource.removeImages"
            class="checkbox-input"
          />
          <span class="checkbox-text">去除图片</span>
        </label>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="newSource.showTitle"
            class="checkbox-input"
          />
          <span class="checkbox-text">显示标题</span>
        </label>
      </div>
      
      <div class="form-group">
        <label for="html-filters" class="form-label">HTML过滤器</label>
        <textarea
          id="html-filters"
          v-model="newSource.htmlFilters"
          class="form-textarea"
          placeholder="输入要过滤的HTML标签，每行一个，例如：&#10;&lt;p&gt;&lt;strong&gt;@buyticketshk&lt;/strong&gt;:&lt;/p&gt;&#10;&lt;div class=&quot;ad&quot;&gt;&lt;/div&gt;"
          rows="4"
        ></textarea>
        <div class="form-help">每行输入一个要过滤的HTML标签，支持正则表达式</div>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn">
          {{ isEditing ? '保存修改' : '添加RSS源' }}
        </button>
        <button 
          v-if="isEditing" 
          type="button" 
          @click="cancelEdit" 
          class="btn btn-secondary"
        >
          取消编辑
        </button>
      </div>
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
          <div class="source-name">{{ source.name || source.url }}</div>
          <div class="source-url">{{ source.url }}</div>
          <div class="source-details">
            分组: {{ source.group }} | 
            显示模式: {{ source.displayMode === 'full' ? '全部内容' : '3行摘要' }} | 
            刷新间隔: {{ source.refreshInterval }}分钟 | 
            去除图片: {{ source.removeImages ? '是' : '否' }} | 
            显示标题: {{ source.showTitle ? '是' : '否' }} | 
            HTML过滤器: {{ source.htmlFilters ? '已设置' : '未设置' }}
          </div>
        </div>
        <div class="source-actions">
          <button
            @click="editRSSSource(index)"
            class="btn btn-edit"
          >
            编辑
          </button>
          <button
            @click="removeRSSSource(index)"
            class="btn btn-danger"
          >
            删除
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">
      <p>还没有添加任何RSS源</p>
    </div>
    
    <!-- 分组排序管理 -->
    <div v-if="rssSources.length > 0" >
      <h3 class="group-sort-title">分组排序</h3>
      <div class="group-sort-list group-sort-section">
        <div 
          v-for="(group, index) in sortedGroups" 
          :key="group"
          class="group-sort-item"
          draggable="true"
          @dragstart="handleDragStart(index)"
          @dragover="handleDragOver"
          @drop="handleDrop($event, index)"
        >
          <div class="group-sort-handle">⋮⋮</div>
          <div class="group-sort-name">{{ group }}</div>
          <div class="group-sort-count">{{ getGroupCount(group) }}个RSS源</div>
        </div>
      </div>
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
      name: '',
      displayMode: 'summary',
      group: '',
      refreshInterval: 30,
      removeImages: false,
      showTitle: false,
      htmlFilters: ''
    })
    const isEditing = ref(false)
    const editingIndex = ref(-1)
    const sortedGroups = ref([])
    const draggedIndex = ref(-1)

    // 加载已保存的RSS源
    const loadRSSSources = () => {
      const saved = localStorage.getItem('rssSources')
      if (saved) {
        rssSources.value = JSON.parse(saved)
      }
      updateSortedGroups()
    }

    // 更新排序后的分组列表
    const updateSortedGroups = () => {
      const groupSet = new Set()
      rssSources.value.forEach(source => {
        if (source.group) {
          groupSet.add(source.group)
        }
      })
      
      // 获取保存的排序顺序
      const savedOrder = localStorage.getItem('groupOrder')
      if (savedOrder) {
        const order = JSON.parse(savedOrder)
        // 按保存的顺序排列，未保存的组放在最后
        sortedGroups.value = order.filter(group => groupSet.has(group))
          .concat(Array.from(groupSet).filter(group => !order.includes(group)))
      } else {
        sortedGroups.value = Array.from(groupSet)
      }
    }

    // 获取分组中的RSS源数量
    const getGroupCount = (group) => {
      return rssSources.value.filter(source => source.group === group).length
    }

    // 拖拽开始
    const handleDragStart = (index) => {
      draggedIndex.value = index
    }

    // 拖拽悬停
    const handleDragOver = (e) => {
      e.preventDefault()
    }

    // 拖拽放置
    const handleDrop = (e, dropIndex) => {
      e.preventDefault()
      if (draggedIndex.value === -1) return
      
      const draggedItem = sortedGroups.value[draggedIndex.value]
      sortedGroups.value.splice(draggedIndex.value, 1)
      sortedGroups.value.splice(dropIndex, 0, draggedItem)
      
      // 保存新的排序顺序
      localStorage.setItem('groupOrder', JSON.stringify(sortedGroups.value))
      draggedIndex.value = -1
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

      // 检查是否已存在（编辑时排除当前编辑的项）
      const existingIndex = rssSources.value.findIndex(source => source.url === newSource.value.url)
      if (existingIndex !== -1 && (!isEditing.value || existingIndex !== editingIndex.value)) {
        alert('该RSS源已存在')
        return
      }

      // 验证刷新间隔
      if (newSource.value.refreshInterval < 1) {
        alert('刷新时间必须大于0分钟')
        return
      }

      if (isEditing.value) {
        // 编辑现有源
        rssSources.value[editingIndex.value] = { ...newSource.value }
        alert('RSS源修改成功！')
        cancelEdit()
      } else {
        // 添加新源
        rssSources.value.push({ ...newSource.value })
        alert('RSS源添加成功！')
      }
      
      saveRSSSources()
      resetForm()
    }

    // 编辑RSS源
    const editRSSSource = (index) => {
      const source = rssSources.value[index]
      newSource.value = { ...source }
      isEditing.value = true
      editingIndex.value = index
    }

    // 取消编辑
    const cancelEdit = () => {
      isEditing.value = false
      editingIndex.value = -1
      resetForm()
    }

    // 自动识别RSS标题
    const autoDetectTitle = async () => {
      if (!newSource.value.url || isEditing.value) return
      
      try {
        // 验证URL格式
        new URL(newSource.value.url)
        
        // 使用后端API获取RSS标题
        const apiUrl = `http://localhost:3001/api/rss?url=${encodeURIComponent(newSource.value.url)}`
        const response = await fetch(apiUrl)
        
        if (response.ok) {
          const rssData = await response.json()
          
          if (rssData.title && !newSource.value.name) {
            newSource.value.name = rssData.title
          }
        }
      } catch (error) {
        console.log('无法自动识别RSS标题:', error)
      }
    }

    // 重置表单
    const resetForm = () => {
      newSource.value = {
        url: '',
        name: '',
        displayMode: 'summary',
        group: '',
        refreshInterval: 30,
        removeImages: false,
        showTitle: false,
        htmlFilters: ''
      }
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
      isEditing,
      editingIndex,
      sortedGroups,
      addRSSSource,
      editRSSSource,
      cancelEdit,
      removeRSSSource,
      autoDetectTitle,
      getGroupCount,
      handleDragStart,
      handleDragOver,
      handleDrop
    }
  }
}
</script>
