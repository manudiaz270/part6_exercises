import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { changeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.create(content)
        dispatch(addAnecdote(newAnecdote))

        dispatch(changeNotification(`you created the anecdote ${content}`))
        setTimeout(() => {
            dispatch(changeNotification(null))
        }, 5000)
    }
    return(
        <>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
        </>
    )

}
export default AnecdoteForm