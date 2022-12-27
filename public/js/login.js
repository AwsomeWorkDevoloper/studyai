const proceed = async (event) => {
    // Prevent Default
    event.preventDefault();

    // Get user info
    let username = document.querySelector(`input[name='username']`).value;
    let pwd = document.querySelector(`input[name='pwd']`).value;

    const userData = {
        username,
        pwd,
    };

    // Check
    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    // Check everything
    for (let i = 0; i < Object.keys(userData).length; i++) {
        if (isEmptyOrSpaces(Object.values(userData)[i])) {
            return Swal.fire(
                {
                    title: "Please fill in the form.",
                    icon: 'error'
                }
            );
        }
    }

    
    // Send to api
    const result = await (axios.post('/api/auth', userData));

    const data = result.data;
    console.log(result);

    if (data.success == false) {
        return Swal.fire(
            {
                title: "Login failed.",
                text: "Please try again.",
                icon: 'error'
            }
        );
    } 

    Swal.fire({
        title: 'Welcome Back!',
        text: `Hey there ${data.username}!`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()

          timerInterval = setInterval(() => {
            
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        location.href = '/';
      })
};