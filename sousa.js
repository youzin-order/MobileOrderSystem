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

window.closeSideMenu = function() {
const sideMenu = document.getElementById('side-menu');
sideMenu.style.right = "-100%"; // 確実に閉じる
};
// ハンバーガーメニュー
function toggleMenu() {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
}
window.toggleOptions = function () {
    const optionsMenu = document.getElementById("options-menu");
    const confirmationContainer = document.getElementById("confirmation-container");
    const orderHistory = document.getElementById("order-history");
    const sideMenu = document.getElementById("side-menu");

    console.log("toggleOptions 実行");

    if (optionsMenu.style.display === "block") {
        optionsMenu.style.display = "none";
        document.removeEventListener("click", closeOptionsOnOutsideClick);
    } else {
        optionsMenu.style.display = "block";

        // 他のメニューをすべて閉じる
        if (confirmationContainer) confirmationContainer.style.right = "-100%";
        if (orderHistory) orderHistory.style.right = "-100%";
        if (sideMenu) sideMenu.style.right = "-100%";

        // 外部クリックを検知するイベントを追加
        setTimeout(() => {
            document.addEventListener("click", closeOptionsOnOutsideClick);
        }, 10);
    }
};

// メニュー外をクリックしたら閉じる処理
function closeOptionsOnOutsideClick(event) {
    const optionsMenu = document.getElementById("options-menu");

    if (optionsMenu && optionsMenu.style.display === "block" && !optionsMenu.contains(event.target)) {
        optionsMenu.style.display = "none";
        document.removeEventListener("click", closeOptionsOnOutsideClick);
    }
}


// 注文を確定する
function confirmOrder() {
    const confirmationContainer = document.getElementById("confirmation-container");

    if (window.currentOrder.length > 0) {
        // 確定した注文を履歴に追加
        confirmedOrders = [...confirmedOrders, ...window.currentOrder];

        // 現在の注文リストをクリア
        window.currentOrder = [];

        // 注文履歴を更新
        updateOrderHistory();

        // 注文確認画面をクリア
        updateOrderConfirmation();

        // 注文確定の通知を表示
        showOrderNotification("注文が確定されました！", "success");

        // 注文確認画面を自動的に閉じる
        if (confirmationContainer) {
            confirmationContainer.style.right = "-100%"; // 画面をスライドアウト
        }
    } else {
        showOrderNotification("注文がありません。", "error");
    }
}
function toggleConfirmationContainer() {
    const confirmationContainer = document.getElementById("confirmation-container");
    if (confirmationContainer.classList.contains("open")) {
        confirmationContainer.classList.remove("open");
        confirmationContainer.style.right = "-100%";
    } else {
        confirmationContainer.classList.add("open");
    }
}

// 注文通知を表示する関数（メッセージとタイプを指定）
function showOrderNotification(message, type) {
    let notification = document.getElementById("order-notification");

    // 既に作成されていなければ作成
    if (!notification) {
        notification = document.createElement("div");
        notification.id = "order-notification";
        notification.className = "order-notification";
        document.body.appendChild(notification);
    }

    // メッセージを設定
    notification.textContent = message;
    // 表示スタイル適用
    notification.classList.add("show");

    // 3秒後に非表示
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
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
// サイドメニュ数量を増やす関数
function increaseQuantity(itemId) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
}

// サイドメニュ数量を減らす関数
function decreaseQuantity(itemId) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}