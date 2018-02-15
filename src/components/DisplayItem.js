import React from 'react';

class DisplayItem extends React.Component{
onClick = (id,item,cost) =>{
  this.props.addToCart(id,item,cost);
}

render(){
  return (
  <div className="item-display">
    <p>Item : {this.props.data.item}</p>
    <p> Cost: {this.props.data.cost}</p>
    <button className="button-other" onClick={()=>this.onClick(this.props.data._id,this.props.data.item,this.props.data.cost)}>Add to Cart</button>
  </div>
);}

}

export default  DisplayItem
