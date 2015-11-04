/**
 * Created by nvind on 04/11/15.
 */
var jsHelpers = (function ($, wndw) {
    wndw.checkObjProp = (function () {

        var _checkObject = function (prop) {

        };

        var _extend = function extend( destination, source ) {

            var toString = Object.prototype.toString,
                objTest = toString.call({});

            for ( var property in source ) {
                if ( source[property] && objTest === toString.call(source[property]) ) {
                    destination[property] = destination[property] || {};
                    extend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;

        };

        return {

        }
    });
}(jQuery, window));

var quarks = {
    neutron:{
        atom:{
            molecule:{
                name:"h2o",
                composition:"dihydrogen, oxygen"
            }
        }
    }
};