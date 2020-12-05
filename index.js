$(document).ready(function () {
  // slideshow

  $("#slideshow").slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    adaptiveHeight: false,
  });
  var clothing = document.getElementById("clothing");
  var accessories = document.getElementById("accessories");
  var clothingContainer = document.createElement("div");
  clothingContainer.className = "clothing-accessories-container";
  var accessoriesContainer = document.createElement("div");
  accessoriesContainer.className = "clothing-accessories-container";

  document.getElementById("brand").addEventListener("click", function () {
    window.location.href = "./index.html";
  });
  let counter = 1;
  function generateCard(data) {
    var card = document.createElement("div");
    card.className = "card";
    card.id = counter++;
    card.addEventListener("click", function () {
      sessionStorage.setItem("productId", card.id);
      window.location.href = "product-details.html";
    });
    var preview = document.createElement("img");
    preview.src = data.preview;
    preview.alt = data.description;
    preview.className = "preview";
    card.appendChild(preview);
    var description = document.createElement("div");
    description.className = "description";
    var name = document.createElement("h3");
    name.className = "name";
    name.innerHTML = data.name;
    var brand = document.createElement("p");
    brand.className = "brand";
    brand.innerHTML = data.brand;
    var price = document.createElement("p");
    price.className = "price";
    price.innerHTML = "Rs " + data.price;
    description.appendChild(name);
    description.appendChild(brand);
    description.appendChild(price);
    card.appendChild(description);
    return card;
  }

  document.getElementById("cart").addEventListener("click", function () {
    location.href = "checkout.html";
  });

  document.getElementById("cartCount").innerHTML = localStorage.getItem(
    "cartCount"
  );

  // connect to backend

  var xhttp = new XMLHttpRequest();
  let productList = [];
  xhttp.open(
    "GET",
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/",
    true
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      productList = JSON.parse(xhttp.responseText);
      for (let i = 0; i < productList.length; i++) {
        var productCard = generateCard(productList[i]);
        if (productList[i].isAccessory == false) {
          clothingContainer.appendChild(productCard);
          clothing.appendChild(clothingContainer);
        } else if (productList[i].isAccessory == true) {
          accessoriesContainer.appendChild(productCard);
          accessories.appendChild(accessoriesContainer);
        }
      }
    }
  };
  xhttp.send();
});
