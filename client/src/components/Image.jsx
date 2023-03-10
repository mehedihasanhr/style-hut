// create Image component
// with srcset and sizes attributes

const ImageComponent = ({
  src,
  alt,
  sizes,
  className = 'w-full h-full object-cover',
}) => {
  const wSize = sizes.split(',').map((size) => {
    const w = size.match(/\d+/g);
    return w;
  });

  const srcSet = wSize.map((size) => {
    return size[1]
      ? `${src}?w=${size[1]}&q=80 ${size[0]}w`
      : `${src}?w=${size[0]}&q=80`;
  });

  return (
    <>
      <img
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
      />
    </>
  );
};

export default ImageComponent;
