$(function() {
  jQuery.expr[":"].containsCaseInsensitive = jQuery.expr.createPseudo(function(arg) {
     return function(elem) {
       return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
     };
  });

  setTimeout(replaceTitles, 5000);
});

function replaceTitles() {
  var TO_REPLACE = {
    '.story_name': ['Quick', 'Admins', 'Newbis'],
    '.owner': ['AK', 'CJ']
  }

  Object.keys(TO_REPLACE).forEach(function(cssClass) { // loop thru keys in TO_REPLACE; key = cssClass
    TO_REPLACE[cssClass].forEach(function(text) { // loop thru values in TO_REPLACE; values are texts to replace
      replaceTitle(text, cssClass);
    });
  });
}

function replaceTitle(name, cssClass) {
  var imgTag = "<img src='" + chrome.extension.getURL('images/' + name.toLowerCase() + '.png') + "'/>";

  var elements = $(cssClass + ":containsCaseInsensitive('" + name + "'):visible"); // selector here was changed to be case-insensitive

  $(elements).each(function() {
    $(this).parents('.story').addClass(name.toLowerCase() + '-story'); // add to all matched stories css class, e.g: quick-story

    var regEx = new RegExp(name, 'i'); // Regular expression to find all substring occurencies; `i` means case-insensitive

    var newContent = $(this).text().replace(regEx, imgTag); // Replace matched substring with img tag

    $(this).html(newContent);
  });
}
