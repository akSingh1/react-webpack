import React, { Component, PropTypes } from 'react';

class Image extends Component {

    constructor (props) {
        super(props);
        this.state ={
            height: 0
        };
    }

    componentDidMount () {
        const width = this.img.offsetWidth;
        this.setState({
            height: width * this.props.hwRatio
        });
    }

    render() {
        const {hwRatio, data:{image_url}} = this.props;
        return (
           <div ref={(img) => { this.img = img; }} className="singleImage" style={{height: this.state.height}}>
               <img src={image_url} alt=""/>
           </div>
        );
    }

}

export default Image;
