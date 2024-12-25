
const pastaTypes = [
    'Fusilli', 'Penne', 'Spaghetti', 'Farfalle', 'Rigatoni', 'Linguine', 'Macaroni', 
    'Tagliatelle', 'Ziti', 'Orecchiette', 'Pappardelle', 'Ravioli', 'Lasagna', 
    'Fettuccine', 'Cavatappi', 'Rotini', 'Tortellini', 'Bucatini', 'Conchiglie', 
    'Ditalini', 'Cannelloni', 'Capellini', 'Gemelli', 'Cavatelli', 'Fagottini'
  ];
  

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
  
  // Function to replace celebrity names with pasta names
  function replaceCelebrityWithPasta() {
    celebrities.forEach(celebrity => {
      let randomPasta = pastaTypes[Math.floor(Math.random() * pastaTypes.length)];
      const regex = new RegExp(celebrity, 'g');
      document.body.innerHTML = document.body.innerHTML.replace(regex, randomPasta + ' ' + celebrity.split(' ')[1]);
    });
  }
  
  // Call the function to replace on page load
  window.onload = replaceCelebrityWithPasta;
  