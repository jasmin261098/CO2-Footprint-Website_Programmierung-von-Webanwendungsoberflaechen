function searchFunction() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("emissionTable");
    let tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");
        let rowMatch = false;
        
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                let txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatch = true;
                    break;
                }
            }
        }
        
        tr[i].style.display = rowMatch ? "" : "none";
    }
}

function filterAll() {
    let table = document.getElementById("emissionTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td");

        let countryFilterResult = countryFilter(td);
        let industryFilterResult = industryFilter(td);

        let showRow = countryFilterResult && industryFilterResult;

        if (showRow) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function countryFilter(td) {
    let countryFilter = document.getElementById("countryFilter").value;

    if (td[0].textContent === countryFilter || countryFilter === "") {
        return true;
    } else {
        return false;
    }
}
    

function industryFilter(td) {
    let industryFilter = document.getElementById("industryFilter").value;

    if (td[3].textContent === industryFilter || industryFilter === "") {
        return true;
    } else {
        return false;
    }
}

function sort(index) {
    let table = document.getElementById("emissionTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = Array.from(table.getElementsByTagName("tr")).slice(1);

    rows.sort((rowA, rowB) => {
        let cellA = rowA.getElementsByTagName("td")[index];
        let cellB = rowB.getElementsByTagName("td")[index];
        
        let valueA = parseFloat(cellA) || cellA;
        let valueB = parseFloat(cellB) || cellB;
        
        return (valueA > valueB ? 1 : -1);
    });

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}