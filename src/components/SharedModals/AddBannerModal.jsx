"use client";
import { Button, Divider, Form, Modal, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react";
import { useCreateBannerMutation } from "@/redux/api/serviceApi";
import toast from "react-hot-toast";

const AddbannerModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  // create banner
  const [createBanner, { isLoading }] = useCreateBannerMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      values.bannerImage?.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const res = await createBanner(formData).unwrap();

      if (res?.success) {
        toast.success("Banner created successfully");
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{
        minWidth: "max-content",
        position: "relative",
      }}
    >
      {/* Close Icon */}
      <div
        className="absolute right-0 top-0 h-12 w-12 cursor-pointer rounded-bl-3xl"
        onClick={() => setOpen(false)}
      >
        <RiCloseLargeLine
          size={18}
          color="black"
          className="absolute left-1/3 top-1/3"
        />
      </div>

      <div className="pb-5">
        <h4 className="text-center text-2xl font-medium">Add Banner</h4>
        <Divider />
        <div className="flex-1">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{
              category: "",
            }}
            style={{
              maxWidth: 500,
              marginTop: "25px",
            }}
          >
            {/* Image Upload */}
            <Form.Item
              name="bannerImage"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                {
                  required: true,
                  message: "Please upload a banner image",
                },
              ]}
              style={{
                textAlign: "center",
                border: "2px dashed #B87CAE",
                paddingBlock: "20px",
                borderRadius: "10px",
              }}
            >
              <Upload
                name="imageBanner"
                listType="picture"
                beforeUpload={false}
                multiple
              >
                <Button icon={<UploadOutlined />}>Upload Banner Image</Button>
              </Upload>
            </Form.Item>

            {/* Submit Button */}
            <Button
              htmlType="submit"
              size="large"
              type="primary"
              block
              style={{
                color: "white",
                marginTop: "20px",
              }}
              loading={isLoading}
            >
              Upload
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddbannerModal;
