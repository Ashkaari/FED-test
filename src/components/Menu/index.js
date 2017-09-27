import React, { Component } from 'react';
import menuItems from '../../data.json';
import { MenuItem } from './MenuItem';

export default class Menu extends Component {
    createMenuItem(item) {
        return <MenuItem key={item.id} source={item}/>
    }
    createMenu(items) {
        return items.map(this.createMenuItem);
    }

    render() {
        return(
            <div className="menu">
                {this.createMenu(menuItems.items)}
            </div>
        )
    }
}

