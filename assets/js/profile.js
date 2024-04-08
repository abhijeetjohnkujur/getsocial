document.addEventListener('DOMContentLoaded',() => {
    const signout = document.getElementById('signout')
    signout.addEventListener('click',() => {
        window.location = '/users/signout'
    })
})