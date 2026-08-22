/**
 * Security & Anti-Tampering Module
 * حماية الموقع من الاختراق وأدوات التفتيش والاسكربتات الخبيثة
 */
(function () {
    "use strict";

    // 1. منع تضمين الصفحة داخل iframe غير مصرح به (Clickjacking Protection)
    try {
        if (window.top !== window.self) {
            window.top.location = window.self.location;
        }
    } catch (e) {
        console.warn("Frame busting enforced.");
    }

    function initSecurityMeasures() {
        // 2. منع القائمة المنبثقة بالزر الأيمن للماوس (Right-Click Context Menu)
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        }, { capture: true, passive: false });

        // 3. منع سحب وإفلات العناصر لمنع استخراج الكود أو الوسائط الحساسة
        document.addEventListener('dragstart', (e) => {
            if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'A')) {
                e.preventDefault();
            }
        });

        // 4. منع اختصارات لوحة المفاتيح الخاصة بأدوات المطورين وحفظ الصفحة
        document.addEventListener('keydown', (e) => {
            const key = e.key ? e.key.toLowerCase() : '';
            const isCtrl = e.ctrlKey || e.metaKey;

            // F12 - فتح أدوات المطورين
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + Shift + I / J / C (فتح Console / Inspector)
            if (isCtrl && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + U (عرض سورس الصفحة)
            if (isCtrl && key === 'u') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }

            // Ctrl + S (حفظ الصفحة ومحتوياتها)
            if (isCtrl && key === 's') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        }, { capture: true, passive: false });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurityMeasures);
    } else {
        initSecurityMeasures();
    }
})();