import React from 'react';
import classNames from 'classnames';
import { Nav, NavItem, NavLink } from 'reactstrap';

interface HeaderTabObject {
  headerName: string;
  tab: string;
  className?: string;
  icon?: React.ReactElement;
}
interface TabHeaderProps {
  headerTab: Array<HeaderTabObject>;
  toggle: (tab: string) => void;
  activeTab?: string;
  className?: string;
}

function TabHeader(props: TabHeaderProps) {
  const { headerTab, toggle, activeTab, className } = props;

  return activeTab ? (
    <Nav className={classNames(className)}>
      {headerTab.length &&
        headerTab.map((data: HeaderTabObject, index: number) => (
          <NavItem key={index}>
            <NavLink
              className={classNames({ active: activeTab === data.tab })}
              onClick={() => {
                toggle(data.tab);
              }}>
              <div className="d-flex">{data.headerName}</div>
            </NavLink>
          </NavItem>
        ))}
    </Nav>
  ) : (
    <></>
  );
}

export default TabHeader;
