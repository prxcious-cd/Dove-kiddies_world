/* ============================================
   DOVE KIDDIES WORLD — SCRIPT
   ============================================ */

// CHANGE WHATSAPP NUMBER HERE
const WHATSAPP_NUMBER = "2348101011721";
const BUSINESS_NAME = "Dove Kiddies World"; // CHANGE BUSINESS NAME HERE

/* ===================== PRODUCTS ===================== */
// CHANGE PRODUCT HERE / CHANGE PRICE HERE / CHANGE IMAGE HERE
const products = [
  {
    id: 1,
    name: "Soft Knit Romper", // CHANGE PRODUCT NAME HERE
    price: 8500, // CHANGE PRODUCT PRICE HERE
    desc: "Breathable cotton romper, perfect for everyday baby comfort.",
    img: "136d404df2ca29d884d7264c89756c88.jpg" // CHANGE PRODUCT IMAGE HERE
  },
  {
    id: 2,
    name: "Linen Boys Shirt Set",
    price: 12000,
    desc: "Two-piece linen shirt and shorts set for stylish little gentlemen.",
    img: "https://images.unsplash.com/photo-1503944168849-7f73c1f0c537?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Tulle Party Dress",
    price: 15500,
    desc: "Elegant tulle dress with satin sash for special occasions.",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Premium Baby Booties",
    price: 6000,
    desc: "Soft-sole booties designed for tiny, comfortable feet.",
    img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Organic Cotton Onesie Pack",
    price: 9500,
    desc: "Pack of 3 organic cotton onesies, gentle on delicate skin.",
    img: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Toddler Denim Overalls",
    price: 11000,
    desc: "Durable, soft denim overalls built for active toddlers.",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Girls Floral Two-Piece",
    price: 10500,
    desc: "Lightweight floral top and skirt set for sunny days.",
    img: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Knit Cardigan",
    price: 9000,
    desc: "Warm knit cardigan, ideal layering piece for cooler evenings.",
    img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Everyday Jersey Set",
    price: 8000,
    desc: "Comfortable jersey top and trouser set for daily play.",
    img: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Bow Headband Set",
    price: 4500,
    desc: "Set of 3 soft bow headbands in soft neutral tones.",
    img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "Canvas Sneakers",
    price: 9500,
    desc: "Lightweight canvas sneakers built for first steps and play.",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Premium Swaddle Wrap",
    price: 7000,
    desc: "Ultra-soft muslin swaddle wrap for naptime comfort.",
    img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=600&auto=format&fit=crop"
  }
];

/* ===================== STATE ===================== */
let cart = []; // {id, qty}

function formatNaira(amount){
  return "₦" + amount.toLocaleString("en-NG");
}

/* ===================== RENDER PRODUCTS ===================== */
function renderProducts(){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(p => `
    <div class="product-card reveal">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}">
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <span class="product-price">${formatNaira(p.price)}</span>
        <button class="add-cart-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(Number(btn.dataset.id));
      btn.textContent = "Added ✓";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove("added");
      }, 1200);
    });
  });

  observeReveal();
}

/* ===================== CART LOGIC ===================== */
function addToCart(id){
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  renderCart();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  renderCart();
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function cartTotal(){
  return cart.reduce((sum, item) => {
    const p = products.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function renderCart(){
  const cartItemsEl = document.getElementById("cartItems");
  const cartCountEl = document.getElementById("cartCount");
  const cartTotalEl = document.getElementById("cartTotal");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = totalQty;
  cartTotalEl.textContent = formatNaira(cartTotal());

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Your cart is empty. Start adding some little favourites!</p>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => {
    const p = products.find(p => p.id === item.id);
    if (!p) return "";
    return `
      <div class="cart-row">
        <img src="${p.img}" alt="${p.name}">
        <div class="cart-row-info">
          <h4>${p.name}</h4>
          <span class="cart-row-price">${formatNaira(p.price)} × ${item.qty}</span>
          <div class="qty-controls">
            <button data-action="dec" data-id="${p.id}">−</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-id="${p.id}">+</button>
          </div>
          <button class="remove-btn" data-action="remove" data-id="${p.id}">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  cartItemsEl.querySelectorAll("button[data-action]").forEach(btn => {
    const id = Number(btn.dataset.id);
    const action = btn.dataset.action;
    btn.addEventListener("click", () => {
      if (action === "inc") changeQty(id, 1);
      if (action === "dec") changeQty(id, -1);
      if (action === "remove") removeFromCart(id);
    });
  });
}

/* ===================== CART DRAWER ===================== */
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");

function openCart(){
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart(){
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

/* ===================== WHATSAPP CHECKOUT ===================== */
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add a few items before checking out!");
    return;
  }

  let message = `Hello ${BUSINESS_NAME}! I'd like to place an order:%0A%0A`;
  cart.forEach(item => {
    const p = products.find(p => p.id === item.id);
    if (!p) return;
    message += `• ${p.name} (x${item.qty}) — ${formatNaira(p.price * item.qty)}%0A`;
  });
  message += `%0ATotal: ${formatNaira(cartTotal())}%0A%0APlease confirm availability and delivery details. Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
});

/* ===================== NAV ===================== */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ===================== SCROLL REVEAL ===================== */
function observeReveal(){
  const revealEls = document.querySelectorAll(".reveal:not(.observed)");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => {
    el.classList.add("observed");
    io.observe(el);
  });
}

/* ===================== INIT ===================== */
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
observeReveal();
