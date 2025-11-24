"use client";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import AddbannerModal from "@/components/SharedModals/AddBannerModal";
import { Button, Image } from "antd";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const BannerPage = () => {
  const data = Array.from({ length: 3 }).map((_, inx) => ({
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=60",
  }));
  const [showCreatebannerModal, setShowCreatebannerModal] = useState(false);
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
          {data.map((category) => (
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
