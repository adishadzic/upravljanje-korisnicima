$(function () {
    $("#users_table").dxDataGrid({
        dataSource: new DevExpress.data.CustomStore({
            key: "id",
            load: function () {
                return $.getJSON("http://localhost:3000/users");
            },
            insert: function (values) {
                return $.ajax({
                    url: "http://localhost:3000/users",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(values)
                });
            },
            update: function (key, values) {
                return $.ajax({
                    url: "http://localhost:3000/users/" + key,
                    method: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(values)
                });
            },
            remove: function (key) {
                return $.ajax({
                    url: "http://localhost:3000/users/" + key,
                    method: "DELETE"
                });
            }
        }),
        columns: [
            { dataField: "id", caption: "ID", allowEditing: false },
            { dataField: "firstName", caption: "Ime", validationRules: [{ type: "required" }] },
            { dataField: "lastName", caption: "Prezime", validationRules: [{ type: "required" }] },
            { dataField: "email", caption: "Email", validationRules: [{ type: "required" }, { type: "email" }] },
            { dataField: "phone", caption: "Broj telefona", validationRules: [{ type: "required" }] }
        ],
        editing: {
            mode: "row",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true
        },
        filterRow: { visible: true},
        searchPanel: { visible: true },
        paging: { pageSize: 10 },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10]
        }
    });
});