import Layout from '../layout/Layout'
import Section from '../components/Section'
import FilterBar from '../components/FilterBar'

const Categories = () => {
  return (
    <Layout>
      <Section>
        <div className="flex">
          {/* filter bar */}
          <FilterBar />

          {/* products */}
        </div>
      </Section>
    </Layout>
  )
}

export default Categories
