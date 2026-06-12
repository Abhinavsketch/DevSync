import Intro from "../../components/layout/Intro/intro"
import Navbar from "../../components/layout/Navbar/navbar"
import "./landing.css"

const Landing = ()=>{
    return (
        <div className="landing">
            <nav>
                <Navbar/>
            </nav>
            <main>
                <Intro/>
            </main>
        </div>
    )
}

export default Landing