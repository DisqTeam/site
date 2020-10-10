import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import DisqIndex from "./pages/landing";
import DisqDashboard from "./pages/dashboard";
import DisqDashboardUpload from "./pages/dashboard/upload";
import DisqDashboardFiles from "./pages/dashboard/files";
import DisqDashboardShorts from "./pages/dashboard/shorts";

function routes() {
  return (
    <main>
        <Switch>
          <Route path='/' component={DisqIndex} exact />
          <Route path='/dashboard' component={DisqDashboard} exact />
          <Route path='/dashboard/upload' component={DisqDashboardUpload} exact />
          <Route path='/dashboard/files' component={DisqDashboardFiles} exact />
          <Route path='/dashboard/shorts' component={DisqDashboardShorts} exact />
          {/* <Route component={Disq404} /> */}
        </Switch>
    </main>
  );
}

export default routes;
