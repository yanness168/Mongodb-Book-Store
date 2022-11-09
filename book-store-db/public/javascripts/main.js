$(document).ready(function() {
    $('.delete-book').on('click', function(e){
        //Get the attribute of the element -- data-id
        const id = $(e.target).attr('data-id')
        $.ajax({
            type: "DELETE",
            // the URL of the data that to delete
            url: "/books/single/"+id,
            success: function(res){
                alert("Deleting Book");
                //window.location.href="http://localhost:8000";
                window.location.replace("http://localhost:8000");
            },
            error: function(err){
                $( "p" ).append( "Cannot redirect...But deleted successfully" );
            }
        })
    })
})