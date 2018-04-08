if(!jQuery.easing.easeInQuad){jQuery.extend(jQuery.easing,{easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInExpo:function(e,f,a,h,g){return(f===0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f===0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h===0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;i=j/4}else{i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h===0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;i=j/4}else{i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h===0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;i=j/4}else{i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g===undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g===undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g===undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}})};(function(a){a.pixelentity=a.pixelentity||{version:"1.0.0"};a.pixelentity.Geom={getScaler:function(o,j,k,n,g,i,c){var e={};var d=n/i;var m=g/c;var b;if(typeof o=="string"){switch(o){case"fill":case"fillmax":b=d>m?d:m;if(o=="fill"){b=Math.min(1,b)}break;case"fit":case"fitmax":b=d<m?d:m;if(o=="fit"){b=Math.min(1,b)}break;case"none":b=1;break}}else{b=o}e.ratio=b;e.diff={};e.offset={};e.align={w:j,h:k};var l=e.diff;var f=e.offset;l.w=f.w=n-i*b;l.h=f.h=g-c*b;switch(j){case"center":f.w=l.w/2;break;case"left":f.w=0;break}switch(k){case"center":f.h=l.h/2;break;case"top":f.h=0;break}return e},splitProps:function(b,d){var c=b.split(/,/);return d?{h:parseFloat(c[0]),w:parseFloat(c[1])}:{h:c[0],w:c[1]}}}}(jQuery));(function(c){c.pixelentity=c.pixelentity||{version:"1.0.0"};if(c.pixelentity.ticker){return}var i=[];var b=0;function a(){return(new Date()).getTime()}var h,f,d;var g=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||false;function e(){var m,l;if(b>0){m=a();for(var k in i){l=i[k];if(l.paused){continue}if(m-l.last>=l.each){l.callback(l.last,m);l.last=m}}if(g){g(e)}}}var j=c.pixelentity.ticker={register:function(l,k){b++;k=(typeof k=="undefined")?33:k;if(k>0){k=parseInt(1000/k,10)}else{if(c.browser.mozilla){k=parseInt(1000/50,10)}}i.push({callback:l,last:a(),each:k,delay:0});if(b==1){if(g){g(e)}else{h=setInterval(e,16);f=setInterval(e,20);d=setInterval(e,30)}}},pause:function(l){for(var k in i){if(i[k].callback==l){i[k].paused=true}}},resume:function(l){for(var k in i){if(i[k].callback==l){i[k].paused=false}}},unregister:function(l){for(var k in i){if(i[k].callback==l){delete i[k];b--}}if(b<=0){clearInterval(h);clearInterval(f);clearInterval(d)}}}}(jQuery));(function(e){e.pixelentity=e.pixelentity||{version:"1.0.0"};if(e.pixelentity.youtube){return}var f=false;var a=window.YT&&window.YT.Player;var d=[];function b(){for(var g=0;g<d.length;g++){d[g](a)}}function c(){if(f){return}f=true;var g=document.createElement("script");g.src="http://www.youtube.com/player_api";var h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(g,h);window.onYouTubePlayerAPIReady=function(){a=YT.Player;b()}}e.pixelentity.youtube=function(g){if(a){g(a)}else{d.push(g);c()}}}(jQuery));(function(c){c.pixelentity=c.pixelentity||{version:"1.0.0"};if(c.pixelentity.vimeo){return}var a=0;function b(h,e){var d=this;var f;function j(){a++;var k=c('<iframe id="pe_vimeo_player'+a+'" src="http://player.vimeo.com/video/'+e.videoId+"?autoplay="+(e.playerVars.autoplay?1:0)+"&loop="+(e.playerVars.loop?1:0)+"&api=1&player_id=pe_vimeo_player"+a+"&origin="+location.href.match(/:\/\/(.[^\/]+)/)[1]+'" width="'+e.width+'" height="'+e.height+'" frameborder="0"></iframe>')[0];c(h).append(k);f=new Froogaloop(k);f.addEvent("ready",g);setTimeout(g,4000)}function g(){if(f){f.removeEvent("ready",g);c(d).trigger("video_ready.pixelentity");f.addEvent("finish",i)}}function i(){c(d).trigger("video_ended.pixelentity")}c.extend(d,{destroy:function(){if(f){f.removeEvent("ready",g);f.removeEvent("finish",i);c(f.element).remove();delete f.element;f=undefined}d=undefined}});j()}c.pixelentity.vimeo=function(d){d(b)}}(jQuery));(function(f){var l="0px 0px";var k="bilinear";var d=function(ad,ac,ab){function C(o,m){for(var p in o){if(U[o[p]]!==ab){return m=="pfx"?o[p]:!0}}return !1}function D(o,m){return !!~(""+o).indexOf(m)}function E(o,m){return typeof o===m}function F(o,m){return G(R.join(o+";")+(m||""))}function G(m){U.cssText=m}var aa="2.0.6",Z={},Y=ac.documentElement,X=ac.head||ac.getElementsByTagName("head")[0],W="modernizr",V=ac.createElement(W),U=V.style,T,S=Object.prototype.toString,R=" -webkit- -moz- -o- -ms- -khtml- ".split(" "),Q={},P={},O={},M=[],K=function(m,u,t,s){var r,q,p,o=ac.createElement("div");if(parseInt(t,10)){while(t--){p=ac.createElement("div"),p.id=s?s[t]:W+(t+1),o.appendChild(p)}}r=["&shy;","<style>",m,"</style>"].join(""),o.id=W,o.innerHTML+=r,Y.appendChild(o),q=u(o,m),o.parentNode.removeChild(o);return !!q},J,I={}.hasOwnProperty,H;!E(I,ab)&&!E(I.call,ab)?H=function(o,m){return I.call(o,m)}:H=function(o,m){return m in o&&E(o.constructor.prototype[m],ab)};var N=function(m,q){var p=m.join(""),o=q.length;K(p,function(r,w){var v=ac.styleSheets[ac.styleSheets.length-1],u=v.cssRules&&v.cssRules[0]?v.cssRules[0].cssText:v.cssText||"",t=r.childNodes,s={};while(o--){s[t[o].id]=t[o]}Z.csstransforms3d=s.csstransforms3d.offsetLeft===9},o,q)}([,["@media (",R.join("transform-3d),("),W,")","{#csstransforms3d{left:9px;position:absolute}}"].join("")],[,"csstransforms3d"]);Q.csstransforms3d=function(){var m=!!C(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]);m&&"webkitPerspective" in Y.style&&(m=Z.csstransforms3d);return m};for(var L in Q){H(Q,L)&&(J=L.toLowerCase(),Z[J]=Q[L](),M.push((Z[J]?"":"no-")+J))}G(""),V=T=null,Z._version=aa,Z._prefixes=R,Z.testProp=function(m){return C([m])},Z.testStyles=K;return Z}(this,this.document);var g=/progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/;var c=document.createElement("modernizr"),e=c.style;function j(){var m={transformProperty:"",MozTransform:"-moz-",WebkitTransform:"-webkit-",OTransform:"-o-",msTransform:"-ms-"};for(var o in m){if(typeof e[o]!="undefined"){return m[o]}}return null}function n(){var o=["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"];for(var m in o){if(e[o[m]]!==undefined){return true}}return false}var a=j(),h=a!==null?a+"transform":false,i=a!==null?a+"transform-origin":false;f.support.csstransforms=n();f.support.hw3dTransform=(d.csstransforms3d&&f.browser.webkit);if(a=="-ms-"){h="msTransform";i="msTransformOrigin"}function b(p,s,y,x,v,q){if(f.support.csstransforms){var t;var u="px";if(v&&q&&(parseInt(y)!=y||parseInt(x)!=x)){y=100*y/v;x=100*x/q;u="%"}if(f.support.hw3dTransform){t=(y!==undefined)?"translate3d("+y+u+","+x+u+",0) ":"translateZ(0) "}else{t=(y!==undefined)?"translate("+y+u+","+x+u+") ":""}f(p).css(i,l).css(h,t+"scale("+s+")")}else{if(f.browser.msie){var m=p.style;var r='progid:DXImageTransform.Microsoft.Matrix(FilterType="'+k+'",M11='+s+",M12=0,M21=0,M22="+s+",Dx="+y+",Dy="+x+")";var o=m.filter||f.css(p,"filter")||"";m.filter=g.test(o)?o.replace(g,r):o?o+" "+r:r}}}f.fn.transform=function(r,p,o,m,q){this.each(function(){b(this,r,p,o,m,q)});return this}})(jQuery);var Froogaloop=(function(){function c(m){return new c.fn.init(m)}var l={},e=false,k=Array.prototype.slice;c.fn=c.prototype={playerDomain:"",element:null,init:function(m){if(typeof m==="string"){m=document.getElementById(m)}this.element=m;return this},api:function(s,p){if(!this.element||!s){return false}var m=this,o=m.element,n=o.id!=""?o.id:null,q=!d(p)?p:null,r=d(p)?p:null;if(r){i(s,r,n)}j(s,q,o);return m},addEvent:function(n,q){if(!this.element){return false}var m=this,p=m.element,o=p.id!=""?p.id:null;i(n,q,o);if(n!="ready"){j("addEventListener",n,p)}if(e){return m}playerDomain=a(p.getAttribute("src"));if(window.addEventListener){window.addEventListener("message",b,false)}else{window.attachEvent("onmessage",b,false)}e=true;return m},removeEvent:function(n){if(!this.element){return false}var m=this,p=m.element,o=p.id!=""?p.id:null,q=f(n,o);if(n!="ready"&&q){j("removeEventListener",n,p)}}};function j(q,p,o){if(!o.contentWindow.postMessage){return false}var m=o.getAttribute("src").split("?")[0],n=JSON.stringify({method:q,value:p});o.contentWindow.postMessage(n,m)}function b(o){if(o.origin!=playerDomain){return false}var q=JSON.parse(o.data),p=q.value,t=q.event||q.method,n=q.data,m=m==""?null:q.player_id,s=g(t,m),r=[];if(!s){return false}if(p!==undefined){r.push(p)}if(n){r.push(n)}if(m){r.push(m)}return r.length>0?s.apply(null,r):s.call()}function i(m,o,n){if(n){if(!l[n]){l[n]={}}l[n][m]=o}else{l[m]=o}}function g(m,n){if(n){return l[n][m]}else{return l[m]}}function f(m,n){if(n&&l[n]){if(!l[n][m]){return false}l[n][m]=null}else{if(!l[m]){return false}l[m]=null}return true}function a(n){var q=n.split("/"),m="";for(var o=0,p=q.length;o<p;o++){if(o<3){m+=q[o]}else{break}if(o<2){m+="/"}}return m}function d(m){return !!(m&&m.constructor&&m.call&&m.apply)}function h(m){return toString.call(m)==="[object Array]"}c.fn.init.prototype=c.fn;return(window.Froogaloop=c)})();(function(c){c.pixelentity=c.pixelentity||{version:"1.0.0"};c.pixelentity.video={conf:{},getType:function(e){return"video/"+e.match(/(\w+)$/)[1].replace("ogv","ogg")},fallbackPlayer:"js/template/video/jarisplayer.swf"};var a=navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);var d=0;function b(s,l){var j=c(this);var k=s;var p;var q;var n=false;function f(){switch(l.type){case"youtube":c.pixelentity.youtube(i);break;case"vimeo":c.pixelentity.vimeo(e);break;case"vidly":g(["http://vid.ly/"+l.videoId+"?content=video&format=mp4","http://vid.ly/"+l.videoId+"?content=video&format=webm","http://vid.ly/"+l.videoId+"?content=video&format=ogv"],l.poster);break;case"local":g(l.videoId,l.poster);break}}function g(w,y){d++;var x="pe_local_player_"+(d);var t=c('<div id="'+(x)+'"/>').css({"background-color":"black",width:l.width,height:l.height});k.html(t[0]);var v={};for(var u=0;u<w.length;u++){v[u]={src:w[u],type:c.pixelentity.video.getType(w[u])}}p=new projekktor("#"+x,{controls:true,volume:0.9,_width:l.width,_height:l.height,_autoplay:true,enableFullscreen:false,imageScaling:"fill",videoScaling:"aspectratio",poster:y,playerFlashMP4:c.pixelentity.video.fallbackPlayer,playerFlashMP3:c.pixelentity.video.fallbackPlayer,playlist:[v]});p.addListener(a?"ready":"buffer",h)}function h(t){if(a){setTimeout(o,100);p.removeListener("ready",h)}else{if(t=="FULL"){p.removeListener("buffer",h);o()}}}function i(t){var u=c("<div/>");k.append(u);p=new t(u[0],{height:l.height,width:l.width,videoId:l.videoId,playerVars:{theme:"dark",wmode:"opaque",autohide:0,enablejsapi:1,origin:location.href.match(/:\/\/(.[^\/]+)/)[1],loop:l.loop?1:0,hd:l.hd?1:0,autoplay:l.autoPlay?1:0,showinfo:0,iv_load_policy:3,modestbranding:1,showsearch:0,fs:0},events:{onStateChange:r,onReady:o}});q=setInterval(r,250);if(c.browser.msie&&c.browser.version<8){setTimeout(o,1000)}}function o(){if(!n){j.trigger("video_ready.pixelentity");n=true}}function e(t){p=new t(k[0],{height:l.height,width:l.width,videoId:l.videoId,playerVars:{autohide:0,origin:location.href.match(/:\/\/(.[^\/]+)/)[1],loop:l.loop?1:0,autoplay:l.autoPlay?1:0}});c(p).one("video_ready.pixelentity",o).one("video_ended.pixelentity",m)}function m(){j.trigger("video_ended.pixelentity")}function r(){if(!p){return}if(p.getPlayerState){switch(p.getPlayerState()){case YT.PlayerState.ENDED:j.trigger("video_ended.pixelentity");break;case YT.PlayerState.PLAYING:if((p.getDuration()-p.getCurrentTime())<0.4){j.trigger("video_ended.pixelentity")}break}}}c.extend(this,{bind:function(u,t){j.bind(u,t)},one:function(u,t){j.one(u,t)},destroy:function(){clearInterval(q);if(j){j.remove()}j=undefined;if(p){c(p).unbind("video_ended.pixelentity");switch(l.type){case"vidly":case"local":p.removeListener(a?"ready":"buffer",h);if(p.selfDestruct){p.selfDestruct()}break;default:if(p.destroy){p.destroy()}}}p=undefined;k.data("peVideo",null);k=undefined}});f()}c.fn.peVideo=function(e){var f=this.data("peVideo");if(f){return f}e=c.extend(true,{},c.pixelentity.video.conf,e);this.each(function(){f=new b(c(this),e);c(this).data("peVideo",f)});return e.api?f:this}}(jQuery));(function(h){h.pixelentity=h.pixelentity||{version:"1.0.0"};h.pixelentity.kenburnsImg={conf:{zoom:"random",align:"random",pan:"random",duration:"15",paused:false}};var c={width:0,height:0,"margin-left":0,"margin-top":0};var k=["top","center","bottom"];var i=["left","center","right"];var j=false;var a=false;var f=false;var e=h.browser.msie&&h.browser.version>8;if(h.browser.msie){j=true;f=h.browser.msie}if(!j&&!!document.createElement("canvas").getContext){a=true}var b=navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);if(b){j=true;a=false}function d(s,n,m,r,q,p,o){if(a){if(n){try{n.clearRect(0,0,n.canvas.width,n.canvas.height)}catch(l){}n.drawImage(s[0],p,o,m*q,r*q)}}else{if(j){if(s){s.transform(q,p,o,m,r)}}else{c.width=Math.round(m*q);c.height=Math.round(r*q);c["margin-left"]=p;c["margin-top"]=o;if(s){s.css(c)}}}}function g(D,z){var E=this;var O=D;if(a){D.hide()}var N,v,B,J,p,K,P,G,F,r,M,C,A,m=500,y=0,q,l;var n,H,I;var L=false;function o(){var t;if(y>0){P=G;F=r;p=K}else{t=h.pixelentity.Geom.getScaler(n=="out"?"fill":"none",I.w,I.h,B,J,N,v);P=t.offset.w;F=t.offset.h;p=t.ratio}t=h.pixelentity.Geom.getScaler(n=="in"?"fill":"none",H.w,H.h,B,J,N,v);G=t.offset.w;r=t.offset.h;K=t.ratio;M=0;C=0;m=parseFloat(z.duration)*33;A=e?20:0;y++}function u(){return k[parseInt(Math.random()*2+0.5,10)]+","+i[parseInt(Math.random()*2+0.5,10)]}function x(){n=z.zoom=="random"?(Math.random()>0.5?"out":"in"):z.zoom;I=h.pixelentity.Geom.splitProps(z.align=="random"?u():z.align);H=h.pixelentity.Geom.splitProps(z.pan=="random"?u():z.pan)}function s(){if(L){return}var t=A/m;var R=p+(K-p)*t;var Q=P+(G-P)*t;var w=F+(r-F)*t;d(O,q,N,v,R,Q,w);A++;if((A+(e?20:0))>m){E.pause()}}h.extend(E,{init:function(w){N=D.width()||D[0].width;v=D.height()||D[0].height;var t=D.parent();while(t&&!t.width()){t=t.parent()}B=t?t.width():800;J=t?t.height():600;O.css("image-rendering","optimizeQuality").css("-ms-interpolation-mode","bicubic");if(f){O.parent().css("background-color","black")}E.start()},start:function(){y=0;x();o();L=false;if(a){if(!q){l=h('<canvas width="'+B+'" height="'+J+'"></canvas>');q=l[0];O.hide().after(l);q=q.getContext("2d");q.fillStyle="rgb(255,255,255)"}}if(z.paused){s();L=true}h.pixelentity.ticker.register(s)},stop:function(){h.pixelentity.ticker.unregister(s)},reset:function(){L=true;y=0;x();o();L=false},getTarget:function(){if(l){return l}return O},pause:function(){L=true},resume:function(){L=false},destroy:function(){E.paused=true;E.stop();if(a&&l){l.remove();l=undefined;q=undefined}E=undefined;O.data("peKenburnsImg",null);O=undefined}});if((!D.width())&&(!D[0].width)){D.one("load",E.init)}else{E.init()}}h.fn.peKenburnsImg=function(l){var m=this.data("peKenburnsImg");if(m){m.start();return m}l=h.extend(true,{},h.pixelentity.kenburnsImg.conf,l);this.each(function(){m=new g(h(this),l);h(this).data("peKenburnsImg",m)});return l.api?m:this}})(jQuery);(function(d){d.pixelentity=d.pixelentity||{version:"1.0.0"};d.pixelentity.kenburnsSlider={conf:{externalFont:false}};var f=["id","class","data-src"];var e=d.browser.msie&&d.browser.version>7&&d.browser.version<9;function b(j,l,k,h){var i=(1<<24)|(parseInt(l,10)<<16)|(parseInt(k,10)<<8)|parseInt(h,10);return"#"+i.toString(16).substr(1)}var a=navigator.userAgent.toLowerCase().match(/chrome\/(\d+)/);if(a){a=a[1]==18}function c(ao,aY){var a6=this;var aM=ao.addClass("peKenBurns").removeClass("peNoJs");var aI=false;var q=true;var aO;if(aM.is("img")){var C=false;if(ao.parent().is("a")){C=true}var bl='<img src="'+ao.attr("src")+'" data-src="'+(ao.attr("data-src")||"")+'"/>';var m=d('<div class="peKenBurns" data-autopause="none" data-controls="disabled" data-shadow="'+(ao.attr("data-shadow")||"disabled")+'" data-logo="disabled"><div class="peKb_slides" ><div class="peKb_active" data-delay="'+(ao.attr("data-delay")||"3")+'" data-duration="'+(ao.attr("data-duration")||"10")+'">'+bl+(ao.attr("alt")?"<h1>"+ao.attr("alt")+"</h1>":"")+'</div><div data-delay="'+(ao.attr("data-delay")||"3")+'" data-duration="'+(ao.attr("data-duration")||"15")+'">'+bl+"</div></div></div>");ao.replaceWith(m);aM=ao=m;ao.data("peKenburnsSlider",this);if(C){ao.css("cursor","pointer")}aI=true}else{ao.css({"background-color":"transparent","-moz-border-radius":"0px","-webkit-border-radius":"0px","border-radius":"0px",padding:"0px"})}aM.addClass("peActiveWidget").bind("enable.pixelentity ",ap).bind("disable.pixelentity ",Z);var aN=d.pixelentity&&d.pixelentity.kenburnsImg&&(ao.attr("data-mode")!="swipe");var L=false;var bc=true;(function(){var h=ao.attr("data-autopause");if(h){L=h.match(/controls/)!==null;bc=h.match(/image/)!==null}})();var aF=d('<div class="peKb_spinner"></div>');var G=d('<div class="peKb_videooverlay"></div>');var aL="";if(ao.attr("data-captions")!="disabled"){aL=d('<div class="peKb_caption"></div>')}var bt=false;if(ao.attr("data-thumb")!="disabled"){bt=d('<div class="peKb_Thumb"><div>');var p=bt.find("div");var aj=bt.find("img");var aQ=false}var aq=d('<div class="peKb_timer"><div class="peKb_overlay"></div></div>');var N;var ar;var be;var X;var R;var U=0;var aT=0;var l=0;var aa=800;var ag=0;var y;var aU;var v=-1;var ah;var K=[];var Q=false;var aC=false;var am=ao.width();var av=ao.height();var Y=!(d.browser.msie&&d.browser.version>=7&&d.browser.version<9);var A=false;var H;var I=0;var bj=-1;var a1=false;var g=false;var bm=false;var ab=false;var bn=0;var ai;var k=false;var W=false;var s=false;var ac=false;var aV=(ao.attr("data-shadow")!="disabled");var au=(ao.attr("data-controls")!="disabled");var D=(ao.attr("data-controls")=="inner"||ao.attr("data-controls")=="inner-over");var n=(ao.attr("data-logo")=="enabled");var aP=navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);var bo=ao.attr("data-caption-align")||false;if(bo){bo=d.pixelentity.Geom.splitProps(bo)}var aw=ao.attr("data-fade")||0;aw=parseInt(aw*1000,10);if(n){ao.css("overflow","visible")}if(aI&&aV){av-=36}if(!aI&&aV&&!au){av-=50}if(!aI&&!aV&&D){av+=50}var bf=ao.find("div.peKb_slides");if(bf.length===0){ao.wrapInner('<div class="peKb_slides"></div>');bf=ao.find("div.peKb_slides")}var P=parseInt(bf.css("padding-left").replace(/px/,""),10)||0;var bq="";if(au){bq+='<div class="peKb_controls"><div class="peKb_holder"><div class="peKb_mainPanel"><div class="peKb_iebg"><ul class="peKb_slideBtns"><li><a href="#" class="peKb_currentSlide">1</a></li></ul><div class="peKb_arrows"><a class="peKb_prev" href="#">p</a><a class="peKb_next" href="#">n</a></div><span class="peKb_iebgRight"></span></div></div><div class="peKb_videoClose"><a href="#">close</a></div></div></div>'}if(n){bq+='<div class="peKb_logoLabel"><a href="'+(ao.attr("data-logo-link")||"#")+'" target="'+(ao.attr("data-logo-target")||"_self")+'" >logo</a></div>'}if(aV){bq+='<div class="peKb_shadow"><div class="peKb_left"></div><div class="peKb_middle"></div><div class="peKb_right"></div></div>'}var r=bq?d(bq):false;var bp=0;if(r){if(d.browser.msie){var bu="";if(d.browser.version<10){ao.wrap('<div class="ie'+Math.floor(d.browser.version)+'"></div>')}}bf.after(r);if(D){var ax=r.filter(".peKb_controls");r.addClass("peKb_controlsInner");bp=r.height();ax.css("margin-top",-bp-P+10+(aP?1:0))}else{if(P!=15){r.filter(".peKb_controls").css("margin-top",-(P+1))}}if(aV){var a9=r.filter(".peKb_shadow").css("z-index","0");bf.before(a9)}}function at(h){a8=d(h.currentTarget).hasClass("peKb_next")?"next":"prev";T(M(ag,a8));return false}function al(){z();return false}if(au){bf.before(aq.hide());X=aq.css("color").replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g,b);var a5=aq.find(".peKb_overlay");be=(a5.width()||22);if(document.createElement("canvas").getContext){N=d('<canvas width="'+be+'" height="'+be+'"></canvas>');a5.after(N);N=N[0].getContext("2d")}else{ar=d('<div class="peKb_sprite"></div>');aq.find(".peKb_overlay").after(ar)}r.find(".peKb_prev, .peKb_next").click(at).end();bp=r.height();var J=r.find("ul.peKb_slideBtns").empty();var an=r.find(".peKb_videoClose");var bh=r.find(".peKb_mainPanel");var aH=(d.browser.msie&&d.browser.version>=8&&d.browser.version<9)?"top":"margin-top";an.find("a").click(al).end();if(D){an.fadeOut(0)}else{an.css(aH,-bp)}}var bi=am-2*P;var br=av-2*P-bp;if(aV){var u=ao.find(".peKb_shadow");u.width(am).find(".peKb_middle").width(am-u.find(".peKb_left").width()-u.find(".peKb_right").width())}ao.append(bt);if(bt){var aG=ao.offset();aG.top=aG.top+br+P-bt.height()+13;if(D){aG.top-=bp-10}bt.data("top",aG.top);bt.offset(aG);bt.hide()}aO=true;var V={width:bi,height:br,left:0,overflow:"hidden",visible:true,display:"block",opacity:0};var a8="next";var aK=bf.width(bi).height(br).find(" > div");var ay=d('<div class="peKb_frame"></div>').width(bi).height(br);function aX(t){ab=false;if(bn){clearTimeout(bn)}if(t.currentTarget==ao[0]){switch(t.type){case"mouseenter":if(L&&!(k)){a1=true}if(ai!="always"&&ai!="inner"){x()}break;case"mouseleave":if(!A&&L){a1=false}if(ai!="always"&&ai!="inner"){a0()}break}}else{k=(t.type==="mouseenter");var h;switch(t.type){case"mouseenter":if(aI){a1=false;h=aD();h&&h.resume();F(0)}else{if(bc){a1=true}else{if(L&&!A){a1=false}}}g=true;break;case"mouseleave":if(aI){a1=true;h=aD();h&&h.pause();F(1)}else{if(!A&&bc&&!L){a1=false}else{if(L){a1=true}}}g=false;break}}}ao.find("div.peKb_slides").append(aF).append(G).append(aL).bind("mouseenter",aX).bind("mouseleave",aX).end();var a7=0;var bb=0;if(aL){a7=parseInt(aL.css("margin-bottom").replace(/px/),10);bb=parseInt(aL.css("margin-left").replace(/px/),10)}if(!aN){bf.wrapInner('<div class="peKb_slides"></div>');var aW=bf.find("> div");aW.width(bi).height(br).css({position:"absolute","border-width":0,"border-radius":0,"background-image":"none","background-color":ay.css("background-color"),"z-index":1,top:P,left:P,padding:"0px",margin:"0px"}).show();if(aL){aL.width(bi).height(br)}}else{aK.css("margin-left",P);if(aL){aL.width(bi).height(br).css("margin-top",P).css("margin-left",P)}}bf.prepend(ay);var bg=ay.css("background-color").replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g,b);function aB(bB,bC,bE){bE=bB?bE:"fade";aa=aw||(bE=="swipe"?700:1000);y=bC;function bz(){O();if(bB){bB.fadeOut(0);bB.find("img:eq(0)").css("margin-left",0)}}if(bB){var by=bB.find("img:eq(0)").data("peKenburnsImg");if(by){by.stop()}}var bD;if(bC.find("a.video").length>0){G.empty().removeClass("peKb_noBack").fadeIn(0);if(!aO){bD=d("<a>");bD.attr("href",bC.find("a.video").attr("href")).attr("target","_blank");bD.width(G.width()).height(G.height()).css("position","absolute").show();G.empty().append(bD)}else{if(bC.find("a.video").hasClass("autostart")){if(A){setTimeout(function(){G.triggerHandler("click")},500)}else{G.triggerHandler("click")}}}}else{if(bC.find("a").length>0){G.fadeIn(0);bD=d("<a>");var bF=false;var w=bC.find("a");try{if(d._data){bF=d._data(w[0],"events")}else{bF=w.data("events")}}catch(bA){}if(bF){d.each(bF,function(bG,bH){d.each(bH,function(bI,bJ){bD.bind(bG,bJ.handler)})})}bD.attr("href",bC.find("a").attr("href")).attr("target",bC.find("a").attr("target"));bD.width(G.width()).height(G.height()).css("position","absolute").show();G.empty().addClass("peKb_noBack").append(bD)}else{G.empty().removeClass("peKb_noBack").fadeOut(0)}}switch(bE){case"fade":if(bB){if(a){bB.css(V).css("opacity",1)}else{bB.css(V).css("opacity",1).fadeTo(aa,0)}}if(a){bC.css(V).css("opacity",0).fadeTo(aa,1,function(){O();if(bB){bB.css("opacity",0)}})}else{bC.css(V).css("opacity",0).fadeTo(aa,1,O)}break;case"whitefade":bC.css(V).css("opacity",0);bB.css(V).css("opacity",1).fadeTo(aa/2,0,"easeOutQuad",function(){bC.fadeTo(aa/2,1,"easeInQuad",O)});break;case"flyBy":if(a8=="next"){if(bB){bB.css(V).css("opacity",1)}bC.css(V).css("left",50);if(bB){bB.animate({left:-100,opacity:0},aa,"easeOutCubic")}bC.animate({left:0,opacity:1},aa,"easeOutCubic",O)}else{if(bB){bB.css(V).css("opacity",1)}bC.css(V).css("left",-50);if(bB){bB.animate({left:100,opacity:0},aa,"easeOutCubic")}bC.animate({left:0,opacity:1},aa,"easeOutCubic",O)}break;case"swipe":var bx;var h=100;bC.css(V);if(bB){bB.css(V).css("opacity",1)}bx=(a8=="next")?bC.find("img:eq(0)"):bB?bB.find("img:eq(0)"):null;function t(bG,bI){var bH=Math.round(bG*bi);var bJ=Math.round(h*(1-bG));bC.css("left",-bJ).width(bH+h);if(bx){bx.css("margin-left",-bH)}if(bB){bB.css("opacity",0.5+0.5*(1-bG)).css("left",bH+h-bJ).width(bi-bH)}}function bw(bG,bI){var bH=Math.round(bG*bi);var bJ=Math.round(h*(1-bG));bC.css("left",bi-bH+bJ).width(bH);if(bx){bx.css("margin-left",bH-bi)}if(bB){bB.css("opacity",0.5+0.5*(1-bG)).css("left",bJ-h).width(bi-bH+h)}}bC.animate({opacity:1},{duration:aa,easing:"easeOutCubic",complete:bz,step:a8=="next"?bw:t});break}}function bk(h){Q=false;T(parseInt(h.target.id,10),true)}function O(){Q=false}function a3(t,h){var w=K[t].resource;if(!w){return true}var bw=d(w).attr("src")?"":d(w).attr("data-src");if(bw){d(w).attr("src",bw)}if(!w.complete){if(h){d(w).one("error",h).one("load",h)}}return w.complete}function aZ(){if(!bm&&aU&&!aC){aq.show().offset(aU.offset())}}function aA(){aC=false;aZ()}function az(h){if(J){aU=J.find("a").removeClass("peKb_currentSlide").eq(h).addClass("peKb_currentSlide");aS(0);aZ()}}function F(h){if(!W){return}var t=K[h].caption;var bw;var w;if(t){bw=t.find(".peKb_real");w=t.find(".peKb_background");bw.css("margin-left",10).css("opacity",0).width(0).show();w.css("margin-left",100).css("opacity",0).width(0).show();bw.stop(true).delay(aI?500:500).animate({"margin-left":0,opacity:1,width:w.data("width")},1000,"easeOutCubic");w.stop(true).delay(aI?0:200).animate({"margin-left":0,opacity:0.5,width:w.data("width")},1000,"easeOutCubic")}if(ah){bw=ah.find(".peKb_real");w=ah.find(".peKb_background");bw.stop(true).fadeTo(aI?0:500,0);w.stop(true).fadeTo(aI?0:500,0)}ah=t}function E(){a0()}function T(h,bw){if(v!=h&&!Q){Q=true;if(!bw&&!a3(h,bk)){aF.fadeIn(500);return}aM.trigger("change.pixelentity",{slideIdx:h+1});var by=aK.eq(h).find("a.video.autostart").length>0;z(by);a3(M(h,"next"));if(!aI){az(h);F(h)}ag=v=h;if(!by){aF.fadeOut(100)}var bA=aK.filter(".peKb_active").removeClass("peKb_active");var bz=aK.eq(h).addClass("peKb_active");var bx=bz.attr("data-transition")||"swipe";var t;if(aN){t=bz.find("img");if(t){bx="fade"}}var w=bz.attr("data-delay");if(w){U=parseFloat(w)*1000;l=d.now();aT=0}else{aT=-1;aS(360)}bz.show().fadeOut(0);if(t){t=t.peKenburnsImg({zoom:bz.attr("data-zoom"),align:bz.attr("data-align"),pan:bz.attr("data-pan"),duration:bz.attr("data-duration"),paused:aI,api:true});if(aI&&g){t.resume()}}aB(bA[0]?bA:null,bz,bx);if(ab){ab=false;bn=setTimeout(E,1000)}}}function aS(w){if(!J){return}if(N){var t=be-1;var h=be/2;var bw=h+1;N.clearRect(0,0,be,be);if(w>0){N.beginPath();N.moveTo(h,bw);N.arc(h,bw,t/2,(270/360)*2*Math.PI,((w+270)/360)*2*Math.PI,false);N.lineTo(h,bw);N.closePath();N.fillStyle=X;N.fill()}}else{ar.css("background-position-y","-"+Math.round(12-(12*(w/360)))*be+"px")}}function af(){if(aT<0){return}var t=d.now();var h=d.now()-l;l=t;if(a1){return}aT+=h;if(aT>U){aT=U}aS(360*aT/U);if(aT>=U){aT=-1;T(M(ag,"next"))}}function M(w,h){var t=w;t+=(h=="prev"?-1:1);t%=K.length;if(t<0){t+=K.length}return t}function o(t){var h=parseInt(t.currentTarget.id,10);a8=h>=ag?"next":"prev";T(h);return false}function a2(){var bB;var t;if(s){clearTimeout(s)}for(var bw=0;bw<K.length;bw++){bB=K[bw].caption;if(bB){bB.width(bi);t=false;var bz=bB.find(".peKb_real");var bx=bB.find(".peKb_background");if(bB==ah){bz.stop().css("margin-left",0).css("opacity",1);bx.stop().css("margin-left",0).css("opacity",0.5);t=true}var w;var h;if(aI){w=bi-2*a7}else{bz.width("auto");bx.width("auto");w=bz.outerWidth()}h=bz.outerHeight();bx.width(w).height(h).data("width",w);bB.width(w).height(h);if(bo){var bA=a7;if(bo.h=="top"){bA=-bA}else{if(bo.h=="center"){bA=0}}var by=d.pixelentity.Geom.getScaler("none",bo.w,bo.h,bi,br,bx.width(),bx.height()+(D?(bp-10):0));bB.css("margin-left",by.offset.w);bB.css("margin-top",by.offset.h-bA)}else{bB.css("margin-left",(bi-bx.width())/2);bB.css("margin-top",(br-bx.height()-a7-(D?(bp-10):0)))}if(!t){bz.fadeOut(0);bx.fadeOut(0)}}}W=true}function S(h,bw){var by=d(bw).attr("id",h);var w=by.find("> h1,> h2,> h3,> h4,> p").detach();if(aL&&w.length>0){w.wrap('<div class="peKb_real" />');w=w.parent();w.wrap('<div class="peKb_holder" />');w=w.parent();w.append('<div class="peKb_background" />');aL.append(w);w.find(".peKb_real").fadeOut(0);w.find(".peKb_background").fadeOut(0)}else{w=false}var bx=by.find("img").attr({id:h})[0];var t=by.attr("data-thumb");K[h]={caption:w,resource:bx,thumb:t};if(J){J.append('<li><a href="#" '+(h===0?'class="peKb_currentSlide"':"")+' id="'+h+'">1</a></li>')}}function i(){aF.empty();A=false;if(!g){a1=false}}function bv(h){if(!an){return}if(D){if(d.browser.msie){an[h?"show":"hide"]()}else{an.stop().fadeTo(300,h?1:0,"easeOutCubic")}aJ(!h)}else{var t={};t[aH]=(h?0:-bp);an.stop().animate(t,300,"easeOutCubic")}}function aJ(h,t){if(!bh){return}bm=!h;if(!h){bd(false)}t=t===null?300:t;bh.stop();if(!D&&A){bv(h)}aq.hide();aC=true;if(D){bm=false;if(!(d.browser.msie&&d.browser.version<8)){r.css("z-index",h?209:0);if(h&&aV){bf.before(r.filter(".peKb_shadow").css("z-index","0"))}}if(h){r.find(".peKb_holder").show();aA()}else{r.find(".peKb_holder").hide()}}else{bh.animate({"margin-top":(h?0:-bp)},{duration:t,easing:"easeOutCubic",complete:aA})}}function j(){bv(true)}function ae(){bv(false)}function x(h){aJ(true,h)}function a0(h){aJ(false,h)}function z(t){if(A){if(H){H.destroy();H=undefined}if(t){aF.empty();A=false}else{aF.css("background-color","none");aF.fadeOut(500,i);G.fadeIn(0);ae()}if(!(L||bc)){a1=false}var h=aK.filter(".peKb_active").find("img:eq(0)").data("peKenburnsImg");if(h){h.resume()}aM.trigger("video.pixelentity",{status:"stop"})}return false}function bs(t){var h=d(t.currentTarget);if(h.hasClass("video")){B(h[0].href,h.hasClass("hd"),h.hasClass("autoplay"),h.hasClass("loop"),h.hasClass("skiptonext"));return false}return true}function B(t,bz,w,h,by){if(A){return false}var bA,bx;if((bA=t.match(/http:\/\/www.youtube.com\/watch\?v=([\w|\-]+)/))){bx="youtube"}else{if((bA=t.match(/http:\/\/vimeo.com\/(\w+)/))){bx="vimeo"}}if(bx){z();A=true;a1=true;var bw=aK.filter(".peKb_active").find("img:eq(0)").data("peKenburnsImg");if(bw){bw.pause()}aF.css("background-color",bg);aF.fadeIn(500);j();G.fadeOut(0);H=aF.peVideo({api:true,width:bi,height:br,type:bx,videoId:bA[1],hd:bz,autoPlay:w,loop:h});if(by){d(H).bind("video_ended.pixelentity",ak)}aM.trigger("video.pixelentity",{status:"play"})}}function ak(){d(H).bind("video_ended.pixelentity",ak);T(M(ag,"next"))}function ba(){var h=y.find("a.video");if(h.length>0){h.trigger("click")}}function aR(){aQ=false;bt.hide()}function bd(h,t){if(!ac||!bt){return}if(h){bt.stop(true);if(Y){bt.fadeTo(500,1,"easeOutQuad")}else{bt.show()}}else{if(parseInt(t,10)>0){bt.delay(t)}else{bt.stop(true)}if(Y){bt.fadeTo(300,0,"easeOutQuad",aR)}else{bt.queue(aR)}}}function aE(h){if(h.type=="error"){aR();return}p.html(aj);if(ao.attr("data-thumb")!="fixed"){aj.peKenburnsImg({zoom:"in",align:"top,center",pan:"center,center",duration:"10"})}p.stop(true).fadeTo(0,0).fadeTo(300,1,"easeInQuad")}function ad(h){if(aU){aU.triggerHandler(h.type)}}function a4(bx){var h=bx.currentTarget.id;switch(bx.type){case"mouseenter":var w=K[h].thumb;if(!w){return}ac=true;bd(true);var t=d(bx.currentTarget).width();var bw=d(bx.currentTarget).offset();bw.top=ao.offset().top+br+P-bt.height()+13;if(D){bw.top-=bp-10}bw.left=bw.left-(bt.width()-t)/2;if(aQ!=w){if(aj.data("peKenburnsImg")){aj.data("peKenburnsImg").destroy()}aj=d("<img>");p.html("");aj.one("error",aE).one("load",aE);aj.attr("src",w)}bt.offset(bw);aQ=w;break;case"mouseleave":bd(false,200);break}}function aD(){var h;if(y){h=y.find("img:eq(0)");if(h){h=h.data("peKenburnsImg")}}return h||false}function ap(){if(!q){q=true;var h=aD();h&&h.resume();a1=false}}function Z(){if(q){q=false;var h=aD();h&&h.pause();a1=true}}d.extend(a6,{init:function(w){if(d.browser.msie){aK.find("img[src*='blank.png']").replaceWith(function(){var bx=d("<img>");var bw=d(this);var by=bw.width();if(by>1){bx.attr("width",by)}by=bw.height();if(by>1){bx.attr("height",by)}d.each(f,function(bz,bA){by=bw.attr(bA);if(by){bx.attr(bA,by)}});return bx[0]}).end()}if(d.browser.msie&&d.browser.version>8){aK.find("img").each(function(){var bw=d(this);if(!bw.attr("data-src")){bw.attr("data-src",bw.attr("src"));bw.removeAttr("src")}}).end()}aF.width(bi).height(br);G.width(bi).height(br);aK.width(bi).height(br).show().fadeOut(0).removeClass("peKb_active").find("img[src*='blank.png']").removeAttr("src").end().find("a").click(bs).end().each(S).end();if(au&&bh){bh.css("margin-left",(am-bh.width())/2);if(D){if(d.browser.msie&&d.browser.version<8){r.filter(".peKb_shadow").css("z-index","-1")}an.css("z-index",204);an.css("position","absolute");an.css("margin-left",0);an.css("margin-top",-av+an.height()+P);an.css("margin-left",P);an.detach();aM.append(an);an=aM.find(".peKb_videoClose");an.addClass("peKb_videoCloseInner")}}if(aY.externalFont){s=setTimeout(a2,10000)}else{a2()}if(J){var h=J.find("a");h.click(o);if(bt){h.bind("mouseenter",a4).bind("mouseleave",a4);aq.bind("mouseenter",ad).bind("mouseleave",ad)}}if(aO){G.hide().click(ba)}var t=true;ai=ao.attr("data-controls")||"always";if(aP){ai=(ai=="over"||ai=="hideOnFirst")?"always":ai}switch(ai){case"over":a0(0);break;case"hideOnFirst":case"inner-over":ab=true;break;case"disabled":a0(0);t=false;break;default:t=true;break}if(t){ao.bind("mouseenter",aX).bind("mouseleave",aX)}a1=true;R=setInterval(af,50);a6.start()},start:function(){a1=aI;T(0)},fontsLoaded:function(){a2();F(ag)},pauseTimer:function(){a1=true},resumeTimer:function(){a1=false},pause:function(){var h=aD();h&&h.pause();a6.pauseTimer()},resume:function(){var h=aD();h&&h.resume();a6.resumeTimer()},prev:function(){a6.resumeTimer();T(M(ag,"prev"))},next:function(){a6.resumeTimer();T(M(ag,"next"))},show:function(h){a6.resumeTimer();h=parseInt(h,10)-1;if(h>=0&&h<K.length){T(h)}},length:function(){return(K&&K.length)||0},bind:function(){return aM.bind.apply(aM,arguments)},stopVideo:z,destroy:function(){var h;z();aM.unbind("enable.pixelentity ",ap).unbind("disable.pixelentity ",Z);aK.each(function(){h=d(this).find("img:eq(0)");if((h=h.data("peKenburnsImg"))){h.destroy()}});h=undefined;clearInterval(R);a6=undefined;if(H){H.destroy();H=undefined}aM.data("peKenburnsSlider",null);aM.remove();aM=undefined}});if((!ao.width())&&(!ao[0].width)){ao.one("load",a6.init)}else{a6.init()}}d.fn.peKenburnsSlider=function(g){var h=this.data("peKenburnsSlider");if(h){h.start();return h}g=d.extend(true,{},d.pixelentity.kenburnsSlider.conf,g);this.each(function(){h=new c(d(this),g);d(this).data("peKenburnsSlider",h)});return g.api?h:this}})(jQuery);