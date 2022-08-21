
$(document).ready(function () {
    $('#register-tab').addClass('active-tab');
    $('.spa-register').css('display', 'block');

    $('#login-tab').click(function () {
        if ($(this).hasClass('active-tab')) {
            $('#login-email').focus();
        } else {
            $('#register-tab').removeClass('active-tab');
            $('#login-tab').addClass('active-tab');
            $('.spa-register').css('display', 'none');
            $('.spa-login').css('display', 'block');

            let emailInput = $("#login-email");
            let pswdInput = $("#login-password");
            autoFillUserData(emailInput, pswdInput);
        }
        
    });

    $('#register-tab').click(function () {
        if ($(this).hasClass('active-tab')) {
            $('#reg-firstname').focus();
        } else {
            $('#login-tab').removeClass('active-tab');
            $('#register-tab').addClass('active-tab');
            $('.spa-login').css('display', 'none');
            $('.spa-register').css('display', 'block');
        }
        
    });

    $('form').find('input[type="email"]').on('keyup', function () {
        let email = $(this).val();
        if ($(this).parent().hasClass('has-success')) {
            $(this).parent().removeClass('has-success');
            $(this).parent().children('span').removeClass('glyphicon glyphicon-ok');
        }
        if ($(this).parent().hasClass('has-error')) {
            $(this).parent().removeClass('has-error');
            $(this).parent().children('span').removeClass('glyphicon glyphicon-remove');
        }
        
        let valid = validateEmail(email);
        if (valid == true) {
            $(this).parent().addClass('has-success');
            $(this).parent().children('span').addClass('glyphicon glyphicon-ok');
        } else {
            $(this).parent().addClass('has-error');
            $(this).parent().children('span').addClass('glyphicon glyphicon-remove');
        }
    })

});

// toggle password visibility for registration form
$('#reg-password + .glyphicon').on('click', function() {
    $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
    //$('#password').togglePassword(); // activate the hideShowPassword plugin
    if ($(this).hasClass('glyphicon-eye-open')) {
        $('#reg-password').attr('type', 'text');
    } else {
        $('#reg-password').attr('type', 'password');
    }
});

// toggle password visibility for login form
$('#login-password + .glyphicon').on('click', function() {
    $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
    //$('#password').togglePassword(); // activate the hideShowPassword plugin
    if ($(this).hasClass('glyphicon-eye-open')) {
        $('#login-password').attr('type', 'text');
    } else {
        $('#login-password').attr('type', 'password');
    }
});

// process registration form
$('#register-form').submit(function (e) {
    event.preventDefault(e);
    var error = false;
    var errorMsg = Array();
    var firstname = $('#reg-firstname').val();
    var lastname = $('#reg-lastname').val();
    var email = $('#reg-email').val();
    var phone = $('#reg-phone').val();
    var gender = $('#reg-gender').val();
    
    var password = $('#reg-password').val();
    var password2 = $('#reg-password2').val();

    let result = validateRegInputs(gender, password, password2);
    error = result.error;
    errorMsg = result.errorMsg;
    
    if (error == false && errorMsg.length == 0) {
        let data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            gender: gender,
            password: password
        }
        let url = '/';
        console.log([data]);
        //submitForm(url, data);
    } else {
        console.log({
            error: error,
            error_message: errorMsg
        });
    }
});

// process login form
$('#login-form').submit(function (e) {
    event.preventDefault(e);
    var error = false;
    var errorMsg = Array();
    var email = $('#login-email').val();
    if (validateEmail(email) != true) {
        error = true;
        errorMsg.push('Invalid email address!');
    }
    var password = $('#login-password').val();
    if (error == false && errorMsg.length == 0) {
        let data = {
            email: email,
            password: password
        }
        let url = '/';
        console.log([data]);
        //submitForm(url, data);
    } else {
        console.log({
            error: error,
            error_message: errorMsg
        });
    }
    if ($('#remember-me').is(':checked')) {
        rememberUser(email, password);
    }
});

// check for correct gender and confirm password
function validateRegInputs(gender, password, password2) {
    var error = false;
    var errorMsg = [];

    if (gender != 'male' && gender != 'female') {
        $('#reg-gender').parent().addClass('has-error');
        $('#register-form .result').html('<li>please select gender</li>');
        $('#register-form .result li').css('font-size', '15px');
        error = true;
        errorMsg.push('please select gender');
    } else {
        if ($('#reg-gender').parent().hasClass('has-error')) {
            $('#reg-gender').parent().removeClass('has-error');
        }
        $('#reg-gender').parent().addClass('has-success');
        $('#register-form .result').html('');
    }

    if (checkPswdSync(password, password2) == false) {
        $('#reg-password2').focus(function () {
            $(this).parent().addClass('has-error');
        });
        error = true
        errorMsg.push('passwords do not match');
    }

    var result = {error: error, errorMsg: errorMsg}
    return result;
}

// validate email with regex
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// check if bothe passwords and the same
function checkPswdSync(pswd1, pswd2) {
    if (pswd1 != pswd2) {
        return false;
    } else {
        return true;
    }
}

function verifyUser(email, password) {
    
}

// submit form to server
function submitForm(url, data){
    $.ajax({
        url: url,
        type: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: new URLSearchParams(data).toString(),
        success: function (status, response) {
            
        },
        error: function () {
            //do something
        }
    })
}

function autoFillUserData(emailInput, pswdInput) {
    if (localStorage.getItem("email") !== "undefined" && localStorage.getItem("password") !== "undefined") {
        var email = localStorage.getItem("email");
        var password = localStorage.getItem("password");

        emailInput.val(email);
        pswdInput.val(password);
    }

}

function rememberUser(email, password) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    } else {
        alert("Sorry, your browser does not support web storage!");
    }
}