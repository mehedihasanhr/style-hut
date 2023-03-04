import Carousel from '../components/Carousel'
import Layout from '../layout/Layout'

const Home = () => {
  return (
    <Layout>
      {/* hero section */}
      <section>
        <div>
          <Carousel></Carousel>
        </div>
      </section>
    </Layout>
  )
}

export default Home
