function toggleDropdown() {
    document.getElementById("rulesDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const sections = Array.from(document.querySelectorAll("section[id], h2[id]"));
    const navLinks = document.querySelectorAll("#toc a");
    const indicator = document.querySelector(".toc-indicator");
    
    let isClickScrolling = false; 

    if (sections.length === 0) return; 

    function moveIndicator(activeLink) {
        if (activeLink && indicator) {
            indicator.style.top = `${activeLink.offsetTop}px`;
            indicator.style.height = `${activeLink.offsetHeight}px`;
            indicator.style.opacity = '1';
        } else if (indicator) {
            indicator.style.opacity = '0';
        }
    }

    function onScroll() {
        if (isClickScrolling) return;

        const scrollPosition = window.scrollY + (window.innerHeight * 0.3);
        let currentActiveId = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                currentActiveId = section.getAttribute("id");
            }
        });

        if (window.scrollY < 100 && sections.length > 0) {
            currentActiveId = sections[0].getAttribute("id");
        }

        const isAtBottom = (window.innerHeight + Math.round(window.scrollY)) >= document.documentElement.scrollHeight - 10;
        if (isAtBottom && sections.length > 0) {
            currentActiveId = sections[sections.length - 1].getAttribute("id");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (currentActiveId && link.getAttribute("href") === `#${currentActiveId}`) {
                link.classList.add("active");
                moveIndicator(link);
            }
        });
    }

    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 100);

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            isClickScrolling = true;
            
            navLinks.forEach(nav => nav.classList.remove("active"));
            
            this.classList.add("active");
            
            moveIndicator(this);

            const targetId = this.getAttribute("href").substring(1); 
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.remove("flash-highlight");
                void targetSection.offsetWidth; 
                targetSection.classList.add("flash-highlight");
            }

            setTimeout(() => {
                isClickScrolling = false;
            }, 800);
        });
    });
    
    window.addEventListener('resize', () => {
        if (!isClickScrolling) onScroll();
    });
});