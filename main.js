let cartCount = 0;
const cartItems = [];

// আপনার আসল হোয়াটসঅ্যাপ নম্বরটি নিচে দিন (দেশের কোড সহ, কোনো স্পেস বা '+' ছাড়া)
const myWhatsAppNumber = "8801404305574"; // উদাহরণ: 8801712345678

function addToCart(productName, price) {
    cartCount++;
    cartItems.push({ name: productName, price: price });
    document.getElementById('cart-count').innerText = cartCount;
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

function togglePaymentInfo() {
    const method = document.getElementById('payment-method').value;
    const bkashBox = document.getElementById('bkash-info');
    if (method === 'bkash') {
        bkashBox.style.display = 'block';
    } else {
        bkashBox.style.display = 'none';
    }
}

function handleOrder(e) {
    e.preventDefault();
    
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const trxId = document.getElementById('trx-id') ? document.getElementById('trx-id').value : 'N/A';

    // পণ্য এবং পেমেন্ট ডিটেইলস
    let productsText = cartItems.length > 0 
        ? cartItems.map(item => `- ${item.name} (৳${item.price})`).join('%0A') 
        : "কোনো প্রোডাক্ট কার্টে যোগ করা হয়নি";
        
    let totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    // WhatsApp মেসেজ ফরম্যাট
    let message = `*NEW ORDER - RAYVON*%0A%0A` +
                  `*কাস্টমারের নাম:* ${name}%0A` +
                  `*ফোন নম্বর:* ${phone}%0A` +
                  `*ঠিকানা:* ${address}%0A%0A` +
                  `*অর্ডার করা পণ্য:*%0A${productsText}%0A%0A` +
                  `*মোট মূল্য:* ৳${totalPrice}%0A` +
                  `*পেমেন্ট মেথড:* ${paymentMethod.toUpperCase()}%0A`;

    if (paymentMethod === 'bkash') {
        message += `*bKash TrxID:* ${trxId}%0A`;
    }

    // WhatsApp-এ মেসেজ রিডাইরেক্ট
    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
