export const carousel = {
  height: 300,
  width: '50%',
  display: 'inline-block',
  textAlign: 'center',
};

export const carouselItem = {
  height: carousel.height,
  lineHeight: `${carousel.height}px`,
}

export const shipImg = {
  maxHeight: carousel.height,
  display: 'inline-block'
}

export const uploadContainer = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  lineHeight: '100%',
  color: 'rgb(166, 166, 166)'
}


export default {
  carousel,
  carouselItem,
  shipImg,
  uploadContainer,
}
