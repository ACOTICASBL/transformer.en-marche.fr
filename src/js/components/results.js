import React from 'react';
import { connectStateResults, connectHits } from 'react-instantsearch/connectors';
import sortBy from 'lodash/sortBy';

import { ThemeDetail } from './themes';


const Profile = ({ profileTitle, profiles }) => {
  let profile = profiles.profilesByTitle[profileTitle];
  if (!profileTitle || !profile) {
    return null;
  } else {
    return (
      <div className="intro">
        <h1 className="intro-header">{profile.title}</h1>

        <div className="intro-description">
          <p>{profile.description}</p>
        </div>
      </div>
    );
  }
}
  
const NoResults = () =>
  <div className="mesure-none">
    Aucun resultat pour votre recherche <span role="img" aria-label="Emoji disappointed">😔</span>
  </div>

const ResultsList = connectHits(function ResultsList({ hits, majorOnly }) {
  if (!hits.length) {
    return <NoResults />
  } else {
    return sortBy(hits, 'title').map(hit => <ThemeDetail hit={hit} key={hit.objectID} majorOnly={majorOnly} />)
  }
});

const Results = ({ searchState: { menu = {} }, profiles = [], majorOnly }) =>
  <div className="results">
    <Profile profileTitle={menu['measures.profiles.title']} profiles={profiles} />
    <ResultsList majorOnly={majorOnly} />
  </div>

export default connectStateResults(Results);
