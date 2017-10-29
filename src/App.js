import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentWillMount(){
    var self = this;
    axios.get('http://starlord.hackerearth.com/gamesarena').then(function(response){
      var data = response.data;
      console.log(data);
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
    // console.log(this.state.list[2])
    var obj = this.state.list[2];
    console.log(obj.title);
    return (
      <div className="App">
        <p> hi </p>
      </div>
    );
  }
}

export default App;
