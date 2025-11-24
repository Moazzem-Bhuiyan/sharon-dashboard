import Image from "next/image";
import adminImg from "@/assets/images/user-avatar-lg.png";
import { ImagePlus } from "lucide-react";

import { Tabs } from "antd";
import { ConfigProvider } from "antd";
import ChangePassForm from "./ChangePassForm";
import EditProfileForm from "./EditProfileForm";

const { TabPane } = Tabs;

export default function ProfileContainer() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1b71a7",
        },
      }}
    >
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={adminImg}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="aspect-square h-auto w-[160px] rounded-full border-2 border-[#FC7757] p-1"
            />

            {/* Edit button */}
            <button className="flex-center absolute bottom-2 right-2 aspect-square rounded-full bg-[#FC7757] p-2 text-white/95">
              <ImagePlus size={20} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">Sharon</h3>
            <p className="mt-1 text-lg font-medium text-[#FC7757]">
              Administrator
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered>
            <TabPane tab="Edit Profile" key="editProfile">
              <EditProfileForm />
            </TabPane>

            <TabPane tab="Change Password" key="changePassword">
              <ChangePassForm />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </ConfigProvider>
  );
}
