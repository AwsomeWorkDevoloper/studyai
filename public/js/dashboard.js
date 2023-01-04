const logout = (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you really want to logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I\'m sure'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("Logging out");
            axios.get('/api/logout');

            location.href = '/'
        }
    })
}

const submitPrompt = async (context) => {
    const filteredList = context.contextList.filter(x => x.chosen);

    Swal.fire({
        title: "Answering your question",
        text: "Please wait...",
        didOpen: () => {
            Swal.showLoading()
        },
        showConfirmButton: false
    });

    const res = await axios.post('/openai/ask', filteredList);

    let data = await res.data;

    console.log(data);

    while(!data) {
        console.log(".... waiting")
    }

    Swal.close();

    return JSON.parse(data.data).text;
}
