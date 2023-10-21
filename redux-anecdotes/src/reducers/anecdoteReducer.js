import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.create(content)
        dispatch(addAnecdote(anecdote))
    }
}

export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.addVote(anecdote)
        dispatch(castVote(newAnecdote.id))
    }
}

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