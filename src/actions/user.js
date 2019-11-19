import actionTpyes from './actionTpyes'

import {loginRequest} from '../components/requests'

const startLogin = ()=>{
    return{
        type:actionTpyes.START_LOGIN
    }
}


const loginSuccess = (userInfo) => {
    return{
        type:actionTpyes.LOGIN_SUCCESS,
        payLoad:{
            userInfo
        }
    }
}


const loginFaild = () => {

    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('authToken')
    window.sessionStorage.removeItem('userInfo')

    return{
        type:actionTpyes.LOGIN_FAILD,
    }
}


export const logout = ()=>{
    return dispatch =>{
        dispatch(loginFaild())
    }
}


export const login = (userInfo)=>{

    return dispatch => {
        
        dispatch(startLogin())

        loginRequest(userInfo)
           .then(resp=>{

              if(resp.data.code===200){

                if(userInfo.remember===true){
                    window.localStorage.setItem('authToken',resp.data.data.authToken)
                    window.localStorage.setItem('userInfo', JSON.stringify(resp.data.data))
                }else{
                    window.sessionStorage.setItem('authToken',resp.data.data.authToken)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(resp.data.data))
                }

                dispatch(loginSuccess(resp.data.data))
              }else{
                  dispatch(loginFaild())
              }

           })
    }

}

