$(document).ready(function () {
    $('#login-button').on('click', function(){
        console.log('ENTRO');
        const user = $('#user').val();
        const pass = $('#password').val();

        console.log(user);
        console.log(pass);
        if(user == "admin" && pass == "admin")
            window.location = '/admin.html';
        else
            if(user == "user" && pass == "user")
                window.location = '/user.html';
            else
                $('#error').html('<div class="alert alert-danger" role="alert"> Contraseña incorrecta</div>');
    });
});