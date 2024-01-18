const sendEmail = async () => {
    // throw new Error("throw error.......")

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success")
            // reject("some error...")
        }, 2000);
    })

}


export { sendEmail };

