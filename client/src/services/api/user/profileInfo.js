import axios from 'axios'

const profileInfo = {
    changeProfileImage: (userID, image, callback) => {
        const url = '/api/users/profile/images/profile'
        const formData = new FormData()
        formData.append('userID', userID)
        formData.append('image', image)

        axios.post(url, formData)
            .then(res => callback(null, res.data.uploaded))
            .catch(err => callback(err, null))
    },
    getProfileImages: (userID, size, page, itemsPerPage, callback) => {
        const url = `/api/users/${userID}/profile/images/profile/${size}/${page}/${itemsPerPage}`
        const data = {
            userID
        }

        axios.get(url, data)
            .then(res => callback(null, res.data.images))
            .catch(err => callback(err, null))
    }
}

export default profileInfo