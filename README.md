# Drupal [Mind-map](https://emircanerkul.github.io/drupal-mind-map/) [styled] Documentation

Mind-map styled Enriched Drupal Documentation. All documantation forked with [drupal-to-md](https://github.com/emircanerkul/drupal-to-md) from [Drupal Docs](https://www.drupal.org/docs) on 13 January 2023.

Click [here](https://www.drupal.org/project/mindmap) to visit Drupal Module page.

![Preview](preview.png)

## Development

* `git clone https://github.com/emircanerkul/drupal-mind-map.git`
* `cd simple-mind-map`
* `npm i`
* `cd ..`
* `cd web`
* `npm i`
* `npm run serve`

## Build

* **For Anywhere**: `npm run build`
* **For Drupal Module**: `npm run dbuild`

## Deployment

The site is deployed to GitHub Pages automatically by the
[`deploy-pages`](.github/workflows/deploy-pages.yml) GitHub Actions workflow on every
push to `main`. The workflow builds the `web` app into `docs/` and publishes it as a
static page. In the repository settings, *Settings → Pages → Source* must be set to
**GitHub Actions**.

## Special Note & Thanks

Special thanks goes [*base project](https://github.com/wanglin2/mind-map) [contributors](https://github.com/wanglin2/mind-map/graphs/contributors) 

This project is rough and has not been thoroughly tested, its features are not
yet fully developed, and there are some performance issues. It is only for
learning and reference purposes and should not be used in actual projects.

The built-in themes and icons in the project come from:

* [Baidu Mind Map](https://naotu.baidu.com/)
* [Zhixi Mind Map](https://www.zhixi.com/)

## License

[![GitHub](https://img.shields.io/github/license/emircanerkul/drupal-to-md?style=for-the-badge)](LICENSE)
