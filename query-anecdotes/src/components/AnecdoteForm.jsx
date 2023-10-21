import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../services/anecdotes"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
    if(content.length > 4){
        notificationDispatch({type: 'SET_NOTIFICATION', payload: `The anecdote ${content} has been created`})
        setTimeout(() => {
            notificationDispatch({type: 'CLEAR_NOTIFICATION'})
        }, 5000)
    }
    else{
        notificationDispatch({type: 'SET_NOTIFICATION', payload: `too short anecdote, must have length 5 or more`})
        setTimeout(() => {
            notificationDispatch({type: 'CLEAR_NOTIFICATION'})
        }, 5000)
    }
    }
  
    

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
