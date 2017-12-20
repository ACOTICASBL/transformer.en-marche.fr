import qs from 'qs';
import without from 'lodash/without';
import { push } from 'react-router-redux'

export const TOGGLE_THEME_FACET = 'TOGGLE_THEME_FACET';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UNSET_PROFILE = 'UNSET_PROFILE';
export const SET_PROFILE = 'SET_PROFILE';
export const DO_QUERY = 'DO_QUERY';

export function doQuery(query) {
  return {
    type: DO_QUERY,
    payload: query
  }
}

export function setProfile(profile) {
  return {
    type: SET_PROFILE,
    payload: profile
  };
}

export function toggleProfile({ slug, objectID, isActive}, location, locale) {
  return dispatch => {
    if (isActive) {
      dispatch(push(`/${locale}/results${location.search}`));
      dispatch(setProfile(null));
    } else {
      dispatch(push(`/${locale}/${slug}${location.search}`));
      dispatch(setProfile(objectID));
    }
  }
}

export function toggleThemeFacet(theme) {
  return {
    type: TOGGLE_THEME_FACET,
    payload: theme
  };
}

export function toggleTheme({ slug, isActive, objectID }, location, match) {
  return dispatch => {
    let { theme = '' } = qs.parse(location.search.slice(1));
    theme = theme ? theme.split(',') : [];
    if (isActive) {
      theme = without(theme, slug);
    } else {
      theme.push(slug);
    }
    let query = theme.length ? `?theme=${theme.join(',')}` : ''
    
    dispatch(push(`${match.url}${query}`));
    dispatch(toggleThemeFacet(objectID));
  }
}
