// Full celebrity list
const celebrities = [
    'Brad Pitt', 'Emma Watson', 'Leonardo DiCaprio', 'Angelina Jolie', 'Johnny Depp',
    'Scarlett Johansson', 'Taylor Swift', 'Elon Musk', 'Donald Trump', 'Joe Biden',
    'Kanye West', 'Kim Kardashian', 'Oprah Winfrey', 'Ellen DeGeneres', 'Tom Cruise',
    'Jennifer Aniston', 'Meryl Streep', 'Will Smith', 'Dwayne Johnson', 'Beyonce',
    'Ariana Grande', 'Selena Gomez', 'Justin Bieber', 'Lady Gaga', 'Rihanna', 'Katy Perry',
    'Britney Spears', 'Adele', 'Shakira', 'Madonna', 'Celine Dion', 'Mariah Carey',
    'Whitney Houston', 'Alicia Keys', 'Christina Aguilera', 'Pink', 'Demi Lovato',
    'Nicki Minaj', 'Cardi B', 'Megan Thee Stallion', 'Lizzo', 'Doja Cat', 'Billie Eilish',
    'Megan Fox', 'Zac Efron', 'Matthew McConaughey', 'Chris Hemsworth', 'Robert Downey Jr.',
    'Chris Pratt', 'Scarlett Johansson', 'Gal Gadot', 'Charlize Theron', 'Natalie Portman',
    'Emma Stone', 'Ryan Gosling', 'Jake Gyllenhaal', 'Benedict Cumberbatch', 'Harrison Ford',
    'Maggie Smith', 'Nicole Kidman', 'Kate Winslet', 'Julia Roberts', 'Anne Hathaway',
    'Johnny Depp', 'Keanu Reeves', 'Hugh Jackman', 'Daniel Craig', 'Jared Leto', 'Sarah Jessica Parker',
    'Jessica Alba', 'Hugh Grant', 'Channing Tatum', 'Matthew McConaughey', 'Eva Mendes',
    'Victoria Beckham', 'David Beckham', 'Miley Cyrus', 'Chris Brown', 'Usher', 'Lenny Kravitz',
    'Justin Timberlake', 'Pharrell Williams', 'Snoop Dogg', 'Eminem', 'Lil Nas X', 'Drake', 'Travis Scott'
];

// List of pasta types and their corresponding image folders
const pastaData = {
    Fusilli: ['pastas/fusilli/fusilli1.jpg', 'pastas/fusilli/fusilli2.jpg', 'pastas/fusilli/fusilli3.jpg'],
    Penne: ['pastas/penne/penne1.jpg', 'pastas/penne/penne2.jpg', 'pastas/penne/penne3.jpg'],
    Spaghetti: ['pastas/spaghetti/spaghetti1.jpg', 'pastas/spaghetti/spaghetti2.jpg', 'pastas/spaghetti/spaghetti3.jpg'],
    Farfalle: ['pastas/farfalle/farfalle1.jpg', 'pastas/farfalle/farfalle2.jpg', 'pastas/farfalle/farfalle3.jpg'],
    Rigatoni: ['pastas/rigatoni/rigatoni1.jpg', 'pastas/rigatoni/rigatoni2.jpg', 'pastas/rigatoni/rigatoni3.jpg'],
    Linguine: ['pastas/linguine/linguine1.jpg', 'pastas/linguine/linguine2.jpg', 'pastas/linguine/linguine3.jpg'],
    Macaroni: ['pastas/macaroni/macaroni1.jpg', 'pastas/macaroni/macaroni2.jpg', 'pastas/macaroni/macaroni3.jpg']
};

const celebrityToPastaMap = {};
celebrities.forEach(celebrity => {
    const pastaTypes = Object.keys(pastaData);
    const randomPasta = pastaTypes[Math.floor(Math.random() * pastaTypes.length)];
    const lastName = celebrity.split(' ').slice(-1)[0];
    celebrityToPastaMap[celebrity] = `${randomPasta} ${lastName}`;
});

function getRandomPastaImage(pastaType) {
    const images = pastaData[pastaType];
    const randomIndex = Math.floor(Math.random() * images.length);
    return chrome.runtime.getURL(images[randomIndex]);
}

// Function to replace text nodes (celebrity names with pasta names)
function replaceCelebrityWithPasta(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        Object.keys(celebrityToPastaMap).forEach(celebrity => {
            const regex = new RegExp(`\\b${celebrity}\\b`, 'g');
            text = text.replace(regex, celebrityToPastaMap[celebrity]);
        });
        node.nodeValue = text;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT'].includes(node.tagName)) {
            return;
        }
        node.childNodes.forEach(child => replaceCelebrityWithPasta(child));
    }
}

// Function to replace celebrity-related images with pasta images
function replaceImagesWithPasta() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const altText = img.alt || '';
        const titleText = img.title || '';
        const src = img.src || '';

        // Check if any celebrity name is referenced in alt, title, or src
        Object.keys(celebrityToPastaMap).forEach(celebrity => {
            const regex = new RegExp(celebrity, 'i');
            if (regex.test(altText) || regex.test(titleText) || regex.test(src)) {
                const pastaType = celebrityToPastaMap[celebrity].split(' ')[0];
                const pastaImage = getRandomPastaImage(pastaType);
                img.src = pastaImage;
                img.alt = pastaType;
                img.title = `Replaced with ${pastaType}`;
            }
        });
    });
}

// Run the script once when the page has fully loaded
window.addEventListener('load', () => {
    replaceCelebrityWithPasta(document.body);
    replaceImagesWithPasta();
});