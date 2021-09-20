export const pageTransition = {
  type:'spring',
  stiffness: 100,
}

export const pageVariants={
  in:{
    opacity:1,
    y:0,
    scale:1,
    rotate:0
  },
  out:{
    opacity:0,
    y:"-100%",
    scale:1,
    rotate:90
  }
}

export const cardVariant={
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

export const cardItemVariant={
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export const searchedUserVariant={
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

export const searchUserChildren={
  hidden:{
    opacity:0,
    y:-20,
  },
  visible:{
    y:0,
    opacity: 1,
  }
}
