import qs from 'qs';
import without from 'lodash/without';
import { push } from 'react-router-redux'

export const TOGGLE_THEME_FACET = 'TOGGLE_THEME_FACET';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UNSET_PROFILE = 'UNSET_PROFILE';
export const SET_PROFILE = 'SET_PROFILE';
export const DO_QUERY = 'DO_QUERY';

export const RESET_PARAMS = 'RESET_PARAMS';
export const QUERY = 'QUERY';
export const THEME = 'THEME';
export const PROFILE = 'PROFILE';


export const doQuery = query => ({
  type: DO_QUERY,
  payload: query
});

export const setProfile = profile => ({
  type: SET_PROFILE,
  payload: profile
});

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

export const toggleThemeFacet = theme => ({
  type: TOGGLE_THEME_FACET,
  payload: theme
});

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

export const resetParams = (location, match, type) => {
  return dispatch => {
    switch(type) {
      case PROFILE:
        dispatch(push(`/${match.params.locale}/results${location.search}`));
        dispatch({ type: 'RESET_PROFILE' });
        break;
        
      case QUERY:
        let { theme = '' } = qs.parse(location.search.slice(1));
        dispatch(push(`${match.url}${theme && `?theme=${theme}`}`));
        dispatch({ type: 'RESET_QUERY' });
        break;
        
      case THEME:
        let { q = '' } = qs.parse(location.search.slice(1));
        dispatch(push(`${match.url}${q && `?q=${q}`}`));
        dispatch({ type: 'RESET_THEME' });
        break;
      
      default:
        dispatch(push(`/${match.params.locale}/results`));
        dispatch({ type: RESET_PARAMS });
    }
    
  }
};
