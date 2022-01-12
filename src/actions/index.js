import { SET_EMAIL } from '../reducers/user';
import { SET_EXPENSES } from '../reducers/wallet';

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
