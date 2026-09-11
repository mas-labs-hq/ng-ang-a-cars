/**
 * ═══════════════════════════════════════════════════════════════
 *  NGANGAAI · Local AI Assistant for Ng'ang'a Cars!
 *  100% Client-Side | Zero API Calls | Zero Dependencies
 *  Built by MortApps Studios
 * ═══════════════════════════════════════════════════════════════
 *
 *  Same architecture pattern as MortApps' midas-ai.js:
 *  regex-driven local responses, no network calls, instant replies.
 *  Tailored for car dealership queries: inventory, financing, test
 *  drives, location, valuation, trade-ins, M-Pesa deposits.
 */

function generateNgangaResponse(message) {
    var msg = message.toLowerCase().trim();
    var CARS = window.NGANGA_CARS || [];
    var CONFIG = window.NGANGA_CONFIG || {};
    var formatKES = window.formatKES || function(n) { return 'KES ' + Number(n).toLocaleString(); };

    // -- GREETINGS --
    if (/^(hi|hello|hey|howdy|greetings|good\s?(morning|afternoon|evening)|jambo|vipi|habari|sup|yo|what'?s\s?up|hola)/i.test(msg)) {
        var greetings = [
            "Jambo! Karibu <strong>Ng'ang'a Cars!</strong> 👋 I'm <strong>NgangaAI</strong>, your local car-buying assistant. You can ask me about our cars, prices, financing, test drives, or our location. How can I help?",
            "Hello! Welcome to Ng'ang'a Cars! I can show you our inventory, explain financing options, or help you book a test drive. What are you looking for today?",
            "Hi there! 👋 I'm NgangaAI. Looking for an SUV, sedan, pickup, or hatchback? I can guide you to the perfect car in your budget.",
            "Habari! Karibu. I can help with car information, pricing, test drive bookings, and more. What would you like to know?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // -- THANKS --
    if (/^(thanks|thank\s?you|thx|asante|cheers|appreciate|ni[a]?ce|cool)/i.test(msg)) {
        var thanks = [
            "You're welcome! If you need anything else, just ask. You can also WhatsApp us at <strong>" + (CONFIG.phone || '+254 740 596907') + "</strong>.",
            "Happy to help! Ready to book a test drive? I can guide you through it.",
            "Anytime! Feel free to ask about any car in our showroom. I'm here 24/7."
        ];
        return thanks[Math.floor(Math.random() * thanks.length)];
    }

    // -- GOODBYE --
    if (/^(bye|goodbye|see\s?ya|later|good\s?night|tata|kwaheri|catch\s?you)/i.test(msg)) {
        return "Kwaheri! Drive safe. Remember, Ng'ang'a Cars! is here whenever you need your next ride. Visit us at <strong>Ngong Road, Nairobi</strong> or WhatsApp <strong>" + (CONFIG.phone || '+254 740 596907') + "</strong>.";
    }

    // -- AVAILABLE CARS / INVENTORY --
    if (/(what|which|show|list|see).{0,15}(car|vehicle|auto|inventory|stock|available)|available|inventory|stock|cars\s?(do\s?you|have|available)/i.test(msg)) {
        var bodyTypes = {};
        CARS.forEach(function(c) {
            bodyTypes[c.bodyType] = (bodyTypes[c.bodyType] || 0) + 1;
        });
        var summary = Object.keys(bodyTypes).map(function(t) {
            return t + ' (' + bodyTypes[t] + ')';
        }).join(', ');

        var cheapest = CARS.reduce(function(a, b) { return a.price < b.price ? a : b; });
        var priciest = CARS.reduce(function(a, b) { return a.price > b.price ? a : b; });

        return "We currently have <strong>" + CARS.length + " cars</strong> in our showroom: " + summary + ".<br><br>" +
            "Price range: <strong>" + formatKES(cheapest.price) + "</strong> (" + cheapest.title + ") to <strong>" + formatKES(priciest.price) + "</strong> (" + priciest.title + ").<br><br>" +
            "Browse them all in our <a href=\"#showroom\" style=\"color:#C9A84C;font-weight:600;text-decoration:underline\">Digital Showroom</a>, or tell me what you're looking for and I can recommend the perfect car!";
    }

    // -- PRICING / COST --
    if (/pric|cost|fee|how\s?much|charge|rate|afford|cheap|expensive|ksh|kes|shilling|budget/i.test(msg)) {
        var prices = CARS.map(function(c) { return c.price; }).sort(function(a, b) { return a - b; });
        var min = prices[0], max = prices[prices.length - 1];
        var avg = Math.round(prices.reduce(function(a, b) { return a + b; }, 0) / prices.length);

        return "Our car prices range from <strong>" + formatKES(min) + "</strong> to <strong>" + formatKES(max) + "</strong>, with an average of about <strong>" + formatKES(avg) + "</strong>.<br><br>" +
            "Price categories:<br>&#8226; <strong>Under 1.5M:</strong> Hatchbacks &amp; small sedans<br>&#8226; <strong>1.5M to 3.5M:</strong> Mid-range sedans &amp; SUVs<br>&#8226; <strong>3.5M to 5.5M:</strong> Premium SUVs &amp; sedans<br>&#8226; <strong>5.5M+:</strong> Luxury &amp; brand-new pickups<br><br>" +
            "Use the price filter in our <a href=\"#showroom\" style=\"color:#C9A84C;font-weight:600;text-decoration:underline\">Showroom</a> to find cars in your budget. Want me to recommend something specific?";
    }

    // -- FINANCING / LOAN / INSTALLMENTS --
    if (/financ|loan|installment|pay\s?in\s?install|hire\s?purchase|m\s?pau?sa|mpesa|deposit|monthly|emi|pay\s?monthly/i.test(msg)) {
        return "We offer <strong>flexible financing options</strong> through our banking partners:<br><br>" +
            "&#8226; <strong>Bank loan:</strong> KCB, Equity, Co-op Bank, Stanbic (typically 10-18% p.a.)<br>" +
            "&#8226; <strong>Hire purchase:</strong> 20-30% deposit, balance over 24-60 months<br>" +
            "&#8226; <strong>M-Pesa deposit:</strong> Reserve any car with KES 50,000 refundable deposit<br><br>" +
            "Example: a <strong>KES 3M car</strong> with 20% deposit (KES 600K) over 48 months works out to roughly KES 65K-75K/month depending on the bank.<br><br>" +
            "WhatsApp us at <strong>" + (CONFIG.phone || '+254 740 596907') + "</strong> with the car you want and we'll connect you with the right financier.";
    }

    // -- TEST DRIVE --
    if (/test\s?drive|try\s?out|drive\s?it|see\s?it|view\s?car|visit|come\s?over|appointment|booking/i.test(msg)) {
        return "Booking a test drive is easy! 🚗<br><br>" +
            "<strong>Option 1:</strong> Use the form on our <a href=\"#contact\" style=\"color:#C9A84C;font-weight:600;text-decoration:underline\">Contact section</a>, pick the car, date, and we'll WhatsApp you to confirm.<br>" +
            "<strong>Option 2:</strong> WhatsApp us directly at <strong>" + (CONFIG.phone || '+254 740 596907') + "</strong> with the car name and preferred time.<br><br>" +
            "Our showroom is at <strong>Ngong Road, Nairobi</strong>, open <strong>Mon-Sat 8AM-6PM</strong>. Test drives are free and take about 20 minutes.";
    }

    // -- LOCATION / DIRECTIONS --
    if (/where|location|address|directions|find\s?you|located|how\s?do\s?i\s?get|which\s?area|branch/i.test(msg)) {
        return "📍 <strong>Ng'ang'a Cars! Showroom</strong><br>Ngong Road, Nairobi, Kenya<br><br>" +
            "We're located along Ngong Road, easily accessible from both the CBD and Kilimani. Free parking available on-site.<br><br>" +
            "<strong>Hours:</strong> Mon-Sat 8:00 AM to 6:00 PM · Sunday: Closed<br>" +
            "<strong>Phone:</strong> " + (CONFIG.phone || '+254 740 596907') + "<br><br>" +
            "Want to WhatsApp us for directions? <a href=\"https://wa.me/" + (CONFIG.whatsapp || '254740596907') + "\" target=\"_blank\" style=\"color:#C9A84C;font-weight:600;text-decoration:underline\">Chat with us</a>";
    }

    // -- HOURS / OPEN --
    if (/hour|open|close|when\s?are|what\s?time|working|today|tomorrow|sunday|weekend/i.test(msg)) {
        return "🕒 <strong>Our Hours</strong><br><br>" +
            "&#8226; Monday to Friday: 8:00 AM to 6:00 PM<br>" +
            "&#8226; Saturday: 8:00 AM to 6:00 PM<br>" +
            "&#8226; Sunday: Closed<br><br>" +
            "You can still browse our cars and WhatsApp us anytime and we'll respond as soon as we're back online!";
    }

    // -- TRADE-IN / SELL MY CAR --
    if (/trade|sell|exchange|swap|my\s?car|valuation|value\s?my|worth/i.test(msg)) {
        return "Yes, we accept <strong>trade-ins!</strong> Bring your car for a free valuation, and we'll deduct its value from your new purchase.<br><br>" +
            "How it works:<br>" +
            "&#8226; Bring the car (or send photos via WhatsApp)<br>" +
            "&#8226; We inspect &amp; value it (15-30 min)<br>" +
            "&#8226; Trade-in value is deducted from your new car<br>" +
            "&#8226; We handle all logbook transfer paperwork<br><br>" +
            "Please have ready: logbook, ID, KRA PIN, service history (if available). WhatsApp <strong>" + (CONFIG.phone || '+254 740 596907') + "</strong> to start.";
    }

    // -- LOGBOOK / PAPERWORK / INSURANCE --
    if (/log\s?book|logbook|paper|transfer|ownership|title\s?deed|insurance|cover|comprehensive|third\s?party/i.test(msg)) {
        return "Every car at Ng'ang'a Cars! comes with:<br><br>" +
            "&#8226; <strong>Clean logbook:</strong> verified and ready for transfer<br>" +
            "&#8226; <strong>Service history:</strong> full or partial, where available<br>" +
            "&#8226; <strong>Import documents</strong> (for foreign-used cars): clean auction sheet<br>" +
            "&#8226; <strong>Original ID &amp; PIN</strong> of previous owner<br><br>" +
            "We handle the logbook transfer for you at no extra cost. We can also arrange <strong>insurance</strong> through our partners (Jubilee, Britam, GA, UAP), comprehensive or third-party.";
    }

    // -- SPECIFIC CAR RECOMMENDATIONS --
    if (/(recommend|suggest|best|good|which\s?car|what\s?car|looking\s?for|want\s?a?car|need\s?a?car)/i.test(msg)) {
        // Try to detect budget or body type in the message
        var wantsSUV = /suv|truck|big\s?car|family\s?car|4x4|off\s?road|adventure/i.test(msg);
        var wantsSedan = /sedan|saloon|executive|small\s?car|city\s?car|commute/i.test(msg);
        var wantsPickup = /pickup|truck|work\s?car|load|cargo|transport/i.test(msg);
        var wantsHatch = /hatch|small|cheap|affordable|first\s?car|fuel\s?efficient|vitz|mazze|demio/i.test(msg);

        var budgetMatch = msg.match(/(\d+)\s*(m|k|million|thousand)/i);
        var budget = null;
        if (budgetMatch) {
            var num = parseInt(budgetMatch[1], 10);
            var unit = budgetMatch[2].toLowerCase();
            if (unit.startsWith('m')) budget = num * 1000000;
            else if (unit.startsWith('k') || unit.startsWith('thou')) budget = num * 1000;
        }
        if (/under\s?(\d)/i.test(msg)) {
            var m = msg.match(/under\s?(\d+)/i);
            if (m) budget = parseInt(m[1], 10) * (m[1].length <= 1 ? 1000000 : 1);
        }

        var matches = CARS.filter(function(c) {
            if (wantsSUV && c.bodyType === 'SUV') return true;
            if (wantsSedan && c.bodyType === 'Sedan') return true;
            if (wantsPickup && c.bodyType === 'Pickup') return true;
            if (wantsHatch && c.bodyType === 'Hatchback') return true;
            return false;
        });

        if (budget) {
            matches = matches.length ? matches.filter(function(c) { return c.price <= budget; }) : CARS.filter(function(c) { return c.price <= budget; });
        }

        if (matches.length === 0) {
            return "Tell me what you're looking for! I can help based on:<br><br>" +
                "&#8226; <strong>Budget:</strong> e.g. 'recommend a car under 3M'<br>" +
                "&#8226; <strong>Body type:</strong> SUV, Sedan, Pickup, or Hatchback<br>" +
                "&#8226; <strong>Brand:</strong> Toyota, Nissan, BMW, Mercedes, Subaru, Mazda<br><br>" +
                "What matters most to you?";
        }

        var list = matches.slice(0, 3).map(function(c) {
            return '&#8226; <strong>' + c.title + '</strong>, ' + c.bodyType + ', ' + formatKES(c.price) + ' <a href="#showroom" style="color:#C9A84C;text-decoration:underline">view →</a>';
        }).join('<br>');

        return "Based on what you're looking for, I'd recommend:<br><br>" + list + "<br><br>" +
            "Want to book a test drive for any of these? Just say the car name and I'll guide you.";
    }

    // -- CONTACT / PHONE / WHATSAPP --
    if (/contact|phone|call|whatsapp|reach|number|email|email\s?address/i.test(msg)) {
        return "You can reach us any of these ways:<br><br>" +
            "&#8226; <strong>Phone/WhatsApp:</strong> " + (CONFIG.phone || '+254 740 596907') + "<br>" +
            "&#8226; <strong>Email:</strong> " + (CONFIG.email || 'sales@ngangacars.co.ke') + "<br>" +
            "&#8226; <strong>Location:</strong> Ngong Road, Nairobi<br>" +
            "&#8226; <strong>Hours:</strong> Mon-Sat 8AM-6PM<br><br>" +
            "Quick WhatsApp: <a href=\"https://wa.me/" + (CONFIG.whatsapp || '254740596907') + "\" target=\"_blank\" style=\"color:#C9A84C;font-weight:600;text-decoration:underline\">Click here to chat</a>";
    }

    // -- BRAND-SPECIFIC QUERIES --
    var brandMatch = msg.match(/(toyota|nissan|mazda|subaru|mercedes|bmw|audi|honda|lexus|land\s?rover|mitsubishi)/i);
    if (brandMatch) {
        var brand = brandMatch[1];
        var brandCars = CARS.filter(function(c) {
            return c.make.toLowerCase() === brand.toLowerCase();
        });
        if (brandCars.length > 0) {
            var list = brandCars.map(function(c) {
                return '&#8226; <strong>' + c.title + '</strong>, ' + formatKES(c.price) + ' (' + c.condition + ')';
            }).join('<br>');
            return "We have <strong>" + brandCars.length + " " + brand + "(s)</strong> in stock:<br><br>" + list + "<br><br>" +
                "Want to know more about any of them? Just ask!";
        }
    }

    // -- BODY TYPE SPECIFIC --
    var bodyMatch = msg.match(/(suv|sedan|saloon|pickup|hatchback|van|truck|4x4)/i);
    if (bodyMatch && !wantsSUV && !wantsSedan && !wantsPickup && !wantsHatch) {
        var bodyType = bodyMatch[1];
        var bodyCars = CARS.filter(function(c) {
            return c.bodyType.toLowerCase() === bodyType.toLowerCase();
        });
        if (bodyCars.length > 0) {
            var list = bodyCars.map(function(c) {
                return '&#8226; <strong>' + c.title + '</strong>, ' + formatKES(c.price);
            }).join('<br>');
            return "Our <strong>" + bodyType + "s</strong> in stock:<br><br>" + list + "<br><br>" +
                "Tap any car in the <a href=\"#showroom\" style=\"color:#C9A84C;text-decoration:underline\">Showroom</a> to see all 5 photos and full specs.";
        }
    }

    // -- WHO ARE YOU / FOUNDER --
    if (/who\s?are\s?you|what\s?are\s?you|about\s?you|founder|owner|james|nganga/i.test(msg)) {
        return "I'm <strong>NgangaAI</strong>, your local AI assistant for Ng'ang'a Cars! 🤖<br><br>" +
            "I'm 100% client-side, meaning no data leaves your phone and I respond instantly. I can help you with:<br>" +
            "&#8226; Browsing &amp; recommending cars<br>" +
            "&#8226; Pricing &amp; financing info<br>" +
            "&#8226; Booking test drives<br>" +
            "&#8226; Trade-in valuation guidance<br>" +
            "&#8226; Location &amp; hours<br><br>" +
            "Ng'ang'a Cars! was founded by <strong>James Ng'ang'a</strong>. Powered by <strong>MortApps Studios</strong>.";
    }

    // -- DEFAULT FALLBACK --
    return "I'm not quite sure how to help with that, but here's what I can do:<br><br>" +
        "&#8226; Show you our <strong>available cars</strong><br>" +
        "&#8226; Give you <strong>pricing</strong> &amp; financing info<br>" +
        "&#8226; Help <strong>book a test drive</strong><br>" +
        "&#8226; Tell you our <strong>location &amp; hours</strong><br>" +
        "&#8226; Explain <strong>trade-ins</strong> &amp; paperwork<br><br>" +
        "Try asking 'what cars are available?' or 'recommend a car under 3M'. 👇";
}

// -- AI CHAT WINDOW CONTROLLER --
(function() {
    'use strict';

    var aiBtn = document.getElementById('nganga-ai-btn');
    var aiWindow = document.getElementById('nganga-ai-window');
    var aiClose = document.getElementById('ai-close');
    var aiMessages = document.getElementById('ai-messages');
    var aiInput = document.getElementById('ai-input');
    var aiSend = document.getElementById('ai-send');
    var aiSuggestions = document.getElementById('ai-suggestions');

    if (!aiBtn || !aiWindow) return;

    function toggleWindow() {
        aiWindow.classList.toggle('open');
        if (aiWindow.classList.contains('open')) {
            setTimeout(function() { aiInput.focus(); }, 100);
        }
    }

    aiBtn.addEventListener('click', toggleWindow);
    if (aiClose) aiClose.addEventListener('click', toggleWindow);

    function addMessage(text, sender) {
        var div = document.createElement('div');
        div.className = 'ai-msg ' + (sender === 'user' ? 'user' : 'bot');
        div.innerHTML = text;
        aiMessages.appendChild(div);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function addTyping() {
        var div = document.createElement('div');
        div.className = 'ai-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        aiMessages.appendChild(div);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        return div;
    }

    function sendMessage(text) {
        if (!text || !text.trim()) return;
        addMessage(escapeHtmlSafe(text), 'user');
        aiInput.value = '';

        var typing = addTyping();
        setTimeout(function() {
            typing.remove();
            var response = generateNgangaResponse(text);
            addMessage(response, 'bot');
        }, 600 + Math.random() * 400);
    }

    function escapeHtmlSafe(s) {
        return String(s).replace(/[&<>"']/g, function(c) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
        });
    }

    if (aiSend) {
        aiSend.addEventListener('click', function() {
            sendMessage(aiInput.value);
        });
    }

    if (aiInput) {
        aiInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage(aiInput.value);
            }
        });
    }

    if (aiSuggestions) {
        aiSuggestions.querySelectorAll('.ai-suggestion').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var msg = btn.getAttribute('data-msg');
                sendMessage(msg);
            });
        });
    }
})();
