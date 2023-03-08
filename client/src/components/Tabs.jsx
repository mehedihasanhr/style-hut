import React from 'react';

// tab component
export const Tab = ({
  children,
  isActive,
  onTabClick,
  ...props
}) => {
  return (
    <button
      aria-labelledby="tabButton"
      tabIndex={-1}
      onClick={onTabClick}
      className={`text-sm md:text-base text-gray-800 bg-white py-2 px-4 border-b border-b-gray-200 -mb-[1px] border-t-2 border-transparent rounded-t-md inline-flex items-center ${
        isActive
          ? 'border-t-gray-300 border-b border-b-white border-x-[1px] border-x-gray-200'
          : ''
      }`}
      {...props}
    >
      <span className="mr-2">{children}</span>
    </button>
  );
};

// tab panel component
export const TabPanel = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// tabs component
const Tabs = ({ children, className }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const childs = React.Children.toArray(children);

  return (
    <div className={`py-3 ${className}`}>
      {/* tab control */}
      <div className="flex items-center border-b border-gray-200">
        {childs.map((child, index) => (
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
  );
};

Tabs.Panel = TabPanel;

export default Tabs;
