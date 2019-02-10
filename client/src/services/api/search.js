import axios from 'axios'

const url = '/api/search'

export const findPerson = (inputValue, page, itemsPerPage, callback) => {
    if(typeof inputValue === 'string' && inputValue !== ''){
        const data = {
            params:{
                inputValue,
                page,
                itemsPerPage
            }
        }
        
        axios.get(url, data)
            .then(response => {
                callback(null, response.data.users)
            })
            .catch(err => {
                callback(err, null)
            })
    }
}