/*
 AngularJS v1.3.10
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
 */
(function (y, u, z) {
    'use strict';
    function s(h, k, p) {
        n.directive(h, ["$parse", "$swipe", function (d, e) {
            return function (l, m, f) {
                function g(a) {
                    if (!c)return !1;
                    var b = Math.abs(a.y - c.y);
                    a = (a.x - c.x) * k;
                    return q && 75 > b && 0 < a && 30 < a && .3 > b / a
                }

                var b = d(f[h]), c, q, a = ["touch"];
                u.isDefined(f.ngSwipeDisableMouse) || a.push("mouse");
                e.bind(m, {
                    start: function (a, b) {
                        c = a;
                        q = !0
                    },
                    cancel: function (a) {
                        q = !1
                    },
                    end: function (a, c) {
                        g(a) && l.$apply(function () {
                            m.triggerHandler(p);
                            b(l, {$event: c})
                        })
                    }
                }, a)
            }
        }])
    }

    var n = u.module("ngTouch", []);
    n.factory("$swipe",
        [function () {
            function h(d) {
                var e = d.touches && d.touches.length ? d.touches : [d];
                d = d.changedTouches && d.changedTouches[0] || d.originalEvent && d.originalEvent.changedTouches && d.originalEvent.changedTouches[0] || e[0].originalEvent || e[0];
                return {
                    x: d.clientX,
                    y: d.clientY
                }
            }

            function k(d, e) {
                var l = [];
                u.forEach(d, function (d) {
                    (d = p[d][e]) && l.push(d)
                });
                return l.join(" ")
            }

            var p = {
                mouse: {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                },
                touch: {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend",
                    cancel: "touchcancel"
                }
            };
            return {
                bind: function (d,
                                e, l) {
                    var m, f, g, b, c = !1;
                    l = l || ["mouse", "touch"];
                    d.on(k(l, "start"), function (a) {
                        g = h(a);
                        c = !0;
                        f = m = 0;
                        b = g;
                        e.start && e.start(g, a)
                    });
                    var q = k(l, "cancel");
                    if (q)d.on(q, function (a) {
                        c = !1;
                        e.cancel && e.cancel(a)
                    });
                    d.on(k(l, "move"), function (a) {
                        if (c && g) {
                            var d = h(a);
                            m += Math.abs(d.x - b.x);
                            f += Math.abs(d.y - b.y);
                            b = d;
                            10 > m && 10 > f || (f > m ? (c = !1, e.cancel && e.cancel(a)) : (a.preventDefault(), e.move && e.move(d, a)))
                        }
                    });
                    d.on(k(l, "end"), function (a) {
                        c && (c = !1, e.end && e.end(h(a), a))
                    })
                }
            }
        }]);
    n.config(["$provide", function (h) {
        h.decorator("ngClickDirective",
            ["$delegate", function (k) {
                k.shift();
                return k
            }])
    }]);
    n.directive("ngClick", ["$parse", "$timeout", "$rootElement", function (h, k, p) {
        function d(b, c, d) {
            for (var a = 0; a < b.length; a += 2) {
                var e = b[a + 1], f = d;
                if (25 > Math.abs(b[a] - c) && 25 > Math.abs(e - f))return b.splice(a, a + 2), !0
            }
            return !1
        }

        function e(b) {
            if (!(2500 < Date.now() - m)) {
                var c = b.touches && b.touches.length ? b.touches : [b], e = c[0].clientX, c = c[0].clientY;
                1 > e && 1 > c || g && g[0] === e && g[1] === c || (g && (g = null), "label" === b.target.tagName.toLowerCase() && (g = [e, c]), d(f, e, c) || (b.stopPropagation(),
                    b.preventDefault(), b.target && b.target.blur()))
            }
        }

        function l(b) {
            b = b.touches && b.touches.length ? b.touches : [b];
            var c = b[0].clientX, d = b[0].clientY;
            f.push(c, d);
            k(function () {
                for (var a = 0; a < f.length; a += 2)if (f[a] == c && f[a + 1] == d) {
                    f.splice(a, a + 2);
                    break
                }
            }, 2500, !1)
        }

        var m, f, g;
        return function (b, c, g) {
            function a() {
                n = !1;
                c.removeClass("ng-click-active")
            }

            var k = h(g.ngClick), n = !1, r, s, v, w;
            c.on("touchstart", function (a) {
                n = !0;
                r = a.target ? a.target : a.srcElement;
                3 == r.nodeType && (r = r.parentNode);
                c.addClass("ng-click-active");
                s = Date.now();
                a = a.touches && a.touches.length ? a.touches : [a];
                a = a[0].originalEvent || a[0];
                v = a.clientX;
                w = a.clientY
            });
            c.on("touchmove", function (c) {
                a()
            });
            c.on("touchcancel", function (c) {
                a()
            });
            c.on("touchend", function (b) {
                var k = Date.now() - s, h = b.changedTouches && b.changedTouches.length ? b.changedTouches : b.touches && b.touches.length ? b.touches : [b], t = h[0].originalEvent || h[0], h = t.clientX, t = t.clientY, x = Math.sqrt(Math.pow(h - v, 2) + Math.pow(t - w, 2));
                n && 750 > k && 12 > x && (f || (p[0].addEventListener("click", e, !0), p[0].addEventListener("touchstart",
                    l, !0), f = []), m = Date.now(), d(f, h, t), r && r.blur(), u.isDefined(g.disabled) && !1 !== g.disabled || c.triggerHandler("click", [b]));
                a()
            });
            c.onclick = function (a) {
            };
            c.on("click", function (a, c) {
                b.$apply(function () {
                    k(b, {$event: c || a})
                })
            });
            c.on("mousedown", function (a) {
                c.addClass("ng-click-active")
            });
            c.on("mousemove mouseup", function (a) {
                c.removeClass("ng-click-active")
            })
        }
    }]);
    s("ngSwipeLeft", -1, "swipeleft");
    s("ngSwipeRight", 1, "swiperight")
})(window, window.angular);
//# sourceMappingURL=angular-touch.min.js.map