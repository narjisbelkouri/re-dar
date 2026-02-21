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
        "contact-title": "تواصل معنا", 
        "follow-us": "تابعونا على إنستغرام:",
        "send-btn": "إرسال الرسالة",
        timer: "نرد خلال 24 ساعة", 
        footer: "بكل حب من أجل بيوتكم"
    },
    fr: {
        home: "Accueil", about: "À Propos", services: "Services", contact: "Contact",
        "hero-title": "L'élégance du goût.. au meilleur prix",
        "hero-desc": "Transformez votre intérieur en espace de rêve avec une touche professionnelle et un budget maîtrisé.",
        coverage: "Nous intervenons partout au Maroc",
        start: "Commencez votre projet",
        "about-title": "Qui sommes-nous ?",
        "about-text": "Chez Re-Dar, nous sommes une équipe de coordinateurs, d'ingénieurs et d'experts en décoration. Notre objectif est de permettre à chacun de vivre dans un intérieur confortable et raffiné, tout en respectant votre budget et votre santé.",
        "s1-t": "Votre goût d'abord", "s1-d": "Nous suivons votre style avec précision.",
        "s2-t": "Santé & Confort", "s2-d": "Matériaux sûrs pour votre santé.",
        "s3-t": "Toutes les pièces", "s3-d": "Nous concevons chaque recoin.",
        "contact-title": "Contactez-nous", 
        "follow-us": "Suivez-nous sur Instagram :",
        "send-btn": "Envoyer le message",
        timer: "Réponse sous 24h", 
        footer: "Fait avec amour pour vos foyers"
    }
};

// --- التعديل الأساسي هنا: اللغة تبدأ بفرنسية ---
let currentLang = 'fr'; 
const langBtn = document.getElementById('lang-switch');

langBtn.addEventListener('click', () => {
    // تبديل اللغة
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    
    // تغيير نص الزر: إذا كنا في العربية، الزر يظهر "Français" والعكس
    langBtn.innerText = currentLang === 'fr' ? 'العربية' : 'Français';
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang][key]) {
            el.innerText = translations[currentLang][key];
        }
    });

    // تحديث العناصر الخاصة التي تملك IDs
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');
    const aboutText = document.getElementById('about-text');
    const heroBtn = document.getElementById('hero-btn');

    if(heroTitle) heroTitle.innerText = translations[currentLang]['hero-title'];
    if(heroDesc) heroDesc.innerText = translations[currentLang]['hero-desc'];
    if(aboutText) aboutText.innerText = translations[currentLang]['about-text'];
    if(heroBtn) heroBtn.innerText = translations[currentLang]['start'];
}

// Contact Form Logic (AJAX)
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const formData = new FormData(this);
    
    submitBtn.innerText = currentLang === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...';
    submitBtn.disabled = true;

    const response = await fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        alert(currentLang === 'ar' ? 'شكراً لك! تم إرسال رسالتك بنجاح.' : 'Merci ! Votre message a été envoyé.');
        contactForm.reset();
        submitBtn.innerText = currentLang === 'ar' ? 'إرسال الرسالة' : 'Envoyer le message';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    } else {
        alert(currentLang === 'ar' ? 'Oops! كاين شي مشكل فـ الإرسال.' : 'Oops! Un problème est survenu.');
        submitBtn.disabled = false;
    }
});
