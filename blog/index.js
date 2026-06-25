$(document).ready(function() {
    // 1. Initialize Owl Carousel
    if ($(".owl-carousel9").length > 0) {
        $(".owl-carousel9").owlCarousel({
            loop:true,
            center:true,
            dots:false,
            nav:false,
            dots:true,
            responsive:{
                0:{ items:1 },
                600:{ items:1 },
                1000:{ items:1 }
            }
        });
    }

    // 2. Client-side tag/category filtering configuration
    const categories = {
        'all': () => true,
        'tmua': (title, url, text) => /\btmua\b/i.test(title + ' ' + url + ' ' + text),
        'esat': (title, url, text) => /\besat\b/i.test(title + ' ' + url + ' ' + text),
        'ibdp': (title, url, text) => /\bibdp\b/i.test(title + ' ' + url + ' ' + text),
        'tara': (title, url, text) => /\btara\b/i.test(title + ' ' + url + ' ' + text),
        'sat': (title, url, text) => {
            const combined = title + ' ' + url + ' ' + text;
            // Match 'sat' as word, but exclude words starting with 'e' or 'p' immediately preceding it like esat or psat
            return /\bsat\b/i.test(combined) && !/\b(esat|psat)\b/i.test(combined);
        },
        'ap': (title, url, text) => {
            // Match 'ap' or 'aps' but ignore within words like applying, application, etc.
            const regex = /\bap(s)?\b/i;
            // Also check URL for ap path segments
            return regex.test(title + ' ' + text) || /[-_]ap[-_]/i.test(url);
        },
        'ib-isc-igcse': (title, url, text) => {
            return /\b(ib|isc|igcse)\b/i.test(title + ' ' + url + ' ' + text);
        },
        'act': (title, url, text) => {
            return /\bact(s)?\b/i.test(title + ' ' + url + ' ' + text);
        },
        'college-profiles': (title, url, text) => {
            return /\b(college|university|profile|profiles)\b/i.test(title + ' ' + url + ' ' + text);
        },
        'amc': (title, url, text) => /\bamc\b/i.test(title + ' ' + url + ' ' + text),
    };

    // 3. Main filtering function
    function applyFilter() {
        const hash = window.location.hash || '';
        let activeTag = 'all';
        const tagMatch = hash.match(/tag=([^&]+)/);
        if (tagMatch) {
            activeTag = tagMatch[1].toLowerCase();
        }
        
        const searchQuery = ($("#search").val() || '').trim().toLowerCase();

        // Highlight selected tag link
        $("#myTab .nav-link").removeClass("bg-dark text-white");
        let matchedLink = null;
        
        $("#myTab .nav-link").each(function() {
            const href = $(this).attr("href") || '';
            let tagKey = 'all';
            if (href !== '/blog/') {
                // Extract category name from /blog/category/name/
                const parts = href.split('/');
                tagKey = parts[parts.length - 2] || 'all';
            }
            if (tagKey === activeTag) {
                matchedLink = $(this);
            }
        });
        
        if (matchedLink) {
            matchedLink.addClass("bg-dark text-white");
        } else {
            // Fallback to "All"
            $("#myTab .nav-link").first().addClass("bg-dark text-white");
            activeTag = 'all';
        }

        // Show/hide trending carousel
        if (activeTag === 'all' && searchQuery === '') {
            $("#myTabContent").show();
        } else {
            $("#myTabContent").hide();
        }

        // Filter the blog posts grid
        let visibleCount = 0;
        $(".blog-sec .col-md-4").each(function() {
            const card = $(this);
            const anchor = card.find("a").first();
            const href = anchor.attr("href") || '';
            const title = card.find("h3").text() || '';
            const description = card.find("p").text() || '';
            
            const matchTag = categories[activeTag] ? categories[activeTag](title, href, description) : true;
            
            let matchSearch = true;
            if (searchQuery !== '') {
                matchSearch = title.toLowerCase().includes(searchQuery) || 
                              description.toLowerCase().includes(searchQuery) ||
                              href.toLowerCase().includes(searchQuery);
            }
            
            if (matchTag && matchSearch) {
                card.show();
                visibleCount++;
            } else {
                card.hide();
            }
        });

        console.log(`Filtered: activeTag=${activeTag}, searchQuery="${searchQuery}". Found ${visibleCount} matching posts.`);
    }

    // 4. Bind events
    // Intercept tag clicks
    $("#myTab").on("click", "a.nav-link", function(e) {
        e.preventDefault();
        const href = $(this).attr("href") || '';
        let tagKey = 'all';
        if (href !== '/blog/') {
            const parts = href.split('/');
            tagKey = parts[parts.length - 2] || 'all';
        }
        
        // Update hash
        if (tagKey === 'all') {
            window.location.hash = '';
        } else {
            window.location.hash = `tag=${tagKey}`;
        }
        applyFilter();
    });

    // Intercept search button click
    $(document).on("click", "#search-btn", function() {
        applyFilter();
    });

    // Intercept search keypress
    $(document).on("keypress", "#search", function(e) {
        if (e.which === 13) {
            applyFilter();
        }
    });

    // Listen to hash changes (e.g. back button)
    window.addEventListener("hashchange", applyFilter);

    // Initial filter run
    applyFilter();
});