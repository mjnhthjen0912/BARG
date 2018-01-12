var express = require('express');

var firebase = require('../configs/FirebaseConfig');
var DriectionAPI = require('../configs/GoogleMap');
var util = require('util');

var router = express.Router();

// api dành cho driver
router.post('/finddrivernearest', function (req, res) {
    var phone = req.body.phone;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var driverDatas = [];
    var N = null;
    var distance;
    var listDriver = [];
    var lenDriver = 0;

    var numberNRef = firebase.database().ref('configs/constants/n');
    numberNRef.once('value', function(n){
        //console.log("DEBUG " + "number N " + n.val());
        N = n.val();
    });

    var driverRef = firebase.database().ref('drivers');
    driverRef.once('value', function(drivers){
        //res.json(drivers);
        driverDatas = drivers;

        lenDriver = drivers.numChildren();

        var origin = {
            lat: lat,
            lng: lng
        }

        drivers.forEach(function(driver){
            // check trang thai cho driver
            DriectionAPI.GetDirection(origin, driver.val().locations)
            .then(function(response){
                var status = util.inspect(JSON.stringify(response.data.status));
                console.log(status);

                if(status != 'status'){
                    distance = util.inspect(JSON.stringify(response.data.routes[0].legs[0].distance.value));
                
                    var item = {
                        key: driver.key,
                        distance: distance
                    }

                    listDriver.push(item);

                    console.log(driver.key + ' ' + distance);
                    console.log(listDriver.length + ' ' + lenDriver);

                    if(listDriver.length == lenDriver){
                        listDriver.sort(function(a, b){
                            return parseFloat(a.distance) - parseFloat(b.distance);
                        })
                        console.log("sort");

                        var driversRef = firebase.database().ref('customers/'  + phone + '/request/drivers');
                        var i = 0;
                        var Solan = listDriver.length > N ? N:listDriver.length;
                        var postData = {
                            statusfordriver: 1
                        };

                        var updates = {};

                        for(i = 0; i < Solan; i++){
                            updates['/'+listDriver[i].key] = postData;
                        }
                        driversRef.update(updates);

                        // listDriver.forEach(function(item){
                        //     console.log('sort item ' + item.distance);
                        // });
                    }
                }

            })
            .catch(function(error){
                console.log("LOI LAY DISTANCE TREN GOOGLE " + error);
            });
        });

        
    });

    res.json('success');
});

router.get('/', function(req, res){
    res.json("test api driver");
});

module.exports = router;