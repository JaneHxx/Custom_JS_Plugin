// 打印
PrintAnswer.doPrint = function (options) {
  var _default = {
      idSelector: '',
      pageTitle: '打印标题',
  };
  options = Object.assign({}, _default, options);
  if (options.idSelector == '') {
      return alert('传参错误，请确认是否正确使用打印方法!');
  }
  var strFrameName = "printthis";
  var $frame = $("<iframe id='" + strFrameName + "' name='printIframe' />");
  $frame.appendTo("body");
    setTimeout(function() {
        var $doc = $frame.contents(),
            $head = $doc.find("head"),
            $body = $doc.find("body"),
            $base = $('base'),
            baseURL;
        baseURL = document.location.protocol + '//' + document.location.host;
        $head.append('<base href="' + baseURL + '">');
        var title = options.pageTitle;
        $head.append('<title>' + title + '</title>');
        var $element = $(options.idSelector);
        var $content = $element.clone();
        $body.append($content);
        // 打印
        if (document.queryCommandSupported("print")) {
            $frame[0].contentWindow.document.execCommand("print", false, null);
        } else {
            $frame[0].contentWindow.focus();
            $frame[0].contentWindow.print();
        }
        setTimeout(function () {
            $frame.remove();
        }, 1000);
    }, 333);
};