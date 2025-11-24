"use client";

import { Button, Pagination } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import categoryImg from "@/assets/images/categoryImg.png";
import Image from "next/image";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

// Dummy table data
const data = Array.from({ length: 7 }).map((_, inx) => ({
  key: inx + 1,
  name: "Business Service",
  avilableService: 22,
}));

export default function CategoryContainer() {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircle size={20} />}
        iconPosition="start"
        className="!w-full !py-6"
        onClick={() => setShowCreateCategoryModal(true)}
      >
        Create Category
      </Button>

      {/* Categories */}
      <section className="my-10 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data.map((category) => (
          <div
            key={category.key}
            className="flex flex-col items-center rounded-xl border border-primary-blue/25 p-4 shadow"
          >
            <h4 className="mb-5 mt-2 text-2xl font-semibold">
              {category.name}
            </h4>
            <p className="my-3">
              {category.avilableService} available services
            </p>

            <div className="flex-center w-full gap-x-3">
              <CustomConfirm
                title="Delete Category"
                description="Are you sure to delete this category?"
              >
                <Button className="w-full !bg-danger !text-white">
                  Delete
                </Button>
              </CustomConfirm>

              <Button
                type="primary"
                className="w-full"
                onClick={() => setShowEditCategoryModal(true)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </section>

      <div className="my-10 ml-auto max-w-max">
        <Pagination style={{ fontSize: "1.2rem" }} />
      </div>

      {/* Create Category Modal */}
      <CreateCategoryModal
        open={showCreateCategoryModal}
        setOpen={setShowCreateCategoryModal}
      />

      {/* Edit category modal */}
      <EditCategoryModal
        open={showEditCategoryModal}
        setOpen={setShowEditCategoryModal}
      />
    </div>
  );
}
