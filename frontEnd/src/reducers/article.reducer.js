export default (articles = [], action) => {
  if (action.type === 'addArticle'){
    // first: check if the article is not already in the articles (check by title)
    if (articles.filter(article => article.title === action.article.title).length === 0){
      // second: add the article in the articles
      return [...articles, action.article];
    }
    return articles;
  } else if (action.type === 'deleteArticle'){
    return articles.filter(article => article.title !== action.title);
  } else {
    return articles;
  }
}