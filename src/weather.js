import { ajax } from 'rxjs/ajax';
import { fromEvent, BehaviorSubject, Subject, from } from "rxjs";
import { tap, debounceTime, switchMap, skip } from "rxjs/operators";
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
    inputSub.next(searchBox.value);
});