import React from 'react'
import Tabs from '../components/Tabs'
import SpecificationTable from './SpecificationTable'

const ProductDescription = () => {
  const [showAllDescription, setShowAllDescription] = React.useState(false)
  return (
    <section>
      <div className="container border-t border-dashed py-5">
        <div className="">
          <h5>Product Specification</h5>
          <Tabs className="mt-3">
            <Tabs.Pannel label="Description">
              <p
                className={`text-xs md:text-sm text-gray-500 ${
                  showAllDescription ? '' : 'line-clamp-[10]'
                }`}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                mollis quam purus, et euismod quam maximus et. Vestibulum
                iaculis neque ac ligula pretium, ac posuere ex convallis. Donec
                tincidunt lobortis dui, ut tempus nisl faucibus id. Aliquam
                volutpat lobortis vehicula. Cras in rutrum diam. Morbi efficitur
                consequat faucibus. Sed nec lobortis orci, nec mattis nunc. Sed
                viverra vestibulum neque elementum facilisis. Vestibulum
                faucibus lorem id iaculis placerat. Aenean id sodales nibh, vel
                faucibus sem. Mauris non purus id velit dapibus porta. Sed
                tincidunt odio dolor, ut venenatis nisi fringilla ac.
                Pellentesque laoreet ligula eu nibh sollicitudin maximus. Aenean
                dapibus lectus eget nulla pulvinar tincidunt. Suspendisse
                vehicula urna enim, sit amet fermentum est tincidunt eget. Etiam
                id iaculis tellus, eu condimentum massa. Vivamus ultricies arcu
                orci, a bibendum eros eleifend a. Fusce in enim sit amet odio
                pretium accumsan ut vel lorem. Nam pulvinar magna sit amet enim
                euismod volutpat. Sed pharetra orci a est venenatis, id
                venenatis neque vulputate. Sed ut metus vel metus tincidunt
                euismod eget in tellus. Vestibulum a sagittis eros, et mattis
                urna. Cras et dapibus elit. Aliquam eu tellus odio. Ut ut
                gravida orci, in congue tellus. Proin sed diam a mi maximus
                finibus. Curabitur ac dignissim ex. Nulla tempus, metus at
                vulputate placerat, mauris metus varius elit, convallis aliquet
                eros sapien ut erat. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Sed
                lacinia accumsan placerat. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Class aptent taciti sociosqu ad
                litora torquent per conubia nostra, per inceptos himenaeos. Nam
                in massa sit amet purus auctor accumsan. Phasellus scelerisque
                turpis et dui tincidunt, eu semper leo porttitor. In id ornare
                nisl, a fermentum orci. Curabitur imperdiet dui neque, eget
                pellentesque odio fringilla eu. Nullam blandit mattis fermentum.
                Nam in elit quis augue tempus volutpat non quis lectus.
                Suspendisse bibendum non mi sit amet fringilla. Curabitur nec
                magna dui. Donec tempus, odio eget hendrerit scelerisque, diam
                tellus hendrerit eros, vel tincidunt justo velit non velit.
                Integer lacinia, nunc bibendum ornare pharetra, urna lorem
                convallis tortor, eget malesuada urna lacus eget ipsum. Proin ut
                eros convallis neque pellentesque vulputate. Aliquam erat
                volutpat. Sed hendrerit gravida elit, vitae cursus nisi. Aliquam
                porttitor mauris eget neque mollis dictum.
              </p>
              <span className="block text-xs font-medium mt-2 text-gray-600">
                Read More...
              </span>
            </Tabs.Pannel>

            <Tabs.Pannel label="Specification">
              <SpecificationTable />
            </Tabs.Pannel>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default ProductDescription
