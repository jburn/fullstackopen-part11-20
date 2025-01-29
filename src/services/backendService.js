import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons/'

const getAll = () => {
    return axios.get(baseUrl)
}

const addNew = (newContact) => {
    return axios.post(baseUrl, newContact)
}

const updatePerson = (newInfo) => {
    return axios.put(`${baseUrl}/${newInfo.id}`, newInfo)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, addNew, deletePerson, updatePerson }