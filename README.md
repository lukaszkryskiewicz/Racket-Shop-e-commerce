# Racket Shop

Complex frontend project built in React with state maintained in
Redux. Initially developed in team of seven developers, and later continued as individual project.

## [Live Demo](https://racket-shop-e-commerce.vercel.app)

## Technologies

- React
- Redux
- React Router
- Bootstrap
- CSS/SCSS

## Overview

Frontend e-commerce shop application features: 
* General
  * Information persistence, such as basket and favourite products, even after refreshing (implemented using redux-persist)
  * Form validation using React Hook Form (some forms also utilize yup)  
  * Product search functionality by phrase and category
  * Displaying alerts or modals for actions like adding to cart, checkout or forgotten password. Utilizes a custom hook to hide modals/alerts when clicked outside
  * Displaying toasts for actions like adding to favorites, comparing products, or adding reviews
  * Comparison of up to 4 products. The sticky bar displays the selected products, and clicking a button triggers a modal with the selected products
  * Star ratings of product displayed on product boxes
  * Component tests for ensuring proper rendering and functionality
  * RWD styles. Some features, like display options on the category page, are not be available on mobile devices  
  &nbsp;
* Category Page
  * Filter products by:
    * Color
    * Price range
    * Brand
    * Rating
  * Display options for products:
    * Grid/list view
    * Number of products per page
    * Sorting by price (min and max), name or recommended  
  &nbsp;
* Product Page
  * Add a selected number of products to the cart (using an input field or '+', '-' buttons)
  * Ask a question using a modal  
  * Carousele displaying product photos
  * Product reviews (preventing users from writing multiple reviews for the same product using localStorage)  
   &nbsp;
* Cart 
  * Change the number of products in the cart (using an input field or '+', '-' buttons), with an alert shown when there are insufficient products in stock
  * Delete products from the cart
  * Apply coupon codes:
    * 'bluemonday' - free delivery
    * 'blackfriday' - 50% discount
  * Cart summary
  * Checkout alerts  
  &nbsp;
* Other 
  * User registration and login (user information stored in localStorage)
  * Blog with simple filtering by category
  * Pagination with dots
  * Chatbot with multiple paths (implemented using react-simple-chatbot)
  * Currency change - USD, PLN, EUR (fixed exchange rate)

## Screenshots 

### Header  
![Header](/public/images/screenshots/racketshop-header.png)  
  &nbsp;  
### Category Page
![Category Page](/public/images/screenshots/racketshop-categoryPage.png)  
  &nbsp;  
### ProductPage
![Product Page](/public/images/screenshots/racketshop-productPage.png)  
  &nbsp;  
### Cart
![Cart](/public/images/screenshots/racketshop-cart.png)  
  &nbsp;  
### Rackets Slider
![Rackets Slider](/public/images/screenshots/racketshop-racketsGallery.png)  
  &nbsp;  
### Chatbot  
  &nbsp;
![Chatbot](/public/images/screenshots/racketshop-chatbot.png)