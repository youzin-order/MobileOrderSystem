document.addEventListener("DOMContentLoaded", function () {
    const sideMenu = document.getElementById("side-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const orderHistory = document.getElementById("order-history");
    const confirmationContainer = document.getElementById("confirmation-container");

    sideMenu.style.display = "none";
    mobileMenu.style.display = "block";

    // グローバル変数
    window.currentOrder = []; // 注文リストを空で初期化
    window.confirmedOrders = []; // 確定した注文

    // メニュータブのクリックイベントを登録
    ["snacks", "beer", "rice", "grilled", "salads"].forEach(category => {
        document.getElementById(`${category}-tab`).addEventListener("click", function () {
            displayMenu(category);
        });
    });

    // ハンバーガーメニューのクリックイベント
    document.querySelector(".menu-toggle").addEventListener("click", function () {
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
        console.log(`displayMenu実行: カテゴリ - ${category}`);
        const menuItemsContainer = document.getElementById("side-menu-content");
        menuItemsContainer.innerHTML = ""; // 既存のメニューをクリア

        const categoryItems = menuData[category];
        categoryItems.forEach((item) => {
            const uniqueId = `${category}-${item.id}`; // IDをユニーク化

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
                        <button class="decrease-btn" onclick="decreaseQuantity('${uniqueId}')">-</button>
                        <input type="text" id="quantity-${uniqueId}" value="1" readonly>
                        <button class="increase-btn" onclick="increaseQuantity('${uniqueId}')">+</button>
                    </div>
                    <button class="add-btn" onclick="addToOrder('${item.name}', ${item.price}, '${uniqueId}', parseInt(document.getElementById('quantity-${uniqueId}').value))">追加</button>
                </div>
            `;

            menuItemsContainer.appendChild(itemCard);
        });

        // サイドメニューを開く
        sideMenu.style.right = "0";
        closeAllMenus("sideMenu");
    }

 // 商品を注文リストに追加
window.addToOrder = function(name, price, id, quantity, buttonElement) {
    console.log("追加前の注文リスト:", window.currentOrder);

    let existingItem = window.currentOrder.find((item) => item.id === id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        window.currentOrder.push({ id, name, price, quantity });
    }

    console.log("追加後の注文リスト:", window.currentOrder);

    // ボタンのアニメーションを追加
    if (buttonElement) {
        buttonElement.classList.add("clicked");
        setTimeout(() => {
            buttonElement.classList.remove("clicked");
        }, 300);
    }

    // メッセージを表示
    showOrderNotification();

    // showOrderConfirmation(); ← これを削除して、追加ボタンを押してもカートが開かないようにする
};

// 注文確認に追加されたメッセージを表示する関数 (JSで作成)
function showOrderNotification() {
    let notification = document.getElementById("order-notification");

    // 既に作成されていなければ作成
    if (!notification) {
        notification = document.createElement("div");
        notification.id = "order-notification";
        notification.className = "order-notification";
        document.body.appendChild(notification);
    }

    // メッセージを設定
    notification.textContent = "注文確認に追加されました。";
    
    // 表示スタイル適用
    notification.classList.add("show");

    // 3秒後に非表示
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}


    // 注文確認ボタンを押したときにカートの内容を表示
    window.toggleOrderConfirmation = function () {
        const confirmationContainer = document.getElementById('confirmation-container');
        const orderHistory = document.getElementById('order-history');
        const sideMenu = document.getElementById('side-menu');

        console.log("toggleOrderConfirmation 実行: 注文リスト", window.currentOrder);

        if (confirmationContainer.style.right === "0px") {
            confirmationContainer.style.right = "-100%";
        } else {
            showOrderConfirmation(); // 注文内容を更新
            confirmationContainer.style.right = "0";

            // 注文履歴とサイドメニューを確実に閉じる
            if (orderHistory) orderHistory.style.right = "-100%";
            if (sideMenu) sideMenu.style.right = "-100%";
        }
    };
    // 注文確認画面を表示（注文確認ボタンを押したときのみ実行）
    window.showOrderConfirmation = function () {
        let orderDetails = `<button class="close-button" onclick="toggleOrderConfirmation()">×</button>`;
        orderDetails += "<h2>注文確認</h2>";

        if (!window.currentOrder || window.currentOrder.length === 0) {
            orderDetails += "<p>注文追加されていません。</p>";
        } else {
            orderDetails += `<table><thead><tr><th>商品一覧</th><th>価格</th><th>数量</th><th>操作</th></tr></thead><tbody>`;

            window.currentOrder.forEach(item => {
                orderDetails += `<tr>
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
                </tr>`;
            });

            orderDetails += "</tbody></table>";
            orderDetails += `<div id="total-price">合計: ¥<span id="totalValue">${calculateTotal()}</span></div>`;
            orderDetails += `<button class="confirm-button" onclick="confirmOrder()">注文確定</button>`;
        }

        confirmationContainer.innerHTML = orderDetails;
    };
    
    window.removeItem = function(itemId) {
        window.currentOrder = window.currentOrder.filter(item => item.id !== itemId);
        showOrderConfirmation();
    }
    // 注文の数量を更新（注文確認画面のみ影響）
    window.updateQuantity = function (id, change) {
        const itemIndex = window.currentOrder.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            // 数量を変更（最小値は1、最大制限なし）
            window.currentOrder[itemIndex].quantity = Math.max(1, window.currentOrder[itemIndex].quantity + change);

            // 注文確認画面の UI 更新
            showOrderConfirmation();
        }
    };
    // すべてのメニューを閉じる
    function closeAllMenus(except = "") {
        if (except !== "sideMenu") sideMenu.style.right = "-100%";
        if (except !== "confirmationContainer") confirmationContainer.style.right = "-100%";
        if (except !== "orderHistory") orderHistory.style.right = "-100%";
    }

    // 合計金額を計算
    function calculateTotal() {
        return window.currentOrder.reduce((total, item) => total + item.price * item.quantity, 0);
    }
});
