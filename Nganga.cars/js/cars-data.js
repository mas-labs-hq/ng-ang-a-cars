/**
 * ═══════════════════════════════════════════════════════════════
 *  NG'ANG'A CARS! · INVENTORY DATA
 *  Vanilla JS | 100% Client-Side | Zero Dependencies
 *  Built by MortApps Studios
 * ═══════════════════════════════════════════════════════════════
 *
 *  Each car carries 5 image slots, same shape as the MortApps
 *  Birika real-estate schema, extended with dealership fields.
 *
 *  Image paths point to ./images-cars/<slug>-<n>.jpg
 *  To swap with real photos: drop your .jpg/.png/.webp files into
 *  that folder, then update the filenames below. The site renders
 *  any image format the browser supports.
 */

window.NGANGA_CARS = [
    {
        id: 'nganga-001',
        title: 'Toyota Premio 2018',
        make: 'Toyota',
        bodyType: 'Sedan',
        condition: 'Foreign Used',
        year: 2018,
        mileage: 45000,
        transmission: 'Automatic',
        fuel: 'Petrol',
        engine: '1800cc',
        color: 'Pearl White',
        price: 2800000,
        location: 'Nairobi',
        description: 'Well-maintained Toyota Premio 2018 in pristine Pearl White. Imported directly from Japan with a clean auction grade of 4.5. The 1800cc engine delivers excellent fuel economy on Kenyan roads while maintaining a quiet, refined cabin. Full service history available. Insurance and logbook ready. Perfect executive saloon for professionals seeking reliability and comfort.',
        images: [
            'images-cars/toyota-premio-2018-1.jpg',
            'images-cars/toyota-premio-2018-2.jpg',
            'images-cars/toyota-premio-2018-3.jpg',
            'images-cars/toyota-premio-2018-4.jpg',
            'images-cars/toyota-premio-2018-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-08'
    },
    {
        id: 'nganga-002',
        title: 'Nissan X-Trail 2019',
        make: 'Nissan',
        bodyType: 'SUV',
        condition: 'Foreign Used',
        year: 2019,
        mileage: 52000,
        transmission: 'CVT Automatic',
        fuel: 'Petrol',
        engine: '2000cc',
        color: 'Gun Metallic',
        price: 3500000,
        location: 'Nairobi',
        description: 'Versatile 7-seater Nissan X-Trail 2019 in Gun Metallic. Ideal family SUV with 4WD capability for upcountry trips. Spacious cabin, panoramic sunroof, reverse camera, and Nissan\'s renowned reliability. Recent full service with new brake pads and tires. Clean import with all duties paid.',
        images: [
            'images-cars/nissan-xtrail-2019-1.jpg',
            'images-cars/nissan-xtrail-2019-2.jpg',
            'images-cars/nissan-xtrail-2019-3.jpg',
            'images-cars/nissan-xtrail-2019-4.jpg',
            'images-cars/nissan-xtrail-2019-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-09'
    },
    {
        id: 'nganga-003',
        title: 'Mazda CX-5 2020',
        make: 'Mazda',
        bodyType: 'SUV',
        condition: 'Locally Used',
        year: 2020,
        mileage: 38000,
        transmission: 'Automatic',
        fuel: 'Petrol',
        engine: '2500cc',
        color: 'Soul Red Crystal',
        price: 4200000,
        location: 'Nairobi',
        description: 'Stunning Mazda CX-5 2020 in signature Soul Red Crystal, the colour that made Mazda famous. Locally owned by a single careful owner. Premium interior with leather seats, Bose sound system, and Mazda Connect infotainment. The 2.5L SkyActiv engine balances power and efficiency perfectly. All service records from Mazda Kenya available.',
        images: [
            'images-cars/mazda-cx5-2020-1.jpg',
            'images-cars/mazda-cx5-2020-2.jpg',
            'images-cars/mazda-cx5-2020-3.jpg',
            'images-cars/mazda-cx5-2020-4.jpg',
            'images-cars/mazda-cx5-2020-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-10'
    },
    {
        id: 'nganga-004',
        title: 'Subaru Forester 2019',
        make: 'Subaru',
        bodyType: 'SUV',
        condition: 'Locally Used',
        year: 2019,
        mileage: 61000,
        transmission: 'Lineartronic CVT',
        fuel: 'Petrol',
        engine: '2000cc',
        color: 'Ice Silver Metallic',
        price: 3800000,
        location: 'Nairobi',
        description: 'Symmetrical AWD Subaru Forester 2019, built for Kenyan roads and beyond. Ice Silver Metallic with black cloth interior. EyeSight driver assist technology, X-MODE for off-road capability, and Subaru\'s legendary safety ratings. Recently serviced at Subaru Kenya. Ready for adventure.',
        images: [
            'images-cars/subaru-forester-2019-1.jpg',
            'images-cars/subaru-forester-2019-2.jpg',
            'images-cars/subaru-forester-2019-3.jpg',
            'images-cars/subaru-forester-2019-4.jpg',
            'images-cars/subaru-forester-2019-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-07'
    },
    {
        id: 'nganga-005',
        title: 'Toyota Hilux 2022',
        make: 'Toyota',
        bodyType: 'Pickup',
        condition: 'Brand New',
        year: 2022,
        mileage: 8000,
        transmission: '6-Speed Automatic',
        fuel: 'Diesel',
        engine: '2800cc',
        color: 'Attitude Black Mica',
        price: 6500000,
        location: 'Mombasa',
        description: 'Brand new Toyota Hilux 2022, the unbreakable workhorse. 2.8L GD-6 diesel engine delivers massive torque for towing and off-road work. Attitude Black Mica with premium interior. Includes factory warranty, full tank, and ready registration. Ideal for construction, farming, or safari operations. Zero accidents, zero previous owners.',
        images: [
            'images-cars/toyota-hilux-2022-1.jpg',
            'images-cars/toyota-hilux-2022-2.jpg',
            'images-cars/toyota-hilux-2022-3.jpg',
            'images-cars/toyota-hilux-2022-4.jpg',
            'images-cars/toyota-hilux-2022-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-11'
    },
    {
        id: 'nganga-006',
        title: 'Mercedes-Benz C-Class 2020',
        make: 'Mercedes',
        bodyType: 'Sedan',
        condition: 'Foreign Used',
        year: 2020,
        mileage: 41000,
        transmission: '9G-Tronic Automatic',
        fuel: 'Petrol',
        engine: '1500cc Turbo',
        color: 'Obsidian Black',
        price: 5500000,
        location: 'Nairobi',
        description: 'Executive Mercedes-Benz C-Class 2020 in Obsidian Black. The W205 generation with the efficient 1.5L turbocharged mild-hybrid engine. Premium interior with MBUX infotainment, ambient lighting with 64 colours, Burmester sound system, and active brake assist. Imported from Germany with clean auction sheet. Statement car for the discerning professional.',
        images: [
            'images-cars/mercedes-c-class-2020-1.jpg',
            'images-cars/mercedes-c-class-2020-2.jpg',
            'images-cars/mercedes-c-class-2020-3.jpg',
            'images-cars/mercedes-c-class-2020-4.jpg',
            'images-cars/mercedes-c-class-2020-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-06'
    },
    {
        id: 'nganga-007',
        title: 'BMW X3 2021',
        make: 'BMW',
        bodyType: 'SUV',
        condition: 'Foreign Used',
        year: 2021,
        mileage: 33000,
        transmission: '8-Speed Steptronic',
        fuel: 'Diesel',
        engine: '2000cc',
        color: 'Alpine White',
        price: 7200000,
        location: 'Nairobi',
        description: 'Premium BMW X3 2021 xDrive20d in Alpine White. The perfect blend of sportiness and practicality. 2.0L TwinPower Turbo diesel with xDrive AWD. Live Cockpit Professional, Harman Kardon surround sound, panoramic glass roof, and adaptive LED headlights. German engineering at its finest. Service history available.',
        images: [
            'images-cars/bmw-x3-2021-1.jpg',
            'images-cars/bmw-x3-2021-2.jpg',
            'images-cars/bmw-x3-2021-3.jpg',
            'images-cars/bmw-x3-2021-4.jpg',
            'images-cars/bmw-x3-2021-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-05'
    },
    {
        id: 'nganga-008',
        title: 'Toyota Vitz 2017',
        make: 'Toyota',
        bodyType: 'Hatchback',
        condition: 'Locally Used',
        year: 2017,
        mileage: 78000,
        transmission: 'Automatic',
        fuel: 'Petrol',
        engine: '1000cc',
        color: 'Coral Pink',
        price: 1200000,
        location: 'Nakuru',
        description: 'Fuel-sipping Toyota Vitz 2017, perfect for Nairobi traffic and beyond. Compact, nimble, and easy to park. 1.0L engine returns up to 18km/L. Coral Pink exterior with clean grey cloth interior. Recently serviced with new battery and tires. Ideal first car or city runabout. Low insurance costs.',
        images: [
            'images-cars/toyota-vitz-2017-1.jpg',
            'images-cars/toyota-vitz-2017-2.jpg',
            'images-cars/toyota-vitz-2017-3.jpg',
            'images-cars/toyota-vitz-2017-4.jpg',
            'images-cars/toyota-vitz-2017-5.jpg'
        ],
        phone: '254740596907',
        agent: 'James Ng\'ang\'a',
        listedAt: '2026-09-04'
    }
];

// -- BRAND CONFIG (used across the site) --
window.NGANGA_CONFIG = {
    brandName: "Ng'ang'a Cars!",
    brandShort: "Ng'ang'a",
    tagline: 'Drive Something Different',
    phone: '+254 740 596907',
    phoneRaw: '254740596907',
    whatsapp: '254740596907',
    email: 'sales@ngangacars.co.ke',
    // OPTIONAL: Formspree endpoint for the test-drive form's EMAIL option.
    // Until you paste one, "Send via Email" uses a normal mailto: link
    // (opens the visitor's mail app, works everywhere, zero setup).
    // When you're ready for silent background sending:
    //   1. Create a form at https://formspree.io :  you get an endpoint
    //      like 'https://formspree.io/f/abcdwxyz'
    //   2. Paste it below (keep the quotes).
    // The email button then POSTs to Formspree automatically and shows
    // a "Sent! Asante sana." confirmation. WhatsApp is unaffected.
    formspree: '',
    location: 'Ngong Road, Nairobi, Kenya',
    hours: 'Mon-Sat: 8:00 AM to 6:00 PM · Sun: Closed',
    founder: 'James Ng\'ang\'a',
    poweredBy: 'Powered By MortApps Studios'
};

// Helper: format KES prices
window.formatKES = function(amount) {
    return 'KES ' + Number(amount).toLocaleString('en-KE');
};
