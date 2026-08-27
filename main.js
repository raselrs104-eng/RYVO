let cartCount = 0;
const cartItems = [];

function addToCart(productName, price) {
    cartCount++;
    cartItems.push({ name: productName, price: price });
    
    // Update Navbar Counter
    document.getElementById('cart-count').innerText = cartCount;
    
    // User Feedback
    alert(`${productName} আপনার কার্টে যোগ করা হয়েছে!`);
}

function toggleCart() {
    if (cartItems.length === 0) {
        alert("আপনার কার্ট বর্তমানে খালি।");
    } else {
        let total = cartItems.reduce((sum, item) => sum + item.price, 0);
        let itemsList = cartItems.map(item => `- ${item.name}: ৳${item.price}`).join('\n');
        alert(`আপনার কার্টের পণ্যসমূহ:\n\n${itemsList}\n\nমোট মূল্য: ৳${total}`);
    }
}
