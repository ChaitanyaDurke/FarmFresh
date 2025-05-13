// DOM Elements
const navLinks = document.getElementById("navLinks")
const openMenu = document.getElementById("openMenu")
const closeMenu = document.getElementById("closeMenu")
const userTypeBtns = document.querySelectorAll(".user-type-btn")
const togglePasswordBtns = document.querySelectorAll(".toggle-password")
const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")

// Mobile Menu
if (openMenu && closeMenu) {
  openMenu.addEventListener("click", () => {
    navLinks.classList.add("active")
  })

  closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
}

// User Type Selection
userTypeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    userTypeBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get user type
    const userType = btn.getAttribute("data-type")

    // You can customize form fields based on user type here
    if (userType === "farmer") {
      // Show farmer-specific fields if needed
      console.log("Farmer selected")
    } else if (userType === "businessman") {
      // Show businessman-specific fields if needed
      console.log("Businessman selected")
    } else if (userType === "retailer") {
      // Show retailer-specific fields if needed
      console.log("Retailer selected")
    }
  })
})

// Toggle Password Visibility
togglePasswordBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.previousElementSibling

    if (input.type === "password") {
      input.type = "text"
      btn.classList.remove("fa-eye")
      btn.classList.add("fa-eye-slash")
    } else {
      input.type = "password"
      btn.classList.remove("fa-eye-slash")
      btn.classList.add("fa-eye")
    }
  })
})

// Form Submission
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const userType = document.querySelector(".user-type-btn.active").getAttribute("data-type")

    // Validate form
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    // Here you would typically send the data to your server
    console.log("Login form submitted:", { email, password, userType })

    // For demo purposes, show success message
    alert(`Successfully logged in as ${userType}`)

    // Redirect to home page
    // window.location.href = "index.html";
  })
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const fullname = document.getElementById("fullname").value
    const email = document.getElementById("email").value
    const gender = document.getElementById("gender").value
    const age = document.getElementById("age").value
    const mobile = document.getElementById("mobile").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirm-password").value
    const userType = document.querySelector(".user-type-btn.active").getAttribute("data-type")

    // Validate form
    if (!fullname || !email || !gender || !age || !mobile || !password || !confirmPassword) {
      alert("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Here you would typically send the data to your server
    console.log("Signup form submitted:", {
      fullname,
      email,
      gender,
      age,
      mobile,
      password,
      userType,
    })

    // For demo purposes, show success message
    alert(`Successfully registered as ${userType}`)

    // Redirect to login page
    // window.location.href = "login.html";
  })
}

// Password validation
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirm-password")

if (passwordInput && confirmPasswordInput) {
  confirmPasswordInput.addEventListener("input", () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity("Passwords don't match")
    } else {
      confirmPasswordInput.setCustomValidity("")
    }
  })
}
