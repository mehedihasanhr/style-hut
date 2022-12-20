import React from 'react'
import { Cart } from '../components/Cart'
import Layout from '../components/Layout/Layout'

const Carts = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 border-r border-dashed">
            <div className="px-8">
              <div className="flex items-center justify-between border-b border-dashed py-2">
                <h5>My Carts</h5>
                <span>5 Items</span>
              </div>

              <div className="py-3">
                <Cart />
                <Cart />
                <Cart />
                <Cart />
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </Layout>
  )
}

export default Carts
