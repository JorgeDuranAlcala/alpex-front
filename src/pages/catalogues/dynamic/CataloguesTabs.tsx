import { useEffect, useState } from 'react';
import UserThemeOptions from 'src/layouts/UserThemeOptions';


interface TabsProps {
  changeTab?: number;
  onTabChange?: (step: number) => void;
}





// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NewAccountStepper = ({ changeTab = 1, onTabChange }: TabsProps) => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [activeTab, setActiveTab] = useState(1)
  const [selectedTab, setSelectedTab] = useState(1)


  const handleTabClick = (step: number) => {
    setSelectedTab(step)
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabChange =() => {

    setActiveTab(selectedTab);

    if (onTabChange)
      onTabChange(selectedTab);
  }

  useEffect(() => {
    setActiveTab(changeTab)
  }, [changeTab]);

  return (
    <>
      <div className='new-account-stepper' style={{ fontFamily: inter }} >
        <div className='steps'>
          <div
            className={activeTab == 1 ? "step active" : "step"}
            onClick={() => handleTabClick(1)}
          >
            <div className="step-number">1</div>
            <div className="step-name">Information</div>
          </div>
          <div
            className={activeTab == 2 ? "step active" : "step"}
            onClick={() => handleTabClick(2)}
          >
            <div className="step-number">2</div>
            <div className="step-name">Security</div>
          </div>
          <div
            className={activeTab == 3 ? "step active" : "step"}
            onClick={() => handleTabClick(3)}
          >
            <div className="step-number">3</div>
            <div className="step-name">Payment warranty</div>
          </div>
          <div
            className={activeTab == 4 ? "step active" : "step"}
            onClick={() => handleTabClick(4)}
          >
            <div className="step-number">4</div>
            <div className="step-name">Sublimits</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewAccountStepper

