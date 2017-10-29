import React, { Component } from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){
    console.log("1")
    super(props);
    this.state = {
      list: [],
      home:true,
      action:'',
      search:''
    }
  }

  componentWillMount(){
    console.log("2")
    var self = this;
    axios.get('http://starlord.hackerearth.com/gamesarena').then(function(response){
      var data = response.data.slice(1);
      // console.log(data);
      self.setState(function(){
        return {
          list : data
        };
      });
      // console.log(response);
     })
     .catch(function (error){
       console.log(error);
     });
  
 }
 

 searchAction = (searchvalue) => {
  
   this.setState(function(){
     return{
     action: 'search',
     search: searchvalue
   }
   })

   var data = this.state.list;
   var newdata = data.filter((arr) => (arr.title === this.state.searchvalue));
   console.log(newdata);
   
 }



  render() {
    if(this.state.list.length === 0){
      return null
    }

    if(this.state.home === true){
    return (
      
      <div className="App grid-containe">
        <Nav  localsearch = {this.searchAction}/>
      <div className='box'>
      {this.state.list.map((value,i) => (<Card key={i}   {...value} />))}
      </div>
      </div>
    );
  }

  if(this.state.action === 'search'){
    var data = this.state.list;
    var newdata = data.filter((arr) => {arr.title === this.state.search})
    this.setState({home:false})
    console.log(newdata);
    return null
  }
  }
}


const Card = (props) => (
  <div className='card'>
    <p className='title'>Title: { props.title}</p>
    <p>Platform: {props.platform}</p>
    <p>Score: { props.score}</p>
    <p>Editors Choice: { props.editors_choice}</p>
    <p>Genre: { props.genre}</p>
  </div>
)


class Nav extends Component{
   constructor(props){
     super(props);
     this.state={
       query:''
     }
   }

   UpdateSearch = (event) =>{
    event.preventDefault()
    this.setState({query:event.target.value})
}

handleSubmit = (event) =>{
  if(event.key === 'Enter'){
      event.preventDefault();
      this.props.localsearch(this.state.query);
  }
}

handleClick = () =>{
  this.props.localsearch(this.state.query);
}

  render(){

    return(
      <div className='nav'>
        <li className='nav-span title'>Home</li>
        <li className='nav-span'><input type='text' className='nav-search'
                 value={this.state.query}
                 onChange={this.UpdateSearch}
                 onKeyPress={this.handleSubmit} />
                 <FaSearch className='search-icon nav-span' onClick={this.handleClick} />
                 </li>
      </div>
    )
  }
}


export default App;
