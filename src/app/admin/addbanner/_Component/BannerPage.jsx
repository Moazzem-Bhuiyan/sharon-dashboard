"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import CustomLoader from "@/components/CustomLoader/CustomLoader";
import AddbannerModal from "@/components/SharedModals/AddBannerModal";
import {
  useDeleteBannerMutation,
  useGetBannerQuery,
} from "@/redux/api/serviceApi";
import { Button, Image, Spin } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const BannerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreatebannerModal, setShowCreatebannerModal] = useState(false);
  // get banner from api
  const { data: banner, isLoading } = useGetBannerQuery({
    page: currentPage,
    limit: 10,
  });

  // delete banner api handeller
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const data = banner?.data.map((banner, inx) => ({
    key: inx + 1,
    id: banner?._id,
    image: banner?.url,
  }));

  const handleDelete = async (id) => {
    try {
      const res = await deleteBanner(id).unwrap();
      if (res?.success) {
        toast.success("Banner deleted successfully");
      }
    } catch (error) {
      toast.error(error?.data?.message);
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
      {/* =====================================Add banner button=================================== */}
      <div>
        <Button
          type="primary"
          size="large"
          icon={<PlusCircle size={20} />}
          iconPosition="start"
          className="!w-full !py-6"
          onClick={() => setShowCreatebannerModal(true)}
        >
          Add Banner
        </Button>
      </div>

      {/* =====================================Banner list=================================== */}

      <div>
        {/* Banner list goes here */}
        <section className="my-10 grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data?.map((category) => (
            <div
              key={category.key}
              className="flex flex-col items-center rounded-xl border border-primary-blue/25 p-4 shadow"
            >
              <Image
                src={category.image}
                alt="Banner"
                width={200}
                height={200}
              />
              <div className="flex-center mt-4 w-full gap-x-3">
                <CustomConfirm
                  title="Delete Banner"
                  description="Are you sure to delete this banner?"
                  onConfirm={() => {
                    handleDelete(category.id);
                  }}
                >
                  <Button className="w-full !bg-danger !text-white">
                    Delete
                  </Button>
                </CustomConfirm>
              </div>
            </div>
          ))}
        </section>
      </div>
      <AddbannerModal
        open={showCreatebannerModal}
        setOpen={setShowCreatebannerModal}
      />
    </div>
  );
};

export default BannerPage;
