let table = $('#tbl-requests')

table.bootstrapTable({
    pagination: true,
    pageSize: 10,
    pageList: [10, 20, 50, 100],
    showColumns: true,
    showRefresh: true,
    url: '/user/get-inscriptions',
    responseHandler: function responseHandler(res, jqXHR) {
        if(res.ok) return res.data;
        else return { rows:[], total:0 };
    },
    columns: [
        {
            field: 'partnerId',
            title: 'ID'
        },
        {
            field: 'fullName',
            title: 'Nombre completo'
        },
        {
            field: 'rut',
            title: 'Rut'
        },
        {
            field: 'createdAt',
            title: 'Fecha'
        },
        {
            field: 'state',
            title: 'Estado'
        },
        {
            title: 'Acción',
            align: 'center',
            valign: 'middle',
            formatter: function(value, row, index, field){
                return `
                    <div class="row">
                        <div class="col d-flex justify-content-around">
                            <a style="cursor: pointer;" data-toggle="tooltip" title="Ver archivo" onclick="seeDocument('${row.license}')"><i class="fas fa-file text-info"></i></a>
                            <a style="cursor: pointer;" data-toggle="tooltip" title="Aceptar Solicitud" onclick="changeState(${row.partnerId}, 2)"><i class="fas fa-check text-success"></i></a>
                            <a style="cursor: pointer;" data-toggle="tooltip" title="Rechazar Solicitud" onclick="changeState(${row.partnerId}, 3)"><i class="fas fa-times text-danger"></i></a>
                        </div>
                    </div>
                `;
            }
        },
    ],
})

function seeDocument(url){
    window.open(url, '_blank').focus();
}

function changeState(id, state){
    $.ajax({
        method: 'POST',
        url: '/user/update-state-inscription',
        data: {
            partnerId: id,
            state: state
        },
        statusCode: {
            400: function(data){
                let msg = JSON.parse(data.responseText).message;
                Swal.fire({
                    icon: 'error',
                    title: 'Error en envío',
                    text: msg,
                });
            },
        }
    })
    .done(function(data){
        console.log(data);
        Swal.fire({
            icon: 'success',
            title: 'Actualización enviada',
            text: data.message,
        });
        table.bootstrapTable('refresh');
    })
    .fail(function(error, status){
        Swal.fire({
            icon: 'error',
            title: 'Error en servidor',
            text: 'Hubo un error interno. Intente nuevamente',
        });
    })
}