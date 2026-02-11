let cart = [];
let userLocation = "";

/* ADD */
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

/* REMOVE */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* CLEAR */
function clearCart() {
  cart = [];
  renderCart();
}

/* RENDER */
function renderCart() {
  let cartDiv = document.getElementById("cartItems");
  let total = 0;

  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    cartDiv.innerHTML += `
      <div>
        ${item.name} - $${item.price}
        <button class="removeBtn" onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = "$" + total;
}

/* LOCATION */
function useLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;

      userLocation = `https://maps.google.com/?q=${lat},${lon}`;

      document.getElementById("locationText").innerText =
        "Ubicación activada ✅";
    });
  }
}

/* SEND WHATSAPP */
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Carrito vacío!");
    return;
  }

  let message = "🛒 Pedido Tutto Premium:\n\n";

  cart.forEach((item) => {
    message += `- ${item.name} $${item.price}\n`;
  });

  message += "\n📍 Ubicación:\n" + userLocation;

  let phone = "549XXXXXXXXXX"; // TU NUMERO
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* FILTER */
function filterMenu(category) {
  let cards = document.querySelectorAll(".food-card");

  cards.forEach((card) => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      card.style.display = card.classList.contains(category)
        ? "block"
        : "none";
    }
  });
}
/* ===================== */
/* SPLASH SCREEN AUTO */
/* ===================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    splash.style.opacity = "0";
    splash.style.transition = "0.8s";

    setTimeout(() => {
      splash.style.display = "none";
    }, 800);
  }, 2000);
});
let userLocation = "";

function useLocation() {
  if (!navigator.geolocation) {
    alert("Tu celular no soporta ubicación 😢");
    return;
  }

  document.getElementById("locationText").innerText =
    "📍 Buscando ubicación...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      userLocation = `https://maps.google.com/?q=${lat},${lon}`;

      document.getElementById("locationText").innerText =
        "✅ Ubicación detectada correctamente";

      alert("📍 Ubicación guardada para tu pedido");
    },
    () => {
      document.getElementById("locationText").innerText =
        "❌ No se pudo obtener la ubicación";

      alert("Tenés que permitir ubicación en el navegador");
    }
  );
}
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío 😅");
    return;
  }

  let message = "🍔 *Pedido Tutto Premium* 🍕\n\n";

  cart.forEach((item) => {
    message += `• ${item.name} x${item.qty} = $${item.price * item.qty}\n`;
  });

  message += `\n💰 Total: $${total}\n\n`;

  if (userLocation) {
    message += `📍 Mi ubicación:\n${userLocation}\n\n`;
  } else {
    message += "📍 Ubicación no enviada\n\n";
  }

  message += "Gracias ❤️ Tutto per Tutti";

  let phone = "5491112345678"; // <-- poné tu número acá
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}