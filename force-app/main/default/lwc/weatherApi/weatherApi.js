import { LightningElement, track, wire } from 'lwc';
// import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import performCallout from '@salesforce/apex/WebServiceLWC.performCallout';
// import weatherCSS from '@salesforce/resourceUrl/weatherCSS';

export default class WeatherDataLWC extends LightningElement {

    // @track lat;
    // @track long;

    // @track mapMarkers = [];
    // zoomLevel = 10;
    @track result;
    @track value;

    connectedCallback() {
        performCallout({ location: 'Tokyo,Japan' }).then(data => { //setting up the values after getting result on the map.
            // this.mapMarkers = [{
            //     location: {
            //         Latitude: data['cityLat'],
            //         Longitude: data['cityLong']
            //     },
            //     title: data['cityName'] + ', ' + data['state'],
            // }]; 

            //removed the map marker
            this.result = data;
        }).catch(err => console.log(err));
        // loadStyle(this, weatherCSS).then(result => { //weatherCSS is a static resource of css file
        //     console.log('result:', result);
        // });
    }

    get getCityName() {
        if (this.result) {
            return 'Current Location: ' + this.result.cityName;
        } else {
            return '---'
        }
    }

    get getConvertedTemp() {
        if (this.result) {
            return Math.round((this.result.cityTemp) + 0) + '°C'; //removed C to F conversion  (9 / 5)) + 32
        } else {
            return '--'
        }
    }

    get getCurrentWindSpeed() {
        if (this.result) {
            return this.result.cityWindSpeed + ' mph';
        } else {
            return '--'
        }
    }

    get getCurrentPrecip() {
        if (this.result) {
            return this.result.cityPrecip + " inches"
        } else {
            return '--'
        }
    }

    get options() {
        return [
            { label: 'Massachusetts Institute of Technology', value: 'Raleigh,NC' },
            { label: 'BJIT Limited, Bangladesh', value: 'Dhaka,Bangladesh' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        performCallout({ location: this.value }).then(data => {
            // this.mapMarkers = [{
            //     location: {
            //         Latitude: data['cityLat'],
            //         Longitude: data['cityLong']
            //     },
            //     title: data['cityName'] + ', ' + data['state'],
            // }];
            //removed map marker
            this.result = data;
        }).catch(err => console.log(err));
    }
}