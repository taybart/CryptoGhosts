import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from 'globals/containers/navbar';
import App from 'main/app';
import Ghost from 'ghost/ghost';
import Battle from 'battle/battle';

const routes = (
  <div>
    <div id="page-content-wrapper">
      <Navbar />
      <Route exact path="/" component={App} />
      <Route exact path="/ghost" component={Ghost} />
      <Route exact path="/battle" component={Battle} />
    </div>
  </div>
);

export default routes;

