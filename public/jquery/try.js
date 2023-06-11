$(document).on("click", ".delete", function () {
     var value = $(this).val();
   $(".modal-dialog .yes").attr("href","/admin/dashbord/category/"+value+"/delete");
});