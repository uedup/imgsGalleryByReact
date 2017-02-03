require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

// class AppComponent extends React.Component {
//   // getDefaultProps(){
//   //   return {
//   //     age : new Date()
//   //   };
//   // }
//   // getInitialState(){
//   //   return {
//   //     'notice' :  'this is react!'
//   //   };
//   // }
//   handleClick() {
//     this.refs.myTextInput.focus();
//   }
//   render() {
//     return (
//       <div className="index">
//         <img src={yeomanImage} alt="Yeoman Generator" />
//         <div onClick={this.clickHandle} className="notice a">Please edit <code>src/components/Main.js</code> to get started!</div>
//         <span ref="txt">hello react! </span>
//         <input type="text" ref="myTextInput" />
//         <input type="button" value="Focus the text input" onClick={this.handleClick} />
//       </div>
//     );
//   }

//   clickHandle() {

//     console.log(this.props.age)
//   }
// }
// AppComponent.defaultProps = {
//   age : 17
// };
var AppComponent = React.createClass({
  getDefaultProps: function(){
    return {
      name : 'navtion'
    };
  },
  getInitialState: function(){
    return {
      'notice' :  'this is react!'
    };
  },
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" value={this.props.name}/>
        <input type="button" value="Focus the text input" />
        {this.props.name} 
      </div>
    );
  }
});

export default AppComponent;
