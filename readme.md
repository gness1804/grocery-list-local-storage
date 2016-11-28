#Grocery List with Local Storage

Superseded by [Flash Shopper](https://github.com/gness1804/grocery-list-react).

This is a grocery list app modeled on [Idea Box](https://github.com/gness1804/IdeaBox). It allows the user to add items to the "cart" and stores them in local storage so that the item data are saved upon reload. The current attributes permitted per item are name, aisle, id (automatically generated to keep track of each item), quantity, and a note.

##The app now:

* Contains a list of categories that, once selected, automatically populate an aisle number (or store section name, like "Produce") for any given item.
* Also contains a list of items from a datalist that allow the user to autocomplete when typing in some common items like apples and bagels.
* Shows how many items you have remaining on the list.
* Allows the user to sort the list by aisles (smallest to largest number).
* Allows the user to edit the note and quantity fields once the items are on the page.
* Allows the user to delete each item using its delete button. (There is currently no functionality to distinguish between deleting an item and putting it in your cart.)
