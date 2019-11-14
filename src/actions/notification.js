import actionTpyes from './actionTpyes'

import {getNotifications} from '../components/requests'

const startMarkNotification = ()=>{
    return {
        type:actionTpyes.START_MARK_NOTIFICATION_HAS_READED
    }
}

const finishMarkNotification = ()=>{
    return {
        type:actionTpyes.FINISH_MARK_NOTIFICATION_HAS_READED
    }
}

export  const markNotificationHasReadedById = (id) => {

    return dispatch =>{

        dispatch(startMarkNotification())

        setTimeout(()=>{

            dispatch({
                type:actionTpyes.MARK_NOTIFICATION_HAS_READED_BY_ID,
                payload:{
                    id
                }
            })

        dispatch(finishMarkNotification())    

        },1000)
        // return 
    }

}

export const markAllNotificationHasReaded = ()=>{
    return dispatch =>{

        dispatch(startMarkNotification())

        setTimeout(()=>{

            dispatch({
                type:actionTpyes.MARK_ALL_NOTIFICATION_HAS_READED
            })

            dispatch(finishMarkNotification())   

        },2000)

    }
}


export const getNOtificationList = ()=>{
    return dispatch =>{

            getNotifications()
                .then(resp=>{

                    dispatch({
                        type:actionTpyes.RECIVED_NOTIFICATION,
                        payload:{
                            list:resp.list
                        }
                    })
                })
                

    }
}