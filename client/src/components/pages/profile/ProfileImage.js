import React, { Component } from 'react'
import ProfileInfoSrv from '../../../services/api/user/profileInfo'

export default class ProfileImage extends Component{
    constructor(){
        super()
        this.state = {
            imageUrl: null,
            image: null
        }
        this.changeProfileImage = this.changeProfileImage.bind(this)
    }
    componentWillMount(){
        this.getProfileImages()
    }
    getProfileImages(){
        ProfileInfoSrv.getProfileImages(this.props.thisProfileID, 'small',0, 1, (err, images) => {
            if(!err){
                if(images[0] !== undefined)
                    this.setState({ imageUrl: `data:image/jpeg;base64,${images[0]}`})
                else
                    this.setState({ imageUrl: '/assets/images/placeholders/profile-image.jpeg'})
            }
            else
                console.error(`Profile Image: ${err}`)
        })
    }
    changeProfileImage(event){
        this.setState({
            imageUrl: URL.createObjectURL(event.target.files[0]),
            image: event.target.files[0]
        },
        ()=>{
            ProfileInfoSrv.changeProfileImage(this.props.thisProfileID, this.state.image, (err, uploaded) => {
                if(!err)
                    console.log()
                else
                    console.error(`Change Profile Image: ${err}`)   
            })
        })
    }
    render(){
        const { imageUrl } = this.state
        const { thisProfileID, userID } = this.props

        return(
            <div className="profile-image">
                Profile Image
                {thisProfileID === userID ? 
                    <input type="file" onChange={this.changeProfileImage} /> 
                    :
                    null}
                <img src={imageUrl} style={{width: '150px'}}alt="Profile"/>
            </div>
        )
    }
}