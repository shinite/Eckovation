import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';

class History extends React.Component{

  state = {
    wordList:[]
  }

  componentWillMount(){
    axios.get('/getData')
      .then((response)=> {
        this.setState(()=>({wordList:response.data}))
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    var printList = this.state.wordList.map((data,index) => <p key={index}><NavLink to={"/images/"+data.word}  className="button display--link">{data.word}</NavLink></p>)

  	return(
  		<div>
        {printList}
  		</div>
  	);
  }

}

export default History;
