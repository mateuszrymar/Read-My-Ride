## Live: https://readmyride.netlify.app/

## What does this app do?
  Nowadays many cyclists use tracking apps (for example: [Strava](https://www.strava.com/)) to record their rides. 
  These apps generate .gpx files that store their location, elevation and time every few seconds.
  I wanted users to be able to upload their rides, check a few stats, preview their ride on a map and see a couple diagrams based on their ride.
  Users who don't have their own .gpx's at hand and just want to check the app can use provided example files.

## How I worked on this project

My goal for this project was to become familiar with best practices and tools used in professional work environments.
  - First, I sketched simple wireframes and basic flow of the app on paper.
  
  ![Sketches copy](https://user-images.githubusercontent.com/118372766/211264676-5548721b-0eb1-4b13-95ac-8a566499bfb7.jpg)
  
  - Then, I designed the UI in Figma. You can view it under this [link](https://www.figma.com/file/KNVCGwv9muTUI5t2clIst0/Read-my-ride?node-id=2%3A162&t=odYa6SzUYamz875y-1).
  
  ![UI design copy](https://user-images.githubusercontent.com/118372766/211265307-6cd64d34-ca3f-43e9-bd0f-85521f15743c.jpg)
  
  - While coding I tried to keep code as clean as possible. I separated JavaScript codebase into several files with their own namespaces.
  - I tried to follow these style guides:

    HTML: [Google Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
    
    CSS: [AirBnB CSS Style Guide](https://github.com/airbnb/css)
    
    JavaScript: [AirBnB JavaScipt Style Guide](https://github.com/airbnb/javascript)
    
## Interesting features
  - My Figma design was recreated accurately in HTML & CSS, keeping text styles, color palettes and their naming.
  - I practiced a few Object-Oriented Programming concepts.
  - I built a simple state management system using vanilla JS.
  - Leaflet API was used for displaying maps and Chartist.JS library to display graphs.
  - I tried to keep my code as readable as I could.
    
## Challenges I was faced with
  - Asynchronicity. Performance issues helped me learn how JavaScript's Call Stack and Event Loop work.
  - Regular Expressions. I used them to parse XML files (in .gpx format).
  - Testing.
  - Dealing with an overcomplicated CSS file made me look for more structured approach to CSS. I picked up on BEM naming convention.
  - BEM naming convention forced me to change my workflow in CSS. I didn't use IDs as selectors and as a result deepened my understanding of specificity in CSS.
  - Using libraries for the first time I had an opportunity to look how senior developers write their code and documentation. 
  I found that clear documentation, code readability and ease of use are critical for other people to use one's code. 


## Why I built the project this way
  This was my second personal project in vanilla JavaScript (I'm not counting tutorial projects). 
  Previous one used a functional approach, so this time I wanted to practice OOP that I just learned.
  This is my last vanilla JS project before jumping into React, so I wanted to practice State Management in vanilla JS before I hand this task over to a framework.
  Having struggled with spaghetti code in the last project, I digged a little into how mature developers structure their code. I found this [video](https://youtu.be/exiC1Qsv5mc?t=871),
  and used the same code structure.

## If I had more time, I'd do this
  - Add a power calculator functionality to evaluate rider's average power output, calories consumption etc.
  - Tweak a few things in styling, eg. custom styling to default Leaflet map buttons.
  - Add simple animations to all buttons and when loading statistics.
  - Add a loading screen when switching from home screen to info screen.
  - Add a functionality to zoom in on the linear graphs.
  - Add a functionality to preview elevation, speed & time at any given point of the track on the map and on the linear graphs.
