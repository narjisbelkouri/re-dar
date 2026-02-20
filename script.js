// Cursor Tracker
const dot = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
});

// Translation Data
const translations = {
    ar: {
        home: "الرئيسية", about: "من نحن", services: "خدماتنا", contact: "اتصل بنا",
        "hero-title": "أناقةُ الذوق.. بذكاء التكلفة",
        "hero-desc": "نحول منزلك البسيط إلى فضاء أحلامك بأقل تكلفة ممكنة وبلمسة احترافية.",
        coverage: "نصل إليكم أينما كنتم في المغرب",
        start: "ابدأ رحلتك معنا",
        "about-title": "من نحن؟",
        "about-text": "في Re-Dar، نحن فريق من المنسقين، المهندسين، وخبراء الديكور. هدفنا تمكين الجميع من العيش في منزل مريح وراقي بذوقكم الخاص، وبأقل تكلفة ممكنة؛ نرافقكم بالحرف، ونحترم خصوصياتكم الصحية.",
        "s1-t": "ذوقك أولاً", "s1-d": "نتبع ذوقك الشخصي بدقة، وإذا كنت تائهاً، نقترح عليك الأنسب.",
        "s2-t": "صديق للصحة", "s2-d": "نستخدم مواد آمنة لمن يعانون من الربو أو الحساسية.",
        "s3-t": "كل الغرف", "s3-d": "من الصالون إلى المطبخ، نصمم كل ركن في منزلك.",
        "contact-title": "تواصل معنا", timer: "نرد خلال 24 ساعة", footer: "بكل حب من أجل بيوتكم"
        // زيدها فـ Ar
"follow-us": "تابعونا على إنستغرام:"
    },
    fr: {
        home: "Accueil", about: "À Propos", services: "Services", contact: "Contact",
        "hero-title": "L'élégance du goût.. au prix malin",
        "hero-desc": "Transformez votre intérieur simple en espace de rêve à moindre coût.",
        coverage: "Nous intervenons partout au Maroc",
        start: "Commencez l'aventure",
        "about-title": "Qui sommes-nous ?",
        "about-text": "Chez Re-Dar, nous sommes une équipe de coordinateurs, d'ingénieurs et d'experts en décoration. Notre objectif est de permettre à chacun de vivre dans une maison confortable et élégante selon vos propres goûts, au coût le plus bas possible ; nous vous accompagnons à la lettre et respectons vos particularités de santé.",
        "s1-t": "Votre goût d'abord", "s1-d": "Nous suivons votre style avec précision.",
        "s2-t": "Santé & Confort", "s2-d": "Matériaux sûrs pour votre santé.",
        "s3-t": "Toutes les pièces", "s3-d": "Nous concevons chaque recoin.",
        "contact-title": "Contactez-nous", timer: "Réponse sous 24h", footer: "Fait avec amour"


// زيدها فـ Fr
"follow-us": "Suivez-nous sur Instagram:"
    }
};

let currentLang = 'ar';
const langBtn = document.getElementById('lang-switch');

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'fr' : 'ar';
    langBtn.innerText = currentLang === 'ar' ? 'Français' : 'العربية';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.innerText = translations[currentLang][key];
    });
    document.getElementById('hero-title').innerText = translations[currentLang]['hero-title'];
    document.getElementById('hero-desc').innerText = translations[currentLang]['hero-desc'];
    document.getElementById('about-text').innerText = translations[currentLang]['about-text'];
    document.getElementById('hero-btn').innerText = translations[currentLang]['start'];
}
// --- هاد الكود حطو في آخر سطر في ملف script.js ---

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // هادي كتمنع الصفحة تبدل
    
    const submitBtn = document.getElementById('submit-btn');
    const formData = new FormData(this);
    
    submitBtn.innerText = currentLang === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...';
    submitBtn.disabled = true;

    // صيفط الميساج بلا ما تخرج من الصفحة
    const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        // فاش كيدوز الميساج بنجاح
        alert(currentLang === 'ar' ? 'شكراً لك! تم إرسال رسالتك بنجاح.' : 'Merci ! Votre message a été envoyé.');
        contactForm.reset(); // مسح المعلومات من الفورم
        submitBtn.innerText = currentLang === 'ar' ? 'إرسال الرسالة' : 'Envoyer';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    } else {
        // إلا وقع مشكل
        alert('Oops! كاين شي مشكل فـ الإرسال، حاول مرة أخرى.');
        submitBtn.disabled = false;
    }
});
