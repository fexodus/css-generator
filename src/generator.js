'use strict';
var inherit = require('./oop').inherit;

var blocks = {};
var Block, Modifier, Element;

function getChild(Constructor)
{
	return function (name, styles, parent)
	{
		var selectorName;

		parent = parent || this;
		selectorName = Constructor.selectorName(name, parent, true);//console.log(name, selectorName, parent.name);

		return styles
			? this.childs[selectorName] = Constructor.create(name, styles, parent)
			: this.childs[selectorName];
	};
}

Block = inherit(Object, function (prototype)
{
	function Block (name, styles, parent)
	{
		this.name = name;
		this.styles = styles;
		this.parent = parent || null;
		this.selector = null;
		this.selectors = {};
		this.childs = {};
		this.extends = {};
	}

	Block.selectorName = function (blockName)
	{
		return '.' + blockName;
	};

	// set later
	prototype.e = null;
	prototype.m = null;

	prototype.end = function ()
	{
		return this.parent;
	};

	prototype.extend = function (block)
	{
		this.extends[block.selectorName(true)] = block;

		return this;
	};

	prototype.require = function (Block)
	{
		return this;
	};

	prototype.selectorName = function (original)
	{
		return this.constructor.selectorName(this.name, this.parent, original);
	};

	prototype.expose = function (customSelector, mediaQuery, fullCustom)
	{
		this.selector = customSelector
			? fullCustom || /&/.test(customSelector)
				? customSelector.replace(/&/g, this.parent ? this.parent.selector : '')
				: this.constructor.selectorName(customSelector, this.parent)
			: this.selectorName();
		this.selectors[this.selector] = true;
		Object.keys(this.extends).forEach(function (key) {this.extends[key].expose(this.selector, mediaQuery, true); }, this);

		return this;
	};

	prototype.render = function ()
	{
		var result = '';
		var styles;
		var selectors = Object.keys(this.selectors);

		if (selectors.length)
		{
			styles = Object
				.keys(this.styles)
				.map(function (key) { return key + ': ' + this[key]; }, this.styles)
				.join(';\n\t')
			;

			if (styles)
			{
				result = selectors.join(',') + ' {\n\t' + styles + '}\n\n';
				if (this.constructor === Block)
				{
					result = '/* ' + this.name + '\n****************************************/\n' + result;
				}
			}
		}

		result += Object
			.keys(this.childs)
			.map(function (key) { return this[key].render(); }, this.childs)
			.join('')
		;

		return result;
	};

	return Block;
});

Element = inherit(Block, function (prototype, ancestor)
{
	function Element (name)
	{
		ancestor.apply(this, arguments);
	}

	Element.selectorName = function (elementName, parent, original)
	{
		return (original ? parent.selectorName() : parent.selector) + '-' + elementName;
	};

	return Element;
});

Modifier = inherit(Block, function (prototype, ancestor)
{
	function Modifier (name)
	{
		ancestor.apply(this, arguments);
	}

	Modifier.selectorName = function (modifierName, parent, original)
	{
		return (original ? parent.selectorName() : parent.selector) + '--' + modifierName;
	};

	return Modifier;
});

Block.prototype.e = getChild(Element);
Block.prototype.m = getChild(Modifier);


exports.block = function (name, styles)
{
	var selectorName = Block.selectorName(name);

	return styles
		? blocks[selectorName] = Block.create(name, styles)
		: blocks[selectorName];
};

exports.render = function ()
{
	return Object.keys(blocks).map(function (blockName)
	{
		return blocks[blockName].render();
	}).join('');
};

