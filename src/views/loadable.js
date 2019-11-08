import React, { Component } from 'react'


const Loadable = ({
    loader,
    loading:Loading
}) => {

    return  class ComponentLoadble extends Component {

        state = {
                
            ComponentedLoadble:null
        }

        componentDidMount(){

            loader()
              .then(resp=>{
                  this.setState({
                    ComponentedLoadble:resp.default
                  })
              })
        }
    
        render() {
           const {
                ComponentedLoadble
            }=this.state
            return (
                
                    ComponentedLoadble
                    ?
                    <ComponentedLoadble />
                    :
                    <Loading/>
                
            )
        }
    }
}

export default Loadable


