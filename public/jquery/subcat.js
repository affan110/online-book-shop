$(document).on("click", ".delete", function () {
    var value = $(this).val();
 console.log("value : ", $(this).val())
   
  $(".modal-dialog .yes").attr("href","/admin/dashbord/subcategory/"+value+"/delete");
});