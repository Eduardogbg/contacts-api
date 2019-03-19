import React, { Component } from 'react';

class Loading extends Component {

    render() {
        return (
            <div className={this.props.loading ? 'loading show' : 'loading'}>
                <div className="loading-gif"></div>&nbsp;loading...
            </div>
        );
    }
}

export default Loading;