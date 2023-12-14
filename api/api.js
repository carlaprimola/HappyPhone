document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON file
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            // Manipulate the HTML DOM with the JSON data
            const outputDiv = document.getElementById('output');

            // Loop through the array and display information for each item
            data.forEach(item => {
                // Create an img element and set its src attribute
                const imageElement = document.createElement('img');
                imageElement.src = item.image;

                // Append the image element to the output div
                outputDiv.appendChild(imageElement);

                // Display other information
                outputDiv.innerHTML += `<p>Model: ${item.model}</p><p>Brand: ${item.brand}</p><p>MRP: ${item.mrp}</p><p>Price: ${item.price}</p><p>Ram: ${item.ram}</p><p>Storage: ${item.storage}</p><p>Camera: ${item.camera}</p>`;
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});