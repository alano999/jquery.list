(function ($, document, window, undefined) {
    "use strict";

    var level = 0,
        defaults = {
        },
        methods = {
            init: function (options) {

                if (!this.size()) {
                    $.error("Selection is empty; unable to construct a jqList");
                } else {
                    settings = $.extend(defaults, { definition: List }, options);
                    if (!Array.isArray(settings.definition)) {
                        $.error("No list definition data (no List var and no 'definition' option); unable to construct a jqList");
                    } else {
                        //construct list
                        this.append(listBranches(settings.definition));
                        //add custom event handler for users to react to
                        this.on("click.jqList", "li", function () {
                            $(this).trigger({
                                type: "selected",
                                siblings: $(this).closest("ul").find(" > div > li").not(this),
                                parent: $(this).parent().closest("li"),
                                children: $(this).find(" > ul > div > li")
                            });
                        });
                        return $("li", this);
                    }
                }
            },
            collapse: function () {
                $("li ul", this).hide(); //hide all sub-list containers
            },
            destroy: function () {
                this.empty();
                this.off(".jqList"); //remove all event handlers
            }
        },
        settings = {};

    //iterate list trunks/branches
    function listBranches(trunk) {
        var $trunk = $("<ul>", { "data-level": ++level });
        trunk.forEach(function (branch) {
            var $wrapper = $("<div>", { "data-level": level });
            var $branch = $("<li>", $.extend(branch.props, { "data-level": level }));
            if (branch.sub) listBranches(branch.sub).appendTo($branch);
            $branch.appendTo($wrapper); $wrapper.appendTo($trunk);
        });
        level--;
        return $trunk;
    }

    /***********************************************************************
    ** jqList - Construct and append list to the chained selection
    ************************************************************************
    **  Syntax:-
    **      .jqList([options]|[method])
    **          options - on first use, various options may be provided...
    **              definition: JSON data from which to construct the list
    **                  (by default, plugin will try global var "List")
    **          method - a string having one of the following values...
    **              "collapse" - causes sub-list entries to become hidden
    **              "destroy" - completely remove list
    **  Returns:- the li elements created
    **  Events:-
    **      selected - when a list item is clicked, provide relatives:-
    **          event.siblings - a jQuery collection of item's siblings
    **          event.parent - a jQuery collection of item's parent
    **          event.children - a jQuery collection if item's children 
    **  
    ***********************************************************************/
    $.fn.jqList = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist on jqList");
        }
    };

    // Return selection containing matching specified Data key/value
    $.fn.havingData = function (key, valueOrRegexOrjQuery) {
        var test = valueOrRegexOrjQuery;
        if (test instanceof jQuery) { //match data(key) values in two jQuery selections
            return this.filter(function () {
                var $item = $(this);
                return test.get().some(function (v) {
                    var some = $item.data(key) == $(v).data(key);
                    return some;
                });
            });
        } else { //match data(key) with specified string value or regex
            var value = (test instanceof RegExp) ? test : new RegExp(test);
            return this.filter(function () { return $(this).data(key).search(value) >= 0; });
        }
    };

})(jQuery, document, window);