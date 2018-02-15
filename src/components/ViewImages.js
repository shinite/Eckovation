import React from 'react';
import axios from 'axios';

//import image1 from "../../server/images/hermione/hermione1.jpeg"
class ViewImages extends React.Component{

  state={
    imagesPath:[]
  }


  componentWillMount(){

    axios({
      method: 'post',
      url: '/getImages',
      data: {
        input : this.props.match.params.keyword
      }
    }).then((response)=>{
         const imagesPath= response.data.map((data,index)=>{
           return `/images/${this.props.match.params.keyword}/${data}`
         })
         this.setState(()=>({imagesPath}))
        })
        .catch(function(err){
          console.log(err, 'error!! try again');
        });
  }

  render(){
	var displayImage = this.state.imagesPath.map((data, index)=><img className="images-edit" key={index} src={data}/>)
  	return(
  		<div className = "images-display">
        	{displayImage}
  		</div>
  	);
  }

}

export default ViewImages;
