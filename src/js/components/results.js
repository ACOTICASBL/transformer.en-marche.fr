import React from 'react';
import { connectStateResults, connectHits } from 'react-instantsearch/connectors';

import { ThemeDetail } from './themes';


const Profile = ({ profileId, profiles, locale }) => {
  let profile = profiles.profiles[profileId];
  if (!profileId || !profile) {
    return null;
  } else {
    return (
      <div className="intro">
        <h1 className="intro-header">{profile.titles[locale]}</h1>

        <div className="intro-description">
          <p>{profile.descriptions[locale]}</p>
          <span>Voici les mesures qui vous concernent spécifiquement. Pour voir l&apos;ensemble des mesures pour chaque thème, vous pouvez désélectionner "{profile.titles[locale]}".</span>
        </div>
      </div>
    );
  }
}

const NoResults = () =>
  <div className="mesure-none">
    Aucun resultat pour votre recherche <span role="img" aria-label="Emoji disappointed">😔</span>
  </div>

const ResultsList = connectHits(function ResultsList({ hits, isFiltering, locale }) {
  if (!hits.length) {
    return <NoResults />
  } else {
    hits.sort((a, b) => a.titles[locale].localeCompare(b.titles[locale]));
    return hits.map(hit => <ThemeDetail hit={hit} key={hit.id} isFiltering={isFiltering} />)
  }
});

const Results = ({ searchState: { menu = {}, refinementList = {} }, profiles = {}, locale }) =>
  <div className="results">
    <Profile profileId={menu.profileIds} profiles={profiles} locale={locale} />
    <ResultsList isFiltering={!!refinementList[`titles.${locale}`].length} locale={locale} />
  </div>

export default connectStateResults(Results);
