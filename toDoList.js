function getAndUpdate() {
  console.log("updating");

  let tit = document.getElementById("title").value;
  let desc = document.getElementById("description").value;

  let itemJsonArray;

  if (localStorage.getItem("itemJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
  }

  update();
}

function update() {
  if (localStorage.getItem('itemJson') == null) {
    itemJsonArray = [];
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
    // Populate the table

    let tableBody = document.getElementById("tableBody");
    let str = "";

    itemJsonArray.forEach((element, index) => {
      str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary" onClick = "deleted(${index})">Delete</button></td>
              </tr>
            `;
    });
    tableBody.innerHTML = str;
  }

  let add = document.getElementById("add");
  add.addEventListener("click", getAndUpdate);
  update();

  function deleted(itemIndex) {
    console.log("delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    update();
  }
  function clearStorage() {
    if (confirm("Do you really want to clear?")) {
      console.log("clearing the storage");
      localStorage.clear();
      update();
    }
  }

