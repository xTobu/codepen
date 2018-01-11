var Index = {
	Element: {
		init: function() {
			var $form = $('div.example');
			this.form = {
				Name: $form.find('input:text').eq(0),
				Link: $form.find('input:text').eq(1),
				Category: $form.find('option:selected'),
				Agree: $form.find('input:checkbox').eq(0),
			};
			$form.find('select').on('change', function() {
				Index.Element.form.Category = $(this).find('option:selected');
			});
		},
	},
	Init: function() {
		this.Element.init();
		$('input.submit').on('click', function(e) {
			e.preventDefault();
			var r = Validation.Result();
			if (!r.Status) {
				var AlertString = '';
				var Resp = r.Resp;
				for (var prop in Resp) {
					AlertString += Resp[prop][0] + '\n';
				}
				alert(AlertString);
				return;
			} else {
				alert(r.Status);
			}
		});
	},
};
var Validation = {
	//規則
	SavedRule: {
		category: {
			presence: true,
			exclusion: {
				within: ['0'],
				message: '^【企業類別】請選擇企業類別',
			},
		},
		Name: {
			presence: {
				allowEmpty: false,
				message: '^【企業名稱】不可為空白',
			},
		},
		shortname: {
			presence: {
				allowEmpty: false,
				message: '^【企業簡稱】不可為空白',
			},
			length: {
				maximum: 6,
				message: '^【企業簡稱】必須在6個字以內',
			},
		},
		taxid: {
			presence: {
				allowEmpty: false,
				message: '^【統一編號】不可為空白',
			},
			length: {
				maximum: 8,
				message: '^【統一編號】必須在8個字以內',
			},
		},

		statement: {
			presence: {
				allowEmpty: false,
				message: '^【無翅宣言】不可為空白',
			},
			length: {
				maximum: 20,
				message: '^【無翅宣言】必須在20個字以內',
			},
		},
		Title: {
			presence: {
				allowEmpty: false,
				message: '^【影片標題】不可為空白',
			},
			length: {
				maximum: 20,
				message: '^【影片標題】必須在20個字以內',
			},
		},
		Tag: {
			presence: {
				allowEmpty: false,
				message: '^【影片標籤】請至少選一個',
			},
		},
		Link: {
			presence: {
				allowEmpty: false,
				message: '^【影片連結】不可為空白',
			},
			format: {
				//              pattern: "^(https?\:\/\/)?((?:www|m)\.instagram\.com\/p)\/.+$", //IG
				//                pattern: "^(https?\:\/\/)?((?:www|m)\.youtube\.com|youtu\.?be)\/.+$", //YT
				//                   var p = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/[p]\/([A-Za-z0-9-_]*)\//;
				pattern:
					'^(https?://)?((?:www|m).youtube.com|youtu.?be|(?:www.)?(?:instagram.com|instagr.am)/[p])/.+$', //YT & IG

				message: '^【影片連結】格式錯誤',
			},
		},

		EMail: {
			presence: {
				allowEmpty: false,
				message: '^【電子信箱】不可為空白',
			},
			email: {
				message: '^【電子信箱】格式錯誤',
			},
		},
		//        Phone: {
		//            presence: {
		//                allowEmpty: false,
		//                message: "^【手機號碼】不可為空白"
		//            },
		//            format: {
		//                pattern: "^(09)+[\\d]{8}",
		//                message: "^【手機號碼】格式錯誤"
		//            }
		//
		//        },

		Agree: {
			presence: true,
			inclusion: {
				within: [true],
				message: '^請同意活動辦法',
			},
		},
	},
	Rule: {
		Name: {
			presence: {
				allowEmpty: false,
				message: '^姓名不可為空白',
			},
		},
		Category: {
			presence: true,
			exclusion: {
				within: ['0'],
				message: '^請選擇企業類別',
			},
		},
		Link: {
			presence: {
				allowEmpty: false,
				message: '^連結不可為空白',
			},
			format: {
				//              pattern: "^(https?\:\/\/)?((?:www|m)\.instagram\.com\/p)\/.+$", //IG
				//                pattern: "^(https?\:\/\/)?((?:www|m)\.youtube\.com|youtu\.?be)\/.+$", //YT
				//                   var p = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/[p]\/([A-Za-z0-9-_]*)\//;
				pattern:
					'^(https?://)?((?:www|m).youtube.com|youtu.?be|(?:www.)?(?:instagram.com|instagr.am)/[p])/.+$', //YT & IG

				message: '^連結格式錯誤',
			},
		},
		Agree: {
			presence: true,
			inclusion: {
				within: [true],
				message: '^請同意活動辦法',
			},
		},
	},
	GetFormData: function() {
		var FormVal = {};
		var $form = Index.Element.form;
		for (var prop in $form) {
			FormVal[prop] = $form[prop].val();
		}
		FormVal['Agree'] = Index.Element.form.Agree.prop('checked');
		return FormVal;
	},
	//檢查連結是否正確Youtube
	CheckYoutube: function(url) {
		var p = /^(?:https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return url.match(p) ? RegExp.$1 : false;
	},
	GetYoutubeID: function(url) {
		var p = /^(?:https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return url.match(p) ? RegExp.$1 : false;
	},
	GetInstagramID: function(url) {
		var p = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/[p]\/([A-Za-z0-9-_]*)\//;
		return url.match(p) ? RegExp.$1 : false;
	},
	CheckYTorIG: function(url) {
		var res = {};
		var idYT = this.GetYoutubeID(url);
		var idIG = this.GetInstagramID(url);
		if (!idYT && !idIG) {
			res = false;
		}
		if (idYT) {
			res.type = 0;
			res.id = idYT;
		}
		if (idIG) {
			res.type = 1;
			res.id = idIG;
		}
		return res;
	}, //取得資料
	//回傳結果 格式：json
	Result: function() {
		//Youtube Reg
		var GetFormData = this.GetFormData();

		var req = {};
		var CheckData = validate(GetFormData, this.Rule);
		if (CheckData) {
			req.Status = false;
			req.Resp = CheckData;
		} else {
			req.Status = true;
			req.Data = GetFormData;
		}

		return req;
	},
	Init: function() {},
};

$(function() {
	Index.Init();
	Validation.Init();
});
