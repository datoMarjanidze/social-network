import axios from 'axios'

const registration = {
    url: '/api/users',
    validateSingleInput: function(inputName, inputValue, callback){
        if(inputName === 'email')
            this.validateEmail(inputValue, callback)
        else if(inputName === 'firstName' || inputName === 'lastName')
            callback(null, this.validateFirstOrLastName(inputValue))
        else if(inputName === 'password')
            callback(null, this.validatePassword(inputValue))
        else if(inputName === 'confirmPassword')
            callback(null, this.validatePasswordConf(inputValue))
    },
    validateAllInputs: function(inputs, statuses, callback){
        const inputKeys = Object.keys(inputs)
        let inputLength = 0, key
        for(key in inputs)
            if(inputs.hasOwnProperty(key)) inputLength++
        var errors = []
        for(let i = 0; i < inputLength; i++){
            this.validateSingleInput(inputKeys[i], inputs[inputKeys[i]], (err, status) => {
                errors[i] = err
                statuses[inputKeys[i]] = status
            })
        }

        callback(errors, statuses)
    },
    createNewUser: function(inputs, callback){
        let data = inputs
        axios.post(this.url, data)
            .then(response => callback(null, response.data.created, response.data.userID))
            .catch(err => callback(err, null))
    },
    validateFirstOrLastName: name => {
        let status = ''
        if(!name)
            status = 'This field can not be empty'
        else if(name.length > 15)
            status = 'This field can not contain more then 15 characters'
        else if(! /^[a-zA-Z]+$/.exec(name))
            status = 'This field can only contain a-z characters'
        return status
    },
    validateEmail: function(email, callback){
        let data = {
            email: email,
        }
        let emailRegex = /^((\.?[a-zA-Z0-9]+\.?)*)@([a-zA-Z0-9]+)(\.)([a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/
        if(emailRegex.exec(email))
            axios.post(this.url, data)
                .then(response => callback(null, response.data.status))
                .catch(err => callback(err, null))
        else
            callback(null, 'Email is incorrect')
    },
    validatePassword: function(password){
        let status = ''
        this.store.password = password
        if(!password)
            status = 'Enter the password'
        else if(password.length > 40)
            status = 'Password can not contain more then 40 characters'
        return status
    },
    store: class {
        static set password(password){
           this._password = password
        }
        static get password(){
            return this._password
        }
    },
    validatePasswordConf: function(confirmPassword){
        let status = ''
        if(!confirmPassword)
            status = 'Enter the password'
        else if(confirmPassword !== this.store.password && typeof this.store.password !== 'undefined')
            status = 'Passwords do not match'
        return status
    }
}

export default registration