Share = {
  vkontakte: function(purl, ptitle, pimg, text) {
    url = 'http://vkontakte.ru/share.php?';
    url += 'url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&image=' + encodeURIComponent(pimg);
    url += '&noparse=true';
    Share.popup(url);
  },
  facebook: function(purl, ptitle, pimg, text) {
    url = 'http://www.facebook.com/sharer.php?s=100';
    url += '&p[title]=' + encodeURIComponent(ptitle);
    url += '&p[summary]=' + encodeURIComponent(text);
    url += '&p[url]=' + encodeURIComponent(purl);
    url += '&p[images][0]=' + encodeURIComponent(pimg);
    Share.popup(url);
  },
  twitter: function(purl, ptitle, pimg, text) {
    url = 'http://twitter.com/share?';
    url += 'text=' + encodeURIComponent(ptitle);
    url += '&url=' + encodeURIComponent(purl);
    url += '&counturl=' + encodeURIComponent(purl);
    Share.popup(url);
  },
  mailru: function(purl, ptitle, pimg, text) {
    url = 'http://connect.mail.ru/share?';
    url += 'url=' + encodeURIComponent(purl);
    url += '&title=' + encodeURIComponent(ptitle);
    url += '&description=' + encodeURIComponent(text);
    url += '&imageurl=' + encodeURIComponent(pimg);
    Share.popup(url);
  },
  popup: function(url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
};
(function() {

  var shareLinks = document.querySelectorAll(".share__link");
  var url = window.location.protocol + "//" + window.location.hostname;
  var title = "Test Your Knowledges";
  var imgUrl = url + "/images/icons/main_ico.png";
  var desc = "Test Your Knowledges - сервис для проверки знаний через интернет. Он поможет вам организовать онлайн тестирование знаний, провести оценку качества знаний учащихся, промежуточную или итоговую аттестацию студентов.";
  var backgroundPositionY = 0;
  Array.prototype.forEach.call(shareLinks, function(shareLink) {
    shareLink.onclick = function() {
      var social = this.getAttribute('data-social');
      Share[social](url, title, imgUrl, desc);
    }
  });
})();