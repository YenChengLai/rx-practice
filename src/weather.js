import { fromEvent, BehaviorSubject, Subject } from "rxjs";
import { } from "rxjs/operators";
import { } from "./helpers";

// DOM elements
const searchBox = document.getElementById('search');
const resultBox = document.getElementById('results-container');


// Event Handlers
const searchEvent = fromEvent(searchBox, 'keyup');
const resultsEvent = fromEvent(resultBox, 'click');

// Subjects: for multiple subscribers
const inputSub = new BehaviorSubject('');
const placeSub = new Subject();
const weatherSub = new Subject();