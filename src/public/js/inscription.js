let btnSend = $('#btn-send');

btnSend.on('click', requestInscription);

function requestInscription(){
    if(validateForm()){
        let email = $('#txt-email').val(),
            rut = $('#txt-rut').val(),
            name = $('#txt-name').val(),
            lastNames = $('#txt-last-names').val(),
            phone = $('#txt-phone').val(),
            address = $('#txt-address').val(),
            license = $('#fl-license');
    
        let formData = new FormData();
        formData.append('email', email);
        formData.append('rut', rut);
        formData.append('name', name);
        formData.append('lastNames', lastNames);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('license', license.prop('files')[0]);
        $.ajax({
            method: 'POST',
            url: '/user/request-inscription',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
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
                title: 'Datos enviados',
                text: data.message,
            });
            emptyForm();
        })
        .fail(function(error, status){
            Swal.fire({
                icon: 'error',
                title: 'Error en servidor',
                text: 'Hubo un error interno. Intente nuevamente',
            });
        })
    }
}

function validateForm(){
    let email = $('#txt-email').val(),
        rut = $('#txt-rut').val(),
        name = $('#txt-name').val(),
        lastNames = $('#txt-last-names').val(),
        phone = $('#txt-phone').val(),
        address = $('#txt-address').val(),
        license = $('#fl-license')
        isValid = true;

    if(
        email === '' ||
        rut === '' ||
        name === '' ||
        lastNames === '' ||
        phone === '' ||
        address === '' ||
        license.length === 0
    ){
        Swal.fire({
            icon: 'error',
            title: 'Error en formulario',
            text: 'Todos los campos son obligatorios',
        });
        isValid = false
    }

    return isValid
}

function emptyForm(){
    $('#txt-email').val('');
    $('#txt-rut').val('');
    $('#txt-name').val('');
    $('#txt-last-names').val('');
    $('#txt-phone').val('');
    $('#txt-address').val('');
    $('#fl-license').val('');
}