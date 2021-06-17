function b() {
  var h = document.getElementsByTagName('iframe')[0].contentDocument.getElementById('novel_honbun').innerHTML;
  var s = document.getElementsByTagName('iframe')[0].contentDocument.getElementsByClassName('novel_subtitle')[0].outerHTML;
  var n = document.getElementsByTagName('iframe')[0].contentDocument.getElementById('novel_no').outerHTML;
  

    h = (s + '<div class="zerobox clear" style="margin-left:1em;"></div>' + h).replace(
        /(<("[^"]*"|'[^']*'|[^'">])*>)|([0-9a-zA-Z][0-9a-zA-Z/:-]*(\.[0-9a-zA-Z:-]+)*)|([!?][!?])/g, 
        function (match) {
            if (match.charAt(0) == '<' )
                return match.replace(/p id="[^"]+"/g, "p"); // remove id
            if (match.length <= 2) {
                return '<span style="-webkit-text-combine:horizontal">' + match + '</span>';
            } else {
                return match.replace(/[.A-Za-z0-9/:-]/g, function(s) {
                    if (s == ".") 
                        return "・";
                    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
                });
            }
        });

  var title = document.getElementsByTagName('iframe')[0].contentDocument.title;

  var b = "";
  var next = (1<0);
  var prev = (1<0);

  var nexts = document.getElementsByTagName('iframe')[0].contentDocument.querySelectorAll('[rel="next"]');
  if (nexts.length > 0) {
    next = nexts[0];
  }
  var prevs = document.getElementsByTagName('iframe')[0].contentDocument.querySelectorAll('[rel="prev"]');
  if (prevs.length > 0) {
    prev = prevs[0];
  }

  if (!prev && !next) {
    var bn = document.getElementsByTagName('iframe')[0].contentDocument.getElementsByClassName('novel_bn');
    if (bn.length > 0) {
      var a = bn[0].getElementsByTagName('a');
      if (a.length >= 2) {
        prev = a[0];
        next = a[1];
      }
    }
  }

  if (next) {
    b = b + '<div class="boxBtn" onclick="load(\'' + next.href + '\')" >次へ</div>';
  }

  if (prev) {
    b = b + '<div class="boxBtn" onclick="load(\'' + prev.href + '\')" >前へ</div>';
  }

  document.getElementById('pageBox').innerHTML = '<div class="fbox">'+ b +'</div>' + h + '<div class="fbox"><div class="zerobox clear"></div>'+b+'</div><div class="zerobox clear"></div><div class="box"></div>';
  document.getElementById('box2').innerHTML = title;
  document.getElementById('num').innerHTML = n + " ";
  document.getElementById("pageBox").scrollLeft = document.getElementById("pageBox").scrollWidth;
  window.scrollTo(1000000,0);
}

function load(url) {
  if (url.length > 0) {
    var element = document.getElementsByTagName('iframe');
    if (element.length > 0) {
      var p = element[0].parentNode;
      p.removeChild(element[0]);

      var ifrm = document.createElement("iframe");
      ifrm.style.width = "1px";
      ifrm.style.height = "1px";
      ifrm.setAttribute("scrolling", "no");
      ifrm.setAttribute("frameborder", "no");
      ifrm.setAttribute("src", url);
      ifrm.onload = b;

      p.appendChild(ifrm);

      document.getElementById('num').innerHTML = '<nobr class="dimm">Loading…</nobr>';
    }
  }
}

if (document.getElementById('NN_JS_MARK')) {
} else {
  var cur = document.URL;
  var w = document.documentElement.clientWidth;
  var w2 = w - 48;

  document.open();
  document.write('<html>');
  document.write('<head><link rel="stylesheet" type="text/css" href="' + location.protocol + '//github.com/vtns/NarouTateBookmarklet/blob/c4e78a57dafd209fd225dcd32ef249fefd59fa5a/N1.css"></head>');
  // top box
  document.write('<body><div class="container"><div id="NN_JS_MARK" class="topRow">');
  document.write('<div id="box2" style="width:' + w2 +'px; max-width:' + w2 + 'px"></div><div id="num" style="width:48px"></div></div></div>');

  // contents
  document.write('<div class="body-content-wrapper"><iframe width=1px height=1px onload="b()" src="' + cur + '" scrolling=no frameborder=0></iframe>');
  document.write('<div id="pageBox"></div></div></div>');

  document.write('</body></html>');
  document.close();
}
