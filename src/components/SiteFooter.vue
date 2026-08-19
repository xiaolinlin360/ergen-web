<template>
  <footer class="site-footer panel-cream" aria-label="页脚">
    <RevealOnScroll variant="fadeUp" :amount="0.1" class="footer-new">
      <!-- 上层:链接区 -->
      <div class="footer-new-links">
        <router-link to="/company">公司简介</router-link>
        <span class="footer-new-sep">|</span>
        <a href="/隐私政策.html" target="_blank" rel="noopener">隐私政策</a>
        <span class="footer-new-sep">|</span>
        <a href="/用户协议.html" target="_blank" rel="noopener">用户协议</a>
      </div>
      <!-- 下层:版权区 -->
      <div class="footer-new-copy">
        <span>京公网安备 11000002002061号</span>
        <span>京ICP备2020042663号</span>
        <span>京网文[2026]2102-100号</span>
        <span>©2026 Ergen 折耳根健康餐</span>
      </div>
    </RevealOnScroll>
  </footer>
</template>

<script setup>
import RevealOnScroll from './RevealOnScroll.vue'
</script>
