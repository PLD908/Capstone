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
            row.innerHTML = `
                <td>${data.company.department}</td>
                <td class="dip"><img src=${data.image} alt="A guy"> ${data.firstName}</td>
                <td>${data.gender}</td>
                <td>${data.company.title}</td>
                <td>
                    <img src="images/pen.png" alt="edit">
                    <img src="images/icon.png" alt="icon">
                    <img src="images/delect.png" alt="delete">
                </td>
                <td><p>Active</p></td>
            `;
            table.appendChild(row);
        });
    
        // Append the table to the container
        tableContainer.appendChild(table);
    }