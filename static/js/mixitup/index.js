var miu = {
	var: null,
	sort: {
		date: null,
		popular: null,
	},
	func: {
		filter: function(category) {
			miu.var.filter(category).then(function(state) {
				//要記錄時在這裡
			});
		},
		sortDate: function() {
			miu.sort.date == 'desc'
				? (miu.sort.date = 'asc')
				: (miu.sort.date = 'desc');
			miu.var.sort('date:' + miu.sort.date).then(function(state) {});
		},
		sortPopular: function() {
			miu.sort.popular == 'desc'
				? (miu.sort.popular = 'asc')
				: (miu.sort.popular = 'desc');
			miu.var
				.sort('popular:' + miu.sort.popular)
				.then(function(state) {});
		},
	},
};
$(function() {
	$('.btn').on('click', function(e) {
		e.preventDefault();
		$(this)
			.parent()
			.find('.btn')
			.removeClass('active');
		$(this).addClass('active');
	});

	$('div.contentFilter .btn').on('click', function(e) {
		e.preventDefault();
		var index = $(this).index() - 1;
		console.log(index);
		if (index == 0) {
			miu.func.filter('all');
		} else {
			miu.func.filter('.category-' + index);
		}
	});
	$('div.contentSort .btn').on('click', function(e) {
		e.preventDefault();
		switch ($(this).index()) {
			case 1:
				miu.func.sortDate();
				break;
			case 2:
				miu.func.sortPopular();
				break;
		}
	});
	miu.var = mixitup($('div.container ul'), {
		load: {
			// sort: 'date:desc',
		},
		animation: {
			effects: 'scale',
			duration: 700,
			//Container不要有縮小動畫
			animateResizeContainer: false,
		},
	});
});
