/*
  RestTest.js
*/


(function() {
'use strict';
//=============================================================================

var BASE_URL = 'https://pacific-meadow-64112.herokuapp.com/data-api/';
//var BASE_URL = 'http://localhost:6226/data-api/';
var collection = 'danderson'; //Use your own!

$('#create-submit').on( 'click', handleCreateForm );
$('#read-list').on( 'click', handleReadList );
$('#read-submit').on( 'click', handleReadForm );
$('#update-submit').on( 'click', handleUpdateForm );
$('#delete-submit').on( 'click', handleDeleteForm );

//=============================================================================

function reportResponse( response ) {
    $('#response').text( JSON.stringify( response, null, 4 ) );
}

//-----------------------------------------------------------------------------

function reportAjaxError( jqXHR, textStatus, errorThrown ) {
    var msg = 'AJAX error.\n' +
        'Status Code: ' + jqXHR.status + '\n' +
        'Status: ' + textStatus;
    if ( errorThrown ) {
        msg += '\n' + 'Error thrown: ' + errorThrown;
    }
    if ( jqXHR.responseText ) {
        msg += '\n' + 'Response text: ' + jqXHR.responseText;
    }
    $('#response').text( msg );
}

//-----------------------------------------------------------------------------

function clearReport( ) {
    $('#response').empty( );
}

//=============================================================================

function handleCreateForm( evt ) {
    evt.preventDefault( );
    var name = $('#create-name').val();
    var age = $('#create-age').val();
    var person = {
        name: name,
        age: age
    };
    createPerson( person );
}

//-----------------------------------------------------------------------------

function createPerson( person ) {
    clearReport( );
    $.ajax( BASE_URL + collection,
    {
        method: 'POST',
        data: person,
        success: reportResponse,
        error: reportAjaxError
    } );
}

//=============================================================================

function handleReadList( evt ) {
    evt.preventDefault( );
    getListOfPeople( );
}

//-----------------------------------------------------------------------------

function getListOfPeople( ) {
    clearReport( );
    $.ajax( BASE_URL + collection,
    {
        method: 'GET',
        success: reportResponse,
        error: reportAjaxError
    } );
}

//=============================================================================

function handleReadForm( evt ) {
    evt.preventDefault( );
    var id = $('#read-id').val();
    getPerson( id );
}

//-----------------------------------------------------------------------------

function getPerson( id ) {
    clearReport( );
    $.ajax( BASE_URL + collection + '/' + id,
    {
        method: 'GET',
        success: reportResponse,
        error: reportAjaxError
    } );
}

//=============================================================================

function handleUpdateForm( evt ) {
    evt.preventDefault( );
    var id = $('#update-id').val();
    var name = $('#update-name').val();
    var age = $('#update-age').val();
    var person = {
        name: name,
        age: age
    };
    updatePerson( id, person );
}

//-----------------------------------------------------------------------------

function updatePerson( id, person ) {
    clearReport( );
    $.ajax( BASE_URL + collection + '/' + id,
    {
        method: 'PUT',
        data: person,
        success: reportResponse,
        error: reportAjaxError
    } );
}

//=============================================================================

function handleDeleteForm( evt ) {
    evt.preventDefault( );
    var id = $('#delete-id').val();
    deletePerson( id );
}

//-----------------------------------------------------------------------------

function deletePerson( id ) {
    clearReport( );
    $.ajax( BASE_URL + collection + '/' + id,
    {
        method: 'DELETE',
        success: reportResponse,
        error: reportAjaxError
    } );
}

//=============================================================================
})();
