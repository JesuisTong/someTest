var loaderUtils = require('loader-utils');

module.exports = function() {};
module.exports.pitch = function(source) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.getOptions(this) || {};
	
	var chunkNameParam = loaderUtils.interpolateName(this, query.name + '-[1]', {
		regExp: "webApp/Views/(.*)/",
	});
	console.log(chunkNameParam, '\n\n\n\n');
	var result = [];
	if(query.lazy) {
		result = [
			"// custom-loader: kimi no na e do nan ga i lu ga ?\n",
			"\n",
			"module.exports = function(cb) {\n",
			"	return async function() {\n",
			"		var _import = await import(",
						`/* webpackChunkName: "${chunkNameParam}" */`,
						' /* webpackMode: "lazy" */ ',
						loaderUtils.stringifyRequest(this, "!!" + source),
					");\n",
			"		cb(_import);\n",
			"	};\n",
			"};\n"
		];
	} else {
		result = [
			"var cbs = [], \n",
			"	data;\n",
			"module.exports = function(cb) {\n",
			"	if(cbs) cbs.push(cb);\n",
			"	else cb(data);\n",
			"}\n",
			"require.ensure([], function(require) {\n",
			"	data = require(", loaderUtils.stringifyRequest(this, "!!" + source), ");\n",
			"	var callbacks = cbs;\n",
			"	cbs = null;\n",
			"	for(var i = 0, l = callbacks.length; i < l; i++) {\n",
			"		callbacks[i](data);\n",
			"	}\n",
			"}" + chunkNameParam + ");"
		];
	}
	return result.join('');
}