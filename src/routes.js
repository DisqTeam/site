import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Pages
import index from "./pages/index";
import dashboard_main from "./pages/dashboard/main";
import dashboard_shorts from "./pages/dashboard/shorts";
import dashboard_files from "./pages/dashboard/files";
import dashboard_upload from "./pages/dashboard/upload";
import dashboard_shx from "./pages/dashboard/sharex";
import dashboard_settings from "./pages/dashboard/settings";

import admin_overview from "./pages/dashboard/admin/overview";
import admin_users from "./pages/dashboard/admin/users";

import auth_cb from './pages/misc/callback';
import email_verify from "./pages/verifyEmail"
import notfound from "./pages/404";
import surl_handler from "./pages/misc/shortUrl";

import tos from "./pages/legal/tos"
import pp from "./pages/legal/privacy"

function routes() {
  return (
      <Switch>
        <Route path='/' component={index} exact />
        <Route path='/dashboard' component={dashboard_main} exact/>
        <Route path='/dashboard/shorts' component={dashboard_shorts} exact/>
        <Route path='/dashboard/files' component={dashboard_files} exact/>
        <Route path='/dashboard/upload' component={dashboard_upload} exact/>
        <Route path='/dashboard/sharex' component={dashboard_shx} exact/>
        <Route path='/dashboard/settings' component={dashboard_settings} exact/>
        <Route path='/dashboard/admin' component={admin_overview} exact/>
        <Route path='/dashboard/admin/users' component={admin_users} exact/>
        <Route path='/verifyEmail' component={email_verify} exact/>
        <Route path='/auth/cb' component={auth_cb} exact/>
        <Route path='/s' component={surl_handler}/>
        <Route path='/tos' component={tos}/>
        <Route path='/privacy' component={pp}/>
        <Route component={notfound} />
      </Switch>
  );
}

export default routes;
