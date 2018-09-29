import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './App.css';
import Search from './Search'

class Locations extends Component {
	render() {
		return(
			<Menu width={ '24%' } isClose noOverlay className={ "my-menu" } tabIndex="1">
				<div id="filter" role="search" tabIndex='-1'>
		          <Search query={this.props.query} search={this.props.search}/>
		          <div>
		            <ul>
		              {this.props.venues.map(elem => (
		                <li key={elem.venue.name} onClick={(evt) => {this.props.selection(elem)}} tabIndex="-1">{elem.venue.name}</li>
		              ))}
		            </ul>
		          </div>
		          <div id='source' role="link">
		            Source: <a href='https://developer.foursquare.com' target='_blank' rel="noopener noreferrer" tabIndex="-1">FourSquare API</a>
		          </div>
	        	</div>
        	</Menu>
		)
	}
}

export default Locations;