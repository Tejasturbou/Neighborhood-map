import React, { Component } from 'react';
import './App.css';

class Search extends Component {
	render() {
		return(
			<div id="filter">
	          <h3>Search for a Venue in Mumbai</h3>
	          <input type='text' name='search' value={this.props.query}
	          onChange={event => this.props.search(event.target.value)}/>
	          <div>
	            <ul>
	              {this.props.venues.map(elem => (
	                <li key={elem.venue.name} onClick={ (evt) => {this.props.selection(elem)}}>{elem.venue.name}</li>
	              ))}
	            </ul>
	          </div>
	          <div id='source'>
	            Source: <a href='https://developer.foursquare.com' target='_blank' rel="noopener noreferrer">FourSquare API</a>
	          </div>
        	</div>
		)
	}
}

export default Search;