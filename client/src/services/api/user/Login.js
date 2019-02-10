import axios from 'axios'

const login = {
    url: '/api/users/login',
    tokenHasBeenSet: false,
    validateAllInputs: function(email, password, callback){
        const data = {
            email: email,
            password: password
        }
        const emailStatus = this.validateEmail(email)
        const passwordStatus = this.validatePassword(password)
        
        if(!emailStatus && !passwordStatus){
            axios.post(this.url, data)
                .then(response => {
                    let { token } = response.data, status

                    if(token){
                        status = ''
                        window.localStorage.setItem('jwToken', token)
                    }
                    else
                        status = 'Credentials are not valid'
                    callback(null, status)
                })
                .catch(err => callback(err, null))
        }
        else
            return 'Credentials not valid'
    },
    validateEmail: email => {
        let status = ''
        let emailRegex = /^((\.?[a-zA-Z0-9]+\.?)*)@([a-zA-Z0-9]+)(\.)([a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/

        if(!emailRegex.exec(email))
            status = 'Credentials are not valid'
        return status
    },
    validatePassword: password => {
        let status = ''
        if(!password)
            status = 'Credentials are not valid'
        else if(password.length > 40)
            status = 'Credentials are not valid'
        return status
    },
    jwTokenExistsNIsValid: function(){
        return new Promise((resolve, reject) => {
            const jwToken = window.localStorage.getItem('jwToken')

            if(jwToken !== null){
                const data = { jwToken }
                axios.post(this.url, data)
                    .then(response => resolve(response.data))
                    .catch(err => reject(err))
            }
            else
                resolve(false)
        })
    }
}

export default login