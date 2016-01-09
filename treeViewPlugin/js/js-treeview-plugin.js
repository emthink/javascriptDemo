/**
 * js-treeview-plugin.js
 * @description [make a dynamic tree with arbitrary child nodes.]
 * @author [惊鸿三世](http://blog.codingplayboy.com)
 * @{@link :https://github.com/codingplayboy/}
 * @version [0.1.1]
 * @date: 2016.01.07,01.10
 * 
 */

/** window, treeViewPlugin */
var treeViewPlugin = (function() {
 	'use stict';

 	var configMap = {
 		main_html: String()
 			+ '<div class="spa-treeview-wrapper">'
 				+ '<div class="spa-treeview-list-groups">'
 					+ '<div class="spa-treeview-list-contacts"></div>'
 				+ '</div>'
 			+ '</div>',
 		parent_model: null,
		child_model: null
 	},
 	
	settable_map = null,
 	stateMap =  {
		$append_target: null,
	},
	jqueryMap = {},
	setJqueryMap, addGroup, addParents, addChildren, addChildNode, configModule, initModule, setData;

	setJqueryMap = function() {
		var $append_target = stateMap.$append_target,
			$parent = $append_target.find('.spa-treeview-wrapper');
		jqueryMap = {
			$parent: $parent,
			$parentFir: $parent.find('.spa-treeview-list-groups'),
			$parentSec: $parent.find('.spa-treeview-list-contacts'),
			$window: $(window)
		};
		jqueryMap.$parentFir.delegate('.spa-treeview-group-list-name .childIcon', 'click', toggleOrg);
        jqueryMap.$parentFir.delegate('.spa-treeview-group-list-name .spa-data-item', 'click', toggleCheck);
	};

	/**
	 * [addParents 添加父级菜单
	 * @param {[Array]} _data [菜单数据]
	 * [{
	 * 		id: 菜单id,
	 * 		name: 菜单显示值
	 * 
	 * }]
	 */
	addParents = function(_data) {
        var list_html = String();
        if (!_data) {
            _data = [];
        }
        $(_data).each(function(index) {
            list_html += '<div class="spa-treeview-anchor spa-treeview-group-list-name'
                + '" data-id="' + _data[index].id
                + '" data-group="' + _data[index].name
                + '" title="' + _data[index].name + '" style="margin-bottom:6px;">'
                + '<span class="childIcon icon-closed"></span><a href="javascript:void(0);" class="spa-data-item">'
                + _data[index].name
                + '</a><span class="icon-nochecked"></span><div class="spa-treeview-list-contacts">'
                + '<span class="last"></span>'
                + '</div>'
                + '</div>';
        });
        // if (!list_html) {
        //     list_html = String()
        //         + '<div class="spa-treeview-group-list-note">'
        //         + '暂无数据<br><br>'
        //         + ''
        //         + '</div>';
        // }
        jqueryMap.$parentFir.children('.noUse').before(list_html);
    };

    addOne = function(_data) {
        var list_html = String();
        if (!_data) {
            _data = [];
        }
        $(_data).each(function(index) {
            list_html += '<div class="spa-treeview-anchor spa-treeview-group-list-name'
                + '" data-id="' + _data[index].id
                + '" data-group="' + _data[index].name
                + '" title="' + _data[index].name + '" style="margin-bottom:6px;">'
                + '<span class="childIcon"></span><a href="javascript:void(0);" class="spa-data-item">'
                + _data[index].name
                + '</a><span class="icon-nochecked"></span><div class="spa-treeview-list-contacts">'
                + '<span class="last"></span>'
                + '</div>'
                + '</div>';
        });
        jqueryMap.$parentFir.children('.noUse').before(list_html);
    };

    /**
     * [addChildren 添加子级菜单]
     * @param {[Array]} _data [菜单数据]
     * [{
     * 		id: 菜单id,
     * 		name: 菜单显示值,
     * 		pId: 父级菜单id
     * }]
     */
    addChildren = function(_data) {
        var list_html = String();
        var $parentSec = jqueryMap.$parent.find('.spa-treeview-group-list-name');
        if (!_data) {
            _data = [];
        }
        $(_data).each(function(id) {

            $parentSec.each(function(idx){
                if ($($parentSec[idx]).attr('data-id') === _data[id].parentid || $($parentSec[idx]).attr('data-id') === _data[id].pId) {
                    list_html = '<div class="spa-treeview-anchor spa-treeview-group-list-name hasParent'
                        + '" data-id="' + _data[id].id
                        + '" data-group="' + _data[id].name
                        + '" title="' + _data[id].name + '">'
                        + '<span class="childIcon icon-closed"></span><a href="javascript:void(0);" class="spa-data-item">'
                        + _data[id].name
                        + '</a><span class="icon-nochecked"></span><div class="spa-treeview-list-contacts">'
                        + '<span class="last"></span>'
                        + '</div>'
                        + '</div>';
                    $($parentSec[idx]).children('.spa-treeview-list-contacts').before(list_html);
                    list_html = '';
                }
            });
        });
    };

    /**
     * [addChildNode 添加无子级子级菜单]
     * @param {[Array]} _data [菜单数据]
     * [{
     * 		id: 菜单id,
     * 		name: 菜单显示值,
     * 		pId: 父级菜单id
     * }]
     */
    addChildNode = function(_data) {
        var list_html = String(), pIds = [], flag;
        var $parentSec = jqueryMap.$parent.find('.spa-treeview-group-list-name');
        $(_data).each(function(id) {
                $parentSec.each(function(idx){
                    if (_data[id].pId == $($parentSec[idx]).attr('data-id')) {
                        console.log(_data[id].pId, $($parentSec[idx]).attr('data-id'));
                        list_html = '<div class="spa-treeview-anchor spa-treeview-contacts-list-name"'
                        	+ '" data-id="' + _data[id].id
	                        + '" data-contact="' + _data[id].name
	                        + '" title="' + _data[id].name + '">'
	                        + '<span class="childIcon"></span><a href="javascript:void(0);" class="spa-data-item">'
	                        + _data[id].name
	                        + '</a><span class="icon-nochecked"></span>'
                        	+'</div>';
                        $($parentSec[idx]).children('.spa-treeview-list-contacts').children('.last').before(list_html);
                    }
                    list_html = '';
                });
            
        });
    };

    toggleOrg = function(e) {
        e = e || window.event;
        e && e.preventDefault && e.preventDefault();
        e.stopPropagation();
        if (window.event) {
            e.cancelBubble = true;
        }
        var n = $(this);
        var _p = n.parent();

        if (n.hasClass('icon-opened') || n.hasClass('icon-closed')) {
            n.hasClass("icon-opened")
                ? n.removeClass("icon-opened").addClass("icon-closed") && _p.find('.spa-treeview-group-list-name.hasParent').hide() && _p.find('.spa-treeview-list-contacts').hide()
                : n.removeClass("icon-closed").addClass("icon-opened") && _p.find('.spa-treeview-group-list-name.hasParent').show() && _p.find('.spa-treeview-list-contacts').show();
        }
        return;
    };

    toggleCheck = function(e) {
        e = e || window.event;
        e.preventDefault && e.preventDefault();
        var n = $(this).next();
        if (n.hasClass('icon-checked') || n.hasClass('icon-nochecked')) {
            n.hasClass("icon-checked")
                ? n.removeClass("icon-checked").addClass("icon-nochecked") && n.parents('.spa-treeview-anchor').children('.icon-checked').removeClass("icon-checked").addClass("icon-nochecked")
                : n.removeClass("icon-nochecked").addClass("icon-checked") && n.parents('.spa-treeview-anchor').children('.icon-nochecked').removeClass("icon-nochecked").addClass("icon-checked");
        }
        return;
    };

	configModule = function(input_map) {
		
		return true;
	};
	/**
	 * [initModule 初始化树列表]
	 * @param  {[jquery]} $append_target [树列表容器]
	 * @return {[type]}                [函数返回值]
	 */
	initModule = function($append_target) {
		var $list_box;
		$append_target.append(configMap.main_html);
		stateMap.$append_target = $append_target;
		setJqueryMap();
        jqueryMap.$parentFir.html('<span style="display:none;" class="noUse"></span>')
		return true;
	};

    /**
     * [setData 为树列表填充值]
     * @param {[type]} data [Array]
     */
	setData = function(data) {
        var result = {
            self: [],
            parents: [],
            children: [],
            members: []
        };
        var _len = data.length;
        var id_arr = [];
        var _id = '';
        var k = 0;
        for (var i = 0, _len = data.length; i < _len; i++) {
            id_arr.push(data[i].id);
            data[i]['has-child-here-flag'] = 0;
            data[i]['has-parent-here-flag'] = 0;
        }
        for (var j = 0, _len = data.length; j < _len; j++) {
            var _data = data[j];
            _id = _data.parentid || _data.pId || '';
            k = id_arr.length;
            while (k--) {
                if (_id == id_arr[k]) {
                    data[k]['has-child-here-flag']++;
                    _data['has-parent-here-flag']++;
                }
            }
        }
        for (var m = 0, _len = data.length; m < _len; m++) {
            var _res = data[m];
            if (_res['has-child-here-flag'] && !_res['has-parent-here-flag']) {
                result.parents.push(_res);
            }
            if (_res['has-parent-here-flag'] && _res['has-child-here-flag']) {
                result.children.push(_res);
            }
            if (!_res['has-child-here-flag'] && _res['has-parent-here-flag']) {
                result.members.push(_res);
            }else if (!_res['has-child-here-flag'] && !_res['has-parent-here-flag']) {
                result.self.push(_res);
            }
        }
        console.log(result);
        console.log(data);

        addParents(result.parents);//填充无父级树菜单
        addOne(result.self);//填充无父级无子级树菜单
        addChildren(result.children);//填充有父级有子级树菜单
        addChildNode(result.members);//填充只有父级无子级树菜单
        return result;
    };
    
	return {
		configModule: configModule,
		initModule: initModule,
		addParents: addParents,
        addOne: addOne,
        addChildren: addChildren,
        addChildNode: addChildNode,
        setData: setData
	};
 }());