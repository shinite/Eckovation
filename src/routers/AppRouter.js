import React from 'react';
import {BrowserRouter,Route,Switch,Link, NavLink} from 'react-router-dom';
import Dashboard from '../components/Dashboard'
import MyCart from '../components/MyCart'
import NotFoundPage from '../components/NotFoundPage'

import Header from '../components/Header'

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Header/>
    <Switch>
      <Route path="/" component={Dashboard} exact={true}/>
      <Route path="/cart" component={MyCart} />
      <Route component={NotFoundPage}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
