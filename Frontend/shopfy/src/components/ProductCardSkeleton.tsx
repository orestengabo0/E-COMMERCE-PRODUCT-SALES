import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <Card width={"350px"} overflow={'hidden'} borderRadius={10}>
        <Skeleton height={250} />
        <CardBody>
            <SkeletonText spacing={4} />
        </CardBody>
    </Card>
  )
}

export default ProductCardSkeleton