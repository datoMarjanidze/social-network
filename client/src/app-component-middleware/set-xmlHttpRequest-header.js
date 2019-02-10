/*
* Set jwToken in every XMLHttpRequest header for server, to authorise every request on private content
*/
export const setJWTokenInHeaders = () => {
    ((open) => {
        XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
            open.call(this, ...arguments)
            this.setRequestHeader('jwtoken', window.localStorage.getItem('jwToken'))
        }
    })(XMLHttpRequest.prototype.open)
}