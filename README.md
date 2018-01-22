# Internet-Market
Statement of work
Used technologies:
- react.js - frontend
- localStorage - used as a users database and keep bought products
- FakeApi - service that returns content
- Proptypes

Create a model of the Internet market.<br/>  
The model should work stably and cover all the base features required for an electronic order.<br/> 
User should be able to create an account and/or login if the account is already created. <br/> 
Then user should see information about all available products and be able to select any of them and indicate the amount.  
Cart must store all selected products and show user total price. User should be able to buy the selected products any time or logout. <br/> 
If user logout, the selected products in the cart must be stored until the next session.<br/> 

<h4>Landing page</h4>
Page should be stylized properly and show main logo. Page contains two buttons: LogIn and LogUp. Login button redirects user to Login page and LogUp button redirects to Register page.

<h4>Register page</h4>
This page should contain form with next fields: Name, Username, Email, Password and Confirm password. 
Each of them should use a regular expression to validate the input data on blur event.
Page also should have two buttons Register and Cancel. If user has filled in the form without errors, this data should be written in the user database in LocalStorage and user should be redirected to the Products page. Button Cancel redirect to Landing Page. Login link below is redirect to the Login page.

<h4>Login page</h4>
Page should contain form with two fields: Email and Password. There are also should be button Login.
Each of them should use a regular expression to validate the input data on blur event and Login button compares the data from user with the user database from LocalStorage. If user entered data that exists in the database user must be redirected to the Products page. Bellow two links: Log Up to Register page and Logout to Landing page.

<h4>Products page</h4>
Page contains all available products and navigation bar. Products are added to the page on scroll event. 
Each product is represented in a product section, that contains information about particular product and buttons that allow user to add or remove product from the cart.   
Navigation bar should display information about products in Cart, total price and buttons Logout, that redirects user to Landing page. 

<h4>Cart compotent</h4>
Designed as subpage(popup) above product selection page and shows products in cart( image, title, price, amount, user can change quantity and see new total price). Two buttons Buy and Cancel. 
