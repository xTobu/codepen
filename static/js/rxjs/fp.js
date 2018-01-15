let total = source
	.map(x => parseInt(x, 10))
	.filter(x => !isNaN(x))
	.map(x => x * 2)
	.reduce((total, value) => total + value);
