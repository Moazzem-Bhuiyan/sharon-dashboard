import React from "react";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";
import { useUpdateCategoryMutation } from "@/redux/api/categoriesApi";
import UUpload from "@/components/Form/UUpload";
import USelect from "@/components/Form/USelect";
import toast from "react-hot-toast";

export default function EditCategoryModal({ open, setOpen, categoryData }) {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("isTreading", data.isTreading);
      if (data.image && data.image[0]?.originFileObj) {
        formData.append("image", data.image[0].originFileObj);
      }
      const res = await updateCategory({
        id: categoryData?._id,
        formData: formData,
      }).unwrap();
      if (res?.success) {
        toast.success("Category Updated Successfully");
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
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
      title="Edit Category"
    >
      <FormWrapper
        defaultValues={{
          title: categoryData?.title,
          isTreading: categoryData?.isTreading,
        }}
        onSubmit={onSubmit}
      >
        <UUpload
          name="image"
          label="Category Image"
          required={true}
          beforeUpload={false}
          defaultFileList={[
            {
              uid: "-1",

              name: "image",

              status: "done",

              url: categoryData?.logo,
            },
          ]}
        />
        <UInput
          type="text"
          name="title"
          label="Category Name"
          required={true}
          placeholder={"Enter category name"}
        />

        <USelect
          name="isTreading"
          label="Is Treading"
          required={true}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false },
          ]}
        />

        <Button
          type="primary"
          size="large"
          className="w-full"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
