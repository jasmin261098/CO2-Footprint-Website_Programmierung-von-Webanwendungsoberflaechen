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

