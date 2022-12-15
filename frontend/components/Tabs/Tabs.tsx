import React from 'react'
import { Tab } from './Tab'
import { TabPannel } from './TabPannel'

type TabProps = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const Tabs = ({ children, className, ...props }: TabProps) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const childs = React.Children.toArray(children)

  return (
    <div className={`py-3 ${className}`}>
      {/* tab controll */}
      <div className="flex items-center border-b border-gray-200">
        {childs.map((child: any, index) => (
          <Tab
            key={index}
            isActive={index === activeTab}
            onTabClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </Tab>
        ))}
      </div>
      <div className="py-4">{childs[activeTab]}</div>
    </div>
  )
}

Tabs.Pannel = TabPannel

export default Tabs
