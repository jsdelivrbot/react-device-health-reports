import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DataUpload from './containers/data_upload';
import PopularityReport from './containers/popularity_report';
import TotalsReport from './containers/totals_report';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <Switch>
              <Route path="/report1" component={PopularityReport} />
              <Route path="/report2" component={TotalsReport} />
              <Route path="/" component={DataUpload} />
          </Switch>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
