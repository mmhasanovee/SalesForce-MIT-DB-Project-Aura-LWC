global class WebServiceLWC {
 
    @AuraEnabled (cacheable=true)
    global static WeatherData performCallout(String location) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:WeatherApi?city=' + location + '&key=5fe65d43bdbe40fa8931edcdbfd60b9f'); //https://api.weatherbit.io/v2.0/current/callout:WeatherApi?city=dhaka/&key=5fe65d43bdbe40fa8931edcdbfd60b9f

        //using the Weather (located inNamed Credentials). 
        //api key is obtained from www.weatherbit.io
        //A named credential specifies a callout endpoint and its required authentication parameters. When setting up callouts, avoid setting authentication parameters for each callout by referencing named credentials. {https://api.weatherbit.io/v2.0/current/}


        req.setMethod('GET'); //setting the request method to get
        Http http = new Http();
        HTTPResponse res = http.send(req);
        JSONParser parser = JSON.createParser(res.getBody()); //getting json formatted data

        //-----Data fetched as below-----


        // {
        //     "data":[
        //        {
        //           "rh":24,
        //           "pod":"d",
        //           "lon":85.16698,
        //           "pres":998.629,
        //           "timezone":"Asia\/Kolkata",
        //           "ob_time":"2020-03-03 08:27",
        //           "country_code":"IN",
        //           "clouds":0,
        //           "ts":1583224064,
        //           "solar_rad":676.01,
        //           "state_code":"34",
        //           "city_name":"Dhāka",
        //           "wind_spd":4.68906,
        //           "last_ob_time":"2020-03-03T08:00:00",
        //           "wind_cdir_full":"west",
        //           "wind_cdir":"W",
        //           "slp":1007.91,
        //           "vis":24.1352,
        //           "h_angle":30,
        //           "sunset":"12:22",
        //           "dni":872.16,
        //           "dewpt":8,
        //           "snow":0,
        //           "uv":5.22943,
        //           "precip":0,
        //           "wind_dir":266,
        //           "sunrise":"00:39",
        //           "ghi":676.01,
        //           "dhi":109.19,
        //           "aqi":202,
        //           "lat":26.67479,
        //           "weather":{
        //              "icon":"c01d",
        //              "code":"800",
        //              "description":"Clear sky"
        //           },
        //           "datetime":"2020-03-03:08",
        //           "temp":30.3,
        //           "station":"VEPT",
        //           "elev_angle":50.5,
        //           "app_temp":28.7
        //        }
        //     ],
        //     "count":1
        //  }
 
        WeatherData weather = new WeatherData(); //creating new instance of weatherdata to set the fetched json value to the WeatherData's variables.
 
        while (parser.nextToken() != null) {
            if(parser.getCurrentToken() == JSONToken.FIELD_NAME) {
                parser.nextValue();
                if (parser.getCurrentName() == 'temp') {
                    weather.cityTemp = Decimal.valueOf(parser.getText());
                } else if (parser.getCurrentName() == 'city_name') {
                    weather.cityName = parser.getText();
                } else if (parser.getCurrentName() == 'state_code') {
                    weather.state = parser.getText();
                } else if (parser.getCurrentName() == 'timezone') {
                    weather.cityTimeZone = parser.getText();
                } else if (parser.getCurrentName() == 'wind_spd') {
                    weather.cityWindSpeed = Decimal.valueOf(parser.getText());
                } else if (parser.getCurrentName() == 'lat') {
                    weather.cityLat = parser.getText();
                } else if (parser.getCurrentName() == 'lon') {
                    weather.cityLong = parser.getText();
                } else if (parser.getCurrentName() == 'precip') {
                    weather.cityPrecip = Decimal.valueOf(parser.getText());
                }
            }
        }
        return weather;
    }
     
 
    global class WeatherData {
        @AuraEnabled public String cityName;
        @AuraEnabled public String cityTimeZone;
        @AuraEnabled public Decimal cityTemp;
        @AuraEnabled public String state;
        @AuraEnabled public Decimal cityWindSpeed;
        @AuraEnabled public String cityLat;
        @AuraEnabled public String cityLong;
        @AuraEnabled public Decimal cityPrecip;
    }
}