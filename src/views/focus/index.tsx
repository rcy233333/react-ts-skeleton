import { FC, ReactNode, useState } from 'react'
import { memo } from 'react'

import { shallowEqual, useSelector } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const Focus: FC<IProps> = () => {
  const state = useSelector(
    (state: any) => ({
      count: state.counter.count
    }),
    shallowEqual
  )
  console.log(state)

  return (
    <>
      <div>Focus</div>
    </>
  )
}
export default memo(Focus)
