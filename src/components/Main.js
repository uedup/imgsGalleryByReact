require('normalize.css/normalize.css');
require('styles/App.css');
let imageDatas = require('../sources/data.json');
import React from 'react';
// let yeomanImage = require('../images/yeoman.png');

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
let ImgFigure = React.createClass({
  render:function(){
    return (
      <figure>
        <img src={this.props.data.fileName}/>
        <figcation>
          <h2>{this.props.data.title}</h2>
        </figcation>
      </figure>
    )
  }
})
var AppComponent = React.createClass({
  getDefaultProps: function(){
    return {
      name : 'navtion'
    };
  },
  getInitialState: function(){
    return {
      'value' :  'This is the result of client!'
    };
  },
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  handleChange:function(){
    this.setState({
      'value' : this.refs.myTextInput.value
    });
  },
  render: function() {
    let controllerUnits =[],
        imgFigures = [];
    imageDatas.forEach(function(value){
      imgFigures.push(<ImgFigure data={value} />);
    });
    return (
      <div>
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
        <input type="text" ref="myTextInput"  onChange={this.handleChange} />
        <input type="button" value="Focus the text input" onClick={this.handleClick}/>
        <span ref="result" className="result">{this.state.value}</span>
      </div>
    );
  }
});

export default AppComponent;
