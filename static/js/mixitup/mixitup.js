var $Mixipup = {
	Var: {
		MIU: null,
		NowFilter: null,
	},
	Function: {
		GetLogoElement: function(obj, set_number) {
			var data = {
				shortname: obj.short_name,
				statement: obj.caption,
				img_url: null,
				category: null,
			};
			//判斷

			switch (obj.classify) {
				case '批發零售業':
					data.category = 1;
					break;
				case '交通運輸業':
					data.category = 2;
					break;
				case '住宿餐飲業':
					data.category = 3;
					break;
				case '食品業':
					data.category = 4;
					break;
				case '金融業':
					data.category = 5;
					break;
				case '旅遊業':
					data.category = 6;
					break;
				case '教育業':
					data.category = 7;
					break;
				case '電信業':
					data.category = 8;
					break;
				case '廣告業':
					data.category = 9;
					break;
				case '娛樂業':
					data.category = 10;
					break;
				case '非營利單位':
					data.category = 11;
					break;
				case '其他':
					data.category = 12;
					break;
			}
			if (obj.logo_pic)
				data.img_url =
					hosturl +
					'/' +
					obj.logo_pic.substring(2, obj.logo_pic.length);
			else data.img_url = hosturl + '/asset/svg/fin-w-comp.svg';

			var res =
				"<li class='item mix category-" +
				data.category +
				' item_set' +
				set_number +
				"'><div class='fin'><img src='" +
				data.img_url +
				"' alt='' /></div><div class='hover'><div class='inner'><div class='statement'><div class='inner'><span class='icon-qt-top'></span><span class='icon-qt-bt'></span><p class='state'>" +
				data.statement +
				"</p></div><p class='comp-name'><span>" +
				data.shortname +
				'</span></p></div></div></div></li>';

			return res;
		},

		Init: function() {
			var containerElm = document.querySelector(
				'section.company-logo div.content ul'
			);
			var $containerElm = $('section.company-logo div.content ul');
			$containerElm.html('');
			//            $containerElm.append(strData)

			$.ajax({
				async: true,
				type: 'POST',
				url: hosturl + '/api/logo_list',
				dataType: 'json',

				complete: function(data) {},
				success: function(data) {
					$.each(data, function(index, value) {
						if (device.mobile()) {
							$containerElm.append(
								$Mixipup.Function.GetLogoElement(
									value,
									Math.floor(index / 2)
								)
							);
						} else {
							$containerElm.append(
								$Mixipup.Function.GetLogoElement(
									value,
									Math.floor(index / 3)
								)
							);
						}

						//重新設定高度
						if (index == data.length - 1) {
							$ScrollMagic.Scenes.company.duration(
								$('section.company-logo').height()
							);
							$Mixipup.Var.MIU = mixitup(containerElm, {
								load: {
									//sort: 'published-date:desc'
								},
								animation: {
									effects: 'scale',
									duration: 700,
									animateResizeContainer: false,
								},
							});
							//company-logo
							$TweenMax.Company.SetDefaultCSS(
								$('section.company-logo li.item')
							);
						}
					});
				},
				error: function(data) {
					console.log(data);
					//                                alert("【影片連結】格式錯誤");
				},
			});
		},
		filter: function(tag) {
			var $this = $Mixipup.Var.MIU;
			$this.filter(tag).then(function(state) {
				$Mixipup.Var.NowFilter = tag;
			});
		},
		filterTag: function(tag) {
			var $this = this;
			$this.mixer.filter(tag).then(function(state) {
				$this.Setting.Filter.Selected = tag;
				//開放使用
				List.Models.EndProgress();
			});
		},
		sortDate: function() {
			var $this = this;

			$this.mixer
				.sort('published-date:' + $this.Setting.Sort.Date)
				.then(function(state) {
					$this.Setting.Sort.Date == 'desc'
						? ($this.Setting.Sort.Date = 'asc')
						: ($this.Setting.Sort.Date = 'desc');
					//開放使用
					List.Models.EndProgress();
				});
		},
		sortPopular: function() {
			//            $.each(Elements.itemBox, function (index, value) {
			//                var count = $(this).find('.count').text();
			//                $(this).attr('data-popular', count);
			//            });
			var $this = this;
			$this.mixer
				.sort('popular:' + $this.Setting.Sort.Popular)
				.then(function(state) {
					$this.Setting.Sort.Popular == 'desc'
						? ($this.Setting.Sort.Popular = 'asc')
						: ($this.Setting.Sort.Popular = 'desc');
					//開放使用
					List.Models.EndProgress();
				});
		},
		sortCountry: function() {
			var $this = this;
			$this.mixer
				.sort('country:' + $this.Setting.Sort.Country)
				.then(function(state) {
					$this.Setting.Sort.Country == 'desc'
						? ($this.Setting.Sort.Country = 'asc')
						: ($this.Setting.Sort.Country = 'desc');
					//開放使用
					List.Models.EndProgress();
				});
		},
	},
};
