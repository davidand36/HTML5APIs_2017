/*
  HandlebarsTest.js
*/


(function() {
'use strict';
//=============================================================================

var helloTemplate = Handlebars.compile( $('#helloTemplate').html() );
var nameTemplate = Handlebars.compile( $('#nameTemplate').html() );
var escapedHtmlTemplate = Handlebars.compile( $('#escapedHtmlTemplate').html() );
var unescapedHtmlTemplate = Handlebars.compile( $('#unescapedHtmlTemplate').html() );
var ifElseTemplate = Handlebars.compile( $('#ifElseTemplate').html() );
var stringListTemplate = Handlebars.compile( $('#stringListTemplate').html() );
var tableTemplate = Handlebars.compile( $('#tableTemplate').html() );
var addressTemplate = Handlebars.compile( $('#addressTemplate').html() );
Handlebars.registerPartial( 'address', addressTemplate );
var addressesTemplate = Handlebars.compile( $('#addressesTemplate').html() );
Handlebars.registerHelper( 'formatPhone', formatPhone );
var phoneTemplate = Handlebars.compile( $('#phoneTemplate').html() );

$('#hello-button').on( 'click', showHello );
$('#name-button').on( 'click', showName );
$('#escaped-html-button').on( 'click', showEscapedHtml );
$('#unescaped-html-button').on( 'click', showUnescapedHtml );
$('#if-button').on( 'click', showIf );
$('#else-button').on( 'click', showElse );
$('#string-list-button').on( 'click', showStringList );
$('#table-button').on( 'click', showTable );
$('#addresses-button').on( 'click', showAddresses );
$('#phone-button').on( 'click', showPhone );

//=============================================================================

function showHello( ) {
    var data = { name: 'world' };
    var html = helloTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showName( ) {
    var data = {
        name: {
            first: 'George',
            last: 'Washington'
        }
    };
    var html = nameTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showEscapedHtml( ) {
    var data = { html: 'This has <em>emphasized</em> text.' };
    var html = escapedHtmlTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showUnescapedHtml( ) {
    var data = { html: 'This has <em>emphasized</em> text.' };
    var html = unescapedHtmlTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showIf( ) {
    var data = {
        name: {
            first: 'George',
            last: 'Washington'
        }
    };
    var html = ifElseTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showElse( ) {
    var data = {};
    var html = ifElseTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showStringList( ) {
    var data = {
        fruits: [
            'Apple',
            'Banana',
            'Cherry'
        ]
    };
    var html = stringListTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showTable( ) {
    var data = {
        elections: [
            {
                year: 1956,
                president: 'Eisenhower',
                vp: 'Nixon'
            },
            {
                year: 1960,
                president: 'Kennedy',
                vp: 'Johnson'
            },
            {
                year: 1964,
                president: 'Johnson',
                vp: 'Humphrey'
            },
            {
                year: 1968,
                president: 'Nixon',
                vp: 'Agnew'
            }
        ]
    };
    var html = tableTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function showAddresses( ) {
    var data = {
        billing: {
            name: 'Sum Pur Sukker',
            streetAddress1: '123 Memory Lane',
            city: 'Innocence',
            state: 'OK',
            zipCode: '98765-4321'
        },
        shipping: {
            name: 'Idy Theef',
            streetAddress1: '7734 Prison Road',
            streetAddress2: 'Cell Block 9',
            city: 'Guilty',
            state: 'TX',
            zipCode: '95959-5959'
        }
    };
    var html = addressesTemplate( data );
    $('#main').html( html );
}

//=============================================================================

function formatPhone( phone ) {
    return '(' + phone.substr( 0, 3) + ') ' + phone.substr( 3, 3 ) +
        '-' + phone.substr( 6, 4 );
}

//=============================================================================

function showPhone( ) {
    var data = { phone: '2065551212' };
    var html = phoneTemplate( data );
    $('#main').html( html );
}

//=============================================================================
})();
