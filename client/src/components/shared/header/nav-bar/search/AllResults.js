import React, { Component } from 'react'
import history from '../../../../history'

export default class AllResults extends Component{
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        if(window.location.href !== this.props.inputValue)
            history().push(`/search?inputValue=${this.props.inputValue}`)
    }
    render(){
        const { hidden, inputValue } = this.props

        return(
            (
                hidden ?
                    null
                    :
                    <p onClick={this.handleClick}>
                        See all results for {inputValue}
                    </p>
            )
        )
    }
}