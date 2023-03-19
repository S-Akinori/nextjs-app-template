import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Error = ({children}: Props) => {
  return (
    <div className="text-red-400">{children}</div>
  )
}
export default Error