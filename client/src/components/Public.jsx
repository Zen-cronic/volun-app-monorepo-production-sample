import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Volunteers!</span></h1>
            </header>
            <main className="public__main">
                <p>For all students across ...</p>
                
                <br />
            </main>
            <footer>
                
                <Link to="/login">Volunteer Login</Link>

                {/* volun sign up */}
                {/* <Link to="/login">Volunteer Login</Link> */}

            </footer>
        </section>

    )
    return content
}
export default Public