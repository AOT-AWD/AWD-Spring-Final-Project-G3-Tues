function randomProducts(){
    
    let request = new XMLHttpRequest();

    let url = `https://dummyjson.com/products/category/smartphones`
       
    request.open("GET", url, true);

    request.onload = function(){
    

         if (request.status >= 200 && request.status < 400){

            let data = JSON.parse(this.response);

            // returns a random number for a product and removes it from the list so it wont repeat
            
            let listOfProducts = data.products

            function randomNum(){              

                let randomNumber = Math.floor(Math.random() * data.products.length);

                let product = listOfProducts[randomNumber];

                listOfProducts.splice(randomNumber, 1);
                
                return product

            };

              
            // Card 1
            

            let randomNumber = randomNum();

            let front = randomNumber.images[1]
            let productName = randomNumber.title
            let description = randomNumber.description  
            let price = randomNumber.price
            let review = randomNumber.rating
            let stock = randomNumber.stock
            
            $('#first-image').attr("src", front)
            $('#product-name').text(productName)
            $('#product-description').text(description)
            $('#card-1').text("$"+price)
            $('#review-1').text(`★ ${review} (${stock} in stock)`)




            console.log(randomNumber.title)

          } 
             // Card 3  
            // console.log(randomNum().title)
            let randomNumber3 = randomNum();
            console.log(randomNumber3.title)
            
            // console.log(randomNumber)

            let front3 = randomNumber3.images[1]
            let productName3 = randomNumber3.title
            let description3 = randomNumber3.description  
            let price2 = randomNumber3.price  
            let review3 = randomNumber3.rating
            let stock3 = randomNumber3.stock

            $('#first-image-3').attr("src", front3)
            $('#product-name-3').text(productName3)
            $('#product-description-3').text(description3)
            $('#card-3').text("$"+price2)
            $('#review-3').text(`★ ${review3} (${stock3} in stock)`)
            

    };
    // Card 2 
    request.send();

    let request2 = new XMLHttpRequest();
    let url2 = `https://dummyjson.com/products/category/laptops`;

    request2.open("GET", url2, true);

    request2.onload = function(){

        if (request2.status >= 200 && request2.status < 400){

            let data2 = JSON.parse(this.response);
            let laptops = data2.products;

            let randomIndex = Math.floor(Math.random() * laptops.length);
            let product2 = laptops[randomIndex];
            let card2 = product2.price
            let review2 = product2.rating
            let stock2 = product2.stock
            $('#first-image-2').attr("src", product2.images[1]);
            $('#product-name-2').text(product2.title);
            $('#product-description-2').text(product2.description);
            $('#card-2').text("$"+product2.price)
            $('#review-2').text(`★ ${review2} (${stock2} in stock)`)
        }
    };

    request2.send();
}

randomProducts();


   



