if(typeof ZERG == "undefined") {
	var ZERG = {};
}
ZERG.gebcn = (typeof document['getElementsByClassName'] == "function");
if ( typeof ( ZERG.crc ) === "undefined" ) {
	ZERG.crc = {};
	ZERG.crcArr = [];
}
if ( typeof ( ZERG.lazyload ) === "undefined" ) {
	ZERG.lazyload = false;
}
(function() {
	var widgetId = '49076';
	var nodeId = 'zergnet-widget-'+widgetId;
	var node = document.getElementById(nodeId);
	var tries = 0;
	var lazyLoadComplete = false;
	var lastLazyLoadCheck = false;

	var elementIsInViewport = function( element, offset ){
		if ( !offset ) {
			offset = 0;
		}
		var bb = element.getBoundingClientRect();
		if ( bb.width > 0 && bb.top != 0 && bb.left >= 0 && bb.top < window.innerHeight + offset ) {
			return true;
		}

		return false;
	};

	var checkLazyLoad = function(e) {
		var dt = Date.now();
		var w;
		var ll;
		var delta = 50;
		if ( !lastLazyLoadCheck || dt-delta > lastLazyLoadCheck ) {
			if ( ZERG.gebcn ) {
				w = document.getElementsByClassName("widget-loaded");
				ll = document.getElementsByClassName("zerg-lazy");
			} else {
				var qsa = (typeof document['querySelectorAll'] == "function");
				if ( !qsa ) {
					var d=document, s=d.createStyleSheet();
					d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c};
				}
				w = document.querySelectorAll(".widget-loaded");
				ll = document.querySelectorAll(".zerg-lazy");
			}

			if ( ll.length == 0 && lazyLoadComplete ) {
				window.removeEventListener("scroll", checkLazyLoad);
				ZERG.lazyload = false;
			} else {
				for ( var i = 0; i < w.length; i++ ) {
					if ( elementIsInViewport( w[i], lazyLoadOffset ) ) {
						var imgs = w[i].getElementsByTagName("IMG");

						for ( var j = 0; j < imgs.length; j++ ) {
							var lazysrc = imgs[j].getAttribute("data-lazy-src");
							if ( lazysrc && imgs[j].src != lazysrc ) {
								imgs[j].src = lazysrc;
								imgs[j].className = imgs[j].className.replace(" zerg-lazy", "");
							}
						}
					}
				}
				lazyLoadComplete = true;
			}
		}
		lastLazyLoadCheck = dt;
	};

	var scale = function(node, slotStr) {
		var hs;
		if ( ZERG.gebcn ) {
			hs = node.getElementsByClassName("zergheadline");
		} else {
			var qsa = (typeof document['querySelectorAll'] == "function");
			if ( !qsa ) {
				var d=document, s=d.createStyleSheet();
				d.querySelectorAll=function(r,c,i,j,a){a=d.all,c=[],r=r.replace(/\[for\b/gi,'[htmlFor').split(',');for(i=r.length;i--;){s.addRule(r[i],'k:v');for(j=a.length;j--;)a[j].currentStyle.k&&c.push(a[j]);s.removeRule(0)}return c};
			}
			hs = node.querySelectorAll(".zergheadline");
		}

		for (var i = 0; i < hs.length; i++) {
			var h = hs[i];
			var alist = h.getElementsByTagName("A");
			if ( alist.length ) {
				var a, rect, comp, acomp, arect, oh, height, f, ms, mi, ah, tb, lg, iter;

				a = alist[0];
				rect = h.getBoundingClientRect();
				comp = window.getComputedStyle(h);

				oh = rect.height;
				height = oh - parseInt(comp.paddingTop) - (parseInt(comp.paddingBottom) / 2);

				f = 12;

				ms = 27;
				mi = 20;

				ah = a.offsetHeight;
				tb = false;
				lg = f;
				iter = 1;

				if ( ah > height ) {
					a.style.fontSize = f + "px";
					ah = a.offsetHeight;
				}

				while (f < ms && iter < mi && ah < height && !tb ) {
					var nr = h.getBoundingClientRect();
					if (nr.height > oh) {
						tb = true;
					} else {
						lg = f;
						f++;

						a.style.fontSize = f+"px";
						ah = a.offsetHeight;
					}
					iter++;
				}

				if ( lg != f ) {
					a.style.fontSize = lg+"px";
				}

				acomp = window.getComputedStyle(a);
				arect = a.getBoundingClientRect(a);
				if ( parseInt( arect.height ) < oh ) {
					if ( !a.getAttribute("data-orig-pt") ) {
						a.setAttribute("data-orig-pt", acomp.paddingTop);
					}
					ah = parseInt(arect.height) - parseInt(acomp.paddingTop) - parseInt(acomp.paddingBottom);
					a.style.paddingTop = (Math.floor((oh-ah)/2)-1)+"px";
				}
			}
		}
	};

	var loadWidget = function() {
		var timestamp = new Date().getTime();
		var randcallback = Math.floor((Math.random() * 9999999) + 1);
		var JSONP=(function(){var a=randcallback,c,f,b,d=this;function e(j){var i=document.createElement("script"),h=false;i.src=j;i.async=true;i.onload=i.onreadystatechange=function(){if(!h&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){h=true;i.onload=i.onreadystatechange=null;if(i&&i.parentNode){i.parentNode.removeChild(i)}}};if(!c){c=document.getElementsByTagName("head")[0]}c.appendChild(i)}function g(h,j,k){f="?";j=j||{};for(b in j){if(j.hasOwnProperty(b)){f+=encodeURIComponent(b)+"="+encodeURIComponent(j[b])+"&"}}var i="json"+(++a);d[i]=function(l,z){k(l,z);try{delete d[i]}catch(m){}d[i]=null;};e(h+f+"callback="+i);return i}return{get:g}}());
		if ( typeof ZERG['running'] === "undefined" ) {
			ZERG['running'] = 1;
		} else if ( ZERG['running'] ) {
			tries++;
			if ( tries >= 10 ) {
				ZERG['running'] = 0;
			}
			setTimeout( loadWidget, 200 );
			return false;
		} else if ( ZERG['running'] == 0 ) {
			ZERG['running'] = 1;
		}
		var payload = {id:widgetId,time:timestamp,sc:1};
		if ( ZERG.crcArr.length ) {
			payload['crc'] = JSON.stringify( ZERG.crcArr );
		}
		JSONP.get( 'https://www.zergnet.com/output.js', payload, function(data, crc){
			ZERG['running'] = 0;
			if ( lazyLoad ) {
				if ( !elementIsInViewport(node, lazyLoadOffset) ) {
					var f = document.createDocumentFragment();
					var t = document.createElement("DIV");
					t.innerHTML = data;
					f.appendChild(t);

					if ( f.childNodes.length ) {
						var imgs = f.childNodes[0].getElementsByTagName("IMG");
						for ( var i = 0; i < imgs.length; i++ ) {
							imgs[i].setAttribute("data-lazy-src",imgs[i].src);
							imgs[i].src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
							if ( imgs[i].className.indexOf( "zerg-lazy" ) === -1 ) {
								imgs[i].className += " zerg-lazy";
							}
						}
						data = f.childNodes[0].innerHTML;
					}
				}
			}

			if (typeof window.opera != 'undefined') {
				document.write(data);
			} else {
				node.innerHTML =   data;
			}
			if ( typeof( crc ) !== "undefined" && crc.length ) {
				for ( var i = 0; i < crc.length; i++ ) {
				ZERG.crc[crc[i]] = crc[i];
				ZERG.crcArr.push( crc[i] );
					if ( ZERG.crcArr.length > 30 ) {
						var val = ZERG.crcArr.shift();
						if ( typeof( ZERG.crc[val] ) ) {
							delete( ZERG.crc[val] );
						}
					}
				}
			}
			if ( shouldScale ) {
				scale(node,node.getAttribute("data-scaling"));
			}
		});
	};

	var shouldScale = node.getAttribute("data-scaling");
	var lazyLoadOffset = node.getAttribute("data-lazyload");
	var lazyLoad = false;
	if ( lazyLoadOffset != null ) {
		lazyLoadOffset = parseInt( lazyLoadOffset );
		if ( lazyLoadOffset < 500 ) {
			lazyLoadOffset = 500;
		} else if ( lazyLoadOffset > 2000 ) {
			lazyLoadOffset = 2000;
		}
		lazyLoad = true;
	}
	if ( lazyLoad && !ZERG.lazyload ) {
		ZERG.lazyload = true;
		window.addEventListener("scroll",checkLazyLoad,false);
		checkLazyLoad();
	}

	if ( node && typeof( node.className ) !== "undefined" && node.className.indexOf("widget-loaded") === -1 ) {
		if ( node.className ) {
			node.className += " ";
		}
		node.className += "widget-loaded";

		loadWidget();
	} else if ( !node && typeof( console ) !== "undefined" && typeof("console.log") !== "undefined" ) {
		console.log("ZERG CONTAINER MISSING: "+nodeId);
	} else if ( node && typeof( node.className ) !== "undefined" && node.className.indexOf("widget-loaded") !== -1 && typeof( console ) !== "undefined" && typeof("console.log") !== "undefined" ) {
		console.log("ZERG CONTAINER ALREADY LOADED: "+nodeId);
	}

    if ( shouldScale ) {
		window.addEventListener("load",function(){
			if ( typeof( document.fonts ) !== "undefined" && typeof( document.fonts.ready ) !== "undefined" ) {
				document.fonts.ready.then(function(){
					scale(node,node.getAttribute("data-scaling"));
				});
			} else {
				setTimeout( function() {
					scale(node,node.getAttribute("data-scaling"));
				}, 250 );
			}
		});
    }
})();

