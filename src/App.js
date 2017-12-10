import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  Hits,
} from 'react-instantsearch/dom';
import './scss/App.css';

import Page from './js/components/Page';
import Sidebar from './js/static/sidebar';
import Theme from './js/static/theme';
import Results from './js/static/results';

const APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

const client = algoliasearch("CUET2HJEQ6", "962e8937e28d8ac7a13f814f89138a6b");
const measuresClient = client.initIndex('Measure_dev');
const profilesClient = client.initIndex('Profile_dev');

const Content = ({ profiles }) =>
  <div className="content">
    <Results profiles={profiles}>
      <Hits hitComponent={Theme} />
    </Results>
  </div>

class App extends Component {
  state = {}
  
  componentDidMount() {
    measuresClient.search({
      query: ''
    }, (err, content) => this.setState({ measures: content.hits}));
    
    profilesClient.search({
      query: ''
    }, (err, content) => this.setState({ profiles: content.hits}));
  }
  
  render() {
    return (
      <Page>
        <InstantSearch
          appId={APP_ID}
          apiKey={API_KEY}
          indexName={INDEX_NAME}>
          
          <main className="main">
            
            {/*
              measures are passed in to show the most recently updated measure
            */}
            <Sidebar measures={this.state.measures} />
            
            {/*
              profiles used to render a dynamic intro blurb based on
              the chosen profile facet
            */}
            <Content profiles={this.state.profiles} />
          </main>
          
        </InstantSearch>
      </Page>
    );
  }
}

export default App;
