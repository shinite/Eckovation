import React from 'react';
import axios from 'axios';
import DisplayItem from './DisplayItem';

class Dashboard extends React.Component{

  state = {
    stock: [] ,
    wait:null,
    err:null
  }

  addToCart = (id,item,cost) => {
    console.log(id , " from Dashboard");
    axios({
      method: 'post',
      url: '/addToCart',
      data : {
        "_id" :id,
        "item":item,
        "cost":cost
      }
    }).then((response)=>{
        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }


  componentWillMount(){
    axios({
      method: 'get',
      url: '/getItemsFromStore'
    }).then((response)=>{
      this.setState(()=>({stock:response.data}))
        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }

  render(){
    var inStock =this.state.stock.map((data,index)=> <DisplayItem key={index} data={data} addToCart = {this.addToCart}/>)
  	return(
  		<div className="content-container ">
            <div className="items-display " >
            {inStock}
  		       </div>
      </div>
  	);
  }

}

export default Dashboard;
