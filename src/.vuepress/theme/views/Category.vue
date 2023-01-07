<template>
  <div class="page category">
    <section class="row page-header">
      <div class="column xs-100">
        <back-button />
      </div>
      <div class="column xs-100">
        <h1 class="page-header__title">{{ $page.frontmatter.title }}</h1>
        <h2 class="page-header__subtitle">{{ $page.frontmatter.excerpt }}</h2>
      </div>
      <div class="column xs-100">
        <hr class="divider">
      </div>
      <div class="column xs-100 page-header-cat">
        <categories-list :inline="true" />
      </div>
    </section>

    <section v-if="hasPosts" class="row posts-grid">
      <div         
        class="column md-50 mt-30"
        v-for="(post, index) in getPostsByCategory(0, 4)"
        :key="post.key">
        <card-post
          :index="index"
          :item="post"
          cover="right" />
      </div>
    </section>

    <section v-else class="row posts-grid mt-30">
      <div class="column sm-50">
        <h2>😔 {{ $t('no_category_posts') }}.</h2>
      </div>
    </section>

    <ins class="adsbygoogle"
      style="display:block"
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-2293506510878791"
      data-ad-slot="8935636414"></ins>

    <section class="row posts-grid">
      <div 
        class="column md-50 mt-30"
        v-for="(post, index) in getPostsByCategory(4)"
        :key="post.key">
        <card-post
          :index="index"
          :item="post"
          cover="right" />
      </div>
    </section>

    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>

  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import CategoriesList from '@theme/components/CategoriesList'

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'Category',

    mixins: [PostsMixin],

    components: {
      CardPost,
      CategoriesList,
      BackButton: () => import(/* webpackChunkName = "BackButton" */ '@theme/components/BackButton'),
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    mounted() {
      (window.adsbygoogle || []).push({});
    },

    computed: {
      hasPosts () {
        return this.getPostsByCategory(0).length
      }
    },

    methods: {
      getPosts (start, end) {
        return [...this.postsByLang].splice(start, (end || this.postsByLang.length))
      },

      getPostsByCategory (start, end) {
        return this.getPosts(start, end).filter(post => {
          return post.categories.includes(this.$page.frontmatter.slug)
        })
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.posts-grid
  .card-category
    margin-bottom: 10px
    &__link
      display: none
      
</style>
