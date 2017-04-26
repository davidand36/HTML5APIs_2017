/*
    Geolocation.js

    Routines for getting and watching Geolocation
*/

geolocation = (function( ) {
    'use strict';
    //=========================================================================

    var navGeoloc = navigator.geolocation;
    var options = {
        enableHighAccuracy: true,
        maximumAge: 600000, //millisec
        timeout: 600000
    };
    var position;
    var changed = false;
    var watchId;
    var errorHandler;

    return {
        setErrorHandler: setErrorHandler,
        getOnce: getOnce,
        startWatching: startWatching,
        stopWatching: stopWatching,
        hasChanged: hasChanged,
        getPosition: getPosition
    };

    //=========================================================================

    function getOnce( ) {
        if ( ! navGeoloc ) {
            return;
        }

        navGeoloc.getCurrentPosition( setPosition, handleError, options );
    }

    //=========================================================================

    function startWatching( ) {
        if ( ! navGeoloc ) {
            return;
        }

        watchId = navGeoloc.watchPosition( setPosition, handleError, options );
    }

    //-------------------------------------------------------------------------

     function stopWatching( ) {
         if ( watchId )
         {
             navGeoloc.clearWatch( watchId );
             watchId = null;
         }
     }

     //=========================================================================

      function hasChanged( ) {
          return changed;
      }

     //-------------------------------------------------------------------------

      function getPosition( ) {
          changed = false;
          return position;
      }

     //=========================================================================

      function setPosition( geolocPosition ) {
          position = geolocPosition;
          changed = true;
      }

    //=========================================================================

    function setErrorHandler( handler ) {
        errorHandler = handler;
    }

    //-------------------------------------------------------------------------

    function handleError( error ) {
        var message;

        if ( ! errorHandler ) {
            return;
        }

        switch ( error.code ) {
            case error.PERMISSION_DENIED:
            message = "Geolocation permission denied.";
            break;
            case error.POSITION_UNAVAILABLE:
            message = "Geolocation position unavailable.";
            break;
            case error.TIMEOUT:
            message = "Geolocation timed out.";
            break;
        }
        message += '\n' + error.message;

        errorHandler( message );
    }

    //=========================================================================
})( );
