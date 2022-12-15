type TabPannelProps = {
  children: React.ReactNode | React.ReactNode[]
  label: string
}

export const TabPannel = ({ children }: TabPannelProps) => {
  return <div>{children}</div>
}
