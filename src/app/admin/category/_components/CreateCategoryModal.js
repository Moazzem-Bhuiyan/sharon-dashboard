"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateCategoryMutation } from "@/redux/api/categoriesApi";
import { Button, Modal, Upload } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateCategoryModal({ open, setOpen }) {
  const [uploadedImage, setUploadedImage] = useState([]);
  // create category api handaller
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("isTreading", data.isTreading);

      if (uploadedImage?.[0]?.originFileObj) {
        formData.append("image", uploadedImage[0].originFileObj);
      }
      const res = await createCategory(formData).unwrap();
      if (res?.success) {
        toast.success("Category Created Successfully");
        setUploadedImage([]);
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Create Category"
    >
      <FormWrapper onSubmit={onSubmit}>
        <div className="mb-6 rounded-lg border-2 border-dashed p-6">
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            listType="picture"
            fileList={uploadedImage}
            onChange={({ fileList }) => setUploadedImage(fileList)}
          >
            <div className="flex w-full min-w-[472px] justify-center">
              <Button icon={<UploadOutlined />} className="mx-auto">
                Upload Logo
              </Button>
            </div>
          </Upload>
        </div>
        <UInput
          type="text"
          name="title"
          label="Category Name"
          required={true}
          placeholder="Enter category name"
        />
        <USelect
          name="isTreading"
          label="Is Treading?"
          placeholder="Select category status"
          options={[
            { label: "Active", value: true },
            { label: "Inactive", value: false },
          ]}
        />

        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
