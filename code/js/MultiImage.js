import React, { Component, PropTypes } from 'react';

class MultiImage extends Component {
    constructor (props) {
        super(props);
        this.state ={
            height: 0,
            contWidth:'100%'
        };
    }

    componentDidMount () {
        const { data:{card_data_list = {}}, hwRatio} = this.props;
        const width = this.img.offsetWidth;
        this.setState({
            height: width * this.props.hwRatio,
            contWidth: width * Object.keys(card_data_list).length
        });
    }

    render() {
        const { data:{card_data_list = {}}, hwRatio} = this.props;
        return (
            <div className="multiContainer">
                {
                    Object.keys(card_data_list).map((card, i) => {
                        return (<span className="multiImage" key={i} ref={(img) => { this.img = img; }} style={{height: this.state.height}}>
                            <img src={card_data_list[card].image_url} alt=""/>
                        </span>)
                    })
                }
            </div>
        );
    }

}

export default MultiImage;
