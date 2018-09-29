import React, { Component } from 'react';
import './App.css';

class Locations extends Component {
	render() {
		return(
			<div>
	          <h3>Search for a Venue in Mumbai</h3>
	          <input type='text' name='search' value={this.props.query}
	          onChange={event => this.props.search(event.target.value)}/>
	        </div>
		)
	}
}

export default Locations;