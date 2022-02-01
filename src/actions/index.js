import { SET_EMAIL } from '../reducers/user';
import { SET_EXPENSES, SET_CURRENCIES, UPDATE_EXPENSE } from '../reducers/wallet';

export function setEmail(state) {
  return {
    type: SET_EMAIL,
    payload: state,
  };
}

export function SetExpenses(state) {
  return {
    type: SET_EXPENSES,
    payload: state,
  };
}

function setCurrency(state) {
  return {
    type: SET_CURRENCIES,
    payload: state,
  };
}

export function updateExpense(state) {
  return {
    type: UPDATE_EXPENSE,
    payload: state,
  };
}

export function getCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCurrency(data));
      });
  };
}
