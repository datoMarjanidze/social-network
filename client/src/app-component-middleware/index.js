import { setJWTokenInHeaders } from './set-xmlHttpRequest-header'

export const PrimaryMiddleware = () => {
    setJWTokenInHeaders()
}