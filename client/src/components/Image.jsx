// create Image component
// with srcset and sizes attributes

const Image = ({ src, alt, sizes }) => {
  const wSize = sizes.split(',').map((size) => {
    const w = size.match(/\d+/g)
    return w
  })

  return (
    <picture className="w-full h-full object-fill">
      <source
        srcSet={wSize
          .map((size) => {
            return size[1] ? `${src}?w=${size[1]}&q=80 ${size[0]}w` : `${src}?w=${size[0]}&q=80`
          })
          .join(', ')}
        sizes={sizes}
      />
      <img src={`${src}?w=1280&q=80`} alt={alt} className="w-full h-full object-cover" />
    </picture>
  )
}

export default Image
