$(function() {

    // Menu Responsive
    $(".menu-responsive").toggle();
  
    $(".menu-bars").on("click", function() {
        $(".menu-responsive").toggle("slow");
    });
  
  
    // Scroll click on menu
    $(".scroll").on("click", function() {
        $(this).each(function() {
            const sectionTop = $(this.hash).offset().top;
            $("html, body").animate({
                scrollTop: sectionTop
            }, 1500);
        });
    });
  
  
    // Progress Bar Animate
    window.sr = ScrollReveal();
    sr.reveal(".progress-bar", {
       origin: "left",
       duration: 2000,
       distance: "100%"
    });
});
  
  
    // Contact Text Animate
//     const sentences = ["web designer ?", "web developer ?"];
//     let i = 0;
  
//     setInterval(function() {
//         $(".text-animate").fadeOut(function() {
//             $(this).text(sentences[i = (i + 1) % sentences.length]).fadeIn();
//         });
//     }, 2500);
  
//   });

  

//   document.getElementById('contact-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         message: document.getElementById('message').value
//     };

//     try {
//         const response = await fetch('/contact', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         });

//         const result = await response.json();
//         document.getElementById('response').innerText = result.message;
//     } catch (error) {
//         document.getElementById('response').innerText = 'An error occurred. Please try again later.';
//     }
// });

//backend

