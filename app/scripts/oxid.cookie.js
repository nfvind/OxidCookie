/**
 * Created by Nicklas.Vind on 18-10-2015.
 */

  var xconfig = {
    cookies:[
      {
        hostnames: ['www.oxid.io','www.oxid.dk'],
        cookieContainer:'#Oxidcookie',
        headline:'headline',
        information:'text',
        enabled:true,
        CookieConfig:{
          saveAnswer: true,
          cookieName:'OxidCookie',
          saveAnswerPeriod:90
        },
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
var NFV = NFV || {};
NFV.OXID = NFV.OXID || {};
(function (module, $) {
  module.Cookie = (function () {
    var config = {};
    var init = function (configuration) {

      var _config = _fillBlankConfiguration(configuration);
      for(var i = 0;i< _config.cookies.length; i++){
        config = _config.cookies[i];
        if(_hasDomain(config.hostnames) && config.enabled === true){
          _enabledButtons(config);
          _createCookie(config,false,window.location.hostname);
          $(config.cookieContainer).on('click', function (event) {
            event.preventDefault();
            _clickEventsHandler(event, config.buttons);
          });
          _cookieModal(config);
        }
      }
      if(_getCookie() === undefined || false){
       // show
      }
    };
    var _fillBlankConfiguration = function (configs) {
      var _config = {
        cookies:[
          {
            hostnames: configs.hostnames || [],
            cookieContainer:configs.cookieContainer || '#Oxidcookie',
            headline:configs.headline || 'headline',
            information:configs.information || 'text',
            enabled:configs.enabled || true,
            cookieConfig:configs.cookieConfig || {
              saveAnswer:configs.saveAnswer || true,
              cookieName:configs.cookieName || 'OxidCookie',
              saveAnswerPeriod:configs.saveAnswerPeriod || 90
            },
            buttons:config.buttons || [
              {
                buttonId:'cookies-accept',
                text:'Thanks!',
                link: 'http://www.m.dk',
                enabled: true
              },
              {
                buttonId:'cookies-decline',
                text:'No thanks!',
                link:'http//www.m.dk',
                enabled:false
              },
              {
                buttonId:'more-info',
                text:'read more',
                link:'http//www.m.dk',
                enabled:true
              }
            ]
          }
        ]
      };
      return _config;
    };
    var _createCookie = function (modal,answer, domain) {
      Cookies.set(modal.cookieConfig.cookieName, answer,{
        expires:config.cookieConfig.saveAnswerPeriod,
        //  path:window.location.pathname,
        domain:domain
      });
    };
    var _updateCookie = function (answer) {
      var _cook = Cookies.get(config.cookieConfig.cookieName);
      _createCookie(answer, _cook.domain);
    };
    var _getCookie = function () {
      var _cook = Cookies.get(config.cookieConfig.cookieName);
      return _cook;
    };
    var _cookieModal = function (modal) {
      var _container = $(modal.cookieContainer);
      _container.find('emphasized-text').text = modal.headline;
      _container.find('cookie-text').text = modal.information;
      _container.show();
    };
    var _hasDomain = function (domains) {
      var validDomain = false;
      if(domains.indexOf(window.location.hostname) !== -1 || domains.length === 0){
        validDomain = true;
      }
      return validDomain;
    };
    var _enabledButtons = function (config) {
      var btns = config.buttons;
      for(var i = 0;btns.length > i; i++){
        var btn = btns[i];
        if(btn.enabled === true){
          _genericButton(btn);
        }
      }
    };
    var _findobject = function (key, array) {
      var id = 0,
          obj = {};
      for(var i = 0;array.length > i; ++i){
        console.log(array[i]);
       if(array[i].buttonId == key){
         id = i;
         obj = array[i];
       }else{
         id = -1;
         obj = {};
       }
      }
      return {
        id:id,
        obj:obj
      };
    };
    var _clickEventsHandler = function (evt, buttons) {
      var btn =  $(evt.target);
      var obj = _findobject(evt.target.id, buttons);
      console.log(obj);
      if(obj.id === evt.target.id && obj.obj.enabled === true){
        if(btn.attr('id') === buttons[0].button){
          _updateCookie(true);
        }
        var url = evt.href;

        window.open(url);

      }
      console.log(buttons.indexOf(evt.target.id));
    };
      var _genericButton = function (options) {
      var acceptBtn = $('#'+options.buttonId);
      if(options.enabled === true){
        acceptBtn.html(options.text);
        acceptBtn.attr('href',options.link);
        acceptBtn.attr('target','_blank');
        acceptBtn.show();
      }else{
        acceptBtn.hide();
      }
    };
    var publicApi = {
      init:init,
      config:config,
      createCnfg:_fillBlankConfiguration
    };
    return publicApi;
  });

}(NFV.OXID, jQuery));
