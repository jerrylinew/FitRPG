import React from 'react';

/*class Name extends React.Component {
 *
 *}*/



export class ProgressBar extends React.Component {
    constructor(props){
      super(props);
    }

    render () {
      /* props:
       * a single value, from 0.0 to 1.0
       */
       var height = (this.props.shape === "thin")? "6px" : "18px";
       var wrapStyle = {
         background: this.props.color || 'blue',
         transition: 'width 700ms cubic-bezier(0.47, 0, 0.745, 0.715)',
         width: this.props.progress * 100 + '%',
         height: height
       };
       var boxStyle = {
         height: height
       }
       return (
         <div className="progress" style={boxStyle}>
           <div className="progressWrap" style={wrapStyle}/>
         </div>);
    }

}
