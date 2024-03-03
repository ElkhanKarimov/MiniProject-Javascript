const navbar = document.getElementById("nav1")
const nav = document.querySelector(".navbar1")
function navScroll() {
    let next = window.pageYOffset
    if (next >= 20) {
        nav.style.backgroundColor = "white"
        navbar.style.top = "-10px"
    }
    else {
        nav.style.backgroundColor = "transparent"
        navbar.style.top = "30px"

    }
}
window.addEventListener("scroll", navScroll)





const slide = document.querySelectorAll(".slide")
const containerSlide = document.querySelector(".slide-container")
const slides = document.querySelector(".slides")
const nextSlide = document.getElementById("left-arrow")
const previousSlide = document.getElementById("right-arrow")
let currentIndex = 0
let interval
function next() {
    if (currentIndex < slide.length - 1) {
        currentIndex++
    }
    else {
        currentIndex = 0
    }
    updateSlider()
}
function previous() {
    if (currentIndex > 0) {
        currentIndex++
    }
    else {
        currentIndex = slide.length - 1
    }
    updateSlider()
}
function updateSlider() {
    const transformvalue = -currentIndex * 100 + "%"
    slides.style.transform = `translateX(${transformvalue})`
}
function startAutoPlay() {
    interval = setInterval(() => {
        if (currentIndex < slide.length - 1) {
            currentIndex++
        }
        else {
            currentIndex = 0
        }
        updateSlider()
    }, 3000)
}
startAutoPlay()
nextSlide.addEventListener("click", () => {
    console.log("salam");
    if (currentIndex < slide.length - 1) {
        currentIndex++
    }
    else {
        currentIndex = 0
    }
    updateSlider()
})
previousSlide.addEventListener("click", previous)








const basket = document.getElementById("basket");
const openSidebar = () => {
    document.getElementById("sideBar").style.right = "0";
    document.getElementById("sideBar").style.zIndex = "999999"
}
basket.addEventListener("click", openSidebar);


const closeBar= document.getElementById("closeBar")
const closeSidebar=()=>{
    document.getElementById("sideBar").style.right="-25%"
}
closeBar.addEventListener("click", closeSidebar)



const wishlist=document.getElementById("urey")
const openWishSideBar=()=>{
    document.getElementById("wishsideBar").style.right="0"
}
wishlist.addEventListener("click", openWishSideBar)


const closeWishBar= document.getElementById("closeWishBar")
const closeWishSidebar=()=>{
    document.getElementById("wishsideBar").style.right="-25%"
}
closeWishBar.addEventListener("click", closeWishSidebar)









function showProducts(category) {
    document.getElementById('productCards').innerHTML = '';

    let apiUrl = 'http://localhost:3000/products';
    if (category !== 'All Products') {
        apiUrl += `?category=${category}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col';
                card.style = 'margin: 0; padding: 0; width: 270px; height: 430px; border-radius: 0%;';

                card.innerHTML = `
                    <div class="card h-100" style="border: none; width: 270px; height: 430px;">
                        <img src="${product.image}" class="card-img-top cardimgg" alt="...">
                        <div class="card-body">
                            <div class="icon-title">
                                <p class="card-title">${product.info}</p>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <span class="card-text">${product.price}</span>
                        </div>
                        <div><button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="quick" data-img="${product.image}" data-title="${product.info}" data-price="${product.price}">Quick View</button></div>
                    </div>
                `;

                document.getElementById('productCards').appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}


const searchButton = document.getElementById("search")
const input = document.getElementById("search-input")

const openInput = () => {
    input.style.display = "block"
}
searchButton.addEventListener("click", openInput)








//SEARCH

input.addEventListener("input", function () {
    const searchText = input.value.toLowerCase();

    const cardTitles = document.querySelectorAll('.card-title');
    cardTitles.forEach(title => {
        const card = title.closest('.col');
        const titleText = title.textContent.toLowerCase();

        if (titleText.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

searchButton.addEventListener("click", openInput);








// filter

let isHighToLow = true;

function showProducts(category) {

    document.getElementById('productCards').innerHTML = '';


    let apiUrl = 'http://localhost:3000/products';
    if (category !== 'All Products') {
        apiUrl += `?category=${category}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            data.sort((a, b) => {
                return isHighToLow ? b.price - a.price : a.price - b.price;
            });


            data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col';
                card.style = 'margin: 0; padding: 0; width: 270px; height: 430px; border-radius: 0%;';

                card.innerHTML = `
                    <div class="card h-100" style="border: none; width: 270px; height: 430px;">
                        <img src="${product.image}" class="card-img-top cardimgg" alt="...">
                        <div class="card-body">
                            <div class="icon-title">
                                <p class="card-title">${product.info}</p>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <span class="card-text">${product.price}</span>
                        </div>
                        <div><button class="quick" data-img="${product.image}" data-title="${product.info}" data-price="${product.price}">Quick View</button></div>
                    </div>
                `;

                document.getElementById('productCards').appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching products:', error));


    isHighToLow = !isHighToLow;
}


document.querySelector('.filter').addEventListener('click', function () {

    showProducts('All Products');
});



















// gua modal


document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('productCards').addEventListener('click', function (event) {
        if (event.target.classList.contains('quick')) {
            const modalImg = document.querySelector('.modal-img');
            const modalName = document.querySelector('.modal-name');
            const modalPrice = document.querySelector('.modal-price');
            const modalInfo = document.querySelector('.modal-info');

            const imgSrc = event.target.getAttribute('data-img');
            const title = event.target.getAttribute('data-title');
            const price = event.target.getAttribute('data-price');

            modalImg.src = imgSrc;
            modalName.textContent = title;
            modalPrice.textContent = price;

            document.querySelector('.modal-dialog').style.display = 'block';
        }
    });

    document.querySelector('.modal-dialog').addEventListener('click', function () {
        this.style.display = 'none';
    });
});








document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        const productCardsContainer = document.getElementById('productCards');
        const loadMoreBtnContainer = document.getElementById('loadMoreBtnContainer');
        let visibleCards = 6;
        let currentIndex = visibleCards;

        const addToCartButtons = document.querySelectorAll('.add-cart');
        const cartCountBox = document.querySelector('.shopping-icon .count-box');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const modal = button.closest('.modal-content');
                const productImage = modal.querySelector('.modal-img').getAttribute('src');
                const productName = modal.querySelector('.modal-name').innerText;
                const productPrice = parseFloat(modal.querySelector('.modal-price').innerText.replace('$', ''));

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    image: productImage,
                    name: productName,
                    price: productPrice
                });
                localStorage.setItem('cart', JSON.stringify(cart));

                updateCartCount();
                updateSidebarCart();
            });
        });

        function updateCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCountBox.innerText = cart.length;
        }

        function updateSidebarCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const sideBarCartContainer = document.querySelector('.cart-images');

         
            sideBarCartContainer.innerHTML = '';

          
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'img-pleat';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="">
                    <div class="pleat">
                        <p class="ptags">${item.name}</p>
                        <span class="spantags">1 x $${item.price.toFixed(2)}</span>
                    </div>
                `;
                sideBarCartContainer.appendChild(cartItem);
            });

          
            const total = cart.reduce((acc, item) => acc + item.price, 0);
            const totalButton = document.querySelector('.total-btn');
            totalButton.innerText = `Total: $${total.toFixed(2)}`;
        }

        function renderCards() {
            const endIndex = Math.min(currentIndex, data.length);

            for (let i = currentIndex - visibleCards; i < endIndex; i++) {
                const product = data[i];
                const card = document.createElement('div');
                card.className = 'col';
                card.style = 'margin: 0; padding: 0; width: 270px; height: 430px;border-radius: 0%;'

                card.innerHTML = `
                        <div class="card h-100" style="border: none; width: 300px; height: 430px;">
                            <img src="${product.image}" class="card-img-top" alt="Product Image">
                            <div class="card-body">
                                <div class="icon-title">
                                    <p class="card-title">${product.info}</p>
                                    <i class="fa-regular fa-heart"></i>
                                </div>
                                <span class="card-text">$${product.price.toFixed(2)}</span>
                                
                            </div>
                            <div><button type="button" data-toggle="modal" data-target="#exampleModalCenter" class="quick" data-img="${product.image}" data-title="${product.info}" data-price="${product.price}">Quick View</button></div>
                        </div>
                    `;

                productCardsContainer.appendChild(card);
            }

            if (currentIndex >= data.length) {
                loadMoreBtnContainer.style.display = 'none';
            }
        }

        renderCards();

        window.loadMore = function () {
            currentIndex += visibleCards;
            renderCards();
        };

        updateCartCount(); 

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});



document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        const wishIcons = document.querySelectorAll('.fa-regular.fa-heart');
        const wishlistItemsContainer = document.getElementById('wishlistItems');
        const countBox = document.querySelector('.count-box1');

        wishIcons.forEach(icon => {
            icon.addEventListener('click', function () {
                const productCard = icon.closest('.card');
                const productImage = productCard.querySelector('.card-img-top').getAttribute('src');
                const productName = productCard.querySelector('.card-title').innerText;
                const productPrice = parseFloat(productCard.querySelector('.card-text').innerText.replace('$', ''));

                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.push({
                    image: productImage,
                    name: productName,
                    price: productPrice
                });
                localStorage.setItem('wishlist', JSON.stringify(wishlist));

                updateSidebarWishlist(); 
                updateCountBox();
            });
        });

        function updateSidebarWishlist() {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

            wishlistItemsContainer.innerHTML = '';

            wishlist.forEach(item => {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'img-pleat';
                wishlistItem.innerHTML = `
                    <img src="${item.image}" alt="">
                    <div class="pleat">
                        <p class="ptags">${item.name}</p>
                        <span class="spantags">1 x $${item.price.toFixed(2)}</span>
                    </div>
                `;
                wishlistItemsContainer.appendChild(wishlistItem);
            });

            const total = wishlist.reduce((acc, item) => acc + item.price, 0);
            const totalButton = document.querySelector('.total-btn');
            totalButton.innerText = `Total: $${total.toFixed(2)}`;
        }

        function updateCountBox() {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            countBox.innerText = wishlist.length;
        }

        updateSidebarWishlist(); 
        updateCountBox(); 


    } catch (error) {
        console.error('Error fetching data:', error);
    }
});