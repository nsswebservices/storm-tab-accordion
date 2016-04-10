/**
 * @name storm-tab-accordion: 
 * @version 0.1.0: Sun, 10 Apr 2016 18:21:23 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormTabAccordion = factory();
  }
}(this, function() {
	'use strict';
    
    var KEY_CODES = {
            RETURN: 13,
            TAB: 9
        },
        instances = [],
		triggerEvents = ['click', 'keydown', 'touchstart'],
        defaults = {
            tabClass: '.js-tab-accordion-tab',
            titleClass: '.js-tab-accordion-title',
            currentClass: 'active',
			active: 0
        },
        StormTabAccordion = {
			init: function(){
				this.tabs = [].slice.call(this.DOMElement.querySelectorAll(this.settings.tabClass));
				this.titles = [].slice.call(this.DOMElement.querySelectorAll(this.settings.titleClass));
				this.triggers = this.titles.concat(this.tabs);
				this.targets = this.tabs.map(function(el){
					return document.getElementById(el.getAttribute('href').substr(1)) || console.error('Tab target not found');
				 });
					
				this.current = this.settings.active;
				this.initAria();
				this.initTriggers(this.tabs);
				this.initTriggers(this.titles);
				this.open(this.current);
			},
			initAria: function() {
				this.triggers.forEach(function(el){
					STORM.UTILS.attributelist.set(el, {
						'role' : 'tab',
                        'tabIndex' : 0,
                        'aria-expanded' : false,
                        'aria-selected' : false,
						'aria-controls' : el.getAttribute('href') ? el.getAttribute('href').substr(1) : el.parentNode.getAttribute('id')
					});
				});
				this.targets.forEach(function(el){
					STORM.UTILS.attributelist.set(el, {
						'role' : 'tabpanel',
						'aria-hidden' : true,
						'tabIndex': '-1'
					});
				});
				return this;
			},
            initTriggers: function(triggers) {
                var handler = function(i){
                    this.toggle(i);
                };

                triggers.forEach(function(el, i){
                    triggerEvents.forEach(function(ev){
                        el.addEventListener(ev, function(e){
                            if(!!e.keyCode && e.keyCode === KEY_CODES.TAB) { return; }
                            if(!!!e.keyCode || e.keyCode === KEY_CODES.RETURN){
                                e.preventDefault();
                                handler.call(this, i);
                            }
                        }.bind(this), false);
                    }.bind(this));
                    
                }.bind(this));

                return this;
            },
            change: function(type, i) {
                var methods = {
                    open: {
                        classlist: 'add',
                        tabIndex: {
                            target: this.targets[i],
                            value: '0'
                        }
                    },
                    close: {
                        classlist: 'remove',
                        tabIndex: {
                            target: this.targets[this.current],
                            value: '-1'
                        }
                    }
                };

                STORM.UTILS.classlist(this.tabs[i])[methods[type].classlist](this.settings.currentClass);
                STORM.UTILS.classlist(this.titles[i])[methods[type].classlist](this.settings.currentClass);
                STORM.UTILS.classlist(this.targets[i])[methods[type].classlist](this.settings.currentClass);
                STORM.UTILS.attributelist.toggle(this.targets[i], 'aria-hidden');
                STORM.UTILS.attributelist.toggle(this.tabs[i], ['aria-selected', 'aria-expanded']);
                STORM.UTILS.attributelist.toggle(this.titles[i], ['aria-selected', 'aria-expanded']);
                STORM.UTILS.attributelist.set(methods[type].tabIndex.target, {
                    'tabIndex': methods[type].tabIndex.value
                });
            },
            open: function(i) {
                this.change('open', i);
                this.current = i;
                return this;
            },
            close: function(i) {
                this.change('close', i);
                return this;
            },
            toggle: function(i) {
				if(this.current === i) { return; }
				if(this.current === null) { 
					this.open(i);
					return this;
				}
				 this.close(this.current)
					.open(i);
				return this;
			}
		};
    
    function init(sel, opts) {
        var els = [].slice.call(document.querySelectorAll(sel));
        if(els.length === 0) {
            throw new Error('TabAccordion cannot be initialised, no augmentable elements found');
        }
        
        var tabAccordions = [];
		
		els.forEach(function(el, i){
            instances[i] = STORM.UTILS.assign(Object.create(StormTabAccordion), {
                DOMElement: el,
                settings: STORM.UTILS.merge({}, defaults, opts)
            });
            
            instances[i].init();
        });
        return instances;
    }
	
	function reload(els, opts) {
        destroy();
        init(els, opts);
    }
    
    function destroy() {
        instances = [];  
    }
    
	return {
		init: init,
        reload: reload,
        destroy: destroy
	};
	
 }));