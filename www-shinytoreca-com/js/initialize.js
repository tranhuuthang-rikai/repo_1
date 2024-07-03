var com = {};
com.bitware = {};
com.bitware.toreca_web = {};
com.bitware.toreca_web.messages = {};
com.bitware.toreca_web.codes = {};
com.bitware.toreca_web.jslabels = {};

/**
 * jQueryのserializeファンクションをフックし、 非活性項目についてもserializeされるように修正。
 *
 * @param $ jquery
 * @returns シリアライズ結果
 */
(function($){
  var proxy = $.fn.serialize;
  $.fn.serialize = function(){
    var inputs = this.find(':disabled');
    inputs.prop('disabled', false);
    var serialized = proxy.apply( this, arguments );
    inputs.prop('disabled', true);
    return serialized;
  };
})(jQuery);

/**
 * startWithが存在しないときは実装
 */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
