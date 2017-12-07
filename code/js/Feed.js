import React, { Component, PropTypes } from 'react';
import Service from './services';
import { Router, browserHistory, Route, Link } from 'react-router';
import Image from './Image';
import MultiImage from './MultiImage';

class Feed extends Component {

    constructor (props) {
        super(props);
        this.state = {
            cardList: []
        }
        ;
    }

    componentWillMount () {
       Service.fetchFeed().then( (resp) => {
          this.setState({
              cardList: resp.card_list
          });
       });
    }

    componentDidMount () {

    }

    render() {
        const { cardList } = this.state;
        return (
            <div className="App">
                <div className="header">
                    <div className="appTitle">Inpix</div>
                    <h2>Feed</h2>
                </div>
                <div className="content">
                    {
                        cardList.map( (card) => {
                            const {card_obj:{data={}, hw_ratio = 1}} = card;
                            if(card.card_obj.type === 'IMAGE') {
                                return <Image key={card.id} data={data} hwRatio={hw_ratio}/>
                            } else if (card.card_obj.type === 'MULTI_IMAGE_CARD') {
                                return <MultiImage key={card.id} data={data} hwRatio={hw_ratio}/>
                            } else {
                                return null;
                            }
                        })
                    }
                </div>
                <div className='footer'>
                    <div className="fl">
                        <Link to="/settings">Settings</Link>
                    </div>
                    <div className="fl">
                        <Link to="/">Feed</Link>
                    </div>
                    <div className="fl">
                        <Link to="/profile">Profile</Link>
                    </div>
                </div>

            </div>

        );
    }

}

export default Feed;
