import actionTpyes from '../actions/actionTpyes'

const initState = {
    isLoading:false,
    list:[{
        id:1,
        title:'We supply a series of design principles11111',
        hasReaded:false,
        desc:'111111We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
       },
       {
        id:2,
        title:'We supply a series of design principles222222',
        hasReaded:false,
        desc:'222222We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
       }
    ]
}

export const notification = (state = initState,action) => {

    switch(action.type){

        case actionTpyes.MARK_NOTIFICATION_HAS_READED_BY_ID:
        
           const newList = state.list.map(item=>{
            if(item.id===action.payload.id){
                item.hasReaded = true
            }
            return item
           })
          
        return {
            ...state,
            list:newList
        };

        case actionTpyes.MARK_ALL_NOTIFICATION_HAS_READED:

           const allist = state.list.map(item=>{
           
            item.hasReaded = true
            
            return item
           })
          
        return {
            ...state,
            list:allist
        };

        case actionTpyes.START_MARK_NOTIFICATION_HAS_READED:

        return {
            ...state,
            isLoading:true
        }

        case actionTpyes.FINISH_MARK_NOTIFICATION_HAS_READED:

        return {
            ...state,
            isLoading:false
        }

        case actionTpyes.RECIVED_NOTIFICATION:
            return{
                list:action.payload.list,
                isLoading:false

            }

        default:
                return state;
    }
}