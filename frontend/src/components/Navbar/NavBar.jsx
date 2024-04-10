import React from 'react'

function NavBar() {
    const user_id = localStorage.getItem('@user')
    return (
        <nav class="navbar navbar-expand-lg  navbar-dark bg-dark" style={{ maxHeight: "10vh" }}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">user{user_id}</a>
            </div>
        </nav>
    )
}

export default NavBar