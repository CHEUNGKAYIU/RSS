<template>
  <div class="rss-card">
    <h3 v-if="item.showTitle === true" class="rss-title">{{ item.title }}</h3>
    <div 
      class="rss-content" 
      :class="{ 
        'full': displayMode === 'full' || isExpanded, 
        'summary': displayMode === 'summary' && !isExpanded 
      }"
      v-html="item.content"
      @click="handleContentClick"
    ></div>
    
    <!-- 图片画廊 -->
    <div v-if="item.imageUrls && item.imageUrls.length > 0 && !item.removeImages" class="image-gallery">
      <div class="gallery-grid">
        <div 
          v-for="(imageUrl, index) in item.imageUrls" 
          :key="index"
          class="gallery-item"
          @click="openLightbox(index)"
        >
          <img 
            :src="imageUrl" 
            referrerpolicy="no-referrer"
            :alt="`图片 ${index + 1}`" 
            class="gallery-thumbnail" 
            @error="handleImageError"
          />
        </div>
      </div>
    </div>
    
    <div class="rss-meta">
      <span class="rss-source">{{ item.sourceName || item.source }}</span>
      <span class="rss-date">{{ formatDate(item.pubDate) }}</span>
    </div>
    
    <!-- 图片灯箱 -->
    <div v-if="lightboxVisible" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <button class="lightbox-prev" @click="prevImage" v-if="item.imageUrls.length > 1">‹</button>
        <button class="lightbox-next" @click="nextImage" v-if="item.imageUrls.length > 1">›</button>
        <img 
          :src="currentImageUrl" 
          :alt="`图片 ${currentImageIndex + 1}`" 
          class="lightbox-image" 
          @error="handleImageError"
        />
        <div class="lightbox-counter">{{ currentImageIndex + 1 }} / {{ item.imageUrls.length }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

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
  setup(props) {
    const isExpanded = ref(false)
    const lightboxVisible = ref(false)
    const currentImageIndex = ref(0)
    
    const handleContentClick = () => {
      // 只有显示模式为summary时才允许折叠展开
      if (props.displayMode === 'summary') {
        isExpanded.value = !isExpanded.value
      }
    }
    
    const openLightbox = (index) => {
      currentImageIndex.value = index
      lightboxVisible.value = true
      document.body.style.overflow = 'hidden' // 防止背景滚动
      // 添加键盘事件监听
      document.addEventListener('keydown', handleKeydown)
    }
    
    const closeLightbox = () => {
      lightboxVisible.value = false
      document.body.style.overflow = '' // 恢复背景滚动
      // 移除键盘事件监听
      document.removeEventListener('keydown', handleKeydown)
    }
    
    const handleKeydown = (event) => {
      if (!lightboxVisible.value) return
      
      switch (event.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }
    
    const handleImageError = (event) => {
      // 当图片加载失败时，使用默认占位图片
      event.target.src = '/src/pic/p.jpg'
    }
    
    const nextImage = () => {
      if (props.item.imageUrls && props.item.imageUrls.length > 0) {
        currentImageIndex.value = (currentImageIndex.value + 1) % props.item.imageUrls.length
      }
    }
    
    const prevImage = () => {
      if (props.item.imageUrls && props.item.imageUrls.length > 0) {
        currentImageIndex.value = currentImageIndex.value === 0 
          ? props.item.imageUrls.length - 1 
          : currentImageIndex.value - 1
      }
    }
    
    const currentImageUrl = computed(() => {
      if (props.item.imageUrls && props.item.imageUrls.length > 0) {
        return props.item.imageUrls[currentImageIndex.value]
      }
      return ''
    })
    
    return {
      isExpanded,
      lightboxVisible,
      currentImageIndex,
      currentImageUrl,
      handleContentClick,
      openLightbox,
      closeLightbox,
      nextImage,
      prevImage,
      handleKeydown,
      handleImageError
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