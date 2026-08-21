<template>
  <section class="legal-page" aria-label="公司简介">
    <div class="legal-wrap">
      <div class="legal-hero">
        <h1 class="legal-title">公司简介</h1>
        <p class="legal-updated">折耳根（深圳）健康管理有限公司</p>
      </div>
      <div class="legal-body">
        <div class="company-section">
          <h3>公司概况</h3>
          <p>
            折耳根（深圳）健康管理有限公司，成立于 2023 年 10 月 12 日，法定代表人为罗俊帆，
            注册资本 100 万元人民币，公司类型为有限责任公司（自然人独资），经营状态为存续。
          </p>
        </div>

        <div class="company-section">
          <h3>注册信息</h3>
          <p>
            注册地址：深圳市南山区南山街道荔湾社区荔湾沿山路 8 号荔山工业区 6 栋 252。
            统一社会信用代码：91440300MAD02XD55H。
            登记机关：深圳市市场监督管理局南山监管局。
          </p>
        </div>

        <div class="company-section">
          <h3>经营范围</h3>
          <p>
            公司主要从事网络技术服务、网络与信息安全软件开发、体育健康服务、
            健身休闲活动、养生保健服务（非医疗）、健康咨询服务（不含诊疗服务）、
            远程健康管理服务。
          </p>
        </div>

        <div class="company-section">
          <h3>品牌背景</h3>
          <p>
            "折耳根"是该公司旗下品牌，专注于健康饮食与健康管理服务。公司依托深圳南山区的产业环境，
            致力于通过算法定制与热链配送，让每一位用户都能吃到专属的健康餐。
            公司规模 0–20 人，目前在招 Flutter 开发工程师、产品经理等岗位。
          </p>
          <p class="company-brand-idea">
            我们的理念：<strong>美味第一、健康第二</strong>——做中国人都用得起的健康餐饮。
            不是水煮鸡胸，也不是草沙拉，而是锅气十足、荤素搭配的家常好味道；一顿外卖的钱，
            就能吃到算法定制、餐厅现炒、热链到家的专属健康餐。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// legal.css 已统一在 main.js 中加载
</script>

<style scoped>
/* Company 页专属：品牌理念段落强调 */
.company-brand-idea {
  margin-top: 1.2em;
  padding: 16px 20px;
  background: #fff;
  border-left: 3px solid #065f46;
  border-radius: 0 8px 8px 0;
}

.company-brand-idea :deep(strong) {
  color: #065f46;
}
</style>
