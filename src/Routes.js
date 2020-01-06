import React from 'react';
import Layout from './Hoc/Layout';

import { Switch, Route } from 'react-router-dom';
import SighnIn from './components/sighnin';
import Dashboard from './components/Admin/Dashboard';

import Sellers from './components/Admin/Sellers';

import BuyersAccounts from './components/Admin/Buyers';
import Rider from './components/Admin/Riders';
import SeePosts from './components/Admin/Sellers/SeePosts';
import Complains from './components/Admin/complains';

import EditPost from './components/Admin/Sellers/EditPost'


const Routes = (props)=> {
  return (
   <Layout>
     <Switch>
       <Route exact component={EditPost} path="/editPosts/:id" />
       <Route exact component={SeePosts} path="/seePosts/editPost/:id"/>
        <Route exact component={SighnIn} path="/sign_in" />
        <Route exact component={Dashboard} path="/dashboard"/>
        <Route exact component={Sellers} path="/sellers" />
        <Route exact component={BuyersAccounts} path="/buyers" />
        <Route exact component={Rider} path="/Riders" />
        <Route exact component={Complains} path="/complains" />
      </Switch>
    </Layout>
  )
}

export default Routes;
