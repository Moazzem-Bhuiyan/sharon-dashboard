"use client";
import { Button, Tabs } from "antd";
import React, { useState } from "react";
import UserFaqTable from "./UserFaqTable";
import PlanerFaqTable from "./PlanerFaqTable";
import VendorFaqTable from "./VendorFaqTable";
import { PlusCircle } from "lucide-react";
import AddFaqModal from "./AddFaqModal";

const { TabPane } = Tabs;
function FaqContainer() {
  const [showCreatebannerModal, setShowCreatebannerModal] = useState(false);
  return (
    <div>
      <div className="my-10">
        <Button
          type="primary"
          size="large"
          icon={<PlusCircle size={20} />}
          iconPosition="start"
          className="!w-full !py-6"
          onClick={() => setShowCreatebannerModal(true)}
        >
          Add Faq
        </Button>
      </div>
      <Tabs>
        <TabPane tab="Vendor" key="vendor">
          <VendorFaqTable type="vendor" />
        </TabPane>
        <TabPane tab="Planer" key="planer">
          <PlanerFaqTable type="planer" />
        </TabPane>
        <TabPane tab="User" type="user">
          <UserFaqTable type="user" />
        </TabPane>
      </Tabs>

      <AddFaqModal
        open={showCreatebannerModal}
        setOpen={setShowCreatebannerModal}
      />
    </div>
  );
}

export default FaqContainer;
