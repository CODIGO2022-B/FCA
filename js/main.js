(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);

    // Función para mostrar los comentarios almacenados en localStorage
function loadStoredComments() {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const messagesContainer = document.getElementById("messagesContainer");

    storedComments.forEach(comment => {
        const messageDiv = createMessageDiv(comment.name, comment.message, comment.avatar);
        messagesContainer.appendChild(messageDiv);
    });
}

// Función para crear el div de un mensaje
function createMessageDiv(name, message, avatar) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message-box", "border", "rounded", "p-2");

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("avatar");
    avatarDiv.style.backgroundImage = `url(${avatar})`;

    const strongTag = document.createElement("strong");
    strongTag.textContent = name + ":";

    const messageText = document.createTextNode(" " + message);

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(strongTag);
    messageDiv.appendChild(messageText);

    return messageDiv;
}

function submitForm(event) {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const messageTextarea = document.getElementById("messageTextarea");
    const avatarSelect = document.getElementById("avatarSelect");
    const customAvatarInput = document.getElementById("customAvatar");
    const messagesContainer = document.getElementById("messagesContainer");

    if (nameInput.value.trim() !== "" && messageTextarea.value.trim() !== "") {
        const name = nameInput.value.trim().slice(0, 15);
        const selectedAvatar = avatarSelect.value || "img/avatares/avatar_predeterminado.jpg";

        const customAvatarFile = customAvatarInput.files[0];
        let customAvatarPath = null;

        if (customAvatarFile) {
            customAvatarPath = URL.createObjectURL(customAvatarFile);
            localStorage.setItem("customAvatar", customAvatarPath);
        }

        const comment = {
            name: name,
            message: messageTextarea.value,
            avatar: customAvatarPath ? customAvatarPath : selectedAvatar
        };

        const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
        storedComments.push(comment);
        localStorage.setItem("comments", JSON.stringify(storedComments));

        const messageDiv = createMessageDiv(comment.name, comment.message, comment.avatar);
        messagesContainer.appendChild(messageDiv);

        nameInput.value = "";
        messageTextarea.value = "";
        customAvatarInput.value = "";
    }
}

// Cargar comentarios almacenados al cargar la página
window.onload = function() {
    loadStoredComments();

    // Limitar la longitud del nombre
    document.getElementById("nameInput").addEventListener("input", function() {
        if (this.value.length > 15) {
            this.value = this.value.slice(0, 15);
        }
    });
};
