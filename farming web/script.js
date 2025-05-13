// DOM Elements
const navLinks = document.getElementById("navLinks")
const openMenu = document.getElementById("openMenu")
const closeMenu = document.getElementById("closeMenu")
const cartIcon = document.querySelector(".cart-icon")
const cartSidebar = document.querySelector(".cart-sidebar")
const closeCart = document.querySelector(".close-cart")
const cartItems = document.querySelector(".cart-items")
const cartCount = document.querySelector(".cart-count")
const cartTotalPrice = document.getElementById("cart-total-price")
const carousel = document.querySelector(".carousel")
const slides = document.querySelectorAll(".carousel-slide")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const dots = document.querySelectorAll(".dot")
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")

// Mobile Menu
openMenu.addEventListener("click", () => {
  navLinks.classList.add("active")
})

closeMenu.addEventListener("click", () => {
  navLinks.classList.remove("active")
})

// Cart Functionality
let cart = []

// Open and Close Cart
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active")
})

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active")
})

// Add to Cart
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card")
    const productId = productCard.dataset.id
    const productName = productCard.dataset.name
    const productPrice = Number.parseFloat(productCard.dataset.price)
    const productImg = productCard.querySelector("img").src

    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1,
      })
    }

    updateCart()
    cartSidebar.classList.add("active")
  })
})

// Update Cart
function updateCart() {
  // Clear cart items
  cartItems.innerHTML = ""

  // Add items to cart
  cart.forEach((item) => {
    const cartItem = document.createElement("div")
    cartItem.classList.add("cart-item")
    cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
                </div>
            </div>
        `
    cartItems.appendChild(cartItem)
  })

  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  cartCount.textContent = totalItems

  // Update total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  cartTotalPrice.textContent = `₹${totalPrice.toFixed(2)}`

  // Add event listeners to quantity buttons and remove buttons
  const decreaseBtns = document.querySelectorAll(".decrease")
  const increaseBtns = document.querySelectorAll(".increase")
  const removeItemBtns = document.querySelectorAll(".remove-item")

  decreaseBtns.forEach((btn) => {
    btn.addEventListener("click", decreaseQuantity)
  })

  increaseBtns.forEach((btn) => {
    btn.addEventListener("click", increaseQuantity)
  })

  removeItemBtns.forEach((btn) => {
    btn.addEventListener("click", removeItem)
  })
}

// Decrease Quantity
function decreaseQuantity(e) {
  const id = e.target.dataset.id
  const item = cart.find((item) => item.id === id)

  if (item.quantity > 1) {
    item.quantity -= 1
  } else {
    cart = cart.filter((item) => item.id !== id)
  }

  updateCart()
}

// Increase Quantity
function increaseQuantity(e) {
  const id = e.target.dataset.id
  const item = cart.find((item) => item.id === id)
  item.quantity += 1
  updateCart()
}

// Remove Item
function removeItem(e) {
  const id = e.target.dataset.id
  cart = cart.filter((item) => item.id !== id)
  updateCart()
}

// Carousel Functionality
let currentSlide = 0

// Show slide
function showSlide(n) {
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  currentSlide = (n + slides.length) % slides.length

  slides[currentSlide].classList.add("active")
  dots[currentSlide].classList.add("active")
}

// Next slide
function nextSlide() {
  showSlide(currentSlide + 1)
}

// Previous slide
function prevSlide() {
  showSlide(currentSlide - 1)
}

// Event listeners for carousel
prevBtn.addEventListener("click", prevSlide)
nextBtn.addEventListener("click", nextSlide)

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = Number.parseInt(dot.dataset.slide)
    showSlide(slideIndex)
  })
})

// Auto slide
setInterval(nextSlide, 5000)

// Initialize
showSlide(0)
updateCart()

// Close cart and menu when clicking outside
document.addEventListener("click", (e) => {
  if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target) && cartSidebar.classList.contains("active")) {
    cartSidebar.classList.remove("active")
  }

  if (!navLinks.contains(e.target) && !openMenu.contains(e.target) && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active")
  }
})

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // You can add code here to send the form data to your email/server if needed
      document.getElementById('contactMsg').style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        document.getElementById('contactMsg').style.display = 'none';
      }, 4000);
    });
  }
});
