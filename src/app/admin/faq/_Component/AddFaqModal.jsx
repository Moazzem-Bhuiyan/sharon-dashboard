import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { Button, Modal } from "antd";
import React from "react";

const AddFaqModal = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      onCancel={() => {
        setOpen(false);
      }}
      centered
      width={800}
      footer={null}
    >
      <FormWrapper>
        <h1 className="text-xl font-medium">Add Faq</h1>
        <UInput type="text" name="title" label="Title" placeholder="Title" />
        <UInput
          type="text"
          name="description"
          label="Description"
          placeholder="Description"
        />
        <USelect
          name="category"
          label="Category"
          placeholder="Category"
          options={[
            {
              label: "User",
              value: "category-1",
            },
            {
              label: "Planer",
              value: "category-2",
            },
            {
              label: "Vendor",
              value: "category-2",
            },
          ]}
        />
        <Button type="primary" className="w-full">
          <span>Save</span>
        </Button>
      </FormWrapper>
    </Modal>
  );
};

export default AddFaqModal;
