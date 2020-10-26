import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import index from "./pages/index";

function routes() {
  return (
    <main>
        <Switch>
          <Route path='/' component={index} exact />
        </Switch>
    </main>
  );
}

export default routes;
