import { useDispatch, useSelector } from "react-redux"
import { castVote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    })
    const vote = (id) => {
        dispatch(castVote(id))
        dispatch(changeNotification(`you voted ${anecdotes.find(anecdote => anecdote.id === id).content}`))
        setTimeout(() => {
            dispatch(changeNotification(null))
        }, 5000)
    }
    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                 </div>
            )}
        </div>
      
    )
}
export default AnecdoteList