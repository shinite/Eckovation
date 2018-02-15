import React from 'react';
import axios from 'axios';

class Dashboard extends React.Component{

  state = {
    searchInput: null,
    wait:null,
    err:null
  }

  onInputChange = (e) => {
    const searchInput = e.target.value.toLowerCase();
    this.setState(()=>({searchInput}))
  }

  handleOnClick = (e) =>{
  	e.preventDefault();
	   this.setState(()=>({wait:"please wait while images are getting saved"}))
  		axios({
  		  method: 'post',
  		  url: '/search',
  		  data: {
  		    input : this.state.searchInput
  		  }
  		}).then((response)=>{
			     this.setState(()=>({wait:response.data}))
  		    })
  		    .catch(function(err){
  		      console.log(err, 'error!! try again');
  		    });
  }

  render(){
  	return(
  		<div className="content-container ">
        <div className="input-group">
          <div className="input-group__item">
            <input className="text-input" type="text" onChange={this.onInputChange}/>
          </div>
          <div className="input-group__item">
            <button className="button " onClick={this.handleOnClick}>Search</button></div>
          </div>
		        <p className="button display--link">{this.state.wait}</p>
  		</div>
  	);
  }

}

export default Dashboard;
