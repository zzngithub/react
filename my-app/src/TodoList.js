/**
 * Created by sailing on 2017/9/6.
 */
import React, { Component } from 'react';
class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}+{item.id}</li>
                ))}
            </ul>
        );
    }
}
export  default TodoList;