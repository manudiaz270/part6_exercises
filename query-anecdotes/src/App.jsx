import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, updateAnecdote } from './services/anecdotes'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'


const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()  
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: 'SET_NOTIFICATION', payload: `The anecdote ${anecdote.content} has been voted for`})
    setTimeout(() => {
        notificationDispatch({type: 'CLEAR_NOTIFICATION'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }
  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
