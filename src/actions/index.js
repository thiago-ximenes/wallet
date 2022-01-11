import { SET_EMAIL } from '../reducers/user';

export default function setEmail(state) {
  return {
    type: SET_EMAIL,
    payload: state,
  };
}
