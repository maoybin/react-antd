import actionTypes from '../actions/actionTpyes'

const isLogin  = Boolean(window.localStorage.getItem('authToken'))|| Boolean(window.sessionStorage.getItem('authToken'))

const userInfo = JSON.parse(window.localStorage.getItem('userInfo'))||JSON.parse(window.sessionStorage.getItem('userInfo'))

const initState = {
    ...userInfo,
    isLogin,
    isLoading:false
}

export const user = (state = initState,action) =>{

    switch(action.type){

        case actionTypes.START_LOGIN:

            return {
                ...state,
                isLoading:true
            }

        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                ...action.payLoad.userInfo,
                isLoading:false,
                isLogin:true,
            } 
        case actionTypes.LOGIN_FAILD:
            return {
                id:'',
                displayname:'',
                avatar:'',
                role:'',
                isLogin:false,
                isLoading:false
            }       


        default:
            return state
    }
}