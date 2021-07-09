import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import NotFound from './NotFound';
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';
import articles from './reducers/article.reducer';
import user from './reducers/user.reducer';

const store = createStore(combineReducers({articles, user}));


function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route path='/' exact component={ScreenHome} />
          <Route path='/screensource' component={ScreenSource}  />
          <Route path='/screenarticlesbysource/:sourceId' component={ScreenArticlesBySource}  />
          <Route path='/screenmyarticles' component={ScreenMyArticles}  />
          <Route component={NotFound}  />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
