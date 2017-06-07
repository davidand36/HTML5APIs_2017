/*
  RestApiDataMgr.js

  Manages the data, using the RESTful Data API.
*/

var app = app || {};

app.dataMgr = (function() {
    'use strict';
    //=========================================================================


    var baseUrl = 'https://pacific-meadow-64112.herokuapp.com/data-api/';
    var collection = 'danderson'; //Use your own!

    //=========================================================================

    return {
        listItems: listItems,
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem
    };

    //=========================================================================

    function listItems( onSuccess, onFailure ) {
        $.ajax( baseUrl + collection,
                {
                    method: 'GET',
                    success: handleListResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleListResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }
    }

    //=========================================================================

    function createItem( item, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection,
                {
                    method: 'POST',
                    data: item,
                    success: handleCreateResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleCreateResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }
    }

    //=========================================================================

    function updateItem( id, item, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection + '/' + id,
                {
                    method: 'PUT',
                    data: item,
                    success: handleUpdateResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleUpdateResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }
    }

    //=========================================================================

    function deleteItem( id, onSuccess, onFailure ) {
        $.ajax( baseUrl + collection + '/' + id,
                {
                    method: 'DELETE',
                    success: handleDeleteResult,
                    error: handleAjaxError
                } );

        //---------------------------------------------------------------------

        function handleDeleteResult( data ) {
            if ( data.error ) {
                onFailure( data.error );
            } else {
                onSuccess( data );
            }
        }

        //---------------------------------------------------------------------

        function handleAjaxError( jqXHR, textStatus, errorThrown ) {
            reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
        }
    }

    //=========================================================================

    function reportAjaxError( callback, jqXHR, textStatus, errorThrown ) {
        var msg = 'AJAX error.</br>' +
            'Status Code: ' + jqXHR.status + '</br>' +
            'Status: ' + textStatus;
        if ( errorThrown ) {
            msg += '</br>' + 'Error thrown: ' + errorThrown;
        }
        if ( jqXHR.responseText ) {
            msg += '</br>' + 'Response text: ' + jqXHR.responseText;
        }

        callback( msg );
    }


    //=========================================================================
})();
