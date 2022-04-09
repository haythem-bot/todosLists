import React, { Component } from 'react'
import axios from 'axios'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      input : "",

    }
    this.change = this.change.bind(this)
    this.postTodo = this.postTodo.bind(this)
    this.deletTodo= this.deletTodo.bind(this)
    this.update = this.update.bind(this)
  }
   postTodo(){
    axios.post("http://localhost:3002/post",{
      todo:this.state.input
    }).then(result=>this.getTodos(),{todo:""}).catch(err =>(console.log(err)))
    console.log(this.state.input)
   }
   update(id){
     axios.put(`http://localhost:3002/updateTodo/${id}`,{todo:this.state.input}).then((result)=>{this.getTodos()}).catch(err =>(console.log(err)))
   }
   getTodos(){
     axios.get("http://localhost:3002/getTodos").then(result=>{
      
       this.setState({data:result.data})
     }) }
     deletTodo(id){
       axios.delete(`http://localhost:3002/delete/${id}`).then(result=>{
         this.getTodos()
       }).catch(err =>(console.log(err)))
     }
componentDidMount(){
  this.getTodos()
}
  change(event){
    this.setState({
      input: event.target.value
    })
  }
  render() {
    return (
      <div className="form">
        <h1>TODO LIST</h1>
        <input onChange={this.change}></input>
        <button onClick={this.postTodo}>ADD</button>
        <br/>
        {this.state.data.map((elem, index) => {
          console.log(this.state.data)
          return (<div><div key={index}>{elem.todo}</div><button className="d" onClick={()=>{this.deletTodo(elem.id)}} >DELETE</button><button className="b" onClick={()=>{this.update(elem.id)}}>UPDATE</button></div>)
        })}
      </div>
    )
  }
}
