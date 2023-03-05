import Product from './Product'
import Section from './Section'

const Products = ({ products }) => {
  return (
    <Section>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12 gap-3 lg:gap-4 xl:gap-6">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="col-span-2">
            <Product />
          </div>
        ))}
      </div>
    </Section>
  )
}

export default Products
