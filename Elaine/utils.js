
Date.prototype.addDays = function(days) {
	var dat = new Date(this.valueOf());
	dat.setDate(dat.getDate() + days);
	return dat;
};

function getDate(count) {
	return new Date()
		.addDays(count)
		.toISOString()
		.substring(0, 10);
}
function getLabelDate(count) {
	return new Date()
		.addDays(count)
		.toISOString()
        .substring(0, 10)
        .substring(8);
}
function getTime(count) {
	var target = getDate(count) + ' 00:00:00';
	var timestamp = new Date(target).getTime() / 1000;
	return timestamp;
}
var arrayTimestamp = [
    getTime(-6),
    getTime(-5),
	getTime(-4),
	getTime(-3),
	getTime(-2),
	getTime(-1),
	getTime(0),
	getTime(1),
];
var arrayLabels=[getLabelDate(-6), getLabelDate(-5), getLabelDate(-4), getLabelDate(-3), getLabelDate(-2), getLabelDate(-1), getLabelDate(0)]

function getShares(target, day, callback) {
	var since = arrayTimestamp[day - 1];
    var until = arrayTimestamp[day];
    
	//Day 1
	$.ajax({
		url:
			'https://graph.facebook.com/' +
			target +
			'/feed?fields=' +
			'shares' +
			'.summary(true),created_time&limit=100&since=' +
			since +
			'&until=' +
			until +
			'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD',
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			var total = 0;
			$.each(data.data, function(key, value) {
				if (value.shares) {
					//console.log(key + ": " + value.shares.count);
					total += value.shares.count;
				}
			});
			// console.log('Shares:', total)
			callback(total);
		},
		error: function(data) {},
	});
}
// '242305665805605'
function dataShares(target, callback) {

	var arr = [];
	getShares(target, 1, function(r1) {
		getShares(target, 2, function(r2) {
			getShares(target, 3, function(r3) {
				getShares(target, 4, function(r4) {
					getShares(target, 5, function(r5) {
						getShares(target, 6, function(r6) {
                            getShares(target, 7, function(r7) {
                                arr[0] = r1;
                                arr[1] = r2;
                                arr[2] = r3;
                                arr[3] = r4;
                                arr[4] = r5;
                                arr[5] = r6;
                                arr[6] = r7;
                                callback(arr);
                            });
                        });
					});
				});
			});
		});
	});
}



function getLikes(target, day, callback) {
	var since = arrayTimestamp[day - 1];
    var until = arrayTimestamp[day];
   
	$.ajax({
		url:
			'https://graph.facebook.com/' +
			target +
			'/feed?fields=' +
			'likes' +
			'.summary(true),created_time&limit=100&since=' +
			since +
			'&until=' +
			until +
			'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD',
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			var total = 0;
			$.each(data.data, function (key, value) {
	            if (value.likes) {
	                // console.log(key + ": " + value.likes.summary.total_count);
	                total += value.likes.summary.total_count;
	            }
	        });
			// console.log('Shares:', total)
			callback(total);
		},
		error: function(data) {},
    }); 

}
function dataLikes(target, callback) {

	var arr = [];
	getLikes(target, 1, function(r1) {
		getLikes(target, 2, function(r2) {
			getLikes(target, 3, function(r3) {
				getLikes(target, 4, function(r4) {
					getLikes(target, 5, function(r5) {
						getLikes(target, 6, function(r6) {
                            getLikes(target, 7, function(r7) {
                                arr[0] = r1;
                                arr[1] = r2;
                                arr[2] = r3;
                                arr[3] = r4;
                                arr[4] = r5;
                                arr[5] = r6;
                                arr[6] = r7;
                                callback(arr);
                            });
                        });
					});
				});
			});
		});
	});
}

function getComments(target, day, callback) {
	var since = arrayTimestamp[day - 1];
    var until = arrayTimestamp[day];
   
	$.ajax({
		url:
			'https://graph.facebook.com/' +
			target +
			'/feed?fields=' +
			'comments' +
			'.summary(true),created_time&limit=100&since=' +
			since +
			'&until=' +
			until +
			'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD',
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			var total = 0;
			        $.each(data.data, function (key, value) {
	            if (value.comments) {
	                // console.log(key + ": " + value.comments.summary.total_count);
	                total += value.comments.summary.total_count;
	            }
	        });
			// console.log('Shares:', total)
			callback(total);
		},
		error: function(data) {},
    }); 

}
function dataComments(target, callback) {

	var arr = [];
	getComments(target, 1, function(r1) {
		getComments(target, 2, function(r2) {
			getComments(target, 3, function(r3) {
				getComments(target, 4, function(r4) {
					getComments(target, 5, function(r5) {
						getComments(target, 6, function(r6) {
                            getComments(target, 7, function(r7) {
                                arr[0] = r1;
                                arr[1] = r2;
                                arr[2] = r3;
                                arr[3] = r4;
                                arr[4] = r5;
                                arr[5] = r6;
                                arr[6] = r7;
                                callback(arr);
                            });
                        });
					});
				});
			});
		});
	});
}

