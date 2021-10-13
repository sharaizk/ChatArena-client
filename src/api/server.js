import axios from 'axios'

export default axios.create({
    baseURL: 'https://chatarena-server.herokuapp.com'
})