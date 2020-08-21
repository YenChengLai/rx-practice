import { ajax } from 'rxjs/ajax';
import { fromEvent, BehaviorSubject, Subject, from, combineLatest } from "rxjs";
import { tap, debounceTime, switchMap, skip, pluck, map } from "rxjs/operators";
import { add } from "./helpers";

// DOM elements
const searchBox = document.getElementById('search');
const resultBox = document.getElementById('results-container');
const spinner = document.getElementById('spinner');

// Event Handlers
const searchEvent = fromEvent(searchBox, 'keyup');
const resultsEvent = fromEvent(resultBox, 'click');

// Subjects: for multiple subscribers
const inputSub = new BehaviorSubject('');
const placeSub = new Subject();
const weatherSub = new Subject();

inputSub.pipe(
    skip(1),
    tap(_ => {
        spinner.className = 'spinner';
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
    add.result(result.description, result.place_id);
});

searchEvent.subscribe(event => {
    resultBox.innerHTML = '';
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
    add.div(
        `<div>
            <p>Temperature: ${Math.round(weather.temp)}&deg;</p>
            <p>Current Conditions: ${weather.icon}</p>
            <p>Visibility: ${!!weather.visibility ?weather.visibility : 'N\\A' }</p>
        </div>`
    )
});