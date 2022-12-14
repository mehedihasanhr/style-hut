import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from 'next'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout/Layout'
import ProductDetails from '../../sections/ProductDetails'

const ProductDetail = (props: any) => {
  return (
    <Layout>
      <ProductDetails />
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
