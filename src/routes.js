import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import index from "./pages/index";
import dashboard_main from "./pages/dashboard/main";

import email_verify from "./pages/verifyEmail"
import notfound from "./pages/404";

function routes() {
  return (
    <main>
        <Switch>
          <Route path='/' component={index} exact />
          <Route path='/dashboard' component={dashboard_main} exact/>
          <Route path='/verifyEmail' component={email_verify} exact/>
          <Route component={notfound} />
        </Switch>
    </main>
  );
}

export default routes;
