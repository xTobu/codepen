$(function() {
	// Rx.Observable.fromEvent(window, 'click')
	// 	.map(e => e.target)
	// 	.subscribe(e => {
	// 		console.log(e);
	// 	});

	// Rx.Observable.fromEvent(window, 'click')
	// 	.map(e => 1)
	// 	.scan((total, now) => total + now)
	// 	.subscribe(value => {
	// 		console.log(value)
	// 		$('.text').text(value);
	// 	});

	Rx.Observable.fromEvent($('input').eq(0), 'click')
		.mapTo(1)
		.merge(Rx.Observable.fromEvent($('input').eq(1), 'click').mapTo(-1))
		.scan((total, now) => total + now)
		.subscribe(value => {
			$('.text').text(value);
		});
});


// https://blog.techbridge.cc/2017/12/08/rxjs/
