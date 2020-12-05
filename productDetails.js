document.getElementById("brand").addEventListener("click", function () {
  window.location.href = "index.html";
});
function generateCards(productList) {
  document.getElementById("name").innerHTML = productList.name;
  document.getElementById("product-brand").innerHTML = productList.brand;
  document.getElementById("price").innerHTML = productList.price;
  document.getElementById("description").innerHTML = productList.description;

  var productGallery = document.getElementById("product-gallery");
  for (let x = 0; x < productList.photos.length; x++) {
    var img = document.createElement("img");
    let y = x + 1;
    img.id = "img" + x;
    if (x === 0) {
      img.className = "product-gallery active";
    } else {
      img.className = "product-gallery";
    }

    img.src = productList.photos[x];
    productGallery.appendChild(img);
  }
  for (let i = 0; i < productList.photos.length; i++) {
    document.getElementById("img" + i).addEventListener("click", function () {
      removeClass();
      this.classList.add("active");
      img.src = this.src;
    });
  }

  var img = document.getElementById("img");
  img.src = productList.preview;
  img.alt = "preview";
}
var productId = sessionStorage.getItem("productId");

function removeClass() {
  for (let i = 0; i < productList.photos.length; i++) {
    document.getElementById("img" + i).classList.remove("active");
  }
}
// let cartItemArr = localStorage.getItem("cartItem") || 0;
let cartItemArr = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

let cartCount = localStorage.getItem("cartCount") || 0;
document.getElementById("cartCount").innerHTML =
  localStorage.getItem("cartCount") || 0;
document.getElementById("add-to-cart").addEventListener("click", function () {
  let n = ++cartCount;
  window.localStorage.setItem("cartCount", n);
  cartItemArr[productId - 1] += 1;
  let x = JSON.stringify(cartItemArr);
  window.localStorage.setItem("cartItem", x);
  document.getElementById("cartCount").innerHTML = localStorage.getItem(
    "cartCount"
  );
});

document.getElementById("cart").addEventListener("click", function () {
  location.href = "checkout.html";
});
var btnCart = document.getElementById("add-to-cart");
btnCart.addEventListener("click", function () {
  btnCart.classList.add("bigger");
  setTimeout(function () {
    btnCart.classList.remove("bigger");
  }, 200);
});

// connect to backend
var xhttp = new XMLHttpRequest();
let productList = [];
xhttp.open(
  "GET",
  "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId,
  true
);
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    productList = JSON.parse(xhttp.responseText);
    generateCards(productList);
  }
};
xhttp.send();
