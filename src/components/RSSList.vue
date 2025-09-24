<template>
  <div class="rss-list">
    <!-- 头部 -->
    <div class="rss-header">
      <div class="group-filter">
        <div class="filter-scroll">
          <div 
            v-for="group in groups" 
            :key="group"
            class="filter-item"
            :class="{ active: selectedGroup === group }"
            @click="selectGroup(group)"
          >
            {{ group }}
          </div>
        </div>
      </div>
      <div class="settings-icon" @click="goToSettings">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7195 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01123 9.77251C4.28045 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- 内容区域 -->
    <div v-if="loading" class="loading">
      <p>正在加载RSS内容...</p>
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="filteredItems.length === 0" class="loading">
      <p>暂无RSS内容，请先添加RSS源</p>
    </div>
    
    <div v-else>
      <RSSCard 
        v-for="item in filteredItems" 
        :key="item.id"
        :item="item"
        :display-mode="getDisplayMode(item.source)"
      />
    </div>
  </div>
</template>

<script>
import RSSCard from './RSSCard.vue'
import { ref, onMounted, onUnmounted, onActivated, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'RSSList',
  components: {
    RSSCard
  },
  setup() {
    const router = useRouter()
    const rssItems = ref([])
    const loading = ref(true)
    const error = ref('')
    const refreshIntervals = ref(new Map())
    const selectedGroup = ref('全部')
    const isInitialized = ref(false)
    
    // 缓存配置
    const CACHE_LIMIT = 1000 // 最大缓存条目数
    const CACHE_KEY = 'rssCache'
    const CACHE_TIMESTAMP_KEY = 'rssCacheTimestamp'

    // 缓存管理函数
    const getCachedData = () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        return cached ? JSON.parse(cached) : []
      } catch (error) {
        console.error('读取缓存失败:', error)
        return []
      }
    }

    const saveCachedData = (data) => {
      try {
        // 限制缓存大小，删除最早的条目
        if (data.length > CACHE_LIMIT) {
          data = data.slice(-CACHE_LIMIT)
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
      } catch (error) {
        console.error('保存缓存失败:', error)
      }
    }

    const getCacheTimestamp = () => {
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)
      return timestamp ? parseInt(timestamp) : 0
    }

    // 检查条目是否已存在
    const isItemExists = (newItem, existingItems) => {
      return existingItems.some(item => 
        item.title === newItem.title && 
        item.link === newItem.link &&
        item.source === newItem.source
      )
    }

    // 合并新旧数据，新数据放在顶部
    const mergeData = (newItems, existingItems) => {
      const merged = [...existingItems]
      let hasNewItems = false

      newItems.forEach(newItem => {
        if (!isItemExists(newItem, merged)) {
          merged.unshift(newItem) // 新条目添加到顶部
          hasNewItems = true
        }
      })

      return { merged, hasNewItems }
    }

    // 获取所有分组
    const groups = computed(() => {
      const sources = JSON.parse(localStorage.getItem('rssSources') || '[]')
      const groupSet = new Set(['全部'])
      sources.forEach(source => {
        if (source.group) {
          groupSet.add(source.group)
        }
      })
      return Array.from(groupSet)
    })

    // 获取RSS源的显示模式
    const getDisplayMode = (source) => {
      const sources = JSON.parse(localStorage.getItem('rssSources') || '[]')
      const sourceConfig = sources.find(s => s.url === source)
      return sourceConfig ? sourceConfig.displayMode : 'summary'
    }

    // 获取RSS源的分组
    const getRSSGroup = (source) => {
      const sources = JSON.parse(localStorage.getItem('rssSources') || '[]')
      const sourceConfig = sources.find(s => s.url === source)
      return sourceConfig ? sourceConfig.group : '未分组'
    }

    // 筛选后的RSS项目
    const filteredItems = computed(() => {
      if (selectedGroup.value === '全部') {
        return rssItems.value
      }
      return rssItems.value.filter(item => getRSSGroup(item.source) === selectedGroup.value)
    })

    // 选择分组
    const selectGroup = (group) => {
      selectedGroup.value = group
    }

    // 跳转到设置页面
    const goToSettings = () => {
      router.push('/settings')
    }

    // 图片缓存管理
    const IMAGE_CACHE_KEY = 'rssImageCache'
    const IMAGE_CACHE_LIMIT = 500 // 最大图片缓存数
    
    const getImageCache = () => {
      try {
        const cached = localStorage.getItem(IMAGE_CACHE_KEY)
        return cached ? JSON.parse(cached) : {}
      } catch (error) {
        console.error('读取图片缓存失败:', error)
        return {}
      }
    }
    
    const saveImageCache = (imageCache) => {
      try {
        const entries = Object.entries(imageCache)
        if (entries.length > IMAGE_CACHE_LIMIT) {
          // 删除最早的图片缓存
          const sortedEntries = entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
          const toKeep = sortedEntries.slice(-IMAGE_CACHE_LIMIT)
          imageCache = Object.fromEntries(toKeep)
        }
        localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(imageCache))
      } catch (error) {
        console.error('保存图片缓存失败:', error)
      }
    }
    
    // 提取图片URL
    const extractImageUrl = (description) => {
      const imgRegex = /<img[^>]+src="([^"]+)"/i
      const match = description.match(imgRegex)
      return match ? match[1] : null
    }
    
    // 解析RSS XML
    const parseRSS = (xmlText, sourceUrl) => {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      const items = xmlDoc.querySelectorAll('item')
      
      return Array.from(items).map((item, index) => {
        const title = item.querySelector('title')?.textContent || '无标题'
        const description = item.querySelector('description')?.textContent || ''
        const pubDate = item.querySelector('pubDate')?.textContent || ''
        const link = item.querySelector('link')?.textContent || ''
        
        // 提取图片URL
        const imageUrl = extractImageUrl(description)
        
        return {
          id: `${sourceUrl}-${index}`,
          title,
          content: description,
          pubDate,
          link,
          source: sourceUrl,
          imageUrl: imageUrl,
          cachedAt: Date.now()
        }
      })
    }

    // 获取RSS内容
    const fetchRSS = async (sourceUrl) => {
      try {
        // 使用CORS代理来避免跨域问题
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(sourceUrl)}`
        const response = await fetch(proxyUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const xmlText = await response.text()
        return parseRSS(xmlText, sourceUrl)
      } catch (err) {
        console.error(`获取RSS失败 ${sourceUrl}:`, err)
        return []
      }
    }

    // 加载所有RSS内容
    const loadAllRSS = async (isInitialLoad = true) => {
      if (isInitialLoad) {
        loading.value = true
      }
      error.value = ''
      
      try {
        const sources = JSON.parse(localStorage.getItem('rssSources') || '[]')
        
        if (sources.length === 0) {
          if (isInitialLoad) {
            loading.value = false
          }
          return
        }

        // 获取缓存数据
        const cachedItems = getCachedData()
        
        // 如果不是初始加载，先显示缓存数据
        if (!isInitialLoad && cachedItems.length > 0) {
          rssItems.value = cachedItems
        }

        const allItems = []
        
        for (const source of sources) {
          const items = await fetchRSS(source.url)
          allItems.push(...items)
        }
        
        // 按发布时间排序新数据
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        
        if (isInitialLoad) {
          // 初始加载：直接使用新数据
          rssItems.value = allItems
          saveCachedData(allItems)
        } else {
          // 增量更新：合并新旧数据
          const { merged, hasNewItems } = mergeData(allItems, cachedItems)
          rssItems.value = merged
          
          if (hasNewItems) {
            saveCachedData(merged)
            console.log('发现新条目，已更新到顶部')
          }
        }
        
      } catch (err) {
        error.value = '加载RSS内容时发生错误: ' + err.message
      } finally {
        if (isInitialLoad) {
          loading.value = false
        }
      }
    }

    // 设置定时刷新
    const setupRefreshIntervals = () => {
      const sources = JSON.parse(localStorage.getItem('rssSources') || '[]')
      
      // 清除现有定时器
      refreshIntervals.value.forEach(interval => clearInterval(interval))
      refreshIntervals.value.clear()
      
      // 为每个RSS源设置定时刷新
      sources.forEach(source => {
        const interval = setInterval(() => {
          loadAllRSS(false) // 增量更新，不显示loading
        }, source.refreshInterval * 60 * 1000) // 转换为毫秒
        
        refreshIntervals.value.set(source.url, interval)
      })
    }

    // 初始化函数
    const initializeData = () => {
      if (isInitialized.value) return
      
      // 先尝试加载缓存数据
      const cachedItems = getCachedData()
      if (cachedItems.length > 0) {
        rssItems.value = cachedItems
        loading.value = false
      }
      
      // 然后进行增量更新
      loadAllRSS(true)
      setupRefreshIntervals()
      isInitialized.value = true
    }

    onMounted(() => {
      initializeData()
    })

    onActivated(() => {
      // 如果已经初始化过，只进行增量更新
      if (isInitialized.value) {
        loadAllRSS(false)
      } else {
        initializeData()
      }
    })

    onUnmounted(() => {
      // 清除所有定时器
      refreshIntervals.value.forEach(interval => clearInterval(interval))
    })

    return {
      rssItems,
      loading,
      error,
      groups,
      selectedGroup,
      filteredItems,
      getDisplayMode,
      selectGroup,
      goToSettings
    }
  }
}
</script>
