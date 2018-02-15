import React from 'react';
import {BrowserRouter,Route,Switch,Link, NavLink} from 'react-router-dom';
import Dashboard from '../components/Dashboard'
import History from '../components/History'
import ViewImages from '../components/ViewImages'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Header/>
    <Switch>
      <Route path="/" component={Dashboard} exact={true}/>
      <Route path="/history" component={History} />
    <Route path="/images/:keyword" component={ViewImages}  />
      <Route component={NotFoundPage}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
