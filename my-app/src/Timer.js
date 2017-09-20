/**
 * Created by sailing on 2017/9/6.
 */
import React, { Component } from 'react';
 class Timer extends React.Component {
    /*构造器*/
    constructor(props) {
        super(props);
        this.state = {secondsElapsed: 0};
    }
    /*时间触发器*/
    tick() {
        this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1
        }));
    }
    /*中间间隔时间*/
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
/*返回页面的结果*/
    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}
export default Timer;
