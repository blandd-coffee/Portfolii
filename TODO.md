# TODO: Fix Article Maker Issues

## Articles

- [ ] Add isIndexed field to shared/article.model.ts
- [ ] Add isIndexed to server/src/models/article.model.ts
- [ ] Update article controller to handle isIndexed
- [ ] Add indexing checkbox to ArticleCreator/index.html for articles
- [ ] Remove slug existence check in publishArticle to prevent creating new when editing

## Pages

- [ ] Fix page route: add /id/:id before /:slug in page.route.ts
- [ ] Update loadPage in ArticleCreator/index.html to use /pages/id/${id}
- [ ] Remove slug existence check in publishPage
- [ ] Update postPage to auto-assign order if not provided
- [ ] Update HTML to make page order not required, with auto hint
