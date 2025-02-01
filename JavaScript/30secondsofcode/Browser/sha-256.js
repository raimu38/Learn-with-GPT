const hashValue = val => 
	crypto.subtle
		.digest('SHA-256', new TextEncoder('utf-8').encode(val))
		.then( h => {
			let hexes = [],
			view = new DataView(h);
		for(let i = 0; i < view.byteLength; i+= 4)
			hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
		return hexes.join('');
	});

hashValue(
	JSON.stringify({a: 'a', b:[1,2,3,4], foo:{c:'bar'}})).then(console.log);
	
hashValue('hello').then(console.log);

const encodeA = val => {
	const encoded = new TextEncoder('utf-8').encode(val)
	console.log(encoded);
}
 //const hashA = encoded => {
	 //const hashed = crypto.subtle.digest('SHA-256', encoded);
	 //console.log(hashed);
	 //}
encodeA('hello')
//hashA(encodeA('hello'))


//const hash256 = val => 
// 	crypto.subtle.digest('SHA-256', new TextEncoder('utf8').encode(val))
//		.then( h => {
//			let hexes = []
//			view = new DataView(h);
//			for (let i = 0; i < view.byteLength; i+= 4)
//				hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
//			return hexes.join('');
//		});
//
//hash256('goodmorning').then(console.log);
