import axios from 'axios'

const interactWithOthers = {
    addFriend: (myID, personID, callback) => {
            if(typeof myID === 'string' && myID !== '' &&
               typeof personID === 'string' && personID !== ''){

                const url = '/api/users/friend'
                const data = {
                    myID,
                    personID
                }
                axios.post(url, data)
            }
    },
    getFriends: (callback) => {
        axios.get('/api/users/friends', null)
            .then(response => callback(response.data.friends))
            .catch(err => console.error(err))
    }
}

export default interactWithOthers