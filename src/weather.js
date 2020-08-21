import { ajax } from 'rxjs/ajax';
import { fromEvent, BehaviorSubject, Subject, from, combineLatest } from "rxjs";
import { tap, debounceTime, switchMap, skipWhile, pluck, map } from "rxjs/operators";
import { add } from "./helpers";

const lastSearch = localStorage.getItem('lastSearch');
const firstTerm = lastSearch ? lastSearch : '';

// DOM elements
const searchBox = document.getElementById('search');
const resultBox = document.getElementById('results-container');
const spinner = document.getElementById('spinner');

// Event Handlers
const searchEvent = fromEvent(searchBox, 'keyup');
const resultsEvent = fromEvent(resultBox, 'click');

// Subjects: for multiple subscribers
const inputSub = new BehaviorSubject(firstTerm);
const placeSub = new Subject();
const weatherSub = new Subject();



inputSub.pipe(
    skipWhile(value => (!value || value.length < 3)),
    tap(_ => {
        spinner.className = 'spinner';
        resultBox.innerHTML = '';
    }),
    debounceTime(1000),
    switchMap(searchTerm => {
        return ajax.getJSON(`http://localhost:3000/autoComplete/${searchTerm}`).pipe(
            tap(_ => {
                spinner.className = '';
            }),
            switchMap(results => {
                return from(results);
            })
        );
    })
).subscribe(result => {
    localStorage.setItem('lastSearch', searchBox.value);
    add.result(result.description, result.place_id);
});

searchEvent.subscribe(event => {
    const renderDiv = document.getElementById('renderDiv');
    if (renderDiv) {
        renderDiv.remove();
    }
    inputSub.next(searchBox.value);
});

const placeData = resultsEvent.pipe(
    switchMap(event => {
        const id = event.target.getAttribute('data');
        return ajax.getJSON(`http://localhost:3000/place/${id}`)
    })
).subscribe(place => {
    placeSub.next(place);
});

const weatherData = placeSub.pipe(
    pluck('geometry', 'location'),
    switchMap(
        coords => {
            return ajax.getJSON(`http://localhost:3000/weather/${coords.lat}/${coords.lng}`)
                .pipe(
                    map(data => {
                        const key = `${coords.lat},${coords.lng}`;
                        return data['locations'][key]['currentConditions'];
                    })
                )
        }
    )
);

combineLatest(weatherData, placeSub).subscribe(result => {
    const weather = result[0];
    const place = result[1];
    document.getElementById('image-container').innerHTML = '';
    if (place.photos) {
        const photos = place.photos;
        const photoNum = Math.floor(Math.random() * photos.length);
        add.div(
            `
            <div class="row">
              <div class="col s12 m7">
                <div class="card">
                  <div class="card-image">
                    <img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[photoNum].photo_reference}&key=AIzaSyB6YDGhzImb7N1RKGlJdWulSm-FLaOQNHU">
                    <div class="bg-gradient"></div>
                    <span class="card-title">${place.formatted_address}</span>
                  </div>
                  <div class="card-content">
                    <p>Temperature: ${Math.round(weather.temp)}&deg;</p>
                    <p>Current Conditions: ${weather.icon}</p>
                    <p>Visibility: ${!!weather.visibility ? weather.visibility : 'N\\A'}</p>
                  </div>
                </div>
              </div>
            </div>
            `
        );
    } else {
        add.div(
            `
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${place.formatted_address}</span>
                            <p>Temperature: ${Math.round(weather.temp)}&deg;</p>
                            <p>Current Conditions: ${weather.icon}</p>
                            <p>Visibility: ${!!weather.visibility ? weather.visibility : 'N\\A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
});