/*
  RestDBAppWithTemplate.js

  App that uses a REST API to manage a simple database
  and templates to display it.
*/

(function() {
'use strict';
//=============================================================================

var people = [];
var tableTemplate = Handlebars.compile( $('#tableTemplate').html() );
var formTemplate = Handlebars.compile( $('#formTemplate').html() );

displayPeople( );

//=============================================================================

function displayPeople( ) {
    clearError( );
    app.dataMgr.listItems( displayPersonTable, displayError );

    //-------------------------------------------------------------------------

    function displayPersonTable( list ) {
        people = list;
        var data = {
            people: people
        };
        var html = tableTemplate( data );
        $('#main').html( html );

        $('#new-person').on( 'click', showAddForm );
        $('.edit').on( 'click', showEditForm );
        $('.delete').on( 'click', confirmAndDeletePerson );
    }
}

//=============================================================================

function showAddForm( ) {
    var html = formTemplate( {} );
    $('#main').html( html );
    $('#submit').one( 'click', addPerson );
    $('#cancel').one( 'click', displayPeople );

    //-------------------------------------------------------------------------

    function addPerson( evt ) {
        var newPerson = {
            name: $('#name').val(),
            age: $('#age').val()
        };

        evt.preventDefault( );
        clearError( );

        app.dataMgr.createItem( newPerson, displayPeople, displayError );
    }
}

//=============================================================================

function showEditForm( evt ) {
    var btn = evt.target;
    var id = $(btn).attr( 'data-id' );
    var person = people.find( function( person ) {
        return person._id === id;
    } );
    var html = formTemplate( person );
    $('#main').html( html );
    $('#submit').one( 'click', updatePerson );
    $('#cancel').one( 'click', displayPeople );
    evt.preventDefault( );

    //-------------------------------------------------------------------------

    function updatePerson( evt ) {
        var editedPerson = {
            name: $('#name').val(),
            age: $('#age').val()
        };

        evt.preventDefault( );
        clearError( );

        app.dataMgr.updateItem( id, editedPerson,
                                displayPeople, displayError );
    }
}

//=============================================================================

function confirmAndDeletePerson( evt ) {
    var btn = evt.target;
    var id = $(btn).attr( 'data-id' );
    var person = people.find( function( person ) {
        return person._id === id;
    } );

    evt.preventDefault( );
    clearError( );

    if ( window.confirm( 'Are you sure you want to delete "' + person.name + '"?' ) ) {
         app.dataMgr.deleteItem( person._id, displayPeople, displayError );
    }
}

//=============================================================================

function displayError( errorMsg ) {
    $('#error-message').html( errorMsg );
}

//-----------------------------------------------------------------------------

function clearError( ) {
    $('#error-message').html( '' );
}


//=============================================================================
})();
