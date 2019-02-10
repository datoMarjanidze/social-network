const logout = {
    logout: () => {
        window.localStorage.removeItem('jwToken')
        window.location.reload()
    }
}

export default logout