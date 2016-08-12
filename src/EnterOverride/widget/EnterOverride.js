/**
	EnterOverride
	========================

	@file      : EnterOverride.js
	@version   : 1.0
	@author    : Jasper van der Hoek
	@date      : 1/26/2015
	@copyright : Mendix
	@license   : Please contact our sales department.

	Documentation
	=============
	
*/
(function() {
    'use strict';

    require([

        'mxui/widget/_WidgetBase', 'dijit/_Widget',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/on', 'dojo/_base/lang', 'dojo/_base/declare', 'dojo/text'

    ], function (_WidgetBase, _Widget, domMx, dom, domQuery, domProp, domGeom, domClass, domStyle, on, lang, declare, text) {

	
		// Declare widget.
		return declare('EnterOverride.widget.EnterOverride', [ _WidgetBase, _Widget], {
			//DECLARATION
			delay : 100,
			
            postCreate: function () {
                this.actLoaded();
            },
			startup : function() {
			//this._setFocus();
			},
			
		applyContext : function(context, callback){
				this._setFocus();
				callback && callback();
		},

			eventOnKeyUp : function(e) {
				if (e.keyCode == null || e.keyCode == dojo.keys.ENTER){
					console.info("Enter pressed");

					var parentElement = this.getParentElement();
					
                    var fieldList = domQuery('input, select, textarea, button', parentElement);
					console.debug("EnterOverride - Found: " + fieldList.length + " input field");
					
					if( fieldList.length == 0 )
						return;
					
					if( document.activeElement == null ) 
						fieldList[0].focus();
					else {
						// If there a validation error was found, take the first one.
						for ( var i = 0; i < fieldList.length; i++ ) {
							var node = fieldList[i];
							var next = i+1;
							if( node == document.activeElement && next < fieldList.length) {
								setTimeout(100, fieldList[next].focus());
								break;
							}
						}
					}
					
					
					//this.onChange();
					//this.eventCheckDelay();
				}
			},
			
			getParentElement : function() {
				var counter = 0;
				var hasDV = false;
				
				var parentElement = null;
				var element = this.domNode;
				
				while( hasDV == false && counter < 5) {
					parentElement = element.parentElement;
					
					if( parentElement.hasAttribute("widgetid") ) {
						var attr = parentElement.getAttribute("widgetid");
						if( attr != null && attr.indexOf("widget_DataView") > -1)
							hasDV = true;
					}
					else 
						element = parentElement;
				
					counter++;
				} 
				
				if( !hasDV )
					return this.domNode.parentElement;
					
				return parentElement;
			},
	
            /**
             * Interaction widget methods.
             * ======================
             */
            _setFocus: function () {
                var 
                    delay,
                    inputNodeList,
                    node,
                    parentElement,
                    fieldList;
                    
                parentElement = this.getParentElement();
                var _self = this;
				
				setTimeout(function () {
                    fieldList = domQuery('input, select, textarea, button', parentElement);
					console.debug("EnterOverride - Found: " + fieldList.length + " input field");
                    // If there a validation error was found, take the first one.
                    for ( var i = 0; i < fieldList.length; i++ ) {
                        // We got the div with the error message but we need the parent. 
                        node = fieldList[i];                    

						_self.connect(node, "onkeyup", dojo.hitch(_self, _self.eventOnKeyUp));
                        
                    }
                }, _self.delay);
            }
		});;
    });

}());;
