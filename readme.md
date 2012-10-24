jquery.list.js
==============
Create a hierarchical list, ideal for creating menus
----------------------------------------------------

This plugin creates multi-level hierarchical unordered lists, using a JSON definition object to provide list paramters.

Each list node is represented by one `<li>` wrapped in a <div> to aid styling. HTML attributes defined within the JSON on a per-node basis are added to each `<li>`.

The nodes of each hierarchical level are wrapped within a `<ul>` and all are annotated using a "data-level" attributed to assist in easily viewing hierarchy.

The plugin also provides a custom event named "selected" which fires each time an `<li>` is clicked, and provides useful hierarchical information (siblings, parent, children).

### Syntax ###
**.jqList([options]|[method])**

Assumes, by default, that the JSON list definition is in a global variable named List (can be overriden using *options*).

Returns, and passes to next chained function, a jQuery selection containing all `<li>` nodes created.

### Parameters ###
#### options (optional; first use only) ####
An object containing key/value pairs, which may be utilised on first use to set operational parameters.
##### definition: #####
The JSON definition data may be provided here. By default this plugin assumes the definition data resides in a global variable named List. This optional parameter overrides the default behaviour.

#### method (optional) ####
##### "collapse" #####
If the string value "collapse" is provided, sub-levels of the list will be hidden, leaving only the top level.

##### "destroy" #####
If the string value "destroy" is provided, the list will be completely removed.

### Events ###
#### selected ####
This custom event fires when an event handler is attached to the `<li>` elements and the element is clicked.

Helpful relational information is provided with each event:-
##### event.siblings #####
A jQuery collection of the clicked item's siblings
##### event.parent #####
A jQuery collection of the click item's parent
##### event.children #####
A jQuery collection if the clicked item's children 

USING jqList
------------

1. Download the .js file into your web app's folder
2. Add a reference to the .js in the page from which you wish to use it, typically by use of a `<script>` tag positioned immediately before the `</head>` tag.
3. Chain .jqList(myList) onto the container where you wish the list to be appended inside. This invocation assumes the "myList" variable has been initialised with the desired JSON configuration information.

Example, added just above </head> tag:-

	<script type="text/javascript" src="scripts/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/jquery.list.js"></script>
	<script type="text/javascript">
		var options = { definition: [{... your JSON definition data ...}]};
		var $list;
		
		function selectedHandler(event) {
			event.siblings.removeClass("visible"); //hide siblings
			$(this).addClass("visible"); //show only this one
		}

		$(document).ready(function() {
			//create list, append to container, set custom event handler, hide all <li>
			$list = $("div.container").jqList(options).on("selected", selectedHandler).hide();
			//show only top level <li> elements
			$('[data-level="1"]', $list).show();
		});
	</script>

There is a complete working example here:- [http://jsfiddle.net/alano/d4aQ2/](http://jsfiddle.net/alano/d4aQ2/)

For further information, please send message to developer.