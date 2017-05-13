$(function() {
  setTimeout(replaceTitles, 5000);
});

function replaceTitles() {
  $.each(['Quick', 'Admins', 'Newbis'], function(idx, val) {
    replaceTitle(val, '.story_name');
  });

  $.each(['AK', 'HK', 'CJ'], function(i, val) {
    replaceTitle(val, '.owner');
  })
}

function replaceTitle(name, cssClass) {
  var imgTag = "<img src='" + chrome.extension.getURL('images/' + name.toLowerCase() + '.png') + "'/>";

  $(cssClass + ":contains('" + name + "'):visible").each(function() {
    var new_content = $(this).text()
                             .replace(name, imgTag);
    $(this).html(new_content);
  });
}
