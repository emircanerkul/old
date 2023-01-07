<template>
  <footer class="footer">
    <div class="footer-box1">
      <svg class="footer-box__shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1366 161">
        <path d="M-11.925-4809v-154.746c40.454,19.75,273.683,130.936,420.544,142.612,161.25,12.821,339.978-42.709,521.543-86.3,169.82-40.769,395.43,29.2,423.912,38.429v60Z" transform="translate(11.926 4970)"/>
      </svg>
    </div>
    <section class="footer-box3">
      <div class="row">
        <div class="column sm-100 footer-nav">
          <div class="row justify-right">
            <div 
              v-if="$themeLocaleConfig.footer.nav1.items.length"
              class="column xs-50 sm-40 md-33 footer-nav__box footer-nav__box--1">
              <nav class="footer-nav1">
                <ul>
                  <li 
                    class="footer-nav1__item" 
                    v-for="(item, index) in $themeLocaleConfig.footer.nav1.items" 
                    :key="`${item.label}-${index}`">
                    <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
                    <a v-if="item.link" :href="item.link" rel="noopener nofollow" target="_blank">{{ item.label }}</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div 
              v-if="$themeLocaleConfig.footer.nav2.items.length"
              class="column xs-50 sm-40 md-33 footer-nav__box footer-nav__box--2">
              <h2 class="meta-text title">{{ $themeLocaleConfig.footer.nav2.title }}</h2>
              <nav class="footer-nav2">
                <ul>
                  <li 
                    class="footer-nav2__item" 
                    v-for="(item, index) in $themeLocaleConfig.footer.nav2.items" 
                    :key="`${item.label}-${index}`">
                    <router-link v-if="item.path" :to="item.path">{{ item.label }}</router-link>
                    <a v-if="item.link" :href="item.link" rel="noopener nofollow" target="_blank">{{ item.label }}</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div class="column sm-50 footer-dmca">
          <div class="row">
            <a href="//www.dmca.com/Protection/Status.aspx?ID=23fc46be-2f36-4060-9fb6-a7a9afef9f9e" title="DMCA.com Protection Status" class="dmca-badge"> <img src ="https://images.dmca.com/Badges/DMCA_badge_trn_60w.png?ID=23fc46be-2f36-4060-9fb6-a7a9afef9f9e"  alt="DMCA.com Protection Status" /></a>
          </div>
        </div>
        <div class="column sm-50 footer-copy" v-html="$themeLocaleConfig.copy"></div>        
      </div>

      <span class="shapes shapes--circle" style="left: 3%; top: -20%"></span>
      <span class="shapes shapes--primary shapes--color3" style="left: 30%; top: -15%"></span>
      <span class="shapes shapes--primary" style="left: 13%; top: -80%; transform: rotate(45deg)"></span>
      <span class="shapes shapes--circle shapes--color4" style="left: 40%; top: 200px"></span>
      <span class="shapes shapes--primary" style="left: 15%; bottom: 10%; transform: rotate(75deg)"></span>
      <span class="shapes shapes--circle shapes--color3" style="right: 50%; top: 30%"></span>
      <span class="shapes shapes--primary" style="right: 20%; top: -100%"></span>
      <span class="shapes shapes--circle" style="right: 10%; top: -20%"></span>
      <span class="shapes shapes--color4" style="right: 35%; top: -20%; transform: rotate(45deg)"></span>
      <span class="shapes shapes--circle" style="left: 40%; top: -50%"></span>
      <span class="shapes shapes--color3" style="right: 30%; top: 20%"></span>
      <span class="shapes shapes--circle shapes--primary" style="right: 30%; bottom: 20%"></span>
    </section>    
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    mounted () {
      var n = document.querySelectorAll('a.dmca-badge');
      if (n[0] != undefined && n[0].getAttribute("href").indexOf("refurl") < 0) {
          for (var r = 0; r < n.length; r++) {
              var i = n[r];
              i.href = i.href + (i.href.indexOf("?") === -1 ? "?" : "&") +  "refurl=" + document.location
          }
      }
    },
    components: {
      Newsletter: () => import(/* webpackChunkName = "Newsletter" */ '@theme/components/Newsletter'),
      LazyLoad: () => import(/* webpackChunkName = "LazyLoad" */ '@theme/components/lazy/load')
    },
    mounted() {
      (window.adsbygoogle || []).push({});
      setTimeout(() => {
        (window.adsbygoogle || []).push({});
      }, 6000);
    },

    computed: { }
  }
</script>

<style lang="stylus">
@import '~@theme/styles/config.styl'

.footer
  position: relative
  overflow: hidden

.footer-box__shape
  position: absolute
  bottom: 0
  left: 0

.footer-box1
  height: 175px
  top: 4px
  .footer-box__shape
    fill: $firstFooterColor

.footer-box2
  height: 250px
  background-color: $firstFooterColor
  bottom: -2px
  .footer-box__shape
    fill: $secondFooterColor

.footer-box3
  position: relative
  background-color: $firstFooterColor
  padding: 50px 0

.footer-box1, .footer-box2
  position: relative    

.footer-social
  
  &__list
    display: inline-block
    margin-top: 8%
    margin-left: 30px
    z-index: 2
    position: relative

  &__item
    display: inline
    margin-right: 16px
    color: white
    
  &__icon
    color: white
    font-size: $title1
    
.footer-newsletter
  position: relative
  width: 40%
  float: right
  margin-top: -10px
  margin-right: 12%
  z-index: 10

  .newsletter, .newsletter .meta-text
    color: white

.footer-card
  position: relative

.watermark-logo
  position: absolute
  top: -150px
  left: -30px
  width: 472px
  height: 429px
  background-image: url('/watermark-logo.png')
  background-size: cover
  background-repeat: no-repeat
  z-index: 5

.footer-nav
  padding-right: 4vw !important
  z-index: 6

  &__box
    text-align: right

  .title
    color: white
    font-weight: bold
    font-size: $mediumText

.footer-nav1, .footer-nav2
  margin-top: 10px

  &__item
    font-size: $smallText
    color: white

    a
      float: right
      display: block
      width: 85%
      padding: 6px 4px 
      margin-bottom: 3px

      &:hover
        text-decoration: underline
        color: white

.footer-copy
  color: white
  font-size: 11px
  text-align: right
  padding-top: 50px
  padding-right: 4vw !important

  a:hover
    color: #3eaf7c

@media (max-width: $mobile)
  .footer-box2
    height: 110px

  .footer-card
    order: 2
    margin: 40px 0

  .footer-copy
    order: 3
    text-align: center
    padding-top: 10px

  .footer-dmca
    display: flex
    align-items: center
    justify-content: center
    order: 9
    margin: 20px 0 0 -8px
  
  .footer-nav
    order: 1

  .footer-nav > .row.justify-right
    justify-content: center

  .footer-nav__box--1.column
    text-align: center

  .footer-nav__box--1.column .footer-nav1__item a
    width: 100%
  
  .footer-nav__box--2.column
    padding-right: 5vw !important

  .footer-nav1__item a
    float: left

  .footer-social__list
    position: relative
    left: 50%
    margin-top: 5%
    transform: translateX(-50%)

  .footer-newsletter
    display: none


@media (max-width: $max-tablet)
  .footer-newsletter
    width: 50%
    margin-right: 8%

@media (min-width: $min-xlarge)
  .footer-box1
    height: 249px

</style>