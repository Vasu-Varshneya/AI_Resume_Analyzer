import next from 'next'
import Hero from './components/Home1/Hero'
import Middle from './components/Home1/Middle'
import Navbar from './components/Home1/Navbar'
const Home = () => {
    return (
        <div className='h-screen  bg-black'>
            <div>
                <Navbar/>
            </div>
            <div>
            <Hero/>
            </div>
            <hr className='h-2 bg-amber-700'/>
            <div className='bg-black'>
                <Middle />
            </div>
        </div>
    )
}
export default Home
