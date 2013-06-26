;(function($, window, document, undefined ){

    var pluginName = "dropdownMask",
        defaults = {
            focussedSelector: "focussed",
            replacedSelector: 'select-replace',
            replacedTextSelector: 'select-text'
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var _self = this;
            var _el = this.element;
            var _options = this.options;
            var $el = $(this.element);

            $el.before('<div class="'+this.options.replacedSelector+'">' +
                '<span class="'+this.options.replacedTextSelector+'">' +
                $el.find('option').text() +
                '</span>' +
                '</div>');

            $('.site-content').on('change', $el, function() { _self.update(_self.element,_self.options) })
                .on('blur', $el, function() { _self.blur(_self.element,_self.options) })
                .on('focus', $el, function() { _self.focus(_self.element,_self.options) });
        },

        update: function(el,options) {
            $(el).prev('.'+options.replacedSelector).find('.'+options.replacedTextSelector).text($(el).find('option:selected').text())
        },

        focus: function(el, options) {
            $(el).prev('.'+options.replacedSelector).addClass(options.focussedSelector)
        },

        blur: function(el, options) {
            $(el).prev('.'+options.replacedSelector).removeClass(options.focussedSelector)
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return $.each(this,function () {
            new Plugin( this, options )
        });
    };

})(window.Zepto || window.jQuery, window, document);