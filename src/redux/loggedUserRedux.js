export const getLoggedUser = ({ loggedUser }) => loggedUser;

const LOG_IN = 'app/loggedUser/LOG_IN';
const LOG_OUT = 'app/loggedUser/LOG_OUT';


export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = payload => ({ type: LOG_OUT, payload });

const loggedUserReducer = (statePart = '', action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return false;
    default:
      return statePart;
  }
};

export default loggedUserReducer;