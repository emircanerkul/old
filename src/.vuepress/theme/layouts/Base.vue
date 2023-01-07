<template>
  <div class="container-fluid">
    <kt-header />
    <main id="main" class="container main">
      <slot name="view"></slot>
    </main>
    <!-- Responsive Display Ad -->
    <ins class="adsbygoogle"
     style="display:block; text-align: center; margin-top: 20px;"
     data-ad-client="ca-pub-2293506510878791"
     data-ad-slot="2385635976"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

    <kt-footer />
  </div>
</template>

<script>
import ktHeader from '@theme/components/Header'

export default {
  name: 'LayoutBase',

  mounted() {
    (window.adsbygoogle || []).push({});
  },

  components: {
    ktHeader,
    ktFooter: () => import(/* webpackChunkName = "Footer" */ '@theme/components/Footer')
  }
}
</script>