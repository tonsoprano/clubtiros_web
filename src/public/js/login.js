let btnLogin = $('#btn-login');

btnLogin.on('click', login);

function login(){
    let email = $('#email') .val();
    let password = $('#password').val();
    if(email === '' || password === ''){
        Swal.fire({
            icon: 'error',
            title: 'Error en formulario',
            text: 'Debe ingresar correo y contraseña',
        });
        return;
    }
    $.ajax({
        method: 'POST',
        url: '/user/login',
        data: {
            email: email,
            password: password
        },
        statusCode: {
            400: function(data){
                let msg = JSON.parse(data.responseText).message;
                Swal.fire({
                    icon: 'error',
                    title: 'Error en inicio de sesión',
                    text: msg,
                });
            },
            401: function(data){
                let msg = JSON.parse(data.responseText).message;
                Swal.fire({
                    icon: 'error',
                    title: 'Error en inicio de sesión',
                    text: msg,
                });
            },
        }
    })
    .done(function(data){
        console.log(data);
        window.location.replace(location.href + 'index');
    })
    .fail(function(error, status){
        Swal.fire({
            icon: 'error',
            title: 'Error en servidor',
            text: 'Hubo un error interno. Intente nuevamente',
        });
    })
}