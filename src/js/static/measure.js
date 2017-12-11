import React from 'react';
import { groupBy, filter } from 'lodash';
import { connectStateResults } from 'react-instantsearch/connectors';
import Collapsible from 'react-collapsible';
import { ChevronDown, ChevronUp } from 'react-feather';

import '../../scss/measure.css';

const STATUS_MAP = {
  IN_PROGRESS: 'En vigueur',
  IS_LAW: 'Voté',
  VOTED: 'En cours'
}

const slugify = str => str.toLowerCase().replace(/\s/g, '-');

export const Measure = ({measure}) =>
  <a
    href="http://www.wnyc.org"
    target="_blank"
    rel="noreferrer noopener"
    className={`measure ${slugify(STATUS_MAP[measure.status])}`}>
    <div className="measure-body">
      <div className="measure-status">
        {STATUS_MAP[measure.status]}
      </div>
      <div className="measure-name">
        {measure.title}
      </div>
    </div>
  </a>
  
const TriggerToOpen = ({ count }) => <span><ChevronDown />Toutes les réformes ({count})</span>
const TriggerToClose = ({ count }) => <span><ChevronUp />Toutes les réformes ({count})</span>
  
export const NoMeasure = ({theme}) =>
  <p className="no-measure">Il n&apos;y a pas de réformes specifiques au profil de {theme}. Voir toutes les réformes sur le thème {theme}.</p>

export const Measures = connectStateResults(({ searchState: { query }, props: { measures = [], children }}) => {
  if (!measures.length) {
    return children;
  }
  measures = filter(measures, m => m.title.match(new RegExp(query, 'gi')));
  let grouped = groupBy(measures, 'status');
  measures = (grouped['IN_PROGRESS'] || []).concat(grouped['IS_LAW'] || []).concat(grouped['VOTED'] || []);
  
  let collapse = measures.length > 6 ? (
    <Collapsible
     trigger={<TriggerToOpen count={measures.length - 6} />}
     triggerWhenOpen={<TriggerToClose count={measures.length - 6} />}
     classParentString="measure-accordion"
     triggerClassName="measure-accordion__trigger"
     >
      {measures.slice(6).map((measure, i) => <Measure key={i} measure={measure} />)}
    </Collapsible>
  ) : null;
  
  return (
    <div className="measure-list">
      {measures.slice(0,5).map((measure, i) => <Measure key={i} measure={measure} />)}
      {collapse}
    </div>
  )
});
