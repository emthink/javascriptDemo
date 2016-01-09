---
layout: post
title: New Post
date: 2016-01-07 13:59:55 +08:00
tags: ["JavaScript", "Plugin", "插件"]
---

# JavaScript之树列表插件实现

treeViewPlugin，一个可以生成任意多级树列表的js插件，使用了jquery事件委托处理跨浏览器添加事件监听及DOM操作实现需求。

## API说明

### 插件定义

```

	var treeViewPlugin = (function() {  //插件定义、封装
		//插件实现
	}());
```

### 插件API

```
	
	return {
		initModule: initModule,  //初始化树列表
		addParents: addParents,  //给树列表添加父级菜单
        addChild: addChild,  //给树列表添加子级菜单
        addChildNode: addChildNode,  //
		setData: setData //给插件树设置值
	};
```

#### 初始化

```

	/**
	 * [initModule 初始化树列表]
	 * @param  {[type]} $append_target [树列表容器]
	 *	 $('.treeviewCont')
	 * @return {[type]}                [函数返回值]
	 */
	initModule = function($append_target) {
		//具体实现
	};
```

#### 添加无父级有子级菜单

```

	/**
	 * [addParents 添加无父级有子级菜单
	 * @param {[Array]} _data [菜单数据]
	 * [{
	 * 		id: 菜单id,
	 * 		name: 菜单显示值
	 * 
	 * }]
	 */
	addParents = function(_data) {
		//具体实现
	};
```

#### 添加无父级无子级菜单

```

	/**
	 * [addOne 添加无父级无子级菜单
	 * @param {[Array]} _data [菜单数据]
	 * [{
	 * 		id: 菜单id,
	 * 		name: 菜单显示值
	 * 
	 * }]
	 */
	addOne = function(_data) {
		//具体实现
	};
```

#### 添加有父级有子级菜单

```

	/**
     * [addChild 添加有父级有子级菜单]
     * @param {[Array]} _data [菜单数据]
     * [{
     * 		id: 菜单id,
     * 		name: 菜单显示值,
     * 		pId: 父级菜单id
     * }]
     */
    addChild = function(_data) {
    	  //具体实现
    };
```

#### 添加有父级无子级的菜单

```

	/**
     * [addChildNode 添加有父级无子级菜单]
     * @param {[Array]} _data [菜单数据]
     * [{
     * 		id: 菜单id,
     * 		name: 菜单显示值,
     * 		pId: 父级菜单id
     * }]
     */
     addChildNode = function(_data) {
     	  //具体实现
     };
```

#### setData为树列表填充值

```

	/**
     * [setData 为树列表填充值]
     * @param {[type]} data [Array]
     */
	setData = function(data) {
		var result = {
            self: [],  //无父级无子级树菜单集合
            parents: [],  //无父级有子级树菜单集合
            children: [],  //填充有父级有子级树菜单集合
            members: [] //填充只有父级无子级树菜单集合
        };
        //具体实现...
        for (var i = 0, _len = data.length; i < _len; i++) {
            id_arr.push(data[i].id);
            data[i]['has-child-here-flag'] = 0; //有无子级标志，默认0为无
            data[i]['has-parent-here-flag'] = 0; //有无父级标志，默认0为无
        }
        //...
		addParents(result.parents);//填充无父级有子级树菜单
        addOne(result.self);//填充无父级无子级树菜单
        addChildren(result.children);//填充有父级有子级树菜单
        addChildNode(result.members);//填充只有父级无子级树菜单
        return result;
	};
```

## demo展示

```

		<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Treeview Plugin Demo</title>
		<link rel="stylesheet" href="./css/js-treeview-plugin.css">
		<style>
			.container {
				width: 100%;
				height: 100%;
				text-align: center;
			}
			.treeviewCont {
				width: 300px;
				height: 300px;
				margin: 0 auto;
				margin-top: 100px;
			}
			
		</style>
	</head>
	<body>
		<h1>Treeview Plugin Demo</h1>
		<div class="container">
			<div class="treeviewCont"></div>
		</div>
		<span id="busuanzi_container_site_pv">
	    	本站总访问量<span id="busuanzi_value_site_pv"></span>次
		</span>
		<script src="./js/jquery-1.11.3.js"></script>
		<script src="./js/js-treeview-plugin.js"></script>
		<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>

		<script>
			$(function() {
				var tree = $('.treeviewCont');
	            var data = [
	                {
	                    name: '一级菜单1',
	                    id: 'id_01'
	                },
	                {
	                    name: '一级菜单2',
	                    id: 'id_02'
	                },
	                {
	                    name: '一级菜单3',
	                    id: 'id_03'
	                },
	                {
	                    name: '一级菜单4',
	                    id: 'id_04'
	                },
	                {
	                    pId: 'id_01',
	                    name: '二级菜单1001',
	                    id: 'id_01_001'
	                },
	                {
	                    pId: 'id_01',
	                    name: '二级菜单102',
	                    id: 'id_01_02'
	                },
	                {
	                    pId: 'id_03',
	                    name: '二级菜单3001',
	                    id: 'id_03_001'
	                },
	                {
	                    pId: 'id_04',
	                    name: '二级菜单4001',
	                    id: 'id_04_001'
	                },	   
	                {
	                    pId: 'id_03',
	                    name: '二级菜单3002',
	                    id: 'id_03_002'
	                },
	                {
	                    pId: 'id_04',
	                    name: '二级菜单4002',
	                    id: 'id_04_002'
	                },
	                {
	                    pId: 'id_01_02',
	                    name: '三级菜单12001',
	                    id: 'id_01_02_001'
	                },
	                {
	                    pId: 'id_00',
	                    name: '一级菜单5',
	                    id: 'id_05'
	                }
	            ];
				treeViewPlugin.initModule(tree);
	            treeViewPlugin.setData(data);
				
			});
		</script>
	</body>
	</html>

```

**此插件只是初步实现，更多功能待完善，实际使用可根据实际需求做相应修改，欢迎大家一起分享、交流、学习。**
