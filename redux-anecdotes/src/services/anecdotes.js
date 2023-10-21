import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const object = { content, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const addVote = async (content) => {
    const newAnecdote = {...content, votes: content.votes + 1}
    await axios.put(`${baseUrl}/${content.id}`, newAnecdote)
    return newAnecdote
}

export default { getAll, create, addVote }