export interface CommonProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export interface CommponChildrenProps {
  children: React.ReactNode
}

export interface ImageProps {
  src: string
  width: number
  height: number
  alt?: string
}