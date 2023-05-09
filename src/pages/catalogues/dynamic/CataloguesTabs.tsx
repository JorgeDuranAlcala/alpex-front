import { useEffect, useState } from 'react';
import UserThemeOptions from 'src/layouts/UserThemeOptions';


interface TabsProps {
  changeTab?: number;
  onTabChange?: (step: number) => void;
}





// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CataloguesTabs = ({ changeTab = 1, onTabChange }: TabsProps) => {

  const userThemeConfig: any = Object.assign({}, UserThemeOptions())
  const inter = userThemeConfig.typography?.fontFamilyInter
  const [activeTab, setActiveTab] = useState(1)


  const handleTabClick = (step: number) => {
    setActiveTab(step);
  };

  useEffect(() => {
    if (onTabChange)
      onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <>
      <div className='catalogue-tabs' style={{ fontFamily: inter }} >
        <div className='tabs'>
          <div
            className={activeTab == 1 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(1)}
          >
            <div className="tab-name">BROKERS</div>
          </div>
          <div
            className={activeTab == 2 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(2)}
          >
            <div className="tab-name">REINSURERS</div>
          </div>
          <div
            className={activeTab == 3 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(3)}
          >
            <div className="tab-name">CEDANTS</div>
          </div>
          <div
            className={activeTab == 4 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(4)}
          >
            <div className="tab-name">RETRO CEDANTS</div>
          </div>
          <div
            className={activeTab == 5 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(5)}
          >
            <div className="tab-name">COUNTRIES & CURRENCIES</div>
          </div>
          <div
            className={activeTab == 6 ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick(6)}
          >
            <div className="tab-name">TYPES OF LIMIT</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CataloguesTabs

