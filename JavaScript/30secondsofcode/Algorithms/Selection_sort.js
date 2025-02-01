 arr = [1,2,3,4,5]
console.log(arr.slice(1,4));
console.log(arr.slice(2));
console.log(arr.slice());

const numbers = [1,2,3,4,5];
const sum = numbers.reduce((acc,val) => acc + val, 0);
console.log(sum)


const selectionSort = arr => {
	const a = [...arr];
	for (let i = 0; i < a.length; i++){
		const min  = a
			.slice(i + 1)
			.reduce((acc, val ,j) => (val < a[acc] ? j + i + 1 : acc), i);
		if (min !== i) [a[i], a[min]] = [a[min], a[i]];
	}
	return a;
};


const result = selectionSort([6,2,1,4,2]);
console.log(result)

