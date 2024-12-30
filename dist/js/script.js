//Navbar fixed
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.scrollY > fixedNav){
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }

};


//Hamburger

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click',function() {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});


// readmore
let noOfCharac = 150;
let contents = document.querySelectorAll(".content");

contents.forEach(content => {
    // Preserve original HTML content
    let fullHTML = content.innerHTML;

    // Create a temporary element to calculate the truncated text
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = fullHTML;

    let charCount = 0;
    let displayHTML = '';
    let moreHTML = '';
    let reachedLimit = false;

    // Walk through child nodes to count characters
    Array.from(tempDiv.childNodes).forEach(node => {
        if (reachedLimit) {
            moreHTML += node.outerHTML || node.textContent;
        } else {
            let nodeText = node.textContent || '';
            if (charCount + nodeText.length > noOfCharac) {
                let remainingChars = noOfCharac - charCount;
                if (node.nodeType === 3) { // Text node
                    displayHTML += nodeText.slice(0, remainingChars);
                    moreHTML += nodeText.slice(remainingChars);
                } else { // HTML node
                    displayHTML += node.outerHTML; // Add the whole node if limit is reached within it
                }
                reachedLimit = true;
            } else {
                charCount += nodeText.length;
                displayHTML += node.outerHTML || node.textContent;
            }
        }
    });

    // Add the dots and "Read More" section
    if (reachedLimit) {
        content.innerHTML = `
            ${displayHTML}<span class="dots">...</span>
            <span class="hide more">${moreHTML}</span>
        `;
    } else {
        content.nextElementSibling.style.display = "none"; // Hide "Read More" button
    }
});

function readMore(btn) {
    let post = btn.parentElement;
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
}


