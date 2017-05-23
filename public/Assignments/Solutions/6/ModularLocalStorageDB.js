/*
  ModularLocalStorageDB.js

  App that uses Local Storage to manage a simple database
*/

(function() {
'use strict';
//=============================================================================


displayPeople( );

$('#new-person').on( 'click', showAddForm );

//=============================================================================

function displayPeople( ) {
    var i, len, person;
    var tr;

    app.dataMgr.listItems( displayPersonTable, displayError );

    //-------------------------------------------------------------------------

    function displayPersonTable( people ) {
        $('#people').empty();

        for ( i = 0, len = people.length; i < len; ++i ) {
            tr = makeTableRow( people[ i ] );
            $('#people').append( tr );
        }

        $('#table-page').show();
        $('#form-page').hide();
    }

    //-------------------------------------------------------------------------

    function makeTableRow( person ) {
        var tr, td, button;

        tr = $( '<tr>' );

        td = $( '<td>' );
        td.text( person.name );
        tr.append( td );

        td = $( '<td>' );
        td.text( person.age );
        tr.append( td );

        td = $( '<td>' );
        button = $( '<button type="button">' );
        button.text( 'Edit' );
        td.append( button );
        button.on( 'click', showEditForm );
        button = $( '<button type="button">' );
        button.text( 'Delete' );
        td.append( button );
        tr.append( td );
        button.on( 'click', confirmAndDelete );

        return tr;

        //---------------------------------------------------------------------

        function showEditForm( ) {
            $('#name').val( person.name );
            $('#age').val( person.age );

            $('#submit').one( 'click', updatePerson );
            $('#cancel').one( 'click', displayPeople );

            $('#table-page').hide();
            $('#form-page').show();

            //-----------------------------------------------------------------

            function updatePerson( evt ) {
                var editedPerson = {
                    name: $('#name').val(),
                    age: $('#age').val()
                };

                evt.preventDefault( );
                clearError( );

                app.dataMgr.updateItem( person._id, editedPerson,
                                        displayPeople, displayError );
            }
        }

        //---------------------------------------------------------------------

        function confirmAndDelete( evt ) {
            evt.preventDefault( );
            clearError( );

            if ( window.confirm( 'Are you sure you want to delete "' +
                                 person.name + '"?' ) ) {
                app.dataMgr.deleteItem( person._id, displayPeople, displayError );
            }
        }
    }
}

//=============================================================================

function showAddForm( ) {
    $('#name').val( '' );
    $('#age').val( '' );

    $('#submit').one( 'click', addPerson );
    $('#cancel').one( 'click', displayPeople );

    $('#table-page').hide();
    $('#form-page').show();

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

function displayError( errorMsg ) {
    $('#error-message').html( errorMsg );
}

//-----------------------------------------------------------------------------

function clearError( ) {
    $('#error-message').html( '' );
}


//=============================================================================
})();
