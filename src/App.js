import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){
    console.log("1")
    super(props);
    this.state = {
      list: []
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

  render() {
    if(this.state.list.length === 0){
      return null
    }

    return (
      
      <div className="App grid-containe">
        <Nav />
      <div className='box'>
      {this.state.list.map((value,i) => (<Card key={i}   {...value} />))}
      </div>
      </div>
    );
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

  render(){

    return(
      <div>
        <p>hi</p>
      </div>
    )
  }
}


export default App;
