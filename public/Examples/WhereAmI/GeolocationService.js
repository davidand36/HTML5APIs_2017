/*
    GeolocationService.js

    Routines for getting and watching geolocation
*/

geolocationService = (function( ) {
    'use strict';
    //=========================================================================

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
        isSupported: isSupported,
        setErrorHandler: setErrorHandler,
        getOnce: getOnce,
        startWatching: startWatching,
        stopWatching: stopWatching,
        hasChanged: hasChanged,
        getPosition: getPosition
    };

    //=========================================================================

    function isSupported( ) {
        return (navigator && navigator.geolocation);
    }

    //=========================================================================

    function getOnce( ) {
        if ( ! isSupported() ) {
            return;
        }

        navigator.geolocation.getCurrentPosition( setPosition, handleError, options );
    }

    //=========================================================================

    function startWatching( ) {
        if ( ! isSupported() ) {
            return;
        }

        watchId = navigator.geolocation.watchPosition( setPosition, handleError, options );
    }

    //-------------------------------------------------------------------------

     function stopWatching( ) {
         if ( watchId )
         {
             navigator.geolocation.clearWatch( watchId );
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

        if ( errorHandler ) {
            errorHandler( message );
        } else {
            console.log( message );
        }
    }

    //=========================================================================
})( );
