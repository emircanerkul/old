<template>
  <div class="sidebar">
    <ads class="sidebar__bizu"/>
    <div class="sidebar__categories">
      <h3 class="meta-text meta-text--primary">{{ $t('categories') }}</h3>
      <categories-list />

      <!-- Responsive Ad for Sidebar -->
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-2293506510878791"
        data-ad-slot="3342181344"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  </div>
</template>

<script>
  import CategoriesList from '@theme/components/CategoriesList'

  export default {
    name: 'Sidebar',

    components: {
      CategoriesList,
      ads: () => import(/* webpackChunkName = "Ads" */ '@theme/components/Ads')
    },

    mounted() {
      (window.adsbygoogle || []).push({});
    },
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.sidebar
  padding-top: 50px

  &__bizu
    margin-bottom: 40px

  &__categories
    .categories
      margin-top: 10px

</style>
