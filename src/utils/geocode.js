const request = require('postman-request')


const geocode = (location,callback) =>{
    geo_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+decodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiY2xhcmVtb250cGhhcm1hY3kiLCJhIjoiY2tuZGtqMHR2MWNlMTJwazhmbWo5MzhidiJ9.sqm_Q-dTMIg70Ga6ex3HtQ&limit=1' 
  request(geo_url,{json: true},(error, {body}) => {
  if (error){
      callback('can not connect to application', undefined);
  }else if(body.features.length===0){
      callback('wrong entry');
  }else{
      callback(undefined,{
          latitude:   body.features[0].center[0], 
          longitude:  body.features[0].center[1],
          location:   body.features[0].place_name
  })
  }
  })
  }


  module.exports = geocode