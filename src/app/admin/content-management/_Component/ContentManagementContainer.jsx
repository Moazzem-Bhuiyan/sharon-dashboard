import { Tabs } from "antd";
import React from "react";
import CategoryContainer from "../../category/_components/CategoryContainer";
import ServicePendingTable from "./ServicePendingTable";
import BannerPage from "../../addbanner/_Component/BannerPage";

const ContentManagementContainer = () => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="All Category List" key="article">
          <CategoryContainer />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Vendor uploaded service" key="banner">
          <ServicePendingTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Banner" key="Banner">
          <BannerPage />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ContentManagementContainer;
