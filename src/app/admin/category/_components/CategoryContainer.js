"use client";

import { Button, Image, Pagination } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/api/categoriesApi";
import toast from "react-hot-toast";
import CustomLoader from "@/components/CustomLoader/CustomLoader";

// Dummy table data
const data = Array.from({ length: 7 }).map((_, inx) => ({
  key: inx + 1,
  name: "Business Service",
  avilableService: 22,
}));

export default function CategoryContainer() {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  // get all category
  const { data: categoryData, isLoading } = useGetCategoriesQuery({
    page: currentPage,
    limit: 10,
    searchText: searchText,
  });

  // delete category
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDeleteCategory = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Category deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };
  if (isLoading) {
    return (
      <div className="flex-center h-[calc(100vh-124px)]">
        {" "}
        <CustomLoader />
      </div>
    );
  }
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
        {categoryData?.data?.map((category) => (
          <div
            key={category.key}
            className="flex flex-col items-center rounded-xl border border-primary-blue/25 p-4 shadow"
          >
            <Image
              src={category?.logo}
              alt={category?.title}
              width={100}
              height={100}
              className="h-20 w-20 rounded-full"
            />
            <h4 className="mb-5 mt-2 text-2xl font-semibold">
              {category?.title}
            </h4>
            <p className="my-3">{category?.listingCount} available services</p>

            <div className="flex-center w-full gap-x-3">
              <CustomConfirm
                title="Delete Category"
                description="Are you sure to delete this category?"
                onConfirm={() => handleDeleteCategory(category?._id)}
                isLoading={isDeleting}
              >
                <Button className="w-full !bg-danger !text-white">
                  Delete
                </Button>
              </CustomConfirm>

              <Button
                type="primary"
                className="w-full"
                onClick={() => {
                  setShowEditCategoryModal(true);
                  setSelectedCategory(category);
                }}
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
        categoryData={selectedCategory}
      />
    </div>
  );
}
