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
          _cookieModal();
          _buttons();
        }
      }

    };
    var _fillBlankConfiguration = function (configs) {
      var _config = {
        cookies:configs.cookies || [
          {
            hostnames: [],
            cookieContainer: '#Oxidcookie',
            headline: 'headline',
            information: 'text',
            enabled: true,
            modalEffects:{
              showEffect:'drop',
              showDir:'down',
              showSpeed:'slow',
              hideEffect:'drop',
              hideDir:'down',
              hideSpeed:'slow'

            },
            cookieConfig: {
              saveAnswer: true,
              cookieName: 'OxidCookie',
              saveAnswerPeriod: 90
            },
            buttons: {
              acceptButton: {
                id: 'cookies-accept',
                text: 'Thanks!',
                link: '#',
                enabled: true
              },
              declineButton: {
                id: 'cookies-decline',
                text: 'No thanks!',
                link: 'http://www.m.dk',
                enabled: false
              },
              infoButton: {
                id: 'more-info',
                text: 'read more',
                link: 'http://www.m.dk',
                enabled: true
              }

            }
          }
        ]
      };


      return _config;
    };
    var _buttons = function () {
      var buttons = config.buttons;
      _genericButtons(buttons.acceptButton);
      _genericButtons(buttons.declineButton);
      _genericButtons(buttons.infoButton);

    };
    var _hideCookieModal = function () {
      var _container = $(config.cookieContainer);
      _container.hide( config.modalEffects.hideEffect, { direction: config.modalEffects.hideDir }, config.modalEffects.hideSpeed );
    };
    var _genericButtons = function (button) {
      var $button = $("#"+button.id);
      if(button.enabled){
        $button.html(button.text);
        $button.attr('href',button.link);
        $button.attr('target','_blank');
        $button.show();
        addEvents($button, button);
      }else{
        $button.hide();
      }

    };
    var addEvents = function ($button, button) {
      $button.on('click', function (event) {
        event.preventDefault();
        //events
        if(button.link != ''){
          if(button.link != '#'){
          window.open(button.link);
          // functions
          }
        }else{

        }
        if($(event.target).attr('id') == 'cookies-accept'){
          _hideCookieModal($(event.target));
        }
        _createOrUpdateCookie(true);
        console.log(event.target);
      });
    };
    var _createOrUpdateCookie = function (answer) {
      Cookies.set(config.cookieConfig.cookieName, answer,{
        expires:config.cookieConfig.saveAnswerPeriod,
        //  path:window.location.pathname,
        domain:_getHostName()
      });
    };
    var _getHostName = function () {
      return window.location.hostname;
    };
    var _getCookie = function () {
      var _cookie = Cookies.get(config.cookieConfig.cookieName);
      return _cookie;
    };
    var _cookieModal = function () {
      var _container = $(config.cookieContainer);
      var answer = _getCookie();
      if(answer == "false" || answer === undefined ){
        _container.find('emphasized-text').text = config.headline;
        _container.find('cookie-text').text = config.information;
        _container.show(config.modalEffects.showEffect, { direction: config.modalEffects.showDir }, config.modalEffects.showSpeed);
      }else{
        _container.hide();
      }
    };
    var _hasDomain = function (domains) {
      var validDomain = false;
      if(domains.indexOf(window.location.hostname) !== -1 || domains.length === 0){
        validDomain = true;
      }
      return validDomain;
    };
    var publicApi = {
      init:init
    };
    return publicApi;
  });

}(NFV.OXID, jQuery));
