export const getSearch = ({ search }) => search;

const CHANGE_SEARCH = 'app/searchText/CHANGE_SEARCH';

export const changeSearch = payload => ({ type: CHANGE_SEARCH, payload });

const searchReducer = (statePart = '', action) => {
  switch (action.type) {
    case CHANGE_SEARCH:
      return action.payload;
    default:
      return statePart;
  }
};

export default searchReducer;