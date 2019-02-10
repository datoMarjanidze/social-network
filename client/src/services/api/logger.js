import axios from 'axios'

const Logger = () => {
    consoleErrorReporter()
}

const consoleErrorReporter = () => {
    window.onerror = (msg, url, lineNo, columnNo) => {
        axios.post('/api/logs/clientErrors', {
            msg,
            url: window.location.href,
            lineNo,
            columnNo
        })
    }
}

export default Logger