function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("emissionTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td") [0]; //TODO Suche auf alle Spalten erweitern
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function countryFilter() {
    var countryFilter, table, tr, td, i, showRow;
    countryFilter = document.getElementById("countryFilter").value;
    table = document.getElementById("emissionTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td.length > 0) {
            showRow = true;
        }

        if (countryFilter && td[0].textContent !== countryFilter) {
            showRow = false;
        }

        if (showRow) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function industryFilter() {
    var industryFilter, table, tr, td, i, showRow;
    industryFilter = document.getElementById("industryFilter").value;
    table = document.getElementById("emissionTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td.length > 0) {
            showRow = true;

            var industry = tr[i].getAttribute("data-industry");

            if (industryFilter && industry !== industryFilter) {
                showRow = false;
            }

            if (showRow) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function sortEmissions() {
    var emissionSort, table, tr, td, i, rows, switching, shouldSwitch, dir, switchCount = 0;
    emissionSort = document.getElementById("emissionSort").value;
    table = document.getElementById("emissionTable");
    tr = table.getElementsByTagName("tr");
    rows = Array.from(tr).slice(1); // Header Zeile wird igoniert 

    //Sortierrichtung setzen
    if (emissionSort === "aufsteigend") {
        dir = 1;
    } else if (emissionSort === "absteigend") {
        dir = -1;
    } else {
        return;
    }

    //Bubble Sort Algorithmus zum Sortieren
    switching = true;
    while (switching) {
        switching = false;
        for (i = 0; i < rows.length - 1; i++) {
            td = rows[i].getElementsByTagName("td")[2];
            var nextTd = rows[i + 1].getElementsByTagName("td")[2];
            var x = parseFloat(td.textContent); 
            var y = parseFloat(nextTd.textContent);

            if (dir === 1 && x > y) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            } else if (dir === -1 && x < y) { 
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                break;
            }
        }
    }
}