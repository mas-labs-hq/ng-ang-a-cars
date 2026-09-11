/**
 * ═══════════════════════════════════════════════════════════════
 *  NG'ANG'A CARS! · MAIN APPLICATION
 *  Vanilla JS | 100% Client-Side | Zero Dependencies
 *  Built by MortApps Studios
 * ═══════════════════════════════════════════════════════════════
 *
 *  Performance patterns (inherited from MortApps DNA):
 *  - IntersectionObserver for reveals & counters (one-shot)
 *  - { passive: true } scroll listener
 *  - Native scroll-snap for carousels & showroom (zero JS scroll hijack)
 *  - lazy loading for non-critical images
 *  - touch-action: manipulation on all interactive elements (CSS)
 */

(function() {
    'use strict';

    // -- CONFIG --
    var CARS = window.NGANGA_CARS || [];
    var CONFIG = window.NGANGA_CONFIG || {};
    var formatKES = window.formatKES || function(n) { return 'KES ' + Number(n).toLocaleString(); };

    // -- STATE --
    var activeFilters = {
        bodyType: 'all',
        make: 'all',
        condition: 'all',
        priceRange: 'all'
    };
    var compareList = [];

    // -- HELPERS --
    function svgIcon(name) {
        var icons = {
            calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
            gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14l4-4"/><path d="M3 12a9 9 0 0 1 18 0"/></svg>',
            fuel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
            cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
            engine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l-2 2v-2h2zm12-7v3h2V6h-2zm-2 3V6h-4v3h4zm-2 0v8h-2v2H7v-2H5v-3H3v-2h2v-3h2V8h4V6h2v3z"/></svg>',
            palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>',
            pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
            image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
            plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
            check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
        };
        return icons[name] || '';
    }

    function abbreviatePrice(kes) {
        if (kes >= 1000000) {
            return 'KES ' + (kes / 1000000).toFixed(kes % 1000000 === 0 ? 0 : 1) + 'M';
        }
        if (kes >= 1000) {
            return 'KES ' + (kes / 1000).toFixed(0) + 'K';
        }
        return formatKES(kes);
    }

    function escapeHtml(s) {
        return String(s || '').replace(/[&<>"']/g, function(c) {
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
        });
    }

    function initials(name) {
        return (name || '').split(' ').map(function(w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
    }

    // -- RENDER: LATEST CARS RAIL --
    /* Smooth image reveals: any <img class="fade-img"> fades in gently
       when it finishes loading (cached images show instantly). Attached
       right after each render, so images never pop in harshly. */
    function decorateImages(scope) {
        var root = scope || document;
        var imgs = root.querySelectorAll('img.fade-img:not(.loaded)');
        for (var i = 0; i < imgs.length; i++) {
            (function(img) {
                function done() { img.classList.add('loaded'); }
                if (img.complete && img.naturalWidth > 0) { done(); return; }
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
            })(imgs[i]);
        }
    }

    function renderLatestRail() {
        var rail = document.getElementById('latest-rail');
        if (!rail) return;

        // Sort by listedAt desc, newest first
        var sorted = CARS.slice().sort(function(a, b) {
            return new Date(b.listedAt) - new Date(a.listedAt);
        }).slice(0, 8);

        var html = sorted.map(function(car) {
            return '' +
                '<article class="car-card" data-car-id="' + car.id + '">' +
                    '<div class="car-card-img">' +
                        '<img src="' + car.images[0] + '" alt="' + escapeHtml(car.title) + '" class="fade-img" loading="lazy" decoding="async">' +
                        '<div class="car-card-badge condition-' + car.condition.replace(/\s+/g, '-') + '">' + car.condition + '</div>' +
                        '<div class="car-card-img-counter">' +
                            svgIcon('image') +
                            '<span>' + car.images.length + '</span>' +
                        '</div>' +
                        '<button class="car-card-compare-btn" data-compare-id="' + car.id + '" aria-label="Add to compare" title="Add to compare">' +
                            svgIcon('plus') +
                        '</button>' +
                    '</div>' +
                    '<div class="car-card-body">' +
                        '<div class="car-card-make">' + escapeHtml(car.make) + ' · ' + car.year + '</div>' +
                        '<h3 class="car-card-title">' + escapeHtml(car.title) + '</h3>' +
                        '<div class="car-card-specs">' +
                            '<span class="car-card-spec">' + car.bodyType + '</span>' +
                            '<span class="car-card-spec">' + abbreviateMileage(car.mileage) + '</span>' +
                            '<span class="car-card-spec">' + car.transmission.split(' ')[0] + '</span>' +
                            '<span class="car-card-spec">' + car.fuel + '</span>' +
                        '</div>' +
                        '<div class="car-card-footer">' +
                            '<div class="car-card-price">' +
                                '<small>Price</small>' +
                                abbreviatePrice(car.price) +
                            '</div>' +
                            '<button class="car-card-btn" data-view-id="' + car.id + '" aria-label="View car">' +
                                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5l7 7-7 7M3 12h18"/></svg>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        rail.innerHTML = html;
        decorateImages(rail);
    }

    function abbreviateMileage(km) {
        if (km >= 1000) return (km / 1000).toFixed(0) + 'K km';
        return km + ' km';
    }

    // -- RENDER: FILTERS BAR --
    function renderFiltersBar() {
        var bar = document.getElementById('filters-bar');
        if (!bar) return;

        // Collect unique values
        var makes = ['all'].concat(unique(CARS.map(function(c) { return c.make; })));
        var bodyTypes = ['all', 'SUV', 'Sedan', 'Pickup', 'Hatchback', 'Van'];
        var conditions = ['all'].concat(unique(CARS.map(function(c) { return c.condition; })));
        var priceRanges = [
            { key: 'all', label: 'All Prices' },
            { key: '0-1500000', label: 'Under 1.5M' },
            { key: '1500000-3500000', label: '1.5M to 3.5M' },
            { key: '3500000-5500000', label: '3.5M to 5.5M' },
            { key: '5500000-99999999', label: '5.5M+' }
        ];

        var html = '';

        // Body Type row
        html += '<div class="filter-row"><span class="filter-label">Body Type</span><div class="chip-row">';
        bodyTypes.forEach(function(t) {
            var active = activeFilters.bodyType === t.toLowerCase() || (t === 'all' && activeFilters.bodyType === 'all');
            html += '<button class="chip ' + (active ? 'active' : '') + '" data-filter="bodyType" data-value="' + t.toLowerCase() + '">' + (t === 'all' ? 'All' : t) + '</button>';
        });
        html += '</div></div>';

        // Make row
        html += '<div class="filter-row"><span class="filter-label">Make</span><div class="chip-row">';
        makes.forEach(function(m) {
            var active = activeFilters.make === m.toLowerCase();
            html += '<button class="chip ' + (active ? 'active' : '') + '" data-filter="make" data-value="' + m.toLowerCase() + '">' + (m === 'all' ? 'All Makes' : m) + '</button>';
        });
        html += '</div></div>';

        // Condition row
        html += '<div class="filter-row"><span class="filter-label">Condition</span><div class="chip-row">';
        conditions.forEach(function(c) {
            var active = activeFilters.condition === c.toLowerCase();
            html += '<button class="chip ' + (active ? 'active' : '') + '" data-filter="condition" data-value="' + c.toLowerCase() + '">' + (c === 'all' ? 'All' : c) + '</button>';
        });
        html += '</div></div>';

        // Price row
        html += '<div class="filter-row"><span class="filter-label">Price</span><div class="chip-row">';
        priceRanges.forEach(function(p) {
            var active = activeFilters.priceRange === p.key;
            html += '<button class="chip ' + (active ? 'active' : '') + '" data-filter="priceRange" data-value="' + p.key + '">' + p.label + '</button>';
        });
        html += '</div><button class="filter-clear" id="filter-clear">Clear All</button><div class="filter-count"><strong id="filter-count-num">0</strong> cars found</div></div>';

        bar.innerHTML = html;

        // Wire chips
        bar.querySelectorAll('.chip').forEach(function(chip) {
            chip.addEventListener('click', function() {
                var filterKey = chip.getAttribute('data-filter');
                var filterVal = chip.getAttribute('data-value');
                activeFilters[filterKey] = filterVal;

                // Update active states within the same filter row
                bar.querySelectorAll('.chip[data-filter="' + filterKey + '"]').forEach(function(c) {
                    c.classList.toggle('active', c.getAttribute('data-value') === filterVal);
                });

                renderGalleryGrid();
            });
        });

        // Wire clear
        var clearBtn = document.getElementById('filter-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                activeFilters = { bodyType: 'all', make: 'all', condition: 'all', priceRange: 'all' };
                renderFiltersBar();
                renderGalleryGrid();
            });
        }
    }

    function unique(arr) {
        var seen = {};
        return arr.filter(function(x) {
            if (seen[x]) return false;
            seen[x] = true;
            return true;
        });
    }

    function carMatchesFilters(car) {
        if (activeFilters.bodyType !== 'all' && car.bodyType.toLowerCase() !== activeFilters.bodyType) return false;
        if (activeFilters.make !== 'all' && car.make.toLowerCase() !== activeFilters.make) return false;
        if (activeFilters.condition !== 'all' && car.condition.toLowerCase() !== activeFilters.condition) return false;
        if (activeFilters.priceRange !== 'all') {
            var parts = activeFilters.priceRange.split('-');
            var min = parseInt(parts[0], 10);
            var max = parseInt(parts[1], 10);
            if (car.price < min || car.price > max) return false;
        }
        return true;
    }

    // -- RENDER: GALLERY GRID --
    function renderGalleryGrid() {
        var grid = document.getElementById('gallery-grid');
        if (!grid) return;

        var filtered = CARS.filter(carMatchesFilters);
        var countEl = document.getElementById('filter-count-num');
        if (countEl) countEl.textContent = filtered.length;

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="gallery-empty">' +
                svgIcon('image') +
                '<p>No cars match your filters. Try clearing some.</p>' +
                '</div>';
            return;
        }

        var html = filtered.map(function(car) {
            return '' +
                '<article class="car-card" data-car-id="' + car.id + '" style="flex:0 0 auto;width:100%;">' +
                    '<div class="car-card-img">' +
                        '<img src="' + car.images[0] + '" alt="' + escapeHtml(car.title) + '" class="fade-img" loading="lazy" decoding="async">' +
                        '<div class="car-card-badge condition-' + car.condition.replace(/\s+/g, '-') + '">' + car.condition + '</div>' +
                        '<div class="car-card-img-counter">' +
                            svgIcon('image') +
                            '<span>' + car.images.length + '</span>' +
                        '</div>' +
                        '<button class="car-card-compare-btn" data-compare-id="' + car.id + '" aria-label="Add to compare" title="Add to compare">' +
                            svgIcon('plus') +
                        '</button>' +
                    '</div>' +
                    '<div class="car-card-body">' +
                        '<div class="car-card-make">' + escapeHtml(car.make) + ' · ' + car.year + '</div>' +
                        '<h3 class="car-card-title">' + escapeHtml(car.title) + '</h3>' +
                        '<div class="car-card-specs">' +
                            '<span class="car-card-spec">' + car.bodyType + '</span>' +
                            '<span class="car-card-spec">' + abbreviateMileage(car.mileage) + '</span>' +
                            '<span class="car-card-spec">' + car.transmission.split(' ')[0] + '</span>' +
                            '<span class="car-card-spec">' + car.fuel + '</span>' +
                        '</div>' +
                        '<div class="car-card-footer">' +
                            '<div class="car-card-price">' +
                                '<small>Price</small>' +
                                abbreviatePrice(car.price) +
                            '</div>' +
                            '<button class="car-card-btn" data-view-id="' + car.id + '" aria-label="View car">' +
                                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 5l7 7-7 7M3 12h18"/></svg>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        grid.innerHTML = html;
        decorateImages(grid);
    }

    // -- CAR MODAL (5-image scroll-snap viewer) --
    function openCarModal(carId) {
        var car = CARS.find(function(c) { return c.id === carId; });
        if (!car) return;

        var modal = document.getElementById('car-modal');
        var content = document.getElementById('car-modal-content');
        if (!modal || !content) return;

        var slidesHtml = car.images.map(function(img, idx) {
            return '<div class="showroom-slide" data-slide-idx="' + idx + '">' +
                '<img src="' + img + '" alt="' + escapeHtml(car.title) + ' photo ' + (idx + 1) + '" class="fade-img" loading="' + (idx === 0 ? 'eager' : 'lazy') + '" decoding="async">' +
                '</div>';
        }).join('');

        var dotsHtml = car.images.map(function(_, idx) {
            return '<button class="showroom-dot ' + (idx === 0 ? 'active' : '') + '" data-dot-idx="' + idx + '" aria-label="Go to image ' + (idx + 1) + '"></button>';
        }).join('');

        var thumbsHtml = car.images.map(function(img, idx) {
            return '<div class="showroom-thumb ' + (idx === 0 ? 'active' : '') + '" data-thumb-idx="' + idx + '">' +
                '<img src="' + img + '" alt="thumb ' + (idx + 1) + '" class="fade-img" loading="lazy" decoding="async">' +
                '</div>';
        }).join('');

        var specs = [
            { label: 'Year', value: car.year, icon: 'calendar' },
            { label: 'Mileage', value: abbreviateMileage(car.mileage), icon: 'gauge' },
            { label: 'Transmission', value: car.transmission, icon: 'cog' },
            { label: 'Fuel', value: car.fuel, icon: 'fuel' },
            { label: 'Engine', value: car.engine, icon: 'engine' },
            { label: 'Body Type', value: car.bodyType, icon: 'cog' },
            { label: 'Color', value: car.color, icon: 'palette' },
            { label: 'Location', value: car.location, icon: 'pin' }
        ];

        var specsHtml = specs.map(function(s) {
            return '<div class="showroom-spec">' +
                '<div class="showroom-spec-label">' + s.label + '</div>' +
                '<div class="showroom-spec-value">' + svgIcon(s.icon) + escapeHtml(s.value) + '</div>' +
                '</div>';
        }).join('');

        var whatsappMsg = 'Hello Ng\'ang\'a Cars! I\'m interested in the ' + car.title + ' (' + formatKES(car.price) + '). Is it still available?';
        var whatsappUrl = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(whatsappMsg);

        var callUrl = 'tel:+254740596907';

        var compareActive = compareList.indexOf(car.id) !== -1;

        content.innerHTML = '' +
            '<button class="car-modal-close" id="car-modal-close" aria-label="Close">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
            '<div class="car-showroom">' +
                '<div class="showroom-hero" id="showroom-hero">' +
                    slidesHtml +
                    '<div class="showroom-counter"><span id="showroom-current">1</span> / ' + car.images.length + '</div>' +
                    '<div class="showroom-dots">' + dotsHtml + '</div>' +
                '</div>' +
                '<div class="showroom-thumbs" id="showroom-thumbs">' + thumbsHtml + '</div>' +
                '<div class="showroom-info">' +
                    '<div class="showroom-make">' + escapeHtml(car.make) + ' · ' + car.condition + '</div>' +
                    '<h2 class="showroom-title">' + escapeHtml(car.title) + '</h2>' +
                    '<div class="showroom-price-row">' +
                        '<div class="showroom-price"><small>Asking Price</small>' + formatKES(car.price) + '</div>' +
                        '<div class="showroom-actions">' +
                            '<a href="' + whatsappUrl + '" class="btn-primary" target="_blank" rel="noopener">' +
                                '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
                                'Enquire on WhatsApp' +
                            '</a>' +
                            '<a href="' + callUrl + '" class="btn-outline">' +
                                '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                                'Call Now' +
                            '</a>' +
                            '<button class="btn-outline" id="modal-compare-btn" data-compare-id="' + car.id + '">' +
                                (compareActive ? svgIcon('check') + ' In Compare' : svgIcon('plus') + ' Add to Compare') +
                            '</button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="showroom-specs">' + specsHtml + '</div>' +
                    '<div class="showroom-desc-title">About this ' + escapeHtml(car.make) + '</div>' +
                    '<p class="showroom-desc">' + escapeHtml(car.description) + '</p>' +
                    '<div class="showroom-agent">' +
                        '<div class="showroom-agent-avatar">' + initials(car.agent) + '</div>' +
                        '<div class="showroom-agent-info">' +
                            '<div class="showroom-agent-name">' + escapeHtml(car.agent) + '</div>' +
                            '<div class="showroom-agent-role">Sales Agent · Ng\'ang\'a Cars!</div>' +
                        '</div>' +
                        '<a href="' + callUrl + '" class="btn-outline" style="padding:8px 16px;font-size:0.75rem;">Contact</a>' +
                    '</div>' +
                '</div>' +
            '</div>';

        decorateImages(content);
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Wire close
        var closeBtn = document.getElementById('car-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCarModal);
        }
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeCarModal();
        });

        // Wire scroll-snap dots + thumbs sync
        var hero = document.getElementById('showroom-hero');
        var thumbsContainer = document.getElementById('showroom-thumbs');
        var counter = document.getElementById('showroom-current');
        var dots = content.querySelectorAll('.showroom-dot');
        var thumbs = content.querySelectorAll('.showroom-thumb');

        function updateActive(idx) {
            dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
            thumbs.forEach(function(t, i) { t.classList.toggle('active', i === idx); });
            if (counter) counter.textContent = (idx + 1);
        }

        // Scroll-based active detection (passive)
        if (hero) {
            var scrollTimer = null;
            hero.addEventListener('scroll', function() {
                if (scrollTimer) cancelAnimationFrame(scrollTimer);
                scrollTimer = requestAnimationFrame(function() {
                    var idx = Math.round(hero.scrollLeft / hero.offsetWidth);
                    updateActive(idx);
                });
            }, { passive: true });
        }

        // Click dot/thumb: scroll
        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function() {
                if (hero) hero.scrollTo({ left: i * hero.offsetWidth, behavior: 'smooth' });
            });
        });
        thumbs.forEach(function(thumb, i) {
            thumb.addEventListener('click', function() {
                if (hero) hero.scrollTo({ left: i * hero.offsetWidth, behavior: 'smooth' });
            });
        });

        // Wire compare button inside modal
        var modalCompareBtn = document.getElementById('modal-compare-btn');
        if (modalCompareBtn) {
            modalCompareBtn.addEventListener('click', function() {
                toggleCompare(car.id);
                var isNowActive = compareList.indexOf(car.id) !== -1;
                modalCompareBtn.innerHTML = isNowActive ? svgIcon('check') + ' In Compare' : svgIcon('plus') + ' Add to Compare';
            });
        }
    }

    function closeCarModal() {
        var modal = document.getElementById('car-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // -- COMPARE FEATURE --
    function toggleCompare(carId) {
        var idx = compareList.indexOf(carId);
        if (idx !== -1) {
            compareList.splice(idx, 1);
        } else {
            if (compareList.length >= 2) {
                // Replace the first one
                compareList.shift();
            }
            compareList.push(carId);
        }
        updateCompareUI();
    }

    function updateCompareUI() {
        var tray = document.getElementById('compare-tray');
        var countEl = document.getElementById('compare-count');
        var ctaBtn = document.getElementById('compare-cta');
        var slot1 = document.getElementById('compare-slot-1');
        var slot2 = document.getElementById('compare-slot-2');

        if (countEl) countEl.textContent = compareList.length;
        if (ctaBtn) ctaBtn.disabled = compareList.length !== 2;

        // Update compare buttons on cards (re-render will handle this on next render)
        document.querySelectorAll('.car-card-compare-btn').forEach(function(btn) {
            var id = btn.getAttribute('data-compare-id');
            var isActive = compareList.indexOf(id) !== -1;
            btn.classList.toggle('active', isActive);
            btn.innerHTML = isActive ? svgIcon('check') : svgIcon('plus');
        });

        // Update slots: each filled slot is tappable to remove that car
        [slot1, slot2].forEach(function(slot, i) {
            if (!slot) return;
            var carId = compareList[i];
            if (carId) {
                var car = CARS.find(function(c) { return c.id === carId; });
                if (car) {
                    slot.classList.add('filled');
                    slot.setAttribute('data-car-id', carId);
                    slot.innerHTML = '<div class="slot-name">' + escapeHtml(car.title) + '</div>' +
                        '<div class="slot-price">' + abbreviatePrice(car.price) + '</div>' +
                        '<span class="slot-x" aria-hidden="true">\u2715</span>';
                }
            } else {
                slot.classList.remove('filled');
                slot.removeAttribute('data-car-id');
                slot.innerHTML = i === 0 ? '+ Add a car' : '+ Add second car';
            }
        });

        if (tray) tray.classList.toggle('visible', compareList.length > 0);
    }

    function openCompareModal() {
        if (compareList.length !== 2) return;
        var carA = CARS.find(function(c) { return c.id === compareList[0]; });
        var carB = CARS.find(function(c) { return c.id === compareList[1]; });
        if (!carA || !carB) return;

        var modal = document.getElementById('compare-modal');
        var content = document.getElementById('compare-modal-content');
        if (!modal || !content) return;

        var rows = [
            { label: 'Price', getVal: function(c) { return formatKES(c.price); }, gold: true },
            { label: 'Make', getVal: function(c) { return c.make; } },
            { label: 'Body Type', getVal: function(c) { return c.bodyType; } },
            { label: 'Year', getVal: function(c) { return c.year; } },
            { label: 'Condition', getVal: function(c) { return c.condition; } },
            { label: 'Mileage', getVal: function(c) { return abbreviateMileage(c.mileage); } },
            { label: 'Engine', getVal: function(c) { return c.engine; } },
            { label: 'Transmission', getVal: function(c) { return c.transmission; } },
            { label: 'Fuel', getVal: function(c) { return c.fuel; } },
            { label: 'Color', getVal: function(c) { return c.color; } },
            { label: 'Location', getVal: function(c) { return c.location; } }
        ];

        var html = '' +
            '<button class="car-modal-close" id="compare-close" aria-label="Close">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
            '<div style="padding:32px clamp(20px,4vw,36px);">' +
                '<div class="section-eyebrow">Side-by-Side</div>' +
                '<h2 class="section-title" style="margin-bottom:24px;">Comparing <span class="accent">2 cars</span></h2>' +
                '<div class="compare-table">' +
                    '<div class="compare-cell label header">Spec</div>' +
                    '<div class="compare-cell header">' +
                        '<img src="' + carA.images[0] + '" alt="' + escapeHtml(carA.title) + '" class="fade-img" decoding="async">' +
                        '<div class="name">' + escapeHtml(carA.title) + '</div>' +
                        '<div class="price">' + formatKES(carA.price) + '</div>' +
                    '</div>' +
                    '<div class="compare-cell header">' +
                        '<img src="' + carB.images[0] + '" alt="' + escapeHtml(carB.title) + '" class="fade-img" decoding="async">' +
                        '<div class="name">' + escapeHtml(carB.title) + '</div>' +
                        '<div class="price">' + formatKES(carB.price) + '</div>' +
                    '</div>';

        rows.forEach(function(row) {
            html += '<div class="compare-cell label">' + row.label + '</div>';
            html += '<div class="compare-cell value ' + (row.gold ? 'gold' : '') + '">' + escapeHtml(row.getVal(carA)) + '</div>';
            html += '<div class="compare-cell value ' + (row.gold ? 'gold' : '') + '">' + escapeHtml(row.getVal(carB)) + '</div>';
        });

        html += '</div></div>';

        content.innerHTML = html;
        decorateImages(content);
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        var closeBtn = document.getElementById('compare-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCompareModal);
        }
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeCompareModal();
        });
    }

    function closeCompareModal() {
        var modal = document.getElementById('compare-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // -- TEST-DRIVE FORM --
    function populateTestDriveCarSelect() {
        var select = document.getElementById('td-car');
        if (!select) return;
        var html = '<option value="">Select a car</option>';
        CARS.forEach(function(car) {
            html += '<option value="' + car.id + '">' + escapeHtml(car.title) + ' (' + formatKES(car.price) + ')</option>';
        });
        select.innerHTML = html;
    }

    function wireTestDriveForm() {
        var form = document.getElementById('test-drive-form');
        if (!form) return;

        // -- Send-channel chooser (WhatsApp / Email) --
        // After a valid submit we ask HOW to send, instead of forcing WhatsApp.
        // Email path: uses mailto: out of the box. The moment you paste your
        // Formspree endpoint into js/cars-data.js: NGANGA_CONFIG.formspree,
        // the email button silently switches to a proper form POST instead.
        var chooser = document.getElementById('send-chooser');
        var pending = null; // the validated enquiry payload

        function buildEnquiry() {
            var name = document.getElementById('td-name').value.trim();
            var phone = document.getElementById('td-phone').value.trim();
            var carId = document.getElementById('td-car').value;
            var date = document.getElementById('td-date').value;
            var message = document.getElementById('td-message').value.trim();

            if (!name || !phone || !carId || !date) return null;

            var car = CARS.find(function(c) { return c.id === carId; });
            if (!car) return null;

            var msg = 'Hello Ng\'ang\'a Cars! I\'d like to book a test drive.\n\n' +
                'Name: ' + name + '\n' +
                'Phone: ' + phone + '\n' +
                'Car: ' + car.title + ' (' + formatKES(car.price) + ')\n' +
                'Preferred Date: ' + date + '\n';
            if (message) msg += 'Message: ' + message + '\n';
            msg += '\nPlease confirm availability. Thank you!';

            return { name: name, phone: phone, car: car, date: date, message: message, msg: msg };
        }

        function openChooser(payload) {
            pending = payload;
            if (chooser) {
                chooser.hidden = false;
                var first = document.getElementById('send-option-whatsapp');
                if (first) first.focus();
            }
        }

        function closeChooser() {
            if (chooser) chooser.hidden = true;
        }

        function sendViaWhatsApp() {
            if (!pending) return;
            var url = 'https://wa.me/' + (CONFIG.whatsapp || '254740596907') +
                '?text=' + encodeURIComponent(pending.msg);
            window.open(url, '_blank');
            closeChooser();
        }

        function sendViaEmail() {
            if (!pending) return;
            var email = CONFIG.email || 'sales@ngangacars.co.ke';
            var subject = 'Test Drive Enquiry: ' + pending.car.title + ' (' + pending.name + ')';

            if (CONFIG.formspree && CONFIG.formspree.indexOf('http') === 0) {
                // Formspree endpoint configured: real form POST with feedback
                var btn = document.getElementById('send-option-email');
                if (btn) { btn.disabled = true; btn.classList.add('sending'); }
                fetch(CONFIG.formspree, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _subject: subject,
                        name: pending.name,
                        phone: pending.phone,
                        car: pending.car.title,
                        date: pending.date,
                        message: pending.message
                    })
                }).then(function(res) {
                    if (btn) { btn.disabled = false; btn.classList.remove('sending'); }
                    if (res.ok) {
                        if (chooser) {
                            var title = document.getElementById('send-chooser-title');
                            var sub = document.getElementById('send-chooser-sub');
                            if (title) title.textContent = 'Sent! Asante sana.';
                            if (sub) sub.textContent = 'Your enquiry is with our sales team. We reply fast.';
                        }
                        setTimeout(closeChooser, 2200);
                    } else {
                        window.location.href = 'mailto:' + email +
                            '?subject=' + encodeURIComponent(subject) +
                            '&body=' + encodeURIComponent(pending.msg);
                        closeChooser();
                    }
                }).catch(function() {
                    if (btn) { btn.disabled = false; btn.classList.remove('sending'); }
                    // Offline / blocked: graceful mailto fallback
                    window.location.href = 'mailto:' + email +
                        '?subject=' + encodeURIComponent(subject) +
                        '&body=' + encodeURIComponent(pending.msg);
                    closeChooser();
                });
            } else {
                // No backend yet: mailto with everything pre-filled
                window.location.href = 'mailto:' + email +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(pending.msg);
                closeChooser();
            }
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var payload = buildEnquiry();
            if (!payload) {
                alert('Please fill in all required fields.');
                return;
            }
            openChooser(payload);
        });

        if (chooser) {
            var waBtn = document.getElementById('send-option-whatsapp');
            var mailBtn = document.getElementById('send-option-email');
            var cancelBtn = document.getElementById('send-chooser-cancel');
            var veil = document.getElementById('send-chooser-veil');
            if (waBtn) waBtn.addEventListener('click', sendViaWhatsApp);
            if (mailBtn) mailBtn.addEventListener('click', sendViaEmail);
            if (cancelBtn) cancelBtn.addEventListener('click', closeChooser);
            if (veil) veil.addEventListener('click', closeChooser);
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && !chooser.hidden) closeChooser();
            });
        }
    }

    // -- POPULATE FOOTER BRANDS --
    function populateFooterBrands() {
        var list = document.getElementById('footer-brands');
        if (!list) return;
        var makes = unique(CARS.map(function(c) { return c.make; }));
        var html = makes.map(function(m) {
            return '<li><a href="#showroom" data-make="' + m.toLowerCase() + '">' + m + '</a></li>';
        }).join('');
        list.innerHTML = html;

        // Wire click to filter
        list.querySelectorAll('a[data-make]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                e.preventDefault();
                activeFilters.make = a.getAttribute('data-make');
                renderFiltersBar();
                renderGalleryGrid();
                document.getElementById('showroom').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // -- POPULATE HERO PRICE --
    function populateHeroPrice() {
        var heroPrice = document.getElementById('hero-price');
        if (heroPrice) {
            // BMW X3 is the featured car in hero
            var bmw = CARS.find(function(c) { return c.id === 'nganga-007'; });
            if (bmw) heroPrice.textContent = abbreviatePrice(bmw.price);
        }
    }

    // -- SCROLL BUTTONS (Latest Rail) --
    function wireLatestScrollButtons() {
        var rail = document.getElementById('latest-rail');
        var leftBtn = document.getElementById('latest-scroll-left');
        var rightBtn = document.getElementById('latest-scroll-right');
        if (!rail || !leftBtn || !rightBtn) return;

        function updateButtonState() {
            var maxScroll = rail.scrollWidth - rail.clientWidth;
            leftBtn.disabled = rail.scrollLeft <= 5;
            rightBtn.disabled = rail.scrollLeft >= maxScroll - 5;
        }

        rail.addEventListener('scroll', updateButtonState, { passive: true });
        window.addEventListener('resize', updateButtonState);
        updateButtonState();

        leftBtn.addEventListener('click', function() {
            rail.scrollBy({ left: -rail.clientWidth * 0.8, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', function() {
            rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: 'smooth' });
        });
    }

    // -- EVENT DELEGATION FOR DYNAMIC ELEMENTS --
    function wireEventDelegation() {
        document.addEventListener('click', function(e) {
            // View car button
            var viewBtn = e.target.closest('[data-view-id]');
            if (viewBtn) {
                e.preventDefault();
                openCarModal(viewBtn.getAttribute('data-view-id'));
                return;
            }

            // Compare button on card
            var compareBtn = e.target.closest('[data-compare-id]');
            if (compareBtn && !compareBtn.id.includes('modal')) {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(compareBtn.getAttribute('data-compare-id'));
                return;
            }

            // Click on car card image area to open
            var card = e.target.closest('.car-card');
            if (card && !e.target.closest('.car-card-compare-btn') && !e.target.closest('.car-card-btn')) {
                var carId = card.getAttribute('data-car-id');
                if (carId) openCarModal(carId);
                return;
            }
        });
    }

    // -- LOADER + INIT --
    function initLoader() {
        var loader = document.getElementById('loader');
        var site = document.getElementById('site');
        if (!loader || !site) return;

        // Use the global failsafe if it exists (defined in <head> inline script).
        // This ensures there's a single source of truth and no double-hiding.
        var hideLoader = window.__hideLoader || function() {
            loader.classList.add('hidden');
            site.classList.add('visible');
        };

        // Strategy 1: Hide after a fixed 2.4s once DOM is parsed.
        // This is the primary trigger: we do NOT depend on the
        // window 'load' event, which can hang indefinitely if a
        // slow CDN (Google Fonts) or a broken image URL blocks it.
        setTimeout(hideLoader, 2400);

        // Strategy 2: As soon as DOMContentLoaded fires, hide even
        // faster if the loader animation has had enough time to play
        // (minimum 1.8s for the brand reveal to feel intentional).
        if (document.readyState !== 'loading') {
            setTimeout(hideLoader, 1800);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(hideLoader, 1800);
            });
        }
    }

    function initNavScroll() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }, { passive: true });
    }

    function initHamburger() {
        var hamburger = document.getElementById('hamburger');
        var mobileMenu = document.getElementById('mobileMenu');
        if (!hamburger || !mobileMenu) return;

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        window.closeMobile = function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        };
    }

    function initRevealObserver() {
        var revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function(el) { observer.observe(el); });
    }

    function initCounterObserver() {
        var counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;
        var animated = new Set();

        function parse(str) {
            str = String(str);
            if (str === '24/7') return { display: '24/7', numeric: 24, suffix: '/7', duration: 1500 };
            var match = str.match(/^([\d,]+)(\+)?$/);
            if (match) {
                return {
                    display: str,
                    numeric: parseInt(str.replace(/,/g, ''), 10),
                    suffix: match[2] || '',
                    duration: 1800
                };
            }
            return null;
        }

        function animate(el) {
            var p = parse(el.getAttribute('data-count'));
            if (!p) { el.textContent = el.getAttribute('data-count'); return; }
            var start = 0, end = p.numeric, t0 = null;
            function step(t) {
                if (!t0) t0 = t;
                var prog = Math.min((t - t0) / p.duration, 1);
                var eased = 1 - Math.pow(1 - prog, 3);
                var cur = Math.floor(start + (end - start) * eased);
                if (p.suffix === '/7') el.textContent = cur + '/7';
                else el.textContent = cur.toLocaleString() + p.suffix;
                if (prog < 1) requestAnimationFrame(step);
                else el.textContent = p.display;
            }
            requestAnimationFrame(step);
        }

        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !animated.has(entry.target)) {
                    animated.add(entry.target);
                    animate(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(function(el) { obs.observe(el); });
    }

    function initWhatsAppFloat() {
        var wa = document.getElementById('wa-float');
        if (!wa) return;
        var msg = 'Hello Ng\'ang\'a Cars! I\'d like to know more about your available cars.';
        wa.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg);
    }

    function initCompareTray() {
        var clearBtn = document.getElementById('compare-clear');
        var ctaBtn = document.getElementById('compare-cta');
        var closeBtn = document.getElementById('compare-tray-close');
        var slot1 = document.getElementById('compare-slot-1');
        var slot2 = document.getElementById('compare-slot-2');
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                compareList = [];
                updateCompareUI();
            });
        }
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                compareList = [];
                updateCompareUI();
            });
        }
        // Tap a filled slot to remove that car from the comparison
        [slot1, slot2].forEach(function(slot) {
            if (!slot) return;
            slot.addEventListener('click', function() {
                var carId = slot.getAttribute('data-car-id');
                if (carId) toggleCompare(carId);
            });
        });
        if (ctaBtn) {
            ctaBtn.addEventListener('click', openCompareModal);
        }
    }

    function initActiveNavOnScroll() {
        var sections = ['hero', 'latest', 'showroom', 'about', 'contact'];
        var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

        function updateActive() {
            var current = 'hero';
            for (var i = 0; i < sections.length; i++) {
                var el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 120) {
                    current = sections[i];
                }
            }
            navLinks.forEach(function(link) {
                var href = link.getAttribute('href');
                link.classList.toggle('active', href === '#' + current);
            });
        }

        window.addEventListener('scroll', updateActive, { passive: true });
        updateActive();
    }

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (document.getElementById('car-modal').classList.contains('open')) closeCarModal();
                if (document.getElementById('compare-modal').classList.contains('open')) closeCompareModal();
            }
        });
    }

    // -- THEME TOGGLE (dark / light) --
    // Preference is applied pre-paint by an inline script in <head>, so
    // there is never a flash of the wrong theme. Here we only wire the
    // button, persist the choice, and keep <meta theme-color> in sync
    // so the browser UI (address bar tint) follows the active theme.
    function initThemeToggle() {
        var btn = document.getElementById('theme-toggle');
        var meta = document.getElementById('meta-theme-color');
        var root = document.documentElement;

        function syncMeta() {
            if (meta) meta.setAttribute('content', root.getAttribute('data-theme') === 'light' ? '#F6F4EE' : '#08090C');
        }
        syncMeta();

        if (!btn) return;
        btn.addEventListener('click', function() {
            var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('nganga-theme', next); } catch (e) {}
            syncMeta();
            btn.setAttribute('aria-label', next === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        });
    }

    // --- BRAND MARQUEE: seamless infinite loop ---
    // Builds the logo track from the makes in cars-data.js, then clones it
    // once. Animating the doubled track from 0 to -50% gives a PERFECT loop:
    // when the animation wraps, the second copy is exactly where the first
    // started, so the eye never sees a gap or a jump.
    // Logo files are read from Brands/<Make>.png. If a file is missing we
    // gracefully swap in an elegant text wordmark instead (no broken images).
    function initBrandMarquee() {
        var track = document.getElementById('brand-track');
        if (!track) return;

        var makes = unique(CARS.map(function(c) { return c.make; }));
        if (!makes.length) return;

        function logoCell(make) {
            return '' +
                '<div class="brand-logo-cell">' +
                    '<span class="brand-wordmark">' + make + '</span>' +
                    '<img src="Brands/' + make + '.png" alt="' + make + ' logo" class="fade-img" loading="lazy" decoding="async" ' +
                        'onerror="this.closest(&quot;.brand-logo-cell&quot;).classList.add(&quot;no-logo&quot;); this.remove();">' +
                '</div>';
        }

        // One full sequence of logos
        var sequence = makes.map(logoCell).join('');

        // Doubled sequence = seamless loop. Each sequence is its own flex
        // child with identical trailing padding, so translateX(-50%) wraps
        // at EXACTLY the start of the clone: no gap, no jump, forever.
        track.innerHTML =
            '<div class="brand-sequence">' + sequence + '</div>' +
            '<div class="brand-sequence" aria-hidden="true">' + sequence + '</div>';
        decorateImages(track);
    }

    // -- BOOT --
    // Boot loader immediately. main.js is at end of <body> so #loader
    // already exists in the DOM. This starts the 2.4s timer ASAP,
    // independent of DOMContentLoaded, so the loader ALWAYS hides.
    initLoader();

    document.addEventListener('DOMContentLoaded', function() {
        // Render dynamic content
        renderLatestRail();
        renderFiltersBar();
        renderGalleryGrid();
        populateTestDriveCarSelect();
        populateFooterBrands();
        populateHeroPrice();
        initBrandMarquee();

        // Wire interactions
        wireLatestScrollButtons();
        wireTestDriveForm();
        wireEventDelegation();
        initWhatsAppFloat();
        initCompareTray();
        initKeyboardShortcuts();
        initThemeToggle();

        // Boot UI patterns (loader already booted above)
        initNavScroll();
        initHamburger();
        initRevealObserver();
        initCounterObserver();
        initActiveNavOnScroll();

        // Initialize compare UI state
        updateCompareUI();

        console.log('%c🚗 Ng\'ang\'a Cars! loaded', 'color:#C9A84C;font-weight:700;font-size:14px');
        console.log('%cPowered by MortApps Studios', 'color:#6B7080;font-style:italic');
    });

})();
