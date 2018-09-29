import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import hamburger from './hamburger.svg';
import Search from './Search';

class App extends Component {

  state = {
    venues: [],
    allMarkers: [],
    mapp: '',
    query:'',
    showAllLocations: [],
    hideLocations: []
  }

  componentDidMount () {
    this.fetchLocations()
  }

  fetchLocations = () => {
    const endpoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id:"FLJMJAE0W3EFBZCNOJ43MOJDFN12K402ALCIK23EVTXL1DSM",
      client_secret:"MKANR4MHFLAV1A3JWOCTSB4CLXMKW1XBR3OOSSTTDB531RVK",
      near: 'Mumbai',
      radius: '1500',
      limit: '25',
      v: '20180925'
    }

    axios.get(endpoint + new URLSearchParams(parameters)).then(list => {
      this.setState({venues: list.data.response.groups[0].items,
      showAllLocations: list.data.response.groups[0].items}, this.renderMap())
        console.log(list.data.response.groups[0].items[0].venue.name)
      }).catch(error => {
        console.log(error)
        alert('Sorry! Foursquare API is not working properly')
      })
  }

  renderMap = () => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKBVWToLUrOrkI9Edjm0Q1WZXESKWxNwA&v=3&callback=initMap";
    document.body.appendChild(script);
    window.initMap = this.initMap;
  }

  initMap = () => {

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 19.0760, lng: 72.8777},
      zoom: 13
    });

    let infowindow = new window.google.maps.InfoWindow();
    let bounds = new window.google.maps.LatLngBounds();

    this.infowindow = infowindow
    this.state.venues.map(Venue => {
      var marker = new window.google.maps.Marker({
          position: {lat: Venue.venue.location.lat, lng: Venue.venue.location.lng},
          map: map,
          title: Venue.venue.name,
          animation: window.google.maps.Animation.DROP
      });

      this.state.allMarkers.push(marker)
      bounds.extend(marker.position);

      marker.addListener('click', function() {
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<strong><h3 style="margin: 3px 0 5px;">' + Venue.venue.name + '</h3></strong>' +
            '<div> Type: <strong>' + Venue.venue.categories[0].name + '</strong> </div>' +
            '<div> Address: ' + Venue.venue.location.address + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function(){
            infowindow.setMarker = null;
          });
        }
      });
      return 0
    })
      map.fitBounds(bounds);
      this.setState({
        mapp: map,
      })

  }

  search = (query) => {
    this.setState({ query })
    this.state.allMarkers.map(marker => marker.setVisible(true))

    if (query) {
      let showMarkers = this.state.showAllLocations.filter(myVenue => {
        return query.toLowerCase()===myVenue.venue.name.toLowerCase()
      })
      this.setState({ venues: showMarkers })

      let hideMarkers = this.state.allMarkers.filter(marker => {
        return showMarkers.every(myVenue => myVenue.venue.name !== marker.title)
      })
      hideMarkers.forEach(marker => {
        marker.setVisible(false)
      })
      this.setState({ hideLocations: hideMarkers })
    } else {
      this.setState({ venues: this.state.showAllLocations })
      this.state.allMarkers.forEach(marker => {
        marker.setVisible(true)
      })
    }
  }

  selection = (elem) => {
    this.state.allMarkers.map(marker => {
      if (elem.venue.name === marker.title) {
         window.google.maps.event.trigger(marker, "click");
         this.animateMarker(marker)
      }
      return 0
    })
    return 0
  }

  animateMarker = (marker) => {
     marker.setAnimation(window.google.maps.Animation.BOUNCE)
     setTimeout(() => {
      marker.setAnimation(null)
     }, 1700)
  }

  render() {
    return (
      <div id="container">
        <div id='hamburger'>
          <img src={hamburger} alt="hamburger icon"/>
        </div>
        <Search venues={this.state.venues} query={this.state.query} search={this.search} selection={this.selection}/>
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
