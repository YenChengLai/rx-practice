!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}([function(t,e,r){"use strict";(function(t){r.d(e,"a",function(){return i});var n="undefined"!=typeof window&&window,o="undefined"!=typeof self&&"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&self,i=n||void 0!==t&&t||o}).call(this,r(3))},,,function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e);
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};function o(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function i(t){return"function"==typeof t}var s=!1,u={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;s=t},get useDeprecatedSynchronousErrorHandling(){return s}};function c(t){setTimeout(function(){throw t},0)}var a={closed:!0,next:function(t){},error:function(t){if(u.useDeprecatedSynchronousErrorHandling)throw t;c(t)},complete:function(){}},h=Array.isArray||function(t){return t&&"number"==typeof t.length};function p(t){return null!==t&&"object"==typeof t}function f(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map(function(t,e){return e+1+") "+t.toString()}).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}f.prototype=Object.create(Error.prototype);var l=f,d=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var r=this._parentOrParents,n=this._unsubscribe,o=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,r instanceof t)r.remove(this);else if(null!==r)for(var s=0;s<r.length;++s){r[s].remove(this)}if(i(n))try{n.call(this)}catch(t){e=t instanceof l?b(t.errors):[t]}if(h(o)){s=-1;for(var u=o.length;++s<u;){var c=o[s];if(p(c))try{c.unsubscribe()}catch(t){e=e||[],t instanceof l?e=e.concat(b(t.errors)):e.push(t)}}}if(e)throw new l(e)}},t.prototype.add=function(e){var r=e;if(!e)return t.EMPTY;switch(typeof e){case"function":r=new t(e);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof t)){var n=r;(r=new t)._subscriptions=[n]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}var o=r._parentOrParents;if(null===o)r._parentOrParents=this;else if(o instanceof t){if(o===this)return r;r._parentOrParents=[o,this]}else{if(-1!==o.indexOf(this))return r;o.push(this)}var i=this._subscriptions;return null===i?this._subscriptions=[r]:i.push(r),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function b(t){return t.reduce(function(t,e){return t.concat(e instanceof l?e.errors:e)},[])}var y="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),v=function(t){function e(r,n,o){var i=t.call(this)||this;switch(i.syncErrorValue=null,i.syncErrorThrown=!1,i.syncErrorThrowable=!1,i.isStopped=!1,arguments.length){case 0:i.destination=a;break;case 1:if(!r){i.destination=a;break}if("object"==typeof r){r instanceof e?(i.syncErrorThrowable=r.syncErrorThrowable,i.destination=r,r.add(i)):(i.syncErrorThrowable=!0,i.destination=new w(i,r));break}default:i.syncErrorThrowable=!0,i.destination=new w(i,r,n,o)}return i}return o(e,t),e.prototype[y]=function(){return this},e.create=function(t,r,n){var o=new e(t,r,n);return o.syncErrorThrowable=!1,o},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(d),w=function(t){function e(e,r,n,o){var s,u=t.call(this)||this;u._parentSubscriber=e;var c=u;return i(r)?s=r:r&&(s=r.next,n=r.error,o=r.complete,r!==a&&(i((c=Object.create(r)).unsubscribe)&&u.add(c.unsubscribe.bind(c)),c.unsubscribe=u.unsubscribe.bind(u))),u._context=c,u._next=s,u._error=n,u._complete=o,u}return o(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;u.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,r=u.useDeprecatedSynchronousErrorHandling;if(this._error)r&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)r?(e.syncErrorValue=t,e.syncErrorThrown=!0):c(t),this.unsubscribe();else{if(this.unsubscribe(),r)throw t;c(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};u.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),u.useDeprecatedSynchronousErrorHandling)throw t;c(t)}},e.prototype.__tryOrSetError=function(t,e,r){if(!u.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,r)}catch(e){return u.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(c(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(v);var m="function"==typeof Symbol&&Symbol.observable||"@@observable";function _(){}function g(t){return t?1===t.length?t[0]:function(e){return t.reduce(function(t,e){return e(t)},e)}:_}var x=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,o=function(t,e,r){if(t){if(t instanceof v)return t;if(t[y])return t[y]()}return t||e||r?new v(t,e,r):new v(a)}(t,e,r);if(n?o.add(n.call(o,this.source)):o.add(this.source||u.useDeprecatedSynchronousErrorHandling&&!o.syncErrorThrowable?this._subscribe(o):this._trySubscribe(o)),u.useDeprecatedSynchronousErrorHandling&&o.syncErrorThrowable&&(o.syncErrorThrowable=!1,o.syncErrorThrown))throw o.syncErrorValue;return o},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){u.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,r=e.closed,n=e.destination,o=e.isStopped;if(r||o)return!1;t=n&&n instanceof v?n:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=S(e))(function(e,n){var o;o=r.subscribe(function(e){try{t(e)}catch(t){n(t),o&&o.unsubscribe()}},n,e)})},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[m]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:g(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=S(t))(function(t,r){var n;e.subscribe(function(t){return n=t},function(t){return r(t)},function(){return t(n)})})},t.create=function(e){return new t(e)},t}();function S(t){if(t||(t=u.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var E=function(t){return function(e){for(var r=0,n=t.length;r<n&&!e.closed;r++)e.next(t[r]);e.complete()}};function T(t,e){return new x(function(r){var n=new d,o=0;return n.add(e.schedule(function(){o!==t.length?(r.next(t[o++]),r.closed||n.add(this.schedule())):r.complete()})),n})}function O(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r,n=t[t.length-1];return(r=n)&&"function"==typeof r.schedule?(t.pop(),T(t,n)):function(t,e){return e?T(t,e):new x(E(t))}(t)}var j=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return o(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!==r&&this.delay===r&&!1===this.pending)return e;clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r=!1,n=void 0;try{this.work(t)}catch(t){r=!0,n=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),n},e.prototype._unsubscribe=function(){var t=this.id,e=this.scheduler,r=e.actions,n=r.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&r.splice(n,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null},e}(function(t){function e(e,r){return t.call(this)||this}return o(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(d)),H=function(){function t(e,r){void 0===r&&(r=t.now),this.SchedulerAction=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.SchedulerAction(this,t).schedule(r,e)},t.now=function(){return Date.now()},t}(),P=function(t){function e(r,n){void 0===n&&(n=H.now);var o=t.call(this,r,function(){return e.delegate&&e.delegate!==o?e.delegate.now():n()})||this;return o.actions=[],o.active=!1,o.scheduled=void 0,o}return o(e,t),e.prototype.schedule=function(r,n,o){return void 0===n&&(n=0),e.delegate&&e.delegate!==this?e.delegate.schedule(r,n,o):t.prototype.schedule.call(this,r,n,o)},e.prototype.flush=function(t){var e=this.actions;if(this.active)e.push(t);else{var r;this.active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(H),q=new P(j);function D(t,e){var r;return void 0===t&&(t=0),void 0===e&&(e=q),(h(r=t)||!(r-parseFloat(r)+1>=0)||t<0)&&(t=0),e&&"function"==typeof e.schedule||(e=q),new x(function(r){return r.add(e.schedule(A,t,{subscriber:r,counter:0,period:t})),r})}function A(t){var e=t.subscriber,r=t.counter,n=t.period;e.next(r),this.schedule({subscriber:e,counter:r+1,period:n},n)}var M=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.notifyNext=function(t,e,r,n,o){this.destination.next(e)},e.prototype.notifyError=function(t,e){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(v),R=function(t){function e(e,r,n){var o=t.call(this)||this;return o.parent=e,o.outerValue=r,o.outerIndex=n,o.index=0,o}return o(e,t),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(v);function C(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}var X=C(),L=function(t){return t&&"number"==typeof t.length&&"function"!=typeof t};function I(t){return!!t&&"function"!=typeof t.subscribe&&"function"==typeof t.then}var k=function(t){if(t&&"function"==typeof t[m])return n=t,function(t){var e=n[m]();if("function"!=typeof e.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return e.subscribe(t)};if(L(t))return E(t);if(I(t))return r=t,function(t){return r.then(function(e){t.closed||(t.next(e),t.complete())},function(e){return t.error(e)}).then(null,c),t};if(t&&"function"==typeof t[X])return e=t,function(t){for(var r=e[X]();;){var n=r.next();if(n.done){t.complete();break}if(t.next(n.value),t.closed)break}return"function"==typeof r.return&&t.add(function(){r.return&&r.return()}),t};var e,r,n,o=p(t)?"an invalid object":"'"+t+"'";throw new TypeError("You provided "+o+" where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")};function U(t,e){return function(r){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return r.lift(new N(t,e))}}var N=function(){function t(t,e){this.project=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new F(t,this.project,this.thisArg))},t}(),F=function(t){function e(e,r,n){var o=t.call(this,e)||this;return o.project=r,o.count=0,o.thisArg=n||o,o}return o(e,t),e.prototype._next=function(t){var e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(v);function V(t,e){if(null!=t){if(function(t){return t&&"function"==typeof t[m]}(t))return function(t,e){return new x(function(r){var n=new d;return n.add(e.schedule(function(){var o=t[m]();n.add(o.subscribe({next:function(t){n.add(e.schedule(function(){return r.next(t)}))},error:function(t){n.add(e.schedule(function(){return r.error(t)}))},complete:function(){n.add(e.schedule(function(){return r.complete()}))}}))})),n})}(t,e);if(I(t))return function(t,e){return new x(function(r){var n=new d;return n.add(e.schedule(function(){return t.then(function(t){n.add(e.schedule(function(){r.next(t),n.add(e.schedule(function(){return r.complete()}))}))},function(t){n.add(e.schedule(function(){return r.error(t)}))})})),n})}(t,e);if(L(t))return T(t,e);if(function(t){return t&&"function"==typeof t[X]}(t)||"string"==typeof t)return function(t,e){if(!t)throw new Error("Iterable cannot be null");return new x(function(r){var n,o=new d;return o.add(function(){n&&"function"==typeof n.return&&n.return()}),o.add(e.schedule(function(){n=t[X](),o.add(e.schedule(function(){if(!r.closed){var t,e;try{var o=n.next();t=o.value,e=o.done}catch(t){return void r.error(t)}e?r.complete():(r.next(t),this.schedule())}}))})),o})}(t,e)}throw new TypeError((null!==t&&typeof t||t)+" is not observable")}var W=function(){function t(t){this.project=t}return t.prototype.call=function(t,e){return e.subscribe(new G(t,this.project))},t}(),G=function(t){function e(e,r){var n=t.call(this,e)||this;return n.project=r,n.index=0,n}return o(e,t),e.prototype._next=function(t){var e,r=this.index++;try{e=this.project(t,r)}catch(t){return void this.destination.error(t)}this._innerSub(e,t,r)},e.prototype._innerSub=function(t,e,r){var n=this.innerSubscription;n&&n.unsubscribe();var o=new R(this,void 0,void 0);this.destination.add(o),this.innerSubscription=function(t,e,r,n,o){if(void 0===o&&(o=new R(t,r,n)),!o.closed)return e instanceof x?e.subscribe(o):k(e)(o)}(this,t,e,r,o)},e.prototype._complete=function(){var e=this.innerSubscription;e&&!e.closed||t.prototype._complete.call(this),this.unsubscribe()},e.prototype._unsubscribe=function(){this.innerSubscription=null},e.prototype.notifyComplete=function(e){this.destination.remove(e),this.innerSubscription=null,this.isStopped&&t.prototype._complete.call(this)},e.prototype.notifyNext=function(t,e,r,n,o){this.destination.next(e)},e}(M);function J(){return Error.call(this),this.message="argument out of range",this.name="ArgumentOutOfRangeError",this}J.prototype=Object.create(Error.prototype);var Y=J,z=new x(function(t){return t.complete()});function B(t){return t?function(t){return new x(function(e){return t.schedule(function(){return e.complete()})})}(t):z}function $(t){return function(e){return 0===t?B():e.lift(new K(t))}}var K=function(){function t(t){if(this.total=t,this.total<0)throw new Y}return t.prototype.call=function(t,e){return e.subscribe(new Q(t,this.total))},t}(),Q=function(t){function e(e,r){var n=t.call(this,e)||this;return n.total=r,n.count=0,n}return o(e,t),e.prototype._next=function(t){var e=this.total,r=++this.count;r<=e&&(this.destination.next(t),r===e&&(this.destination.complete(),this.unsubscribe()))},e}(v);var Z=r(0);function tt(t,e){return void 0===e&&(e=null),new ut({method:"GET",url:t,headers:e})}function et(t,e,r){return new ut({method:"POST",url:t,body:e,headers:r})}function rt(t,e){return new ut({method:"DELETE",url:t,headers:e})}function nt(t,e,r){return new ut({method:"PUT",url:t,body:e,headers:r})}function ot(t,e,r){return new ut({method:"PATCH",url:t,body:e,headers:r})}var it=U(function(t,e){return t.response});function st(t,e){return it(new ut({method:"GET",url:t,responseType:"json",headers:e}))}var ut=function(t){function e(e){var r=t.call(this)||this,n={async:!0,createXHR:function(){return this.crossDomain?function(){if(Z.a.XMLHttpRequest)return new Z.a.XMLHttpRequest;if(Z.a.XDomainRequest)return new Z.a.XDomainRequest;throw new Error("CORS is not supported by your browser")}():function(){if(Z.a.XMLHttpRequest)return new Z.a.XMLHttpRequest;var t=void 0;try{for(var e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r=0;r<3;r++)try{if(t=e[r],new Z.a.ActiveXObject(t))break}catch(t){}return new Z.a.ActiveXObject(t)}catch(t){throw new Error("XMLHttpRequest is not supported by your browser")}}()},crossDomain:!0,withCredentials:!1,headers:{},method:"GET",responseType:"json",timeout:0};if("string"==typeof e)n.url=e;else for(var o in e)e.hasOwnProperty(o)&&(n[o]=e[o]);return r.request=n,r}var r;return o(e,t),e.prototype._subscribe=function(t){return new ct(t,this.request)},e.create=((r=function(t){return new e(t)}).get=tt,r.post=et,r.delete=rt,r.put=nt,r.patch=ot,r.getJSON=st,r),e}(x),ct=function(t){function e(e,r){var n=t.call(this,e)||this;n.request=r,n.done=!1;var o=r.headers=r.headers||{};return r.crossDomain||n.getHeader(o,"X-Requested-With")||(o["X-Requested-With"]="XMLHttpRequest"),n.getHeader(o,"Content-Type")||Z.a.FormData&&r.body instanceof Z.a.FormData||void 0===r.body||(o["Content-Type"]="application/x-www-form-urlencoded; charset=UTF-8"),r.body=n.serializeBody(r.body,n.getHeader(r.headers,"Content-Type")),n.send(),n}return o(e,t),e.prototype.next=function(t){this.done=!0;var e,r=this.xhr,n=this.request,o=this.destination;try{e=new at(t,r,n)}catch(t){return o.error(t)}o.next(e)},e.prototype.send=function(){var t=this.request,e=this.request,r=e.user,n=e.method,o=e.url,i=e.async,s=e.password,u=e.headers,c=e.body;try{var a=this.xhr=t.createXHR();this.setupEvents(a,t),r?a.open(n,o,i,r,s):a.open(n,o,i),i&&(a.timeout=t.timeout,a.responseType=t.responseType),"withCredentials"in a&&(a.withCredentials=!!t.withCredentials),this.setHeaders(a,u),c?a.send(c):a.send()}catch(t){this.error(t)}},e.prototype.serializeBody=function(t,e){if(!t||"string"==typeof t)return t;if(Z.a.FormData&&t instanceof Z.a.FormData)return t;if(e){var r=e.indexOf(";");-1!==r&&(e=e.substring(0,r))}switch(e){case"application/x-www-form-urlencoded":return Object.keys(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&");case"application/json":return JSON.stringify(t);default:return t}},e.prototype.setHeaders=function(t,e){for(var r in e)e.hasOwnProperty(r)&&t.setRequestHeader(r,e[r])},e.prototype.getHeader=function(t,e){for(var r in t)if(r.toLowerCase()===e.toLowerCase())return t[r]},e.prototype.setupEvents=function(t,e){var r=e.progressSubscriber;function n(t){var e,r=n,o=r.subscriber,i=r.progressSubscriber,s=r.request;i&&i.error(t);try{e=new lt(this,s)}catch(t){e=t}o.error(e)}if(t.ontimeout=n,n.request=e,n.subscriber=this,n.progressSubscriber=r,t.upload&&"withCredentials"in t){var o,i;if(r)o=function(t){o.progressSubscriber.next(t)},Z.a.XDomainRequest?t.onprogress=o:t.upload.onprogress=o,o.progressSubscriber=r;i=function(t){var e,r=i,n=r.progressSubscriber,o=r.subscriber,s=r.request;n&&n.error(t);try{e=new pt("ajax error",this,s)}catch(t){e=t}o.error(e)},t.onerror=i,i.request=e,i.subscriber=this,i.progressSubscriber=r}function s(t){}function u(t){var e=u,r=e.subscriber,n=e.progressSubscriber,o=e.request;if(4===this.readyState){var i=1223===this.status?204:this.status,s="text"===this.responseType?this.response||this.responseText:this.response;if(0===i&&(i=s?200:0),i<400)n&&n.complete(),r.next(t),r.complete();else{n&&n.error(t);var c=void 0;try{c=new pt("ajax error "+i,this,o)}catch(t){c=t}r.error(c)}}}t.onreadystatechange=s,s.subscriber=this,s.progressSubscriber=r,s.request=e,t.onload=u,u.subscriber=this,u.progressSubscriber=r,u.request=e},e.prototype.unsubscribe=function(){var e=this.done,r=this.xhr;!e&&r&&4!==r.readyState&&"function"==typeof r.abort&&r.abort(),t.prototype.unsubscribe.call(this)},e}(v),at=function(){return function(t,e,r){this.originalEvent=t,this.xhr=e,this.request=r,this.status=e.status,this.responseType=e.responseType||r.responseType,this.response=ft(this.responseType,e)}}();function ht(t,e,r){return Error.call(this),this.message=t,this.name="AjaxError",this.xhr=e,this.request=r,this.status=e.status,this.responseType=e.responseType||r.responseType,this.response=ft(this.responseType,e),this}ht.prototype=Object.create(Error.prototype);var pt=ht;function ft(t,e){switch(t){case"json":return function(t){return"response"in t?t.responseType?t.response:JSON.parse(t.response||t.responseText||"null"):JSON.parse(t.responseText||"null")}(e);case"xml":return e.responseXML;case"text":default:return"response"in e?e.response:e.responseText}}var lt=function(t,e){return pt.call(this,"ajax timeout",t,e),this.name="AjaxTimeoutError",this};ut.create.getJSON("https://jsonplaceholder.typicode.com/users").pipe(function t(e,r){return"function"==typeof r?function(n){return n.pipe(t(function(t,n){return(o=e(t,n),i?V(o,i):o instanceof x?o:new x(k(o))).pipe(U(function(e,o){return r(t,e,n,o)}));var o,i}))}:function(t){return t.lift(new W(e))}}(t=>O(...t)));const dt={seconds:60,hours:12,radius:125,width:400,height:400,secondsHandLength:10,secondsHandColor:"#999",secondsHandWidth:"1",hoursHandLength:20,hoursHandColor:"#656565",hoursHandWidth:"3",totalRadians:2*Math.PI,increments:t=>dt.totalRadians/t};dt.initial=.75*dt.totalRadians;D(1e3).pipe($(20),U(t=>`Count of: ${t+1}`)),new Promise(t=>{setTimeout(()=>{t("I waited for 3 seconds")},3e3)});document.addEventListener("DOMContentLoaded",function(){document.getElementById("title").innerHTML=""})}]);