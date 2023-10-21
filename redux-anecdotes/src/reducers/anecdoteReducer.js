import { createSlice } from "@reduxjs/toolkit"


const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        castVote(state, action) {
            state = state.map((anecdote) => {
                if(anecdote.id === action.payload){
                    return {
                        ...anecdote,
                        votes: anecdote.votes + 1
                    }
                }         
                return anecdote        
            })
            state.sort((a, b) => b.votes - a.votes)
            return state
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addAnecdote, castVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer


















// export const castVote = (id) => {
//     return {
//         type: 'VOTE',
//         payload: { id }
//     }
// }

// export const addAnecdote = (content) => {
//     return {
//         type: 'NEW_ANECDOTE',
//         payload: {
//             content
//         }
//     }
// }



// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'VOTE':
//             state = state.map((anecdote) => {
//                 if(anecdote.id === action.payload.id){
//                     return {
//                         ...anecdote,
//                         votes: anecdote.votes + 1
//                     }
//                 }
//                 return anecdote
//             })
//             state.sort((a, b) => b.votes - a.votes)
//             return state
//         case 'NEW_ANECDOTE':
//             console.log(action.payload);
//             return state.concat(asObject(action.payload.content))
//         default:
//             return state
//     }
// }

// export default reducer