import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={ScreenHome} />
        <Route path='/screensource/:user' component={ScreenSource} />
        <Route path='/screenarticlesbysource/:sourceId' component={ScreenArticlesBySource}  />
        <Route path='/screenmyarticles' component={ScreenMyArticles}  />
        <Route component={NotFound}  />
      </Switch>
    </Router>
  );
}

export default App;
