/*
    WhereAmI.js

    Main script for WhereAmI Web app
*/

(function() {
'use strict';
//=============================================================================

var watchingGeolocation = 0;
var watchingOrientation = 0;

//=============================================================================

geolocation.setErrorHandler( displayError );
geolocation.getOnce( );
setupUpdateLoop( );
setButtonHandlers( );

//=============================================================================

function setupUpdateLoop( ) {
    requestAnimationFrame( doUpdate );

    function doUpdate( ) {
        displayData( );
        requestAnimationFrame( doUpdate );
    }
}

//=============================================================================

function displayData( ) {
    displayDateTime( );
    displayGeolocation( );
    displayOrientation( );
    displayMotion( );
}

//-----------------------------------------------------------------------------

function displayDateTime( ) {
    var now = new Date();
    $('#localDateTimeCell').text( makeDateTimeString( now ) );
    $('#utcDateTimeCell').text( makeDateTimeString( now, true ) );
}

//-----------------------------------------------------------------------------

function displayGeolocation( ) {
    var geolocFields =
    [
        { name: 'latitude', unit: '°', decimals: 5 },
        { name: 'longitude', unit: '°', decimals: 5 },
        { name: 'altitude', unit: 'm', decimals: 1 },
        { name: 'speed', unit: 'm/s', decimals: 1 },
        { name: 'heading', unit: '°', decimals: 1 },
        { name: 'accuracy', unit: 'm', decimals: 1 },
        { name: 'altitudeAccuracy', unit: 'm', decimals: 1 }
    ];
    var geolocPos;
    var rowsShown = 0;
    var value;

    if ( geolocation.hasChanged() === false ) {
        return;
    }

    geolocPos = geolocation.getPosition();

    geolocFields.forEach( function( field ) {
        value = geolocPos.coords[ field.name ];
        var tableRow = $( '#' + field.name + 'Row' );
        var tableCell = $( '#' + field.name + 'Cell' );
        if ( value === null || value === undefined ) {
            tableRow.hide( );
        } else {
            tableCell.text( makeNumberString( value, field.decimals, 0 ) + field.unit );
            tableRow.show( );
            ++rowsShown;
        }
    } );
    if ( geolocPos.timestamp ) {
        value = new Date( geolocPos.timestamp );
        $( '#geolocAcquiredCell' ).text( makeDateTimeString( value, true ) );
        $( '#geolocAcquiredRow' ).show( );
        ++rowsShown;
    } else {
        $( '#geolocAcquiredRow' ).hide( );
    }

    if ( rowsShown > 0 ) {
        $( '#geolocationTable' ).show( );
    } else {
        $( '#geolocationTable' ).hide( );
    }
}

//-----------------------------------------------------------------------------

function displayOrientation( ) {

}

//-----------------------------------------------------------------------------

function displayMotion( ) {

}

//=============================================================================

function makeNumberString( num, decimals, minWidth ) {
    var str = '';
    var isInteger = (num === Math.floor( num ));
    var powerOfTen = 10;

    if ( isInteger || ! decimals ) {
        num = Math.floor( num );
        while ( minWidth > 1 ) {
            if ( num < powerOfTen ) {
                str += '0';
            }
            powerOfTen *= 10;
            --minWidth;
        }
        str += num.toString();
    } else {
        str = num.toFixed( decimals );
    }
    return str;
}

//-----------------------------------------------------------------------------

function makeDateTimeString( date, utc ) {
    var monthAbbrevs = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    var day = utc  ?  date.getUTCDate()          :  date.getDate();
    var mon = utc  ?  date.getUTCMonth()         :  date.getMonth();
    var yr =  utc  ?  date.getUTCFullYear()      :  date.getFullYear();
    var hr =  utc  ?  date.getUTCHours()         :  date.getHours();
    var min = utc  ?  date.getUTCMinutes()       :  date.getMinutes();
    var sec = utc  ?  date.getUTCSeconds()       :  date.getSeconds();
    var ms =  utc  ?  date.getUTCMilliseconds()  :  date.getMilliseconds();
    var str = '';

    str += makeNumberString( day, 0, 2 );
    str += monthAbbrevs[ mon ];
    str += makeNumberString( yr );
    str += ' ';
    str += makeNumberString( hr, 0, 2 );
    str += ':';
    str += makeNumberString( min, 0, 2 );
    str += ':';
    str += makeNumberString( sec, 0, 2);
    str += '.';
    str += makeNumberString( ms, 0, 3 );

    return str;
}

//=============================================================================

function setButtonHandlers( ) {
    $('#watchGeolocation').on( 'click', toggleWatchGeolocation );
}

//-----------------------------------------------------------------------------

function toggleWatchGeolocation( ) {
    var buttonTexts = [ 'Stop Geolocation', 'Watch Geolocation' ];
    if ( watchingGeolocation ) {
        geolocation.stopWatching( );
    } else {
        geolocation.startWatching( );
    }
    $('#watchGeolocation').text( buttonTexts[ watchingGeolocation ] );
    watchingGeolocation ^= 1;
}

//=============================================================================

function displayError( errorMsg ) {
    errorMsg = errorMsg.replace( '\n', '<br />' );
    $('#errorMessageDiv').html( errorMsg );
    $('#errorMessageDiv').show( );
    window.scrollTo( 0, 0 );
}

//=============================================================================
})();
