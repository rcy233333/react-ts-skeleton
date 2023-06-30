/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, ReactNode } from 'react'
import { memo } from 'react'

interface IProps {
  name: string
  age: number
  children?: ReactNode
}
const Discover: FC = () => {
  return (
    <>
      <div>discover</div>

      <Son name={'rcy'} age={18}>
        <p>1111</p>
      </Son>
    </>
  )
}

const Son: FC<IProps> = ({ name, children }) => {
  console.log(children)

  return (
    <>
      <h1>Son {name}</h1>
    </>
  )
}

export default memo(Discover)
