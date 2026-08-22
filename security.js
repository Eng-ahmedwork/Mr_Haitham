(function () {
    // 0. منع التضمين داخل إطارات وهمية (Anti-Clickjacking / Frame Busting)
    if (window.top !== window.self) {
        try {
            window.top.location = window.self.location;
        } catch (e) {
            document.documentElement.style.display = 'none';
        }
    }

    function protectDevTools() {
        // 1. منع الزر الأيمن للماوس (Right-Click)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        }, false);

        // 2. منع اختصارات الكيبورد الخاصة بأدوات المطورين
        document.addEventListener('keydown', (e) => {
            const key = e.key ? e.key.toLowerCase() : '';
            const isCtrl = e.ctrlKey || e.metaKey;

            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                return false;
            }

            // Ctrl + Shift + I / J / C (فتح الـ Inspector / Console)
            if (isCtrl && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
                e.preventDefault();
                return false;
            }

            // Ctrl + U (عرض سورس الصفحة)
            if (isCtrl && key === 'u') {
                e.preventDefault();
                return false;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protectDevTools);
    } else {
        protectDevTools();
    }
})();