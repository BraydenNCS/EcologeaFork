function readBlog(blog) {
    // Adds the data from (productArray(array of all the product data as objects)),formats and displays them into the index.html using the tree html element
    var insertDynamicBlogs = document.getElementById("blogs");   // Select the section in index.html to edit
    let newContent = "<table id='product_table'><tr>";    // Start of table tag and new table row
    for (let i = 0; i < productArray.length; i++) {       // i is the index of the current iteration of product data
        newContent +=                                       // Stores the string to be inserted into the innerHTML in a vairable(newContent)
            "<td class='cell'><h4 class='title'>" +       // New cell
            productArray[i].name +                            // Adds all the labels and product data using their respective elements(<p> for text) into each cell
            "<h4>" +
            "<p class=description_display>" +
            productArray[i].description +
            "</p>" +
            "<p class='price_display'>$" +
            productArray[i].price +
            "</p></td>";
        if ((i + 1) % 4 === 0 && i < productArray.length - 1) {   // If the index is a multiple of 4( for every 4 products )
            newContent += "</tr><tr>";                              // close the previous row and make a new one( makes a new row )
        }
    }
    newContent += "</tr></table>";
    insertDynamicProducts.innerHTML = newContent;   // Replaces the <p>Loading..</p> with product data
}