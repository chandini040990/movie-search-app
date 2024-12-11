Movies Search App
This is a full-featured movie search application using React that integrates with the OMDB API. The application  allows users to search for movies, view detailed information, and manage a list of favorites.

Techstacks needs to be used : 
ReactJs
React Router
HTML/CSS and Tailwind CSS for styling
JavaScript for functionality

How it works:
Main/Search Page:
Uses the OMDB API to fetch movies data.
Contains a search bar for users to enter movie titles or keywords.
Displays search results in a grid format, showing movie posters, titles, and brief descriptions.
Pagination for handling large sets of search results.
A dropdown filter used which filters the movies based on their type.
Displays error message if searched movie is not found or if search keyword is not found.

Movie Details Page:
On clikcing the movie poster, a detailed view for the movie, including a larger poster, title, release year, genre, plot summary, ratings, and cast is displayed.
Add to Favourite button adds the movie to favourite.
The favourite page lists the list of favourite movies which a button to remove the movie. 
Displays error message if data is loading and if no favourite movies are found in favourite page.

Navigation:
From Movie details page, the back button takes user back to search page.
From Favourite page, the back button takes user to movie details page.
The user can go to search page from movie details page.






