'use strict';

function create()
{
	/* jshint validthis:true */
	var instance = Object.create(this.prototype);

	this.apply(instance, arguments);

	return instance;
}

exports.inherit = function (ancestor, setup)
{
	var
		proto = Object.create(ancestor.prototype),
		constructor = setup(proto, ancestor);

	if (constructor.ancestor)
	{
		throw new TypeError('Invalid constructor');
	}
	constructor.ancestor = ancestor;
	constructor.prototype = proto;
	constructor.create = create;
	proto.constructor = constructor;

	return constructor;
};