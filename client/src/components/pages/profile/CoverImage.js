import React, { Component } from 'react'

export default class CoverImage extends Component{
    constructor(){
        super()
        this.state = {
            imageUrl: null,
            image: null
        }
        this.getCoverImages = this.getCoverImages.bind(this)
        this.changeCoverImage = this.changeCoverImage.bind(this)
    }
    componentWillMount(){
        // this.getCoverImages()
    }
    getCoverImages(){
        // ProfileInfoSrv.getProfileImages(this.props.thisProfileID, 'small',0, 1, (err, images) => {
        //     if(!err){
        //         if(images[0] !== undefined)
        //             this.setState({ imageUrl: `data:image/jpeg;base64,${images[0]}`})
        //         else
        //             this.setState({ imageUrl: '/assets/images/placeholders/profile-image.jpeg'})
        //     }
        //     else
        //         console.error(`Profile Image: ${err}`)
        // })
    }
    changeCoverImage(event){
        // this.setState({
        //     imageUrl: URL.createObjectURL(event.target.files[0]),
        //     image: event.target.files[0]
        // },
        // ()=>{
        //     ProfileInfoSrv.changeProfileImage(this.props.thisProfileID, this.state.image, (err, uploaded) => {
        //         if(!err)
        //             console.log()
        //         else
        //             console.error(`Change Profile Image: ${err}`)   
        //     })
        // })
    }
    render(){
        const { imageUrl } = this.state
        const { thisProfileID, userID } = this.props

        return(
            <div className="cover-image">
                Cover Image
                {thisProfileID === userID ? 
                    <input type="file" onChange={this.getCoverImages} /> 
                    :
                    null}
                <img src={imageUrl} style={{width: '150px'}} alt="Cover"/>
            </div>
        )
    }
}