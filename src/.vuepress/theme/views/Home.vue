<template>
  <div class="page home">
    <div class="row" v-if="$posts.length">
      <div class="home__first-card column md-50">
        <card-post :item="featuredPost" cover="top" />
      </div>
      <div class="column md-50">
        <div class="row">
          <div class="column sm-100">
            <card-post v-if="latestPosts[0]" :item="latestPosts[0]" :cover="false" />
          </div>

          <div class="column sm-100 mt-15">
            <ins class="adsbygoogle" style="background: #fff; display:block; margin-bottom: 15px; border-radius: 10px; overflow: hidden;" data-ad-format="fluid" data-ad-layout-key="-fc-33+cf-nw-en" data-ad-client="ca-pub-2293506510878791" data-ad-slot="1137554367"></ins>
          </div>
          
          <div class="column sm-100 mt-15">
            <card-post v-if="latestPosts[1]" :item="latestPosts[1]" :cover="false" />
          </div>
        </div>
      </div>
    </div>

    <more-posts class="home__see-more" :posts="morePosts">
      <sidebar slot="sidebar" />
    </more-posts>

    <section v-if="$themeLocaleConfig.newsletter.action" class="row section-newsletter justify-center">
      <div class="column sm-100 md-67 xl-50">
        <newsletter />
      </div>
    </section>
  </div>
</template>

<script>
  import CardPost from '@theme/components/CardPost'
  import MorePosts from '@theme/components/MorePosts'
  import Sidebar from '@theme/components/Sidebar'

  import PostsMixin from '@theme/mixins/Posts'

  export default {
    name: 'Home',

    mixins: [PostsMixin],

    components: {
      Sidebar,
      CardPost,
      MorePosts,
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter')
    },

    mounted() {
      (window.adsbygoogle || []).push({});
    },

    computed: {
      featuredPost () {
        return [...this.postsByLang].filter(e => e.featured)[0]
      },

      latestPosts () {
        return [...this.postsByLang].filter(e => !e.featured).slice(0, 2)
      },

      morePosts () {
        return [...this.postsByLang].filter(e => !e.featured).splice(2, 8)
      }
    }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.home
  &__first-card
    @media (max-width: $max-tablet)
      margin-bottom: 30px

  &__see-more.row
    margin-top: 50px
</style>
