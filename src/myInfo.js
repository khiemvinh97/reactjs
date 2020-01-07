import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route, Link ,useHistory } from "react-router-dom";
import cookie from 'react-cookies';
import { resolve } from 'path';
import { reject } from 'q';
import {firebaseApp} from './configdatabase'
import { userInfo } from 'os';


class MyInfo extends React.Component{
    constructor(props){
        super(props)    
        this.logout=this.logout.bind(this)
        this.state={
            isLoading:true,
            item:[],
            text:'',
            dem:1,
            Infouser:[],
            loading:false
            
        }
        this.Loading=this.Loading.bind(this)
        this.Onfinish=this.Onfinish.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.SetText=this.SetText.bind(this)
        this.DeleteText=this.DeleteText.bind(this)
        this.deleteOne=this.deleteOne.bind(this)
        this.itemsRef = firebaseApp.database().ref('Users');


    }
    
    
    /*
    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },1500)
      }
      */
    
      Loading(Onfinish){
          console.log('haizz')
         return (
            Onfinish()
         )
      }
      Onfinish(){
        return (
            <div>
                <Router><h1>Welcome {this.state.Userid}</h1>
                {this.state.Infouser.map((value)=>{
                    return(
                        <div>
                        <h3>Ho Ten : {value.HoTen}</h3>
                        <h3>Que Quan: {value.QueQuan}</h3>
                        <h3>So Thich: {value.SoThich}</h3>

                        </div>
                    )
                })}
                
                <br/>
                <button onClick={this.logout}><Link to="/">Return</Link></button>
                </Router>
                
            </div>
        ) 

      }
      componentDidMount() {
        this.itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                if(child.key===localStorage.getItem('userid')){
                  items.push({
                      id: child.key,
                      HoTen: child.val().HoTen,
                      QueQuan:child.val().QueQuan,
                      SoThich:child.val().SoThich,
                      MatKhau:child.val().MatKhau,
                    });
                }
            });
            let a = items
            JSON.parse( JSON.stringify(a))
            console.log(a)
            this.setState({
                Infouser:a,
            }
            )
            console.log(this.state.Infouser)
        });        
      }
    componentWillMount(){
      
        
          this.setState({
            Userid:localStorage.getItem('userid'),
            check:localStorage.getItem('check'),
            
        })
        
/*
                setTimeout(()=>{
                const promise = new Promise((resolve,reject)=>{
                    if(this.state.check==='true'){
                        resolve()
                    }
                    else {
                        reject()
                    }
                    })
                    promise.then(()=>{
                        this.setState({
                            onLoading:true,
                        })
                    }).catch(()=>{
                        setTimeout(()=>{
                            this.setState({
                                onLoading:false,
                        })
                        
                        })
                    })
    

            },0)
            */
       
            
    }
    logout(){
        cookie.remove('userid', { path: '/' })
        cookie.remove('check', { path: '/' })
        localStorage.clear()
        window.location.reload(); 


    }
    handleChange(event){
        const {name,value}= event.target
        this.setState({
            [name]:value,
            
        })
      }
      SetText(){
            let a= this.state.item
            let b = {
                "text" : this.state.text,
                "key": this.state.dem
            }
            a.push(b)
            this.setState({
                text:'',
                item:a,
                dem:this.state.dem+1
            })
            console.log(a)

      }
      deleteOne(){
            

      }

  


      DeleteText(){
          this.setState({
              item:[]
          })
      }

    render(){

/*
            if(this.state.onLoading===true)
            {           
                return(
                    <div>
                        <div>
                        <Router><h1>Welcome {this.state.Userid}</h1>
                        <button onClick={this.logout}><Link to="/">Return</Link></button>
                        </Router>
                        </div>
                        <br/>
                        <div>
                        <input value={this.state.text}  onChange={this.handleChange} name="text"></input>
                        <button onClick={this.SetText}>Add</button>
                        <button onClick={this.DeleteText}>Delete All</button>


                        </div>
                        <div>
                            {this.state.item.map(value =>{
                                return(
                                    <div>
                                    <h1>{value.text}</h1>
                                    <button onClick={()=>{
                                        var a =this.state.item
                                        let b=a.indexOf(value)
                                        console.log(b)
                                        a.splice(b,1)
                                        this.setState ({
                                            item:a
                                        })
                                    }} >Delete</button>
                                    </div>
                                   
                                )
                            })}
                        </div>
                                               

                    </div>
                )
            } else if(this.state.onLoading===false){
                console.log(this.state.onLoading)
                return(
                    <div>
                        <Router>
                        <h1>Wrong Id or password</h1>
                        <button onClick={this.logout}><Link to="/">Return</Link></button>
                        </Router>
                                   
                    </div>
                )
            } else {
                return(
                    <div></div>
                )
            }
*/

       
            if(this.state.check==='true' && this.state.Userid !==""){
                console.log(this.state.check)
                return(
                    <div>
                        {this.Loading(this.Onfinish)}
                        <br/>
                        <div >
                        <input value={this.state.text}  onChange={this.handleChange} name="text"></input>
                        <button onClick={this.SetText}>Add</button>
                        <button onClick={this.DeleteText}>Delete All</button>


                        </div>
                        <div>
                            {this.state.item.map(value =>{
                                return(
                                    <div>
                                    <h1  style={{display:'inline', paddingRight:'10px'}}>{value.text}</h1>
                                    <button onClick={()=>{
                                        var a =this.state.item
                                        let b=a.indexOf(value)
                                        console.log(b)
                                        a.splice(b,1)
                                        this.setState ({
                                            item:a
                                        })
                                    }} >Delete</button>
                                    </div>
                                   
                                )
                            })}
                        </div>
                    </div>
                    

                ) /*
                return (
                    <div>
                        <Router><h1>Welcome {this.state.Userid}</h1>
                        <button onClick={this.logout}><Link to="/">Return</Link></button>
                        </Router>
                        
                    </div>
                )   */
            }
            else {
                console.log(this.state.check)
                    return(
                    <div>
                        <Router>
                        <h1>Wrong Id or password</h1>
                        <button onClick={this.logout}><Link to="/">Return</Link></button>
                        </Router>
                                   
                    </div>)
        
                
            
        }
        

    }
}
    
          
    



export default MyInfo
