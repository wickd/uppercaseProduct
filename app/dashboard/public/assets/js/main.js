/**
 * general jquery functions
 */

var dashboard = '/dashboard';
var api = dashboard + '/api';


$(document).ready(function () {

//Events---------------------------------------------------------------------
    $('.close-link.delete-file').on('click', deleteAttachment);

//---------------------------------------------------------------------------
})


//functions------------------------------------------------------------------

var deleteAttachment = function(e) {

    var id = $(this).attr('data-id');
    var wrap = $('#file-'+id);

    if (confirm('Are You sure?')) {
         $.ajax({
            url: api + '/attachment/' + id ,
            type: 'DELETE',
            success: function(result) {
                wrap.remove()
            }
        });

    }
}
