import actionTpyes from './actionTpyes'

export  const markNotificationHasReadedById = (id) => {

    return dispatch =>{

        return dispatch({

            type:actionTpyes.MARK_NOTIFICATION_HAS_READED_BY_ID,
            payload:{
                id
            }

        })

    }

}

export const markAllNotificationHasReaded = ()=>{
    return dispatch =>{
        return dispatch({
            type:actionTpyes.MARK_ALL_NOTIFICATION_HAS_READED
        })
    }
}