require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require('../sources/data.json');
imageDatas = (function(imagesDataArr){
  for(let i = 0,j = imagesDataArr.length; i<j; i++){
    imagesDataArr[i].imgURL = require('../images/'+imagesDataArr[i].fileName);
  }
  return imagesDataArr;
})(imageDatas);

let getRangeRandom = function(low,high){
  return Math.ceil(Math.random()*(high-low))+low;
}
let degreeRandom= function(deg){
  return (Math.random()>0.5?'-':'')+Math.ceil(Math.random()*deg);
}
let IntervalMixin = function(interval) {
  return {
    componentDidMount:function(){
      this._interval = setInterval(this.onTick,interval);
    },
    componentWillUnmount:function(){
      clearInterval(this._interval);
    }
  }
}
let Timer = React.createClass({
  mixins:[IntervalMixin(1000)],
  getInitialState:function() {
    return {secondsElapsed : 0}
  },
  onTick:function(){
    this.setState({
      secondsElapsed:this.state.secondsElapsed+1
    })
  },
  render:function(){
    return (<div>
        Seconds Elapsed: {this.state.secondsElapsed}
      </div>)
  }
});
// let ImgFigure = React.createClass({
//   initSrc : function(src){
//     return require('../images/'+src);
//   },
//   handleClick : function(){
//     let arrange = this.props.arrange;
//     let index = this.props.index;
//     if(arrange.isCenter){
//       this.props.inverse(index);
//     }else{
//       this.props.rearrange(index);
//     }
//   },
//   render:function(){
//     let styleObj = {};
//     if(this.props.arrange.pos){
//       styleObj = this.props.arrange.pos;
//     }
//     if(this.props.arrange.rotate){
//       ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'].forEach(function(value){
//         styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)';
//       }.bind(this));
//     }
//     let imgFigureClassName = 'figure';
//         imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
//     return (
//       <figure className={imgFigureClassName} style={styleObj}>
//         <img onClick={this.handleClick} src={this.props.data.imgURL} alt={this.props.data.title}/>
//         <figcaption className="figcaption">
//           <h2 className="img-title">{this.props.data.title}</h2>
//           <div className="img-back" onClick={this.handleClick}>
//             <p>
//               {this.props.data.desc}
//             </p>
//           </div>
//         </figcaption>
//       </figure>
//     )
//   }
// })
class ImgFigure extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  initSrc(src){
    return require('../images/'+src);
  }
  handleClick(){
    let arrange = this.props.arrange;
    let index = this.props.index;
    if(arrange.isCenter){
      this.props.inverse(index);
    }else{
      this.props.rearrange(index);
    }
  }
  render(){
    let styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
      ['MozTransform', 'msTransform', 'WebkitTransform', 'transform'].forEach(function(value){
        styleObj[value] = 'rotate('+this.props.arrange.rotate+'deg)';
      }.bind(this));
    }
    let imgFigureClassName = 'figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
    return (
      <figure className={imgFigureClassName} style={styleObj}>
        <img onClick={this.handleClick} src={this.props.data.imgURL} alt={this.props.data.title}/>
        <figcaption className="figcaption">
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
let AppComponent = React.createClass({
  getDefaultProps: function(){
    return {
      name : 'navtion'
    };
  },
  getInitialState: function(){
    return {
      imgsArrangeArr:[
        // {
        //   pos:{
        //         left:0,
        //         top:0,
        //         zIndex:0
        //   }
        //   rotate:0,
        //   isCenter:false,
        //   isInverse:false
        // }
      ]
    };
  },
  inverse: function(index) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    this.setState({
      imgsArrangeArr:imgsArrangeArr
    })
  },
  Constant:{
    centerPos:{
      left:0,
      top:0
    },
    hPosRange:{
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange:{
      x:[0,0],
      y:[0,0]
    }
  },
  componentDidMount:function(){
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);
    this.Constant = {
      centerPos:{
        left:halfStageW-halfImgW,
        top:halfStageH- halfImgH,
        zIndex:2
      },
      hPosRange:{
        leftSecX:[-halfImgW,halfStageW-3*halfImgW],
        rightSecX:[halfStageW+halfImgW,stageW-halfImgW],
        y:[-halfImgH,stageH-halfImgH]
      },
      vPosRange:{
        x:[halfStageW-imgW,halfStageH],
        y:[-halfImgH,halfStageH-3*halfImgH]
      }
    };
    this.rearrange(0);
  },
  /*
   * 重新布局图片
  */
  rearrange:function(index){
    let imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,

      imgsArrangeTopArr =[],
      topImgNum = Math.ceil(Math.random()*2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(index,1);
      //设置中心图片状态
      imgsArrangeCenterArr[0] = {
        pos : centerPos,
        isCenter:true,
        isInverse:false
      }

      //取出并且设置上侧图片状态
      topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
      imgsArrangeTopArr.forEach(function(value,index) {
        imgsArrangeTopArr[index]={
          pos : {
            top:getRangeRandom(...vPosRange.y),
            left:getRangeRandom(...vPosRange.x),
            zIndex:1
          },
          rotate:degreeRandom(30),
          isCenter:false,
          isInverse:false
        }
      });

      //设置两测图片状态
      for(let i = 0,j = imgsArrangeArr.length,k=j/2;i<j;i++){
        let hPosRangeLORX = null;
        if(i < k){
          hPosRangeLORX = hPosRange.leftSecX;
        }else{
          hPosRangeLORX = hPosRange.rightSecX;
        }
        imgsArrangeArr[i] = {
          pos : {
            top:getRangeRandom(...hPosRange.y),
            left:getRangeRandom(...hPosRangeLORX),
            zIndex:1
          },
          rotate:degreeRandom(30),
          isCenter:false,
          isInverse:false
        }
      }
      if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
        imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
      }
      imgsArrangeArr.splice(index,0,imgsArrangeCenterArr[0]);

      this.setState({
        imgsArrangeArr:imgsArrangeArr
      });
  },
  handleArrange:function(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  },
  render: function() {
    let controllerUnits =[],
      imgFigures = [];
    imageDatas.forEach(function(value,index){
      let handleArrange = this.handleArrange(index);
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0,
            zIndex:0,
            isCenter:false,
            isInverse:false
          },
          rotate:0
        }
      }
      imgFigures.push(<ImgFigure ref={'imageFigure'+index}
        key={index}
        index={index}
        data={value}
        inverse={this.inverse}
        rearrange={this.rearrange}
        arrange={this.state.imgsArrangeArr[index]} />);

        controllerUnits.push(<s
          onClick={handleArrange}
          key={index}>{index}</s>);
    }.bind(this));
    return (
      <div ref="stage" className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
        <Timer />
      </div>
    );
  }
});

export default AppComponent;

// class AppComponent extends React.Component {
//   static propTypes = {

//   };
//   static defaultProps = {

//   };
//   constructor(props) {
//     this.status = {

//     }
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
//   componentDidMount(){

//   }
// }