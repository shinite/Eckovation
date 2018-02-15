import React from 'react';
import axios from 'axios';
import DisplayItem from './DisplayItem';

class Dashboard extends React.Component{
  state = {
    cart: [] ,
    total:0,
    url:null
  }

  componentWillMount(){
      var totalAdd =0;
    axios({
      method: 'get',
      url: '/getItemsFromCart'
    }).then((response)=>{
        response.data.forEach((data,index)=>{
        totalAdd=totalAdd+parseInt(data.cost);
      })
      this.setState(()=>({cart:response.data, total:totalAdd}))

        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }

  removeFromCart = (id,cost) => {
    var newTotal = this.state.total-cost;

    this.setState(()=>({total:newTotal}))
    axios({
      method: 'post',
      url: '/removeFromCart',
      data : {
        "_id" :id
      }
    }).then((response)=>{
          this.setState({cart:[]})
      this.setState(()=>({cart:response.data}))
        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }

  checkOut = () =>{
    axios({
      method: 'post',
      url: '/checkOut',
      data:{
        total:this.state.total
      }
    }).then((response)=>{
        this.setState(()=>({url:response.data.payment_request.longurl}))
        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }
  render(){
    var inCart =this.state.cart.map((data,index)=>{
      return(
    <div className="cart-items-display">
    <p key={index}>{data.item} </p>
    <p>{data.cost}</p>
    <button className="button-other" onClick={()=>this.removeFromCart(data._id,data.cost)} >remove</button>
    </div>)}
  )

  if(this.state.url == null){

    return(
      <div>
        <div className="cart-items-display">
        <p>Item</p><p> Cost</p> <p>Remove</p>
        </div>
      {inCart}
      <p className="total">Total: {this.state.total}</p>
      <button className="button align-button" onClick={this.checkOut}> Check Out</button>
      </div>

    );
  }
  else{
    return (
        <a  className="myLink" href={this.state.url}>Please click here to complete the payment</a>
    )
  }
  }

}

Dashboard.defaultProps={
  total:0
}
export default Dashboard;
