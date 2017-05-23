/*
  LocalStorageDataMgr.js

  Manages the data, maintaining a copy in memory (as an object list),
  and saving it to local storage.
*/

var app = app || {};

app.dataMgr = (function() {
    'use strict';
    //=========================================================================

    var ITEMS_KEY = 'LSDB_items';

    var items = [];
    var nextId = 1000;

    //=========================================================================

    return {
        listItems: listItems,
        createItem: createItem,
        updateItem: updateItem,
        deleteItem: deleteItem
    };

    //=========================================================================

    function listItems( onSuccess, onFailure ) {
        try {
            var itemsString = localStorage[ ITEMS_KEY ];
            if ( itemsString ) {
                items = JSON.parse( itemsString );
                nextId = getNextId();
            }
            onSuccess( items );
        } catch ( excptn ) {
            onFailure( { error: 'Unable to read or parse localStorage items' } );
        }

        //---------------------------------------------------------------------

        function getNextId() {
            var maxId = 1000;
            items.forEach( function( item ) {
                if ( +item._id > maxId ) {
                    maxId = +item._id;
                }
            } );
            return maxId + 1;
        }
    }

    //=========================================================================

    function createItem( item, onSuccess, onFailure ) {
        item._id = (nextId++).toString();
        items.push( item );
        saveItems( );
        onSuccess( { created: item._id } );
    }

    //=========================================================================

    function updateItem( id, item, onSuccess, onFailure ) {
        var idx = findIndexById( id );
        var key;
        if ( idx >= 0 ) {
            for ( key in item ) {
                items[ idx ][ key ] = item[ key ];
            }
            saveItems( );
            onSuccess( { updated: id } );
        } else {
            onFailure( { error: 'No item with ID ' + id } );
        }
    }

    //=========================================================================

    function deleteItem( id, onSuccess, onFailure ) {
        var idx = findIndexById( id );
        var key;
        if ( idx >= 0 ) {
            items.splice( idx, 1 );
            saveItems( );
            onSuccess( { deleted: id } );
        } else {
            onFailure( { error: 'No item with ID ' + id } );
        }
    }

    //=========================================================================

    function findIndexById( id ) {
        var idx, len;
        for ( idx = 0, len = items.length; idx < len; ++idx ) {
            if ( items[ idx ]._id === id ) {
                return idx;
            }
        }
        return -1;
    }

    //=========================================================================

    function saveItems( ) {
        localStorage[ ITEMS_KEY ] = JSON.stringify( items );
    }


    //=========================================================================
})();
