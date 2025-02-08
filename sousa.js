window.currentOrder = [];

window.toggleOrderHistory = function() {
    const orderHistory = document.getElementById('order-history');
    const confirmationContainer = document.getElementById('confirmation-container');
    const sideMenu = document.getElementById('side-menu');

    if (orderHistory.style.right === "0px") {
        orderHistory.style.right = "-100%";
    } else {
        orderHistory.style.right = "0";
        confirmationContainer.style.right = "-100%"; // 注文確認を非表示
        sideMenu.style.right = "-100%"; // サイドメニューも確実に閉じる
    }
};


window.toggleOrderConfirmation = function() {
    const confirmationContainer = document.getElementById('confirmation-container');
    const orderHistory = document.getElementById('order-history');
    const sideMenu = document.getElementById('side-menu');

    if (confirmationContainer.style.right === "0px") {
        confirmationContainer.style.right = "-100%";
    } else {
        confirmationContainer.style.right = "0";
        orderHistory.style.right = "-100%"; // 注文履歴を非表示
        sideMenu.style.right = "-100%"; // サイドメニューも確実に閉じる
    }
};
// 追加ボタンをクリックしたときに注文にアイテムを追加
window.addToOrder = function(name, price, id) {
    const quantityInput = document.getElementById(`quantity-${id}`);
    const quantity = parseInt(quantityInput.value) || 1;

    // `window.currentOrder` が未定義なら初期化
    if (!window.currentOrder) {
        window.currentOrder = [];
    }

    // 既存の注文リストに商品があるか確認
    const existingItemIndex = window.currentOrder.findIndex((item) => item.id === id);
    if (existingItemIndex === -1) {
        // 商品がリストになければ追加
        window.currentOrder.push({ name, price, id, quantity });
    } else {
        // すでにある商品なら数量を加算
        window.currentOrder[existingItemIndex].quantity += quantity;
    }

    // 注文確認画面を更新して表示
    showOrderConfirmation();
};

// アイテムを注文から削除する
window.removeItem = function(itemId) {
window.currentOrder = window.currentOrder.filter(item => item.id !== itemId);
showOrderConfirmation();
}
window.closeSideMenu = function() {
const sideMenu = document.getElementById('side-menu');
sideMenu.style.right = "-100%"; // 確実に閉じる
};
// ハンバーガーメニュー
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
}
function toggleOptions() {
const optionsMenu = document.getElementById("options-menu");
optionsMenu.style.display = optionsMenu.style.display === "block" ? "none" : "block";
}
// 数量を増やす
function increaseQuantity(id) {
    const itemIndex = window.currentOrder.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        window.currentOrder[itemIndex].quantity += 1; // 数量を増やす
        updateQuantityUI(id); // UI更新
        updateOrderConfirmation(); // 注文確認画面の更新
    }
}

// 数量を減らす
function decreaseQuantity(id) {
    const itemIndex = window.currentOrder.findIndex(item => item.id === id);
    if (itemIndex !== -1 && window.currentOrder[itemIndex].quantity > 1) {
        window.currentOrder[itemIndex].quantity -= 1; // 数量を減らす
        updateQuantityUI(id); // UI更新
        updateOrderConfirmation(); // 注文確認画面の更新
    }
}

// UI の数量を更新する関数
function updateQuantityUI(id) {
    const quantityInput = document.getElementById(`quantity-${id}`);
    if (quantityInput) {
        const item = window.currentOrder.find(item => item.id === id);
        quantityInput.value = item ? item.quantity : 1;
    }
}

// 注文を確定する
function confirmOrder() {
    if (window.currentOrder.length > 0) {
        // 確定した注文を履歴に追加
        confirmedOrders = [...confirmedOrders, ...window.currentOrder];

        // 現在の注文リストをクリア
        window.currentOrder = [];

        // 注文履歴を更新
        updateOrderHistory();

        // 注文確認画面をクリア
        updateOrderConfirmation();

        alert('注文が確定されました！');
    } else {
        alert('注文がありません。');
    }
}

// 注文確認画面を更新する関数
function updateOrderConfirmation() {
    const confirmationContainer = document.getElementById('confirmation-container');
    let orderListContainer = confirmationContainer.querySelector('.order-list');

    if (!orderListContainer) {
        orderListContainer = document.createElement('div');
        orderListContainer.classList.add('order-list');
        confirmationContainer.appendChild(orderListContainer);
    }

    orderListContainer.innerHTML = ""; // 既存の注文内容をクリア

    if (window.currentOrder.length === 0) {
        orderListContainer.innerHTML = "<p>注文はありません。</p>";
    } else {
        let totalAmount = 0;

        window.currentOrder.forEach((item) => {
            totalAmount += item.price * item.quantity;

            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">×${item.quantity}</span>
                <span class="item-price">¥${item.price * item.quantity}</span>
                <button class="decrease-button" onclick="updateQuantity('${item.id}', -1)">-</button>
                <input type="text" class="quantity-input" id="quantity-${item.id}" value="${item.quantity}" readonly>
                <button class="increase-button" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="delete-button" onclick="removeItem('${item.id}')">削除</button>
            `;
            orderListContainer.appendChild(orderItem);
        });

        let totalElement = confirmationContainer.querySelector('.total-amount');
        if (!totalElement) {
            totalElement = document.createElement("div");
            totalElement.classList.add("total-amount");
            confirmationContainer.appendChild(totalElement);
        }
        totalElement.innerHTML = `<strong>合計:</strong> ¥${totalAmount}`;
    }
}

// 店員呼出オプション
function selectOption(option) {
alert(option + "が選択されました。");
toggleOptions();

// Vibrate the bell icon
const bellIcon = document.getElementById("bell-icon");
bellIcon.classList.add("shake");

// Remove the shake after animation completes
setTimeout(() => {
    bellIcon.classList.remove("shake");
}, 600);
}
// 注文履歴を更新する
function updateOrderHistory() {
    const orderHistoryBody = document.getElementById('order-history-body');
    const orderHistoryTotal = document.getElementById('order-history-total');
  
    orderHistoryBody.innerHTML = ''; // 既存の注文履歴をクリア
    let total = 0;
  
    confirmedOrders.forEach(order => {
      const row = document.createElement('tr');
      const subtotal = order.price * order.quantity;
  
      // HTMLを文字列として記述
      row.innerHTML = `
        <td>${order.name}</td>
        <td>¥${order.price.toLocaleString()}</td>
        <td>${order.quantity}</td>
        <td>¥${subtotal.toLocaleString()}</td>
      `;
  
      orderHistoryBody.appendChild(row);
      total += subtotal;
    });
  
    // 合計金額を表示
    orderHistoryTotal.textContent = `¥${total.toLocaleString()}`;
  }
  document.querySelectorAll(".remove").forEach(button => {
    button.addEventListener("click", function() {
        this.closest("tr").remove();
        updateTotal();
    });
  });
  // 会計に進む処理
  function proceedToCheckout() {
    const rows = document.querySelectorAll('#order-history-body tr');
    rows.forEach(row => {
      row.style.backgroundColor = '#d3d3d3';
      row.style.color = '#808080';
    });
    alert('会計に進みます。');
  }
  