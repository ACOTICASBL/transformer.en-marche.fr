import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch/dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './scss/App.css';

import Page from './js/components/Page';
import Sidebar from './js/static/sidebar';
import Results from './js/static/results';

const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

const client = algoliasearch("CUET2HJEQ6", "962e8937e28d8ac7a13f814f89138a6b");
const measuresClient = client.initIndex('Measure_dev');

const Content = () =>
  <div className="content">
    <Results />
  </div>
  
const Layout = ({ measures }) =>
  <InstantSearch
    appId={APP_ID}
    apiKey={API_KEY}
    indexName={INDEX_NAME}>
    
    <Route path="/:profile" render={() => {
      return (
        <main className="main">
        {/*
          measures are passed in to show the most recently updated measure
        */}
          <Sidebar measures={measures} />
          <Content />
        </main>
      );
    }} />
  </InstantSearch>

class App extends Component {
  state = {}
  
  componentDidMount() {
    measuresClient.search({
      query: ''
    }, (err, content) => this.setState({ measures: content.hits}));
  }
  
  render() {
    return (
      <Router>
        <Page>
          <Route exact path="/" render={() => <Redirect to="/fr" />} />
          <Route path="/:locale" render={() => <Layout measures={this.state.measures}/>} />
        </Page>
      </Router>
    );
  }
}

export default App;
