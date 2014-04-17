(function (a) {function d(b) {
        var c = b || window.event,
            d = [].slice.call(arguments, 1),
            e = 0,
            f = !0,
            g = 0,
            h = 0;
        return b = a.event.fix(c), b.type = "mousewheel", c.wheelDelta && (e = c.wheelDelta / 120), c.detail && (e = -c.detail / 3), h = e, c.axis !== undefined && c.axis === c.HORIZONTAL_AXIS && (h = 0, g = -1 * e), c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120), c.wheelDeltaX !== undefined && (g = -1 * c.wheelDeltaX / 120), d.unshift(b, e, g, h), (a.event.dispatch || a.event.handle).apply(this, d)
    }
    var b = ["DOMMouseScroll", "mousewheel"];
    if (a.event.fixHooks) for (var c = b.length; c;) a.event.fixHooks[b[--c]] = a.event.mouseHooks;
    a.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var a = b.length; a;) this.addEventListener(b[--a], d, !1);
            else this.onmousewheel = d
        },
        teardown: function () {
            if (this.removeEventListener) for (var a = b.length; a;) this.removeEventListener(b[--a], d, !1);
            else this.onmousewheel = null
        }
    }, a.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery)
if (jQuery)(function () {
    $.extend($.fn, {
        rightClick: function (handler) {
            $(this).each(function () {
                $(this).mousedown(function (e) {
                    var evt = e;
                    $(this).mouseup(function () {
                        $(this).unbind('mouseup');
                        if (evt.button == 2) {
                            handler.call($(this), evt);
                            return false;
                        } else {
                            return true;
                        }
                    });
                });
                $(this)[0].oncontextmenu = function () {
                    return false;
                }
            });
            return $(this);
        },
        rightMouseDown: function (handler) {
            $(this).each(function () {
                $(this).mousedown(function (e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false;
                    } else {
                        return true;
                    }
                });
                $(this)[0].oncontextmenu = function () {
                    return false;
                }
            });
            return $(this);
        },
        rightMouseUp: function (handler) {
            $(this).each(function () {
                $(this).mouseup(function (e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false;
                    } else {
                        return true;
                    }
                });
                $(this)[0].oncontextmenu = function () {
                    return false;
                }
            });
            return $(this);
        },
        noContext: function () {
            $(this).each(function () {
                $(this)[0].oncontextmenu = function () {
                    return false;
                }
            });
            return $(this);
        }
    });
})(jQuery);;
(function ($) {
    var ver = '2.9994';
    if ($.support == undefined) {
        $.support = {
            opacity: !($.browser.msie)
        };
    }

    function debug(s) {
        $.fn.cycle.debug && log(s);
    }

    function log() {
        window.console && console.log && console.log('[cycle] ' + Array.prototype.join.call(arguments, ' '));
    }
    $.expr[':'].paused = function (el) {
        return el.cyclePause;
    }
    $.fn.cycle = function (options, arg2) {
        var o = {
            s: this.selector,
            c: this.context
        };
        if (this.length === 0 && options != 'stop') {
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing slideshow');
                $(function () {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }
        return this.each(function () {
            var opts = handleArguments(this, options, arg2);
            if (opts === false) return;
            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;
            if (this.cycleTimeout) clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;
            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();
            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false) return;
            if (els.length < 2) {
                log('terminating; too few slides: ' + els.length);
                return;
            }
            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10) startTime = 10;
                debug('first timeout: ' + startTime);
                this.cycleTimeout = setTimeout(function () {
                    go(els, opts2, 0, !opts.backwards)
                }, startTime);
            }
        });
    };

    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data('cycle.opts');
        var paused = !! cont.cyclePause;
        if (paused && opts.paused) opts.paused(cont, opts, byHover, onPager);
        else if (!paused && opts.resumed) opts.resumed(cont, opts, byHover, onPager);
    }

    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop == undefined) cont.cycleStop = 0;
        if (options === undefined || options === null) options = {};
        if (options.constructor == String) {
            switch (options) {
            case 'destroy':
            case 'stop':
                var opts = $(cont).data('cycle.opts');
                if (!opts) return false;
                cont.cycleStop++;
                if (cont.cycleTimeout) clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
                opts.elements && $(opts.elements).stop();
                $(cont).removeData('cycle.opts');
                if (options == 'destroy') destroy(opts);
                return false;
            case 'toggle':
                cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                checkInstantResume(cont.cyclePause, arg2, cont);
                triggerPause(cont);
                return false;
            case 'pause':
                cont.cyclePause = 1;
                triggerPause(cont);
                return false;
            case 'resume':
                cont.cyclePause = 0;
                checkInstantResume(false, arg2, cont);
                triggerPause(cont);
                return false;
            case 'prev':
            case 'next':
                var opts = $(cont).data('cycle.opts');
                if (!opts) {
                    log('options not found, "prev/next" ignored');
                    return false;
                }
                $.fn.cycle[options](opts);
                return false;
            default:
                options = {
                    fx: options
                };
            };
            return options;
        } else if (options.constructor == Number) {
            var num = options;
            options = $(cont).data('cycle.opts');
            if (!options) {
                log('options not found, can not advance slide');
                return false;
            }
            if (num < 0 || num >= options.elements.length) {
                log('invalid slide index: ' + num);
                return false;
            }
            options.nextSlide = num;
            if (cont.cycleTimeout) {
                clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
            }
            if (typeof arg2 == 'string') options.oneTimeFx = arg2;
            go(options.elements, options, 1, num >= options.currSlide);
            return false;
        }
        return options;

        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) {
                var options = $(cont).data('cycle.opts');
                if (!options) {
                    log('options not found, can not resume');
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    };

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute('filter');
            } catch (smother) {}
        }
    };

    function destroy(opts) {
        if (opts.next) $(opts.next).unbind(opts.prevNextEvent);
        if (opts.prev) $(opts.prev).unbind(opts.prevNextEvent);
        if (opts.pager || opts.pagerAnchorBuilder) $.each(opts.pagerAnchors || [], function () {
            this.unbind().remove();
        });
        opts.pagerAnchors = null;
        if (opts.destroy) opts.destroy(opts);
    };

    function buildOptions($cont, $slides, els, options, o) {
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta) opts = $.extend(opts, meta);
        if (opts.autostop) opts.countdown = opts.autostopCount || els.length;
        var cont = $cont[0];
        $cont.data('cycle.opts', opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];
        if (!$.support.opacity && opts.cleartype) opts.after.push(function () {
            removeFilter(this, opts);
        });
        if (opts.continuous) opts.after.push(function () {
            go(els, opts, 0, !opts.backwards);
        });
        saveOriginalOpts(opts);
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) clearTypeFix($slides);
        if ($cont.css('position') == 'static') $cont.css('position', 'relative');
        if (opts.width) $cont.width(opts.width);
        if (opts.height && opts.height != 'auto') $cont.height(opts.height);
        if (opts.startingSlide) opts.startingSlide = parseInt(opts.startingSlide, 10);
        else if (opts.backwards) opts.startingSlide = els.length - 1;
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
            opts.randomMap.push(i);
            opts.randomMap.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            opts.randomIndex = 1;
            opts.startingSlide = opts.randomMap[1];
        } else if (opts.startingSlide >= els.length) opts.startingSlide = 0;
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;
        $slides.css({
            position: 'absolute',
            top: 0,
            left: 0
        }).hide().each(function (i) {
            var z;
            if (opts.backwards) z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i;
            else z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            $(this).css('z-index', z)
        });
        $(els[first]).css('opacity', 1).show();
        removeFilter(els[first], opts);
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width) $slides.width(opts.width);
                if (opts.height && opts.height != 'auto') $slides.height(opts.height);
            } else {
                $slides.each(function () {
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width() / $slide.height() : opts.aspect;
                    if (opts.width && $slide.width() != opts.width) {
                        $slide.width(opts.width);
                        $slide.height(opts.width / ratio);
                    }
                    if (opts.height && $slide.height() < opts.height) {
                        $slide.height(opts.height);
                        $slide.width(opts.height * ratio);
                    }
                });
            }
        }
        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                });
            });
        }
        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                });
            });
        }
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) {
            var maxw = 0,
                maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]),
                    e = $e[0],
                    w = $e.outerWidth(),
                    h = $e.outerHeight();
                if (!w) w = e.offsetWidth || e.width || $e.attr('width');
                if (!h) h = e.offsetHeight || e.height || $e.attr('height');
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (maxw > 0 && maxh > 0) $cont.css({
                width: maxw + 'px',
                height: maxh + 'px'
            });
        }
        var pauseFlag = false;
        if (opts.pause) $cont.hover(function () {
            pauseFlag = true;
            this.cyclePause++;
            triggerPause(cont, true);
        }, function () {
            pauseFlag && this.cyclePause--;
            triggerPause(cont, true);
        });
        if (supportMultiTransitions(opts) === false) return false;
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function () {
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);
            if ($el.is('img')) {
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH == 0 && this.cycleW == 0 && !this.complete);
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) {
                        log(options.requeueAttempts, ' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
                        setTimeout(function () {
                            $(o.s, o.c).cycle(options)
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false;
                    } else {
                        log('could not determine size of image: ' + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });
        if (requeue) return false;
        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};
        $slides.not(':eq(' + first + ')').css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);
        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout, 10);
            if (opts.speed.constructor == String) opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed, 10);
            if (!opts.sync) opts.speed = opts.speed / 2;
            var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer)
            opts.timeout += opts.speed;
        }
        if (opts.easing) opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn) opts.speedIn = opts.speed;
        if (!opts.speedOut) opts.speedOut = opts.speed;
        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length) opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else if (opts.backwards) opts.nextSlide = opts.startingSlide == 0 ? (els.length - 1) : opts.startingSlide - 1;
        else opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init)) init($cont, $slides, opts);
            else if (opts.fx != 'custom' && !opts.multiFx) {
                log('unknown transition: ' + opts.fx, '; slideshow terminating');
                return false;
            }
        }
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length) opts.before[0].apply(e0, [e0, e0, opts, true]);
            if (opts.after.length) opts.after[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next) $(opts.next).bind(opts.prevNextEvent, function () {
            return advance(opts, 1)
        });
        if (opts.prev) $(opts.prev).bind(opts.prevNextEvent, function () {
            return advance(opts, 0)
        });
        if (opts.pager || opts.pagerAnchorBuilder) buildPager(els, opts);
        exposeAddSlide(opts, els);
        return opts;
    };

    function saveOriginalOpts(opts) {
        opts.original = {
            before: [],
            after: []
        };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function () {
            opts.original.before.push(this);
        });
        $.each(opts.after, function () {
            opts.original.after.push(this);
        });
    };

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        if (opts.fx.indexOf(',') > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, '').split(',');
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log('discarding unknown transition: ', fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            if (!opts.fxs.length) {
                log('No valid transitions named; slideshow terminating.');
                return false;
            }
        } else if (opts.fx == 'all') {
            opts.multiFx = true;
            opts.fxs = [];
            for (p in txs) {
                tx = txs[p];
                if (txs.hasOwnProperty(p) && $.isFunction(tx)) opts.fxs.push(p);
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug('randomized fx sequence: ', opts.fxs);
        }
        return true;
    };

    function exposeAddSlide(opts, els) {
        opts.addSlide = function (newSlide, prepend) {
            var $s = $(newSlide),
                s = $s[0];
            if (!opts.autostopCount) opts.countdown++;
            els[prepend ? 'unshift' : 'push'](s);
            if (opts.els) opts.els[prepend ? 'unshift' : 'push'](s);
            opts.slideCount = els.length;
            $s.css('position', 'absolute');
            $s[prepend ? 'prependTo' : 'appendTo'](opts.$cont);
            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }
            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg) clearTypeFix($s);
            if (opts.fit && opts.width) $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto') $s.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();
            $s.css(opts.cssBefore);
            if (opts.pager || opts.pagerAnchorBuilder) $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);
            if ($.isFunction(opts.onAddSlide)) opts.onAddSlide($s);
            else $s.hide();
        };
    }
    $.fn.cycle.resetState = function (opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function () {
            opts.before.push(this);
        });
        $.each(opts.original.after, function () {
            opts.after.push(this);
        });
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init)) init(opts.$cont, $(opts.elements), opts);
    };

    function go(els, opts, manual, fwd) {
        if (manual && opts.busy && opts.manualTrump) {
            debug('manualTrump in go(), stopping active transition');
            $(els).stop(true, true);
            opts.busy = 0;
        }
        if (opts.busy) {
            debug('transition active, ignoring new tx request');
            return;
        }
        var p = opts.$cont[0],
            curr = els[opts.currSlide],
            next = els[opts.nextSlide];
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual) return;
        if (!manual && !p.cyclePause && !opts.bounce && ((opts.autostop && (--opts.countdown <= 0)) || (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end) opts.end(opts);
            return;
        }
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();
            if (opts.multiFx) {
                if (fwd && (opts.lastFx == undefined || ++opts.lastFx >= opts.fxs.length)) opts.lastFx = 0;
                else if (!fwd && (opts.lastFx == undefined || --opts.lastFx < 0)) opts.lastFx = opts.fxs.length - 1;
                fx = opts.fxs[opts.lastFx];
            }
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }
            $.fn.cycle.resetState(opts, fx);
            if (opts.before.length) $.each(opts.before, function (i, o) {
                if (p.cycleStop != opts.stopCount) return;
                o.apply(next, [curr, next, opts, fwd]);
            });
            var after = function () {
                    opts.busy = 0;
                    $.each(opts.after, function (i, o) {
                        if (p.cycleStop != opts.stopCount) return;
                        o.apply(next, [curr, next, opts, fwd]);
                    });
                };
            debug('tx firing(' + fx + '); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);
            opts.busy = 1;
            if (opts.fxFn) opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else if ($.isFunction($.fn.cycle[opts.fx])) $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
        }
        if (changed || opts.nextSlide == opts.currSlide) {
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) opts.randomIndex = 0;
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide) opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
            } else if (opts.backwards) {
                var roll = (opts.nextSlide - 1) < 0;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = 1;
                    opts.currSlide = 0;
                } else {
                    opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                    opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                }
            } else {
                var roll = (opts.nextSlide + 1) == els.length;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = els.length - 2;
                    opts.currSlide = els.length - 1;
                } else {
                    opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                    opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                }
            }
        }
        if (changed && opts.pager) opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);
        var ms = 0;
        if (opts.timeout && !opts.continuous) ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
        else if (opts.continuous && p.cyclePause) ms = 10;
        if (ms > 0) p.cycleTimeout = setTimeout(function () {
            go(els, opts, 0, !opts.backwards)
        }, ms);
    };
    $.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
        $(pager).each(function () {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };

    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while (opts.fx != 'none' && (t - opts.speed) < 250)
            t += opts.speed;
            debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
            if (t !== false) return t;
        }
        return opts.timeout;
    };
    $.fn.cycle.next = function (opts) {
        advance(opts, 1);
    };
    $.fn.cycle.prev = function (opts) {
        advance(opts, 0);
    };

    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0],
            timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            opts.randomIndex--;
            if (--opts.randomIndex == -2) opts.randomIndex = els.length - 2;
            else if (opts.randomIndex == -1) opts.randomIndex = els.length - 1;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else if (opts.random) {
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        } else {
            opts.nextSlide = opts.currSlide + val;
            if (opts.nextSlide < 0) {
                if (opts.nowrap) return false;
                opts.nextSlide = els.length - 1;
            } else if (opts.nextSlide >= els.length) {
                if (opts.nowrap) return false;
                opts.nextSlide = 0;
            }
        }
        var cb = opts.onPrevNextEvent || opts.prevNextClick;
        if ($.isFunction(cb)) cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        go(els, opts, 1, moveForward);
        return false;
    };

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function (i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    };
    $.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug('pagerAnchorBuilder(' + i + ', el) returned: ' + a);
        } else a = '<a href="#">' + (i + 1) + '</a>';
        if (!a) return;
        var $a = $(a);
        if ($a.parents('body').length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function () {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            } else {
                $a.appendTo($p);
            }
        }
        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);
        $a.bind(opts.pagerEvent, function (e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0],
                timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick;
            if ($.isFunction(cb)) cb(opts.nextSlide, els[opts.nextSlide]);
            go(els, opts, 1, opts.currSlide < i);
        });
        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble) $a.bind('click.cycle', function () {
            return false;
        });
        var cont = opts.$cont[0];
        var pauseFlag = false;
        if (opts.pauseOnPagerHover) {
            $a.hover(function () {
                pauseFlag = true;
                cont.cyclePause++;
                triggerPause(cont, true, true);
            }, function () {
                pauseFlag && cont.cyclePause--;
                triggerPause(cont, true, true);
            });
        }
    };
    $.fn.cycle.hopsFromLast = function (opts, fwd) {
        var hops, l = opts.lastSlide,
            c = opts.currSlide;
        if (fwd) hops = c > l ? c - l : opts.slideCount - l;
        else hops = c < l ? l - c : l + opts.slideCount - c;
        return hops;
    };

    function clearTypeFix($slides) {
        debug('applying clearType background-color hack');

        function hex(s) {
            s = parseInt(s, 10).toString(16);
            return s.length < 2 ? '0' + s : s;
        };

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
                var v = $.css(e, 'background-color');
                if (v && v.indexOf('rgb') >= 0) {
                    var rgb = v.match(/\d+/g);
                    return '#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != 'transparent') return v;
            }
            return '#ffffff';
        };
        $slides.each(function () {
            $(this).css('background-color', getBg(this));
        });
    };
    $.fn.cycle.commonReset = function (curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == 'undefined') opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        if (opts.slideResize && w !== false && next.cycleW > 0) opts.cssBefore.width = next.cycleW;
        if (opts.slideResize && h !== false && next.cycleH > 0) opts.cssBefore.height = next.cycleH;
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = 'none';
        $(curr).css('zIndex', opts.slideCount + (rev === true ? 1 : 0));
        $(next).css('zIndex', opts.slideCount + (rev === true ? 0 : 1));
    };
    $.fn.cycle.custom = function (curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr),
            $n = $(next);
        var speedIn = opts.speedIn,
            speedOut = opts.speedOut,
            easeIn = opts.easeIn,
            easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == 'number') speedIn = speedOut = speedOverride;
            else speedIn = speedOut = 1;
            easeIn = easeOut = null;
        }
        var fn = function () {
                $n.animate(opts.animIn, speedIn, easeIn, function () {
                    cb();
                });
            };
        $l.animate(opts.animOut, speedOut, easeOut, function () {
            $l.css(opts.cssAfter);
            if (!opts.sync) fn();
        });
        if (opts.sync) fn();
    };
    $.fn.cycle.transitions = {
        fade: function ($cont, $slides, opts) {
            $slides.not(':eq(' + opts.currSlide + ')').css('opacity', 0);
            opts.before.push(function (curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = {
                opacity: 1
            };
            opts.animOut = {
                opacity: 0
            };
            opts.cssBefore = {
                top: 0,
                left: 0
            };
        }
    };
    $.fn.cycle.ver = function () {
        return ver;
    };
    $.fn.cycle.defaults = {
        activePagerClass: 'activeSlide',
        after: null,
        allowPagerClickBubble: false,
        animIn: null,
        animOut: null,
        aspect: false,
        autostop: 0,
        autostopCount: 0,
        backwards: false,
        before: null,
        center: null,
        cleartype: !$.support.opacity,
        cleartypeNoBg: false,
        containerResize: 1,
        continuous: 0,
        cssAfter: null,
        cssBefore: null,
        delay: 0,
        easeIn: null,
        easeOut: null,
        easing: null,
        end: null,
        fastOnEvent: 0,
        fit: 0,
        fx: 'fade',
        fxFn: null,
        height: 'auto',
        manualTrump: true,
        metaAttr: 'cycle',
        next: null,
        nowrap: 0,
        onPagerEvent: null,
        onPrevNextEvent: null,
        pager: null,
        pagerAnchorBuilder: null,
        pagerEvent: 'click.cycle',
        pause: 0,
        pauseOnPagerHover: 0,
        prev: null,
        prevNextEvent: 'click.cycle',
        random: 0,
        randomizeEffects: 1,
        requeueOnImageNotLoaded: true,
        requeueTimeout: 250,
        rev: 0,
        shuffle: null,
        skipInitializationCallbacks: false,
        slideExpr: null,
        slideResize: 1,
        speed: 1000,
        speedIn: null,
        speedOut: null,
        startingSlide: 0,
        sync: 1,
        timeout: 4000,
        timeoutFn: null,
        updateActivePagerLink: null,
        width: null
    };
})(jQuery);
(function ($) {
    $.fn.cycle.transitions.none = function ($cont, $slides, opts) {
        opts.fxFn = function (curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    };
    $.fn.cycle.transitions.fadeout = function ($cont, $slides, opts) {
        $slides.not(':eq(' + opts.currSlide + ')').css({
            display: 'block',
            'opacity': 1
        });
        opts.before.push(function (curr, next, opts, w, h, rev) {
            $(curr).css('zIndex', opts.slideCount + (!rev === true ? 1 : 0));
            $(next).css('zIndex', opts.slideCount + (!rev === true ? 0 : 1));
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        opts.cssAfter.zIndex = 0;
    };
    $.fn.cycle.transitions.scrollUp = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h;
    };
    $.fn.cycle.transitions.scrollDown = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.scrollLeft = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0 - w;
    };
    $.fn.cycle.transitions.scrollRight = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.scrollHorz = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev) fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0;
    };
    $.fn.cycle.transitions.scrollVert = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev) fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0;
    };
    $.fn.cycle.transitions.slideX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = 'show';
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.slideY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = 'show';
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.shuffle = function ($cont, $slides, opts) {
        var i, w = $cont.css('overflow', 'visible').width();
        $slides.css({
            left: 0,
            top: 0
        });
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2;
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {
            left: -w,
            top: 15
        };
        opts.els = [];
        for (i = 0; i < $slides.length; i++)
        opts.els.push($slides[i]);
        for (i = 0; i < opts.currSlide; i++)
        opts.els.push(opts.els.shift());
        opts.fxFn = function (curr, next, opts, cb, fwd) {
            if (opts.rev) fwd = !fwd;
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function () {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++)
                fwd ? opts.els.push(opts.els.shift()) : opts.els.unshift(opts.els.pop());
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++)
                    $(opts.els[i]).css('z-index', len - i + count);
                } else {
                    var z = $(curr).css('z-index');
                    $el.css('z-index', parseInt(z, 10) + 1 + count);
                }
                $el.animate({
                    left: 0,
                    top: 0
                }, opts.speedOut, opts.easeOut, function () {
                    $(fwd ? this : curr).hide();
                    if (cb) cb();
                });
            });
        };
        $.extend(opts.cssBefore, {
            display: 'block',
            opacity: 1,
            top: 0,
            left: 0
        });
    };
    $.fn.cycle.transitions.turnUp = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnDown = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnLeft = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.turnRight = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        $.extend(opts.cssBefore, {
            top: 0,
            left: 0,
            width: 0
        });
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.zoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            $.extend(opts.animIn, {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            });
            $.extend(opts.animOut, {
                width: 0,
                height: 0,
                top: curr.cycleH / 2,
                left: curr.cycleW / 2
            });
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
    };
    $.fn.cycle.transitions.fadeZoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            $.extend(opts.animIn, {
                top: 0,
                left: 0,
                width: next.cycleW,
                height: next.cycleH
            });
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0;
    };
    $.fn.cycle.transitions.blindX = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.blindY = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.blindZ = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        var w = $cont.width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.growX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.growY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.curtainX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW / 2;
            opts.animOut.width = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
    $.fn.cycle.transitions.curtainY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH / 2;
            opts.animOut.height = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.cover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            if (d == 'right') opts.cssBefore.left = -w;
            else if (d == 'up') opts.cssBefore.top = h;
            else if (d == 'down') opts.cssBefore.top = -h;
            else opts.cssBefore.left = w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.uncover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == 'right') opts.animOut.left = w;
            else if (d == 'up') opts.animOut.top = -h;
            else if (d == 'down') opts.animOut.top = h;
            else opts.animOut.left = -w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };
    $.fn.cycle.transitions.toss = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'visible').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (!opts.animOut.left && !opts.animOut.top) $.extend(opts.animOut, {
                left: w * 2,
                top: -h / 2,
                opacity: 0
            });
            else opts.animOut.opacity = 0;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
    };
    $.fn.cycle.transitions.wipe = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip)) clip = 'rect(0px 0px ' + h + 'px 0px)';
            else if (/r2l/.test(opts.clip)) clip = 'rect(0px ' + w + 'px ' + h + 'px ' + w + 'px)';
            else if (/t2b/.test(opts.clip)) clip = 'rect(0px ' + w + 'px 0px 0px)';
            else if (/b2t/.test(opts.clip)) clip = 'rect(' + h + 'px ' + w + 'px ' + h + 'px 0px)';
            else if (/zoom/.test(opts.clip)) {
                var top = parseInt(h / 2, 10);
                var left = parseInt(w / 2, 10);
                clip = 'rect(' + top + 'px ' + left + 'px ' + top + 'px ' + left + 'px)';
            }
        }
        opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';
        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0], 10),
            r = parseInt(d[1], 10),
            b = parseInt(d[2], 10),
            l = parseInt(d[3], 10);
        opts.before.push(function (curr, next, opts) {
            if (curr == next) return;
            var $curr = $(curr),
                $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = 'block';
            var step = 1,
                count = parseInt((opts.speedIn / 13), 10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count), 10) : 0;
                var ll = l ? l - parseInt(step * (l / count), 10) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1), 10) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1), 10) : w;
                $next.css({
                    clip: 'rect(' + tt + 'px ' + rr + 'px ' + bb + 'px ' + ll + 'px)'
                });
                (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
            })();
        });
        $.extend(opts.cssBefore, {
            display: 'block',
            opacity: 1,
            top: 0,
            left: 0
        });
        opts.animIn = {
            left: 0
        };
        opts.animOut = {
            left: 0
        };
    };
})(jQuery);
var lightbox = new Object();
var ios = navigator.userAgent.match(/(iphone|ipod|ipad)/i) ? true : false;
lightbox.start = function () {
    $('div.grid:not(.archive) a').click(function () {
        $('<div id="overlay"></div>').appendTo('body');
        setTimeout(function () {
            $('#overlay').addClass('show');
        }, 1);
        var image = $(this).attr('href');
        var title = $(this).children('h4').text();
        var description = $(this).children('p').html();
        lightbox.show(image, title, description);
        return false;
    });
    lightbox.bookmark();
    $('#overlay, #overlay .image').live('click', function () {
        $('#overlay').removeClass('show');
        setTimeout(function () {
            $('#overlay').remove();
        }, 250);
        window.location.hash = "none";
        return false;
    });
    $('#overlay a.next.paging').live('click', function () {
        lightbox.next('next');
        return false;
    });
    $('#overlay a.back.paging').live('click', function () {
        lightbox.next('back');
        return false;
    });
    $('body').keydown(function (e) {
        if (e.which === 37) {
            lightbox.next('back');
        } else if (e.which === 39) {
            lightbox.next('next');
        }
    });
    $(window).resize(function () {
        lightbox.resize();
        $('#overlay .image').show();
    });
};
lightbox.bookmark = function () {
    if (window.location.hash) {
        var find = window.location.hash.replace('#', '');
        $('body').find('a[href$="' + find + '.jpg"]').each(function () {
            $(this).click();
        });
    }
};
lightbox.next = function (direction) {
    if ($('#overlay img').attr('src')) {
        var currentImage = $('#overlay img').attr('src');
        var $current = $('a[href="' + currentImage + '"]').closest('li');
        var $new = (direction === "back" ? $current.prev() : $current.next());
        if ($new.length === 0) {
            return false;
        }
        var image = $new.children('a').attr('href');
        var title = $new.find('h4').text();
        var description = $new.find('p').text();
        lightbox.show(image, title, description);
    }
    return false;
};
lightbox.show = function (image, title, description) {
    $('#overlay').html('<div class="image"></div><a class="paging back" href="#back">Back</a><a class="paging next" href="#next">Next</a>');
    var hash = image.split('/').pop().replace('.jpg', '');
    window.location.hash = hash;
    imgLoader = new Image();
    imgLoader.onload = function (data) {
        $('#overlay .image').append('<img src="' + image + '" alt="">');
        $('#overlay .image img').attr('data-height', imgLoader.height);
        if (title) {
            $('#overlay .image').append('<h4>' + title + '</h4>');
        }
        if (description) {
            $('#overlay .image').append('<p>' + description + '</p>');
        }
        if (typeof blocker == 'function') blocker();
        setTimeout(function () {
            lightbox.resize();
            $('#overlay .image').addClass('show');
        }, 100);
        var nextImageSrc = $('a[href$="' + image + '"]').parent().next().children('a').attr('href');
        nextImage = new Image();
        nextImage.src = nextImageSrc;
    };
    imgLoader.src = image;
    lightbox.hidePaging(image);
};
lightbox.resize = function () {
    var overlayHeight = $('#overlay > div').height();
    var detailsHeight = $('#overlay div > h4').outerHeight(true) + $('#overlay div > p').outerHeight(true);
    var windowHeight = $(window).height();
    var originalImageHeight = $('#overlay .image img').data('height');
    if (overlayHeight > windowHeight || originalImageHeight + detailsHeight > windowHeight) {
        var targetImageSize = windowHeight - detailsHeight;
        $('#overlay .image img').css('height', targetImageSize + 'px');
    } else {
        $('#overlay .image img').css('height', 'auto');
        var overlayHeight = $('#overlay > div').height();
        var marginTop = (windowHeight - overlayHeight) / 2;
        $('#overlay .image').css('margin-top', marginTop + 'px');
    }
    var overlayWidth = $('#overlay > div').width();
    setTimeout(function () {
        overlayWidth = $('#overlay img').width();
    }, 1000);
    var windowWidth = $(window).width();
    var marginLeft = (windowWidth - overlayWidth) / 2;
    $('#overlay .image').css('margin-left', marginLeft + 'px');
};
lightbox.hidePaging = function (image) {
    var $current = $('a[href="' + image + '"]').closest('li');
    if ($current.next().length === 0) {
        $('#overlay a.next').addClass('invisible');
    } else {
        $('#overlay a.next').removeClass('invisible');
    }
    if ($current.prev().length === 0) {
        $('#overlay a.back').addClass('invisible');
    } else {
        $('#overlay a.back').removeClass('invisible');
    }
};
var rsn = new Object();

function log(message) {
    if (typeof develop != "undefined" && window.console && window.console.log) {
        console.log(message);
    }
}
rsn.browserDetect = function () {
    if ($.browser.mozilla) var browser = "mozilla";
    if ($.browser.webkit) var browser = "webkit";
    if ($.browser.msie) var browser = "msie";
    $('body').addClass(browser);
    if (navigator.userAgent.match(/like Mac OS X/i)) $('body').addClass('ios');
    if ($.browser.msie && $.browser.version < 8 && $('body.left').length > 0) {
        if ($('.sidescroll').length > 0) {
            $('.sidescroll').addClass('list').removeClass('sidescroll');
        }
    }
};
rsn.ios = function () {
    if ($('body').hasClass('ios') && $('.sidescroll').length > 0) {
        $('body').addClass('static');
        var scrollTolerance = 200;
        $(window).scroll(function () {
            if ($('#totop').length === 0 && $(window).width() + $(window).scrollLeft() >= $(document).width() - scrollTolerance) {
                $('body').append('<a id="totop" href="#"></a>');
            } else if ($('#totop').length > 0 && $(window).width() + $(window).scrollLeft() < $(document).width() - scrollTolerance) {
                $('#totop').remove();
            }
        });
        $('#totop').live('click', function () {
            $('body').animate({
                'scrollLeft': 0
            }, 1000);
            return false;
        });
    }
};
rsn.email = function () {
    $('a[rel="mail"]').each(function () {
        var email = $(this).attr('href').split('#');
        var email = email[0] + "@" + email[1] + "." + email[2];
        if ($(this).attr('href') == $(this).text()) $(this).text(email);
        $(this).attr('href', 'mailto:' + email);
    });
};
rsn.links = function () {
    $('.body a').each(function () {
        var href = $(this).attr('href');
        var domain = document.domain.replace(/^www\./, '');
        if (typeof (href) != "undefined" && !href.match('http://' + domain) && !href.match('http://www.' + domain) && !href.match(/^\//)) {
            $(this).attr('target', '_blank').attr('rel', 'external');
        }
    });
};
rsn.homePage = function () {
    var slideshowDelay = (typeof window.slideshowDelay != "undefined" ? window.slideshowDelay * 1000 : 4500);
    var slideshowSpeed = 1000;
    if ($('body.bleed').length > 0) var bleed = true;
    if ($.browser.msie) var ie = true;
    if (bleed) {
        log('bleed detected');
        rsn.resizeBackgroundImage('#billboard > img:first-child');
    } else if ($('#billboard > img').length > 1) {
        var height = parseInt($('#billboard > img:first-child').height());
        $('#billboard').css('height', height + 'px');
    }
    if (!ie) {
        $('#billboard > img:first-child').addClass('show');
    } else {
        $('#billboard > img:first-child').animate({
            'opacity': 1
        }, slideshowSpeed, function () {
            $('#billboard > img:first-child').addClass('show');
        });
    }
    var slideCount = $('#billboard > img:not(.blocker)').length;
    if (slideCount > 1) {
        var slideshow = setInterval(function () {
            var $last = $('#billboard .show');
            if ($last.next().length > 0 && !$last.next().hasClass('blocker')) {
                var $next = $last.next();
            } else {
                var $next = $('#billboard > img:first-child');
            }
            if (bleed) rsn.resizeBackgroundImage($next);
            if (!ie) {
                $next.addClass('show');
            } else {
                $next.animate({
                    'opacity': 1
                }, slideshowSpeed, function () {
                    $next.addClass('show');
                });
            }
            setTimeout(function () {
                if (!ie) {
                    $last.removeClass('show');
                } else {
                    $last.animate({
                        'opacity': 0
                    }, slideshowSpeed, function () {
                        $last.removeClass('show');
                    });
                }
            }, slideshowSpeed);
        }, slideshowDelay);
    }
};
rsn.resizeBackgroundImage = function (image) {
    log('resizing background image');
    $(image).each(function () {
        $this = $(this);
        $window = $(window);
        $this.load(function () {
            $('#billboard').removeClass('loading');
            homePageLoaded = true;
            $this.data('width', parseInt($this.width()));
            $this.data('height', parseInt($this.height()));
        }).each(function () {
            if (this.complete) $(this).load();
        });
        if (typeof homePageLoaded != "undefined") {
            var width = $this.data('width');
            var height = $this.data('height');
            var windowWidth = parseInt($window.width());
            var windowHeight = parseInt($window.height());
            var aspectRatio = Math.round(width / height * 100) / 100;
            var newWidth = windowWidth-249;
            var newHeight = Math.round(newWidth / aspectRatio);
            if (newHeight < windowHeight) {
                var newHeight = windowHeight;
                var newWidth = newHeight * aspectRatio
            }
            if (typeof window.crop_align === "undefined") crop_align = "top left";
            switch (window.crop_align) {
            case "top left":
                var newTop = 0;
                var newRight = "auto";
                var newBottom = "auto";
                var newLeft = 249 + "px";
                break;
            case "top center":
                var newTop = 0;
                var newRight = "auto";
                var newBottom = "auto";
                var newLeft = (windowWidth - newWidth) / 2 + "px";
                break;
            case "top right":
                var newTop = 0;
                var newRight = 0;
                var newBottom = "auto";
                var newLeft = "auto";
                break;
            case "center left":
                var newTop = (windowHeight - newHeight) / 2 + "px";
                var newRight = "auto";
                var newBottom = "auto";
                var newLeft = 0;
                break;
            case "center center":
                var newTop = (windowHeight - newHeight) / 2 + "px";
                var newRight = "auto";
                var newBottom = "auto";
                var newLeft = (windowWidth - newWidth) / 2 + "px";
                break;
            case "center right":
                var newTop = (windowHeight - newHeight) / 2 + "px";
                var newRight = 0;
                var newBottom = "auto";
                var newLeft = "auto";
                break;
            case "bottom left":
                var newTop = "auto";
                var newRight = "auto";
                var newBottom = 0;
                var newLeft = 0;
                break;
            case "bottom center":
                var newTop = "auto";
                var newRight = "auto";
                var newBottom = 0;
                var newLeft = (windowWidth - newWidth) / 2 + "px";
                break;
            case "bottom right":
                var newTop = "auto";
                var newRight = 0;
                var newBottom = 0;
                var newLeft = "auto";
                break;
            default:
                var newTop = 0;
                var newRight = "auto";
                var newBottom = "auto";
                var newLeft = (windowWidth - newWidth) / 2 + "px";
            }
            $this.css({
                'width': newWidth + 'px',
                'height': newHeight + 'px',
                'top': newTop,
                'right': newRight,
                'bottom': newBottom,
                'left': newLeft
            });
        }
    });
};
rsn.adjustFooter = function () {
    var width = parseInt($('#content').width());
    var outerWidth = parseInt($('#content').outerWidth());
    var padding = parseInt((outerWidth - width) / 2);
    var marginLeft = outerWidth / -2;
    $('.bleed footer').css({
        'width': width + 'px',
        'margin-left': marginLeft + 'px',
        'padding-left': padding + 'px',
        'padding-right': padding + 'px'
    });
    $('.bleed footer').addClass('show');
};
rsn.grid = function () {
    if ($('body:not(.left) div.grid li, div.archive:not(.list) li').length > 0) {
        var size = $('div.thumbs li:first-child').width();
        $('div.thumbs li > a').css('height', size);
    }
    $('#content .grid img, #content .archive img').each(function () {
        var $this = $(this);
        var image = $(this).attr('src');
        var imgLoader = new Image();
        imgLoader.onload = function (data) {
            if (imgLoader.height > imgLoader.width) $this.addClass('portrait');
            $this.addClass('show');
        }
        imgLoader.src = image;
    });
};
rsn.carousel = function () {
    var contentWidth = parseInt($('#content').width());
    var carouselHeight = Math.round((4 * contentWidth) / 6);
    $('.carousel .images').css('height', carouselHeight + 'px');
    $('.carousel .images li').css('line-height', carouselHeight + 'px');
    $('.thumbs').insertAfter('.images').addClass('opaque');
    if ($('.images > li').length > 1) {
        $('.images').after('<a class="paging back" href="#back">Back</a><a class="paging next" href="#next">Next</a>').cycle({
            fx: 'fade',
            next: 'a.next',
            prev: 'a.back',
            speed: 400,
            timeout: 0,
            pager: '.thumbs',
            activePagerClass: 'selected',
            pagerAnchorBuilder: function (id, slide) {
                var thumb = $(slide).find('img').attr('id').replace('image-', 'thumb-');
                return $('#' + thumb).closest('li');
            },
            before: function () {
                $('.thumbs').stop();
                setTimeout(function () {
                    var position = $('.thumbs .selected').position();
                    if (position) {
                        var scroll = $('.thumbs').scrollLeft();
                        var thumbWidth = $('.thumbs .selected').width();
                        var windowWidth = $('.thumbs').width();
                        var left = (position.left + scroll) - (windowWidth / 2) + thumbWidth / 2;
                        $('.thumbs').animate({
                            scrollLeft: left
                        }, 500);
                    }
                }, 10);
            }
        });
    } else {
        $('.thumbs').hide();
    }
    $('.images').addClass('opaque');
    $('.carousel').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
    $('body').keydown(function (e) {
        if (e.which == 37) {
            $('a.back').click();
            return false;
        } else if (e.which == 39) {
            $('a.next').click();
            return false;
        }
    });
};
rsn.resizeLayout = function () {
    var windowHeight = ($.browser.msie ? document.documentElement.clientHeight : window.innerHeight);
    var windowWidth = ($.browser.msie ? document.body.clientWidth : window.innerWidth);
    var sidebarWidth = $('header').width();
    var lineHeight = $('.images').height();
    var contentWidth = windowWidth - sidebarWidth;
    var imagesHeight = ($.browser.webkit ? windowHeight - 10 : windowHeight);
    $('#content').not('#pageindex2 #content').css({
        'max-width': contentWidth
    });
    $('.sidescroll .images').css({
        'line-height': windowHeight - 30 + 'px',
        'height': imagesHeight + 'px'
    });
    if ($('.left .sidescroll .images').length > 0) {
        if ($.browser.mozilla || $.browser.msie) {
            var maxHeight = parseInt(imagesHeight * .96);
            $('.images img:not(.blocker)').css('max-height', maxHeight + 'px');
        }
    }
};
rsn.sideScroll = function () {
    rsn.resizeLayout();
    $(window).resize(rsn.resizeLayout);
    if (navigator.userAgent.match(/like Mac OS X/i)) {}
    $('#content').css('visibility', 'visible');
    var scrollSpeed = (navigator.appVersion.indexOf("Mac") != -1 ? 25 : 75);
    $('.sidescroll .images').mousewheel(function (event, delta, deltaX, deltaY) {
        if (deltaY > 0 && deltaY > deltaX || deltaY < 0 && deltaY < deltaX) {
            var speed = deltaY * scrollSpeed;
            var position = $(this).scrollLeft() + -speed;
            $(this)[0].scrollLeft = position;
            return false;
        }
    });
    $('.left .images li').hover(function () {
        $(this).addClass('hover');
    }, function () {
        $(this).removeClass('hover');
    });
};
rsn.uniformHeight = function (commonHeight) {
    if (typeof commonHeight == "undefined") var commonHeight = 600;
    rsn.uniformHeight.maxHeight = function () {
        var windowHeight = $('ul.images').height();
        var maxHeight = (windowHeight > commonHeight ? commonHeight : parseInt(windowHeight * .96));
        $('.sidescroll img').css({
            'max-height': maxHeight
        });
    };
    $(document).ready(function () {
        $('.sidescroll li').css({
            'max-width': 'none'
        });
        rsn.uniformHeight.maxHeight();
        $(window).resize(rsn.uniformHeight.maxHeight);
    });
};
rsn.markup = function () {
    $('body:not(.left) .archive .thumbs > li:nth-child(5n+1)').addClass('clear');
};
rsn.pages = function () {
    $(window).scroll(function () {
        if (typeof (loadNextPage) != "undefined") clearTimeout(loadNextPage);
        loadNextPage = setTimeout(function () {
            if ($(window).height() + $(window).scrollTop() >= $(document).height() - 600) {
                rsn.nextPage();
            }
        }, 250);
    });
};
rsn.nextPage = function () {
    var currentPage = $('.paged').attr('class').split(' ').pop().replace('page', '') * 1;
    var nextPage = currentPage + 1;
    $('.paged').removeClass('page' + currentPage).addClass('page' + nextPage);
    var url = "/" + tag + "?page=" + nextPage;
    $('<div id="temporary"></div>').appendTo('body').load(url + ' .paged > *', function () {
        $(this).children().each(function () {
            $(this).appendTo('.paged');
        });
        $(this).remove();
    });
};
rsn.forms = function () {
    var action = "/actions" + $(this).attr('action');
    $(this).attr('action', action);
}
rsn.peek = function () {
    $('a').each(function () {
        var href = $(this).attr('href') + "?peek=true";
        $(this).attr('href', href);
    });
}
rsn.indexpage = function (page) {
    var page = page.replace('/', '').toLowerCase();
    $('#page-' + page).addClass('index');
    $('.index .grid').addClass('archive');
    $('.index .thumbs > li > a').each(function () {
        var href = $(this).find('p').text();
        $(this).attr('href', href);
    });
}
$(document).ready(function () {
    rsn.browserDetect();
    rsn.markup();
    rsn.ios();
    if ($('#billboard').length > 0) rsn.homePage();
    if ($('#content .grid').length > 0) lightbox.start();
    rsn.email();
    rsn.links();
    if ($('body.left').length > 0) rsn.sideScroll();
    if ($('div.carousel').length > 0) rsn.carousel();
    if ($('.bleed footer').length > 0) rsn.adjustFooter();
    if ($('.paged').length > 0) rsn.pages();
    $('.contact_form').each(rsn.forms);
    rsn.grid();
    if (typeof peek != "undefined") rsn.peek();
});
$(window).load(function () {
    if ($('.bleed #billboard').length > 0) {
        $('#billboard').removeClass('loading');
        rsn.resizeBackgroundImage('#billboard .show');
        $(window).resize(function () {
            rsn.resizeBackgroundImage('#billboard .show');
        });
        if (navigator.userAgent.match(/like Mac OS X/i)) {
            $('body').bind('onorientationchange', function () {
                rsn.resizeBackgroundImage('#billboard .show');
            });
        }
    }
    if (!$('body').hasClass('bleed')) {
        var height = parseInt($('#billboard > img:first-child').height());
        $('#billboard').css('height', height + 'px');
    }
});