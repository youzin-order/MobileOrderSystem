document.addEventListener("DOMContentLoaded", function() {
  const sideMenu = document.getElementById("side-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  // メニュータブのクリックイベント
  document.getElementById("snacks-tab").addEventListener("click", function() {
    displayMenu("snacks");
  });
  document.getElementById("beer-tab").addEventListener("click", function() {
    displayMenu("beer");
  });
  document.getElementById("rice-tab").addEventListener("click", function() {
    displayMenu("rice");
  });
  document.getElementById("grilled-tab").addEventListener("click", function() {
    displayMenu("grilled");
  });
  document.getElementById("salads-tab").addEventListener("click", function() {
    displayMenu("salads");
  });

  // 注文確認タブのクリックイベント
  document.getElementById("order-confirmation-tab").addEventListener("click", function() {
    showOrderConfirmation();
  });

  // サイドメニューを開く
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    mobileMenu.style.display = "block";
  });

  // サイドメニューを閉じる
  document.querySelector('.close-btn').addEventListener("click", function() {
    sideMenu.style.right = "-350px";
  });

  // QRコードスキャンの実装
  function openQRCodeScanner() {
    const qrScannerModal = document.createElement("div");
    qrScannerModal.classList.add("modal");
    qrScannerModal.innerHTML = `
      <div class="modal-content">
        <h2>QRコードをスキャンしてください</h2>
        <div id="reader" style="width: 100%; height: 300px;"></div>
        <button onclick="closeQRCodeScanner()">閉じる</button>
      </div>
    `;
    document.body.appendChild(qrScannerModal);
    qrScannerModal.style.display = "flex";

    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText, decodedResult) => {
        alert("QRコードが読み取られました: " + decodedText);
        html5QrCode.stop();
        closeQRCodeScanner();
      },
      (errorMessage) => {
        console.error(errorMessage);
      }
    );
  }

  function closeQRCodeScanner() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }

  // メニューを表示する関数
  function displayMenu(category) {
    const menuItemsContainer = document.getElementById("side-menu-content");
    menuItemsContainer.innerHTML = ''; // 既存のメニューをクリア

    const categoryItems = menuData[category];
    categoryItems.forEach(item => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("menu-card");

      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-name">${item.name}</div>
        <div class="item-price">¥${item.price}</div>
        <button class="order-btn" onclick="addToOrder('${item.name}', ${item.price})">注文</button>
      `;
      menuItemsContainer.appendChild(itemCard);
    });

    sideMenu.style.right = "0"; // スライドイン
  }

  let currentOrder = [];

  function addToOrder(name, price) {
    currentOrder.push({ name, price });
    alert(`${name}を注文しました`);
  }

  function showOrderConfirmation() {
    const sideMenuContent = document.getElementById("side-menu-content");

    if (currentOrder.length === 0) {
      sideMenuContent.innerHTML = "<h2>注文確認</h2><p>注文がありません。</p>";
    } else {
      sideMenuContent.innerHTML = "<h2>注文確認</h2>";
      currentOrder.forEach(item => {
        sideMenuContent.innerHTML += `<p>${item.name} - ¥${item.price}</p>`;
      });
      sideMenuContent.innerHTML += `<button onclick="submitOrder()">注文を確定する</button>`;
    }

    sideMenu.style.right = "0";
  }

  function submitOrder() {
    alert("注文が送信されました！");
    currentOrder = [];
    closeSideMenu();
  }

  function closeSideMenu() {
    sideMenu.style.right = "-350px";
  }
});
