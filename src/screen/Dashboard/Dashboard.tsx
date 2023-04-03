import Header from '@/components/layout/Header';
import React from 'react';

export default function Dashboard() {
  return (
    <main className="app-main-layout">
      <Header />
      <div className="position-relative flex-grow-1">
        <div className="app-absolute-layout scrollable">
          <div className="container">
            <h2 className="title py-3">Manage Users</h2>
            <div className="row">
              <div className="col-lg-3">
                <div className="card card-primary">
                  <div className="textbox">
                    <h6>Teams</h6>
                    <p>203</p>
                  </div>
                  <div className="icon"></div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card card-secondary">
                  <div className="textbox">
                    <h6>Employees</h6>
                    <p>203</p>
                  </div>
                  <div className="icon"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
