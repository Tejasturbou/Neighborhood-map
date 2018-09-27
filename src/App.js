import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount () {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCKBVWToLUrOrkI9Edjm0Q1WZXESKWxNwA&v=3&callback=initMap";
    document.body.appendChild(script);
    window.initMap = this.initMap;
  }

  initMap = () => {
    // Constructor creates a new map - only center and zoom are required.
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 19.0760, lng: 72.8777},
      zoom: 13
    });

    let infowindow = new window.google.maps.InfoWindow();
    let bounds = new window.google.maps.LatLngBounds();

    const endpoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id:"XOJSJRWFSJUQMFQYYSRZ0RUSLODJDEDIXFLEWFRH2YBM5N5V",
      client_secret:"NE5T1NBQ4FCEAYLGV20AZCC3K3VGVPV2DMN25A3XPJGGETEQ",
      near: 'Mumbai',
      radius: '1500',
      limit: '25',
      v: '20180925'
    }

    axios.get(endpoint + new URLSearchParams(parameters)).then(list => {
      this.setState({venues: list.data.response.groups[0].items})

      this.state.venues.map(Venue => {
      var marker = new window.google.maps.Marker({
          position: {lat: Venue.venue.location.lat, lng: Venue.venue.location.lng},
          map: map,
          title: Venue.venue.name,
          animation: window.google.maps.Animation.DROP
      });

      bounds.extend(marker.position);

      marker.addListener('click', function() {
        if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<strong>' + Venue.venue.name + '</strong>' +
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
      console.log(list.data.response.groups[0].items[0].venue.name)
    }).catch(error => {
      console.log(error)
    })

}



  render() {
    return (
      <div id="map">

      </div>
    );
  }
}

export default App;
