$(document).ready(function () {
    const userID = data.userID;
    let apiURL = "https://localhost:7023/api/User/" + userID;

    let productList = [];
    $.ajax({
      type: "GET",
      url: apiURL,
      dataType: "json",
      success: function (data) {
        let categoryList = $("#category-list");
        
        let categoryHtml = '';

        $.each(data.products, function (index, product) { 
           categoryHtml += `
            <tr>
              <td>${index + 1}</td>
              <td>${product.productCategory}</td>
              <td><button class="edit-button" data-product-id="${product.productID}">Edit</button>
              <button class="delete-button" data-product-id="${product.productID}">Delete</button>
              </td>
            </tr>
           `;
           productList.push(product);
        });
        categoryList.html(categoryHtml);

        // Edit Pop-Up
        $(".edit-button").click(function (e) {
          e.stopPropagation();

          let index = $(".edit-button").index(this);
          let product = productList[index];

          $("#edit-input").val(product.productCategory);
          $(".edit-submit").data("product-id", product.productID);
          $(".edit-category").show();

        });

        // Delete Pop-Up
        $(".delete-button").click(function (e) {
          e.stopPropagation();

          let index = $(".delete-button").index(this);
          let product = productList[index];

          $(".delete-submit").data("product-id", product.productID);
          $(".delete-category").show();
        });
      },
      error: function () {
        console.error("Gagal mendapatkan data");
      }
    });

    $(".add-submit").click(function () {
      let productCategory = $("#category-input").val();
      let url = "https://localhost:7023/api/Product/" + userID;
      if(!categoryValidation(productCategory)){
        alert("Nama produk tidak boleh kosong");
      } else {
        let newProduct = {productCategory: productCategory};
        $.ajax({
          type: "POST",
          url: url,
          data: JSON.stringify(newProduct),
          contentType: "application/json",
          dataType: "json",
          success: function (response) {
            alert(response.productCategory + " is added");
            location.reload();
          }
        });
      }
    });

    //EDIT PRODUCT LIST
    $(".edit-submit").click(function () {
      let editValue = $("#edit-input").val(); // Get the edited value
      let productID = $(this).data("product-id");
      let url = "https://localhost:7023/api/Product/" + productID; 
      let newData = {productCategory: editValue};
      if(!categoryValidation(editValue)){
        alert("Nama produk tidak boleh kosong");
      } else {
        $.ajax({
          type: "PUT",
          url: url,
          data: JSON.stringify(newData),
          contentType: "application/json",
          success: function (response) {
            alert("Edit Sukses");
          },
          error: function () {
            console.error("Gagal Edit Data");
          }
        });
        $(".edit-category").hide();
        location.reload();
      }
    });

    //DELETE PRODUCT LIST
    $(".delete-submit").click(function () {
      let productID = $(this).data("product-id");
      let url = "https://localhost:7023/api/Product/" + productID; 
      $.ajax({
        type: "DELETE",
        url: url,
        success: function (response) {
          alert("Delete sukses");
          location.reload();
        }
      });
      $(".delete-category").hide();
    });
});

function categoryValidation(value) {
  if (value == ""){
    return false;
  } else {
    return true;
  }
};
