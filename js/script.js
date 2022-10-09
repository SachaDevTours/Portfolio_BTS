!(function(o, a, i, t) {
    var n = function(t, n) {
        (this.elem = t),
            (this.$elem = o(t)),
            (this.options = n),
            (this.metadata = this.$elem.data('plugin-options')),
            (this.$win = o(a)),
            (this.sections = {}),
            (this.didScroll = !1),
            (this.$doc = o(i)),
            (this.docHeight = this.$doc.height());
    };
    (n.defaults = (n.prototype = {
        defaults: {
            navItems: 'a',
            currentClass: 'current',
            changeHash: !1,
            easing: 'swing',
            filter: '',
            scrollSpeed: 300,
            scrollThreshold: 0.25,
            begin: !1,
            end: !1,
            scrollChange: !1
        },
        init: function() {
            return (
                (this.config = o.extend(
                    {},
                    this.defaults,
                    this.options,
                    this.metadata
                )),
                (this.$nav = this.$elem.find(this.config.navItems)),
                '' !== this.config.filter &&
                    (this.$nav = this.$nav.filter(this.config.filter)),
                this.$nav.on(
                    'click.onePageNav',
                    o.proxy(this.handleClick, this)
                ),
                this.getPositions(),
                this.bindInterval(),
                this.$win.on(
                    'resize.onePageNav',
                    o.proxy(this.getPositions, this)
                ),
                this
            );
        },
        adjustNav: function(t, n) {
            t.$elem
                .find('.' + t.config.currentClass)
                .removeClass(t.config.currentClass),
                n.addClass(t.config.currentClass);
        },
        bindInterval: function() {
            var t,
                n = this;
            n.$win.on('scroll.onePageNav', function() {
                n.didScroll = !0;
            }),
                (n.t = setInterval(function() {
                    (t = n.$doc.height()),
                        n.didScroll && ((n.didScroll = !1), n.scrollChange()),
                        t !== n.docHeight &&
                            ((n.docHeight = t), n.getPositions());
                }, 250));
        },
        getHash: function(t) {
            return t.attr('href').split('#')[1];
        },
        getPositions: function() {
            var t,
                n,
                i,
                s = this;
            s.$nav.each(function() {
                (t = s.getHash(o(this))),
                    (i = o('#' + t)).length &&
                        ((n = i.offset().top), (s.sections[t] = Math.round(n)));
            });
        },
        getSection: function(t) {
            var n = null,
                i = Math.round(
                    this.$win.height() * this.config.scrollThreshold
                );
            for (var s in this.sections) this.sections[s] - i < t && (n = s);
            return n;
        },
        handleClick: function(t) {
            var n = this,
                i = o(t.currentTarget),
                s = i.parent(),
                e = '#' + n.getHash(i);
            s.hasClass(n.config.currentClass) ||
                (n.config.begin && n.config.begin(),
                n.adjustNav(n, s),
                n.unbindInterval(),
                n.scrollTo(e, function() {
                    n.config.changeHash && (a.location.hash = e),
                        n.bindInterval(),
                        n.config.end && n.config.end();
                })),
                t.preventDefault();
        },
        scrollChange: function() {
            var t,
                n = this.$win.scrollTop(),
                i = this.getSection(n);
            null !== i &&
                ((t = this.$elem
                    .find('a[href$="#' + i + '"]')
                    .parent()).hasClass(this.config.currentClass) ||
                    (this.adjustNav(this, t),
                    this.config.scrollChange && this.config.scrollChange(t)));
        },
        scrollTo: function(t, n) {
            var i = o(t).offset().top;
            o('html, body').animate(
                { scrollTop: i },
                this.config.scrollSpeed,
                this.config.easing,
                n
            );
        },
        unbindInterval: function() {
            clearInterval(this.t), this.$win.unbind('scroll.onePageNav');
        }
    }).defaults),
        (o.fn.onePageNav = function(t) {
            return this.each(function() {
                new n(this, t).init();
            });
        });
})(jQuery, window, document);
var menu = document.getElementById('.menu');
$('.menu').click(function() {
    $('.list').toggleClass('d-block');
}),
    $(document).ready(function() {
        $('#nav').onePageNav();
    });
let nav = document.getElementById('navigation');

document.addEventListener('scroll', function() {
    //if(!nav.classList.contains('ombre')){

    if (window.scrollY == 0) {
        nav.classList.remove('ombre');
    } else {
        nav.classList.add('ombre');
    }
    //}
});
