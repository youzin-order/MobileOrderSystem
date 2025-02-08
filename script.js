document.addEventListener("DOMContentLoaded", function () {
  const sideMenu = document.getElementById("side-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const orderHistory = document.getElementById('order-history');
  const confirmationContainer = document.getElementById('confirmation-container');

  sideMenu.style.display = "none";
  mobileMenu.style.display = "block";

  // メニュータブのクリックイベントを登録
  ["snacks", "beer", "rice", "grilled", "salads"].forEach(category => {
      document.getElementById(`${category}-tab`).addEventListener("click", function () {
          displayMenu(category);
      });
  });

  // ハンバーガーメニューのクリックイベント
  document.querySelector('.menu-toggle').addEventListener('click', function () {
      mobileMenu.style.display = (mobileMenu.style.display === "none" || mobileMenu.style.display === "") ? "block" : "none";
      closeAllMenus();
  });

  // モバイルメニュークリック時にサイドメニューを表示
  mobileMenu.addEventListener("click", function () {
      sideMenu.style.display = "block";
  });

  // サイドメニューを閉じる
  document.querySelector(".close-btn").addEventListener("click", function () {
      sideMenu.style.display = "none";
  });

// メニューを表示する関数
function displayMenu(category) {
  const menuItemsContainer = document.getElementById("side-menu-content");
  menuItemsContainer.innerHTML = ""; // 既存のメニューをクリア

  const categoryItems = menuData[category];
  categoryItems.forEach((item) => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("menu-card");

      itemCard.innerHTML = `
          <div class="menu-card-img">
              <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="menu-card-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price">¥${item.price}</div>
          </div>
          <div class="menu-card-buttons">
              <div class="quantity-control">
                  <button class="decrease-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                  <input type="text" id="quantity-${item.id}" value="1" readonly>
                  <button class="increase-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
              </div>
              <button class="add-btn" onclick="addToOrder('${item.name}', ${item.price}, '${item.id}')">追加</button>
          </div>
      `;

      menuItemsContainer.appendChild(itemCard);
  });

  // サイドメニューを開く
  sideMenu.style.right = "0";
  closeAllMenus("sideMenu");
}



  // すべてのメニューを閉じる
  function closeAllMenus(except = "") {
      if (except !== "sideMenu") sideMenu.style.right = "-100%";
      if (except !== "confirmationContainer") confirmationContainer.style.right = "-100%";
      if (except !== "orderHistory") orderHistory.style.right = "-100%";
  }

// 注文確認画面を表示
window.showOrderConfirmation = function () {
  let orderDetails = `<button class="close-button" onclick="toggleOrderConfirmation()">×</button>`;
  orderDetails += "<h2>注文確認</h2>";

  if (!window.currentOrder || window.currentOrder.length === 0) {
      orderDetails += "<p>まだ注文がありません。</p>";
  } else {
      orderDetails += `
          <table>
              <thead>
                  <tr>
                      <th>商品一覧</th>
                      <th>価格</th>
                      <th>数量</th>
                      <th>操作</th>
                  </tr>
              </thead>
              <tbody>
      `;

      window.currentOrder.forEach(item => {
          orderDetails += `
              <tr>
                  <td>${item.name}</td>
                  <td>¥${item.price}</td>
                  <td>
                      <div class="quantity-container">
                          <button class="decrease-button" onclick="updateQuantity('${item.id}', -1)">-</button>
                          <input type="text" class="quantity-input" id="quantity-${item.id}" value="${item.quantity}" readonly>
                          <button class="increase-button" onclick="updateQuantity('${item.id}', 1)">+</button>
                      </div>
                  </td>
                  <td>
                      <button class="delete-button" onclick="removeItem('${item.id}')">削除</button>
                  </td>
              </tr>
          `;
      });

      orderDetails += "</tbody></table>";
      orderDetails += `<div id="total-price">合計: ¥<span id="totalValue">${calculateTotal()}</span></div>`;
      orderDetails += `<button class="confirm-button" onclick="confirmOrder()">注文確定</button>`;
  }

  confirmationContainer.innerHTML = orderDetails;
  confirmationContainer.style.right = "0";
};


  // 合計金額を計算
  function calculateTotal() {
      return window.currentOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // 数量を更新
  window.updateQuantity = function (id, change) {
      const itemIndex = window.currentOrder.findIndex(item => item.id === id);
      if (itemIndex !== -1) {
          window.currentOrder[itemIndex].quantity = Math.max(1, window.currentOrder[itemIndex].quantity + change);
          document.getElementById(`quantity-${id}`).value = window.currentOrder[itemIndex].quantity;
          showOrderConfirmation();
      }
  };
});
