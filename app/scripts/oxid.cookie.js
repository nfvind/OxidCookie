/**
 * Created by Nicklas.Vind on 18-10-2015.
 */
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

        }
      }

    };
    var _fillBlankConfiguration = function (configs) {
      var _config = {
        cookies:configs.cookies || [
          {
            hostnames: [],
            cookieContainer: 'oxidModalCookie',
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
            injectHtmlConfig:{
              enabled:false,
              parent:'#oxidmodal'
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
      var _container = $('#'+config.cookieContainer);
      _container.hide( config.modalEffects.hideEffect, { direction: config.modalEffects.hideDir }, config.modalEffects.hideSpeed );
    };
    var _genericButtons = function (button) {
      var $button = $("#"+button.id);
      if(button.enabled){
        $button.html(button.text);
        $button.attr('href',button.link);
        $button.attr('target','_blank');
        $button.show();
        _addEvents($button, button);
      }else{
        $button.hide();
      }

    };
    var _genericButtonsCreator = function (button) {
      var $button = $('<a href="" class="btn" id="'+button.id+'"></a>');
      if(button.enabled){
        $button.html(button.text);
        $button.attr('href',button.link);
        $button.attr('target','_blank');
        $button.show();
        _addEvents($button, button);
      }else{
        $button.hide();
      }
      return $button;
    };
    var _modalInjector = function () {
      var container = $('<div id="'+config.cookieContainer+'" class="oxidCookie"></div>');
      var textCont = $('<div class="cookie-text-container"></div>');
      var btnCont = $('<div class="cookie-buttons"></div>');
      textCont.append('<span class="emphasized-text">'+config.headline+'</span>');
      textCont.append('<span class="cookie-text">'+config.information+'</span>');
      if(config.buttons.acceptButton.enabled){
        btnCont.append(_genericButtonsCreator(config.buttons.acceptButton));
      }
      if(config.buttons.declineButton.enabled){
        btnCont.append(_genericButtonsCreator(config.buttons.declineButton));
      }
      if(config.buttons.infoButton.enabled){
        btnCont.append(_genericButtonsCreator(config.buttons.infoButton));
      }
      container.append(textCont);
      container.append(btnCont);
      var parent = $(config.injectHtmlConfig.parent);
      container.hide();
      parent.append(container);
      return container;
    };
    var _addEvents = function ($button, button) {
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
          if(config.cookieConfig.saveAnswer){
            _createOrUpdateCookie(true);
          }
          _hideCookieModal();
        }
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
      var _container;
      var answer = _getCookie();
      if(config.injectHtmlConfig.enabled === true){
        _container = _modalInjector();
      }else{
        _container = $('#'+config.cookieContainer);
        _container.find('.emphasized-text').first().text(config.headline);
        _container.find('.cookie-text').first().text(config.information);
        _buttons();
      }
      if(answer == "false" || answer === undefined ){
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
