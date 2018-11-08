var config = {}
var axios = require('axios')
config.basePath = 'http://localhost:3000';
//config.nodePath = (url) => 'http://localhost:8000'+url;
config.base_axios = axios.create({
    baseURL:'http://localhost:3001',
    header : {'X-Custom-Header':'foobar'}
})

//数组去重
config.arrayUnique = (arr) => {
	Array.prototype.unique = () => {
		var res = [];
		var json = {};
		for(var i = 0; i < this.length; i++){
		    if(!json[this[i]]){
		   		res.push(this[i]);
		   		json[this[i]] = 1;
		  	}
		}
		return res;
	}
	return arr.unique();
}
export default config
