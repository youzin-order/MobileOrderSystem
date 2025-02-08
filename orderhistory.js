let confirmedOrders = [];

// DOMが読み込まれた際の初期設定
document.addEventListener('DOMContentLoaded', () => {
  const orderConfirmationTab = document.getElementById('order-confirmation-tab');
  const confirmationContainer = document.getElementById('confirmation-container');
  const closeButton = document.querySelector('.close-btn');

  // 注文確認タブのクリックイベント
  if (orderConfirmationTab && confirmationContainer) {
    orderConfirmationTab.addEventListener('click', () => {
      confirmationContainer.classList.add('active');
      console.log('Order confirmation tab clicked.');
    });
  } else {
    console.error('Order confirmation tab or container is not found.');
  }

  // 閉じるボタンのクリックイベント
  if (closeButton && confirmationContainer) {
    closeButton.addEventListener('click', () => {
      confirmationContainer.classList.remove('active');
      console.log('Close button clicked.');
    });
  } else {
    console.error('Close button or confirmation container is not found.');
  }
  });
