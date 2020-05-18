/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EmailBuilder from 'containers/email-builder/loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import styles from './styles';

export default function App() {
  return (
    <div style={styles.root}>
      <Switch>
        <Route exact path="/" component={EmailBuilder} />
        <Route component={EmailBuilder} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
