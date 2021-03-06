var Data = {
	since: null,
	until: null,
	uniqlo: {
		shares: 0,
		likes: 0,
		comments: 0,
	},
	gap: {
		shares: 0,
		likes: 0,
		comments: 0,
	},
	zara: {
		shares: 0,
		likes: 0,
		comments: 0,
	},
	hm: {
		shares: 0,
		likes: 0,
		comments: 0,
	},
};
$(function() {
	$('#since').datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: "-1d",
        minDate: "-1y",
		onSelect: function(dateText) {
			Data.since = new Date(dateText).addHours(-8).toISOString();
			console.log(Data.since);
		},
	});

	$('#until').datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: "+0d",
        minDate: "-1y",
		onSelect: function(dateText) {
			Data.until = new Date(dateText).addHours(-8).toISOString();
			console.log(Data.until);
		},
	});

	$('input.search').on('click', function(e) {
        e.preventDefault();
        $('h4').removeClass('finish');
        $('h4').text('0');
		if (!Data.since || !Data.until) {
			alert('有欄位沒填');
			return;
		}
		if (Data.since > Data.until) {
			alert('開始日期 必須小於 結束日期');
			return;
		}
		if (Data.since == Data.until) {
			alert('開始日期 不得等於 結束日期');
			return;
		}

		//console.log(Data);
		fourCounting();
	});
});

var ran = function() {
	var maxNum = 10;
	var minNum = 0;

	return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

var countShare = function(brand, since, until, callback) {
	var id = '';
	switch (brand) {
		case 'uniqlo':
			id = 140574649321224;
			break;
		case 'gap':
			id = 714700031898218;
			break;
		case 'zara':
			id = 33331950906;
			break;
		case 'hm':
			id = 201098527069083;
			break;
	}
	Data[brand].shares = 0;
	var url =
		'https://graph.facebook.com/' +
		id +
		'/feed?fields=' +
		'shares' +
		'.summary(true),created_time&limit=100&since=' +
		since +
		'&until=' +
		until +
		'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD';
	console.log(url);
	var loopGet = function(url) {
        set();
		$.ajax({
			url: url,
			type: 'get',
			async: true,
			dataType: 'json',
			success: function(data) {
				$.each(data.data, function(key, value) {
					if (value.shares) {
						//console.log(key + ": " + value.shares.count);
						Data[brand].shares += value.shares.count;
					}
				});

				if (data.paging&&data.paging.next) {
					loopGet(data.paging.next);
				} else {
					callback(Data[brand].shares);
				}
			},
			error: function(data) {},
		});
	};
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			$.each(data.data, function(key, value) {
				if (value.shares) {
					Data[brand].shares += value.shares.count;
				}
			});
			if (data.paging&&data.paging.next) {
				loopGet(data.paging.next);
			} else {
				callback(Data[brand].shares);
			}
		},
		error: function(data) {},
	});
};

var countLike = function(brand, since, until, callback) {
	var id = '';
	switch (brand) {
		case 'uniqlo':
			id = 140574649321224;
			break;
		case 'gap':
			id = 714700031898218;
			break;
		case 'zara':
			id = 33331950906;
			break;
		case 'hm':
			id = 201098527069083;
			break;
	}
	Data[brand].likes = 0;
	var url =
		'https://graph.facebook.com/' +
		id +
		'/feed?fields=' +
		'reactions' +
		'.summary(true),created_time&limit=100&since=' +
		since +
		'&until=' +
		until +
		'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD';
	console.log(url);
	var loopGet = function(url) {
        set();
		$.ajax({
			url: url,
			type: 'get',
			async: true,
			dataType: 'json',
			success: function(data) {
				$.each(data.data, function(key, value) {
					if (value.reactions) {
						// console.log(key + ": " + value.likes.summary.total_count);
						Data[brand].likes += value.reactions.summary.total_count;
					}
				});

				if (data.paging&&data.paging.next) {
					loopGet(data.paging.next);
				} else {
					callback(Data[brand].likes);
				}
			},
			error: function(data) {},
		});
	};
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			$.each(data.data, function(key, value) {
				if (value.reactions) {
					Data[brand].likes += value.reactions.summary.total_count;
				}
			});
			if (data.paging&&data.paging.next) {
				loopGet(data.paging.next);
			} else {
				callback(Data[brand].likes);
			}
		},
		error: function(data) {},
	});
};

var countComment = function(brand, since, until, callback) {
	var id = '';
	switch (brand) {
		case 'uniqlo':
			id = 140574649321224;
			break;
		case 'gap':
			id = 714700031898218;
			break;
		case 'zara':
			id = 33331950906;
			break;
		case 'hm':
			id = 201098527069083;
			break;
	}
	Data[brand].comments = 0;
	var url =
		'https://graph.facebook.com/' +
		id +
		'/feed?fields=' +
		'comments' +
		'.summary(true),created_time&limit=100&since=' +
		since +
		'&until=' +
		until +
		'&access_token=EAAF5GSgzXNsBAChO1ZCCKNWrkNBV12taQKuLQzBEiTVOFufkIAVhTZBaMoJcCwz9kukFNxGVbbXxvGZCscZBEy43OrcpyZCHln9JjGlpZClsdkBRJn45Jak5ZAZBwxYfga8K6htQDfQ9j79mM9P2oYyJB7QJ9kFI7d7QjhxY28HbmgZDZD';
	console.log(url);
	var loopGet = function(url) {
        set();
		$.ajax({
			url: url,
			type: 'get',
			async: true,
			dataType: 'json',
			success: function(data) {
				$.each(data.data, function(key, value) {
					if (value.comments) {
						// console.log(key + ": " + value.likes.summary.total_count);
						Data[brand].comments +=
							value.comments.summary.total_count;
					}
				});

				if (data.paging&&data.paging.next) {
					loopGet(data.paging.next);
				} else {
					callback(Data[brand].comments);
				}
			},
			error: function(data) {},
		});
	};
	$.ajax({
		url: url,
		type: 'get',
		async: true,
		dataType: 'json',

		success: function(data) {
			$.each(data.data, function(key, value) {
				if (value.comments) {
					Data[brand].comments += value.comments.summary.total_count;
				}
			});
			if (data.paging&&data.paging.next) {
				loopGet(data.paging.next);
			} else {
				callback(Data[brand].comments);
			}
		},
		error: function(data) {},
	});
};

function fourCounting() {
	countShare('uniqlo', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(0).addClass('finish')
	});
	countShare('gap', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(1).addClass('finish')
	});
	countShare('zara', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(2).addClass('finish')
	});
	countShare('hm', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(3).addClass('finish')
	});

	countLike('uniqlo', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(4).addClass('finish')
	});
	countLike('gap', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(5).addClass('finish')
	});
	countLike('zara', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(6).addClass('finish')
	});
	countLike('hm', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(7).addClass('finish')
	});

	countComment('uniqlo', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(8).addClass('finish')
	});
	countComment('gap', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(9).addClass('finish')
	});
	countComment('zara', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(10).addClass('finish')
	});
	countComment('hm', Data.since, Data.until, function(r) {
        //console.log(r);
        set();
        $('h4').eq(11).addClass('finish')
	});
}

function set() {
	$.each($('h4'), function(key, value) {
		// $(this).text('123')
		var text = '';
		switch (key) {
			case 0:
				text = Data.uniqlo.shares;
				break;
			case 1:
				text = Data.uniqlo.likes;
				break;
			case 2:
				text = Data.uniqlo.comments;
				break;
			case 3:
				text = Data.gap.shares;
				break;
			case 4:
				text = Data.gap.likes;
				break;
			case 5:
				text = Data.gap.comments;
				break;
			case 6:
				text = Data.zara.shares;
				break;
			case 7:
				text = Data.zara.likes;
				break;
			case 8:
				text = Data.zara.comments;
				break;
			case 9:
				text = Data.hm.shares;
				break;
			case 10:
				text = Data.hm.likes;
				break;
			case 11:
				text = Data.hm.comments;
				break;
        }
        $(this).text(text)
		
	});
}
