document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // هنا استعملت Mailto لفتح الجميل مباشرة وإرسال المعلومات
    const mailtoLink = `mailto:votre-email@gmail.com?subject=طلب استشارة من ${name}&body=الاسم: ${name}%0D%0Aالبريد: ${email}%0D%0Aالرسالة: ${message}`;
    
    window.location.href = mailtoLink;

    alert("شكراً لثقتك بنا! سيتم توجيهك لفتح البريد الإلكتروني لإرسال الطلب، وسنرد عليك خلال 24 ساعة.");
});
