import React, { Component } from 'react'
import { findPerson } from '../../../../../services/api/search'
import history from '../../../../history'
import { Search, Grid } from 'semantic-ui-react'

export default class SearchComp extends Component{
    constructor(){
        super()
        this.state = {
            isLoading: false,
            results: [],
            value: '',
            showNoResults: false
        }
        this.resetComponent = this.resetComponent.bind(this)
        this.handleResultSelect = this.handleResultSelect.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }
    componentWillMount(){
        this.resetComponent()
    }
    resetComponent(){
        this.setState({ isLoading: false, results: [], value: '' })
    }
    handleResultSelect(e, { result }){
        if(result._id === 'see-all-results')
            history().push(`/search?inputValue=${this.state.value}`)
        else
            history().push(`/profile/${result._id}`) 
    }
    handleSearchChange(e, { value }){
        if(value === ''){
            this.setState({ value })
            return
        }

        this.setState({
            isLoading: true,
            value
        }, 
        () => {
            findPerson(value, 0, 7, (err, users) => {
                if(!err){
                    if(users.length !== 0){
                        users.forEach(user => {
                            user.title = 
                                `${(user.firstName).charAt(0).toUpperCase() + (user.firstName).slice(1)} ${(user.lastName).charAt(0).toUpperCase() + (user.lastName).slice(1)}`
                            user.key = user._id
                        })
                        users.push({_id: 'see-all-results',title: `See all results for ${value}`})
                        this.setState({ results: users }) // @TODO React throws error: React does not recognize the `firstName` prop on a DOM element...
                    }
                    else
                        this.setState({ 
                            results: [],
                            showNoResults: true 
                        })
                }
                else
                    console.error(`findPerson: ${err}`)

                this.setState({ isLoading: false })
            })
        })
    }

    handleKeyPress(event){
        event.persist()
        setTimeout(() => { // <== On event.target.value modified value can't be assigned in time
            if((event.key !== 'Enter' && event.target.value !== '') || (event.keyCode === 8 && event.target.value !== '')){
                this.setState({ 
                    inputValue: event.target.value
                },
                () => {
                    findPerson(this.state.inputValue, 0, 7, (err, users) => {
                        if(!err){
                            this.setState({
                                allResultsLinkHidden: false,
                            })
                            if(users.length !== 0)
                                this.setState({
                                    users
                                })
                            else
                                this.setState({
                                    users: []
                                })
                        }
                        else
                            console.error(`findPerson: ${err}`)
                    })
                })
            }
            else if(event.key === 'Enter')
                if(window.location.href !== this.state.inputValue)
                    history().push(`/search?inputValue=${this.state.inputValue}`)
        }, 0)
    }
    render(){
        const { isLoading, results, value, showNoResults } = this.state

        return(
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        showNoResults={showNoResults}
                        noResultsMessage={'No results found'}
                        placeholder="Search here"
                        {...this.props} />
                </Grid.Column>
            </Grid>
        )
    }
}