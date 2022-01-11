import React from 'react';
import store from '../store';

class Wallet extends React.Component {
  render() {
    console.log(store.getState());
    return <div>carteira</div>;
  }
}

export default Wallet;
