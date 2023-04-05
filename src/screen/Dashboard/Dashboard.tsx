import React, { useState } from 'react';
import { useEmployeeList } from '../Employee/employeeQueries';
import { FaUsers, FaUsersCog } from 'react-icons/fa';
import { useTeamList } from '../Team/teamQueries';
import { TabContent, TabHeader, TabPane } from '@/components/navigation/Tab';
import TeamList from '../Team/TeamList';
import EmployeeList from '../Employee/EmployeeList';

const headerTab = [
  { headerName: 'Teams', tab: 'teams', component: TeamList },
  { headerName: 'Employees', tab: 'employees', component: EmployeeList }
];

export default function Dashboard() {
  const { data: employList } = useEmployeeList();
  const { data: teamList } = useTeamList();

  const [activeTab, setActiveTab] = useState(headerTab[0].tab);
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="app-main-layout">
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Manage Users</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="card card-primary">
                  <div className="textbox">
                    <h6>Teams</h6>
                    <p>{teamList?.length ?? 0}</p>
                  </div>
                  <div className="icon">
                    <FaUsersCog />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card card-secondary">
                  <div className="textbox">
                    <h6>Employees</h6>
                    <p>{employList?.length ?? 0}</p>
                  </div>
                  <div className="icon">
                    <FaUsers />
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-container">
              <TabHeader
                className="tab-01"
                headerTab={headerTab}
                toggle={toggleTab}
                activeTab={activeTab}
              />
              <TabContent activeTab={activeTab} className="app-height position-relative">
                {headerTab.map((tabItem, index) => {
                  const { component: Component } = tabItem;

                  return tabItem.tab === activeTab ? (
                    <TabPane key={index} tabId={tabItem.tab}>
                      <Component />
                    </TabPane>
                  ) : undefined;
                })}
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
