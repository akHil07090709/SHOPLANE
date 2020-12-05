$(function () {
  $("#cartCount").innerHTML = localStorage.getItem("cartCount");
  $("#brand").click(function () {
    window.location.href = "./index.html";
  });
  $("#continue-shopping").click(function () {
    window.location.href = "./index.html";
  });
  let cartCount = localStorage.getItem("cartCount") || 0;

  if (cartCount > 0) {
    document.querySelector(".main-section").style.display = "block";
    document.querySelector(".empty-cart-box").style.display = "none";
  } else {
    document.querySelector(".main-section").style.display = "none";
    document.querySelector(".empty-cart-box").style.display = "block";
  }

  document.getElementById("cartCount").innerHTML =
    localStorage.getItem("cartCount") || 0;
  function createCartList(product, n) {
    var cartList = document.getElementById("cartList");
    var checkoutCart = document.createElement("div");
    checkoutCart.className = "checkout-card";
    var imgDiv = document.createElement("div");
    var img = document.createElement("img");
    img.className = "checkout-product-img";
    img.src = product.preview;
    imgDiv.appendChild(img);
    checkoutCart.appendChild(imgDiv);

    var productDetails = document.createElement("div");
    var productTitle = document.createElement("h4");
    productTitle.textContent = product.name;

    var productQuantity = document.createElement("p");
    productQuantity.innerHTML = "x" + n;
    var productAmount = document.createElement("p");
    productTotalAmount = product.price * n;
    productAmount.innerHTML = "Amount: Rs " + productTotalAmount;
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productQuantity);
    productDetails.appendChild(productAmount);
    checkoutCart.appendChild(productDetails);
    cartList.appendChild(checkoutCart);
    var totalAmount = document.getElementById("total-amount").innerHTML;
    totalAmount = parseInt(totalAmount) + parseInt(productTotalAmount);
    document.getElementById("total-amount").innerHTML = totalAmount;
  }

  // connect to BackEnd
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
      let cartItemArr = JSON.parse(localStorage.getItem("cartItem"));
      let totalItemCount = 0;
      for (let i = 0; i < 10; i++) {
        if (cartItemArr[i] == -1) {
          continue;
        } else {
          let n = cartItemArr[i] + 1;
          totalItemCount = totalItemCount + 1;
          document.getElementById("item-count").innerHTML = totalItemCount;
          createCartList(productList[i], n);
        }
      }
    }
  };
  xhttp.send();

  var mObj = {
    name: "cartCount",
  };

  $("#btn-place-order").click(function () {
    $.post(
      "https://5fc4fc8e36bc790016344468.mockapi.io/AkHil0709/orders/",
      mObj,
      function () {
        location.href = "orderConfirmed.html";
        localStorage.setItem("cartCount", 0);
        localStorage.setItem("cartItem", []);
        document.getElementById("total-amount").textContent = 0;
      }
    ).fail(function () {
      alert("try again");
    });
  });
});
