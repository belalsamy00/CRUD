var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var productList = [];
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;

if (localStorage.getItem("list")) {
  productList = JSON.parse(localStorage.getItem("list"));
  displayProducts(productList);
}
function addProduct() {
  if (
    validateName() &&
    validateCategory() &&
    validateDescription() &&
    validateprice()
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: `./../images/${productImage.files[0].name}`,
    };

    productList.push(product);
    displayProducts(productList);
    localStorage.setItem("list", JSON.stringify(productList));
    updateFormValues();
  }
}
function displayProducts(list) {
  var cartona = "";

  for (var i = 0; i < list.length; i++) {
    cartona += `<tr>
<td>${i + 1}</td>
<td><img src="${list[i].image}" alt="${list[i].name}" /></td>
<td>${list[i].name}</td>
<td>${list[i].price}</td>
<td>${list[i].category}</td>
<td>${list[i].description}</td>
<td><button class="btn btn-sm btn-warning" onclick='getUpdatedProduct(${i})'> <i class="fa-regular fa-edit"></i>Update</button></td>
<td><button class="btn btn-sm btn-danger" onclick='deleteProduct(${i})'><i class="fa-regular fa-trash-alt"></i> Delete</button></td>

</tr>`;
  }

  document.getElementById("data").innerHTML = cartona;
}
function deleteProduct(index) {
  productList.splice(index, 1);
  displayProducts(productList);
  localStorage.setItem("list", JSON.stringify(productList));
}
function searchProduct() {
  var searchTerm = document.getElementById("search").value;
  var foundedProducts = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      foundedProducts.push(productList[i]);
    }
  }
  foundedProducts.length > 0
    ? displayProducts(foundedProducts)
    : (document.getElementById("data").innerHTML = `<tr>
  <td> No data found </td>
</tr>`);
}
function getUpdatedProduct(index) {
  currentIndex = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  updateFormValues(productList[index]);
}
function updateFormValues(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productDescription.value = flag ? flag.description : "";
  productCategory.value = flag ? flag.category : "";
}
function updateProduct() {
  var updatedProduct = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: `./../images/charger.jpg`,
  };
  productList.splice(currentIndex, 1, updatedProduct);
  displayProducts(productList);
  localStorage.setItem("list", JSON.stringify(productList));
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  updateFormValues();
}
function validateName() {
  var regex = /^[A-Z][a-z]{1,10}$/;
  var nameError = document.getElementById("nameError");
  if (regex.test(productName.value)) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameError.classList.add("d-none");
    return true;
  } else {
    productName.classList.add("is-invalid");
    nameError.classList.remove("d-none");
    return false;
  }
}
function validateprice() {
  var regex = /^([1-9][0-9]{3,4}|100000)$/;
  var priceError = document.getElementById("priceError");
  if (regex.test(productPrice.value)) {
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceError.classList.add("d-none");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    priceError.classList.remove("d-none");
    return false;
  }
}
function validateCategory() {
  var regex = /^(tv|mobile|laptop|electronics)$/;
  var CategoryError = document.getElementById("CategoryError");
  if (regex.test(productCategory.value)) {
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    CategoryError.classList.add("d-none");
    return true;
  } else {
    productCategory.classList.add("is-invalid");
    CategoryError.classList.remove("d-none");
    return false;
  }
}
function validateDescription() {
  var regex = /^[A-Za-z]{1,}$/;
  var DescriptionError = document.getElementById("DescriptionError");
  if (regex.test(productDescription.value)) {
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");
    DescriptionError.classList.add("d-none");
    return true;
  } else {
    productDescription.classList.add("is-invalid");
    DescriptionError.classList.remove("d-none");
    return false;
  }
}

/**
 * search => No data found
 * validation on price, category , description
 * price => 1000=> 100000
 * category => tv , mobile , laptop, electronics
 * description => at least 50 char
 *
 */
