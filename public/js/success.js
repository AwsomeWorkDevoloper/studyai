const saveUserInfo = async (req, res) => {
    Swal.fire({
        title: "Thank you for joining StudyAI",
        text: "Please wait...",
        didOpen: () => {
            Swal.showLoading()
        },
        showConfirmButton: false
    });

    const response = await axios.post('/api/paid');

    let data = await response.data;

    console.log(data);

    while(!data) {
        console.log(".... waiting")
    }

    Swal.close();


    Swal.fire({
        title: 'Thanks for joining!',
        text: `We wish you the best experience on StudyAI`,
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
        location.href = '/dashboard';
      })
}