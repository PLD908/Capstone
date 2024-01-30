fetch("https://dummyjson.com/users")
    .then((response) => {
        if (response.ok) {
            let res = response.json();
            console.log(res);
            return res;
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then((data) => {
        console.log(data);
        displayDoctor(data);
        addRow(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

    function displayDoctor(data) {
        const tableContainer = document.querySelector(".table-container");

        const tableContents = data.users.slice(0, 5);
        const table = document.createElement('table');
    
        // Add table header
        table.innerHTML = `
            <tr class="thead">
                <th>Department Name</th>
                <th>Doctor</th>
                <th>Gender</th>
                <th>Head of Department</th>
                <th>Action</th>
                <th>Status</th>
            </tr>`;
    
        // Add table rows
        tableContents.forEach((data) => {
            const row = document.createElement('tr');
            // Set the data-id attribute with the user ID
            row.setAttribute('data-id', data.id);

            row.innerHTML = `
                <td>${data.company.department}</td>
                <td class="dip"><img src=${data.image} alt="A guy"> ${data.firstName}</td>
                <td>${data.gender}</td>
                <td>${data.company.title}</td>
                <td>
                    <img src="images/pen.png" alt="edit">
                    <img src="images/icon.png" alt="icon">
                    <img src="images/delete.png" alt="delete"  onclick="deleteRow(this)">
                </td>
                <td><p>Active</p></td>
            `;
            table.appendChild(row);
            console.log(`This is the index of data: ${data.id}`)
        });
    
        // Append the table to the container
        tableContainer.appendChild(table);
    };

    function deleteRow(button) {
        // Traverse the DOM to find the closest <tr> element
        const row = button.closest('tr');
    
        // Get the user ID from the data-id attribute
        const userId = row.getAttribute('data-id');
    
        // Make an API request to delete the user with the given ID
        fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // If the delete request is successful, remove the corresponding row from the table
                row.remove();
            } else {
                throw new Error("DELETE REQUEST ERROR");
            }
        })
        .catch((error) => console.error("DELETE ERROR:", error));
    };

    // Assume you have a button with an id="addRowButton"
    const addRowButton = document.getElementById('addRowButton');
    
    // Add an event listener to the button
    addRowButton.addEventListener('click', () => {
        // Fetch data and add a row
        fetch("https://dummyjson.com/users")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("NETWORK RESPONSE ERROR");
                }
            })
            .then((data) => {
                addRow(data);
            })
            .catch((error) => console.error("FETCH ERROR:", error));
    });
    
    function addRow(data) {
        // Check if there are users in the fetched data
        if (data.users && data.users.length > 0) {
            // Get the table container and the table itself
            const tableContainer = document.querySelector(".table-container");
            const table = tableContainer.querySelector('table');
    
            // Check the current number of rows in the table
            const currentRowCount = table.getElementsByTagName('tr').length;
    
            // Only add a new row if the current count is less than 5
            if (currentRowCount <= 5) {
                // Generate a random index to get a random user from the array
                const randomNumber = Math.floor(Math.random() * data.users.length);
                const newUser = data.users[randomNumber];
    
                // Create a new table row
                const row = document.createElement('tr');
                // Set the data-id attribute with the user ID
                row.setAttribute('data-id', newUser.id);
    
                // Populate the row with data
                row.innerHTML = `
                    <td>${newUser.company.department}</td>
                    <td class="dip"><img src=${newUser.image} alt="A guy"> ${newUser.firstName}</td>
                    <td>${newUser.gender}</td>
                    <td>${newUser.company.title}</td>
                    <td>
                        <img src="images/pen.png" alt="edit">
                        <img src="images/icon.png" alt="icon">
                        <img src="images/delete.png" alt="delete" onclick="deleteRow(this)">
                    </td>
                    <td><p>Active</p></td>
                `;
    
                // Append the new row to the table
                table.appendChild(row);
            }
        }
    };