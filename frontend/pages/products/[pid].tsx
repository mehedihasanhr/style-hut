import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout/Layout'
import ProductDescription from '../../sections/ProductDescription'
import ProductDetails from '../../sections/ProductDetails'
import ProductReviews from '../../sections/ProductReviews'
import RelatedProducts from '../../sections/RelatedProducts'

const ProductDetail = (props: any) => {
  return (
    <Layout>
      <ProductDetails />
      <ProductDescription />
      <ProductReviews />
    </Layout>
  )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const pid = context.params?.pid
  return {
    props: {
      pid,
    },
  }
}
