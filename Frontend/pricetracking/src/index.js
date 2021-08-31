import React from 'react';
import ReactDOM from 'react-dom';


class AddProduct extends React.Component {
  
  render() {
    return (
      <form action="../../addProduct" method="post" >
      <h1>Add New Product </h1>
      <p>Enter your email:</p>
      <input
        type='text'
        name='useremail'
        
      />
      <p>Enter link:</p>
      <input
        type='text'
        name='link'
      />
      <br/>
      <br/>
      <input type='submit' value="ADD" />
      </form>
    );
  }
}


class DeleteProduct extends React.Component {
  
  render() {
    return (
      <form action="../../deleteProduct" method="post" >
      <h1>Remove your Product From List</h1>
      <p>Enter your email:</p>
      <input
        type='text'
        name='useremail'
        
      />
      <p>Enter link:</p>
      <input
        type='text'
        name='link'
      />
      <br/>
      <br/>
      <input type='submit' value="REMOVE" />
      </form>
    );
  }
}

class Unsubscribe extends React.Component {
  
  render() {
    return (
      <form action="../../unSubscribe" method="post" >
      <h1>UNSUBSCRIBE</h1>
      <p>Enter your email:</p>
      <input
        type='text'
        name='useremail'
        
      />
      <br/>
      <br/>
      <input type='submit' value="UNSUBSCRIBE" />
      </form>
    );
  }
}


ReactDOM.render(<AddProduct />, document.getElementById('addProduct'));
ReactDOM.render(<DeleteProduct />, document.getElementById('deleteProduct'));
ReactDOM.render(<Unsubscribe />, document.getElementById('Unsubscribe'));
