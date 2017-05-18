/*
  AddedOnly.js

  Maintains in-memory database. Only implements add.
*/

(function() {
'use strict';
//=============================================================================

var people = [];

displayPeople( );

$('#new-person').on( 'click', addNewPerson );

//=============================================================================

function displayPeople( ) {
    var i, len, person;
    var tr, td;

    $('#people').empty();

    for ( i = 0, len = people.length; i < len; ++i ) {
        person = people[ i ];

        tr = $( '<tr>' );

        td = $( '<td>' );
        td.text( person.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( person.age );
        tr.append( td );

        $('#people').append( tr );
    }

    $('#table-page').show();
    $('#form-page').hide();
}

//=============================================================================

function addNewPerson( ) {
    $('#name').val( '' );
    $('#age').val( '' );

    $('#submit').one( 'click', addPerson );
    $('#cancel').one( 'click', displayPeople );

    $('#table-page').hide();
    $('#form-page').show();

    //=========================================================================

    function addPerson( evt ) {
        var newPerson = {
            name: $('#name').val(),
            age: $('#age').val()
        };
        people.push( newPerson );

        evt.preventDefault( );

        displayPeople( );
    }
}

//=============================================================================
})();
