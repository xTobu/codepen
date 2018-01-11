var Validation = {
	//規則
	Rule: {
		category: {
			presence: true,
			exclusion: {
				within: ['0'],
				message: '^【企業類別】請選擇企業類別',
			},
		},
		name: {
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
	},
	Init: function() {
		console.log(Validation.Rule);
	},
};

$(function() {
	Validation.Init();
});
