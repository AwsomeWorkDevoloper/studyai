const proceed = async (event) => {
    // Prevent Default
    event.preventDefault();

    // Get user info
    let username = document.querySelector(`input[name='username']`).value;
    let email = document.querySelector(`input[name='email']`).value;
    let pwd = document.querySelector(`input[name='pwd']`).value;

    const userData = {
        username,
        email,
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

    console.log(userData);

    // Send to api
    const result = await axios.post('/api/create-account', userData);

    if (result.err) {
        return Swal.fire(
            {
                title: "Error creating account.",
                text: "Server could not make account.",
                icon: 'error'
            }
        );
    } 

    Swal.fire({
        title: "Welcome to StudyAI",
        text: "Please wait...",
        didOpen: () => {
            Swal.showLoading()
        },
        showConfirmButton: false
    });

    await (async () => {
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
    })();

    const data = (await axios.post('/checkout/create-checkout-session')).data;

    location.href = `${data.url}`
};