function createCrazyCurry(red, redInit){
	var ret = function(...n) {
		var flat = (data) => data.reduce((r, e) => Array.isArray(e) ? r = r.concat(flat(e)) : r.push(e) && r, []);
    var calc = a => (!a.reduce)?[a]:flat(a).reduce(red,redInit);
		var f = (...x) => ret([calc(n)].concat(x));
		f.valueOf = () => calc(n)
		return f;
	}
	return ret;
}


var add = createCrazyCurry((p,n)=>p+n,0);

var mul = createCrazyCurry((p,n)=>p*n,1);

var min = createCrazyCurry((p,n)=>p-n,1);

var concat = createCrazyCurry((p,n)=>p+n,'');

+concat([[]],[],[min([[]],[],[~~min([[]],[],[mul([[]],[],[[4].concat([[]],[],[mul([[]],[],[add([[]],[],[add([[]],[],[3,mul([[]],[],[124,[44,-3.2]]) - mul([[]],[],[2000,min([[]],[],[9,1])])])])])])]),-2170])])-1,2]).valueOf() + 27;

