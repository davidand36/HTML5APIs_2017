/*
  MirroredInputs.js
*/

(function() {
'use strict';

//=============================================================================

displayAllInputValues( );

$(':input').on( 'input change', displayNewValue );

//=============================================================================

function displayAllInputValues( ) {
    $(':input').each( function( ) {
        var input = $( this );
        var name = input.attr( 'name' );
        if ( name.indexOf( '_1') ) {
            displayValue( input );
            mirrorValue( input );
        }
    } );
}

//-----------------------------------------------------------------------------

function displayNewValue( evt ) {
    var input = $(evt.target);
    displayValue( input );
    mirrorValue( input );
}

//-----------------------------------------------------------------------------

function displayValue( input ) {
    var name = input.attr( 'name' );
    var nameBase = name.substr( 0, (name.length - 2) );
    var value = getValue( input );

    $( '#' + nameBase + '-value' ).text( value );
}

//-----------------------------------------------------------------------------

function mirrorValue( input ) {
    var name = input.attr( 'name' );
    var nameParts = name.split( '_' );
    var nameBase = nameParts[ 0 ];
    var nameIndex = nameParts[ 1 ];
    var mirrorIndex = (nameIndex === '1')  ?  '2'  :  '1';
    var mirrorName = nameBase + '_' + mirrorIndex
    var mirror = $( '[name=' + mirrorName + ']' );
    var value = getValue( input );
    setValue( mirror, value );
}

//-----------------------------------------------------------------------------

function getValue( input ) {
    var type = input.attr( 'type' );

    if ( type === 'checkbox' ) {
        return input.prop( 'checked' );
    } else {
        return input.val( );
    }
}

//-----------------------------------------------------------------------------

function setValue( input, value ) {
    var type = input.attr( 'type' );

    if ( type === 'checkbox' ) {
        input.prop( 'checked', value );
    } else if ( type === 'radio' ) {
        input.val( [ value ] );
    } else {
        input.val( value );
    }
}

//=============================================================================
})();
