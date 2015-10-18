/**
 * Created by Nicklas.Vind on 18-10-2015.
 */

  var config = {
    cookies:[
      {
        hostnames: ['www.oxid.io','www.oxid.dk'],
        cookieContainer:'#Oxidcookie',
        headline:'headline',
        information:'text',
        enabled:true,
        buttons:[
          {
            button:'cookies-accept',
            text:'Thanks!',
            link:'http//www.m.dk',
            enabled:true
          },
          {
            button:'cookies-decline',
            text:'No thanks!',
            link:'http//www.m.dk',
            enabled:false
          },
          {
            button:'more-info',
            text:'read more',
            link:'http//www.m.dk',
            enabled:true
          }
        ]
      }
    ]
  };
var NFV = NFV|| {};
NFV.OXID = NFV.OXID |{};
(function (module, $) {
  module.Cookie = (function () {
    var init = function (config) {
      for(var i = 0;config.cookies; i++){
        var modal = config.cookies[i];
        if(_hasDomain(modal.hostnames) && modal.enabled === true){
          _enabledButtons(modal);
          $(modal.cookieContainer).on('click', function (event) {
            _clickEventsHandler(event);
          });
        }
      }
    };
    var _cookieModal = function (modal) {
      var _container = $(modal.cookieContainer);
      _container.show();
      _container.find('emphasized-text').text = modal.headline;
      _container.find('cookie-text').text = modal.information;
    };
    var _hasDomain = function (domains) {
      var validDomain = false;
      if(domains.indexOf(window.location.hostname) !== -1){
        validDomain = true;
      }
      return validDomain;
    };
    var _enabledButtons = function (config) {
      var btns = config.buttons;
      for(var i = 0; btns.length < i; i++){
        var btn = btns[i];
        if(btn.enabled === true){
          _genericButton(btn);
        }
      }
    };
    var _clickEventsHandler = function (evt) {
      var btn =  $(evt.target);
      if(buttons.indexOf(btn).attr('id')){
        evt.preventDefault();
        var url = btn.attr('href');
        window.open(url, '_blank');
      }
    };
      var _genericButton = function (options) {
      var acceptBtn = $('#'+options.id);
      if(options.enabled === true){
        acceptBtn.show();
        acceptBtn.txt = options.text;
        acceptBtn.href = options.link;
      }else{
        acceptBtn.hide();
      }
    };
    var publicApi = {
    };
    return publicApi;
  });

}(NFV.OXID, jQuery));
