import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="bg-gray-200 h-screen grid place-items-center">
        <div
          className="container mx-auto bg-amber-200
          p-8 shadow-lg rounded"
        >
          <Header />
          <Form />
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
