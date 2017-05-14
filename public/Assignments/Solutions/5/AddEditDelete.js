/*
  AddedEditDelete.js

  Maintains in-memory database. Implements add, edit, and delete
*/

(function() {
'use strict';
//=============================================================================

var people = [];
var nextId = 1000;

displayPeople( );

$('#new-person').on( 'click', addNewPerson );
$('#people').on( 'click', '.edit', editPerson );
$('#people').on( 'click', '.delete', confirmAndDeletePerson );

//=============================================================================

function displayPeople( ) {
    var i, len, person;
    var tr, td, button;

    $('#people').empty();

    for ( i = 0, len = people.length; i < len; ++i ) {
        person = people[ i ];

        tr = $( '<tr data-id="' + person.id + '">' );

        td = $( '<td>' );
        td.text( person.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( person.age );
        tr.append( td );

        td = $( '<td>' );
        button = $( '<button type="button" class="edit">' );
        button.text( 'Edit' );
        td.append( button );
        button = $( '<button type="button" class="delete">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );

        $('#people').append( tr );
    }

    $('#table-page').show();
    $('#form-page').hide();
}

//=============================================================================

function addNewPerson( ) {
    addOrEditPerson( );
}

//=============================================================================

function editPerson( evt ) {
    var i = indexOfEventPerson( evt );
    if ( i >= 0 ) {
        addOrEditPerson( people[ i ] );
    }
}

//-----------------------------------------------------------------------------

function confirmAndDeletePerson( evt ) {
    var i = indexOfEventPerson( evt );
    if ( i >= 0 ) {
        if ( window.confirm( 'Are you sure you want to delete "' +
                             people[ i ].name + '"?' ) ) {
            deletePerson( i );
            displayPeople( );
        }
    }

    //-------------------------------------------------------------------------

    function deletePerson( idx ) {
        people.splice( idx, 1 );
    }
}

//-----------------------------------------------------------------------------

function indexOfEventPerson( evt ) {
    var btn = evt.target;
    var tr = $(btn).closest( 'tr' );
    var id = tr.attr( 'data-id' );
    var i, len;

    for ( i = 0, len = people.length; i < len; ++i ) {
        if ( people[ i ].id === id ) {
            return i;
        }
    }
    return -1;
}

//=============================================================================

function addOrEditPerson( person ) {
    if ( person ) {
        $('#name').val( person.name );
        $('#age').val( person.age );
    } else {
        $('#name').val( '' );
        $('#age').val( '' );
    }
    $('#submit').one( 'click', addOrUpdatePerson );
    $('#cancel').one( 'click', displayPeople );

    $('#table-page').hide();
    $('#form-page').show();

    //=========================================================================

    function addOrUpdatePerson( evt ) {
        var newPerson;

        evt.preventDefault( );

        if ( person ) {
            person.name = $('#name').val();
            person.age = $('#age').val();
        } else {
            newPerson = {
                id: (nextId++).toString(),
                name: $('#name').val(),
                age: $('#age').val()
            };
            people.push( newPerson );
        }
        displayPeople( );
    }
}

//=============================================================================
})();
