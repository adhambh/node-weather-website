const request = require('postman-request');

// api.openweathermap.org/data/2.5/weather?lat=147.3294&lon=-42.8794&appid=653c5b3fc942e434c83c87dd452e02f7
 
// request(url,{json: true}, (error, response) => {
//     if (error) {
//         console.log(" cano't connect to weather application")
//     } else if(response.body.error) {
//         console.log('wong address')
//     }else{
//         const tem = Math.floor(response.body.main.temp)
// const feel = Math.floor(response.body.main.feels_like)
//     console.log(')
//     }

// });
const forecast = (lat, lon, callback) =>{
fore_url ="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=653c5b3fc942e434c83c87dd452e02f7"
request(fore_url, {json: true},(error,{body})=>{
if (error) {
    callback('can not connect to weather application', undefined);
} else if (body.error){
    callback('wrong entry', undefined)
}else{
    callback(undefined, body.name + ': temp is : ' +  Math.floor(body.main.temp) + ' and it feels like: ' + Math.floor(body.main.feels_like)
    )
}
})

}




module.exports=forecast;

