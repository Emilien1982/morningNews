export default (articles = [], action) => {
  if (action.type === 'addArticle'){
    // first: check if the article is not already in the articles (check by title)
    if (articles.filter(article => article.title === action.article.title).length === 0){
      //console.log('token in article.reducer: ', action.userToken);
      fetch(
        '/wishlist',
        {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({article: action.article, token: action.userToken})
        }
      )
      // second: add the article in the articles
      return [...articles, action.article];
    }
    return articles;
  } else if (action.type === 'deleteArticle'){
    fetch(
      '/wishlist',
      {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({title: action.title, token: action.userToken})
      }
    )
    return articles.filter(article => article.title !== action.title);
  } else if (action.type === 'setUpWishlist'){
    //console.log('SEtUpWish: ', action.articles);
    return action.articles;
  } else {
    return articles;
  }
}