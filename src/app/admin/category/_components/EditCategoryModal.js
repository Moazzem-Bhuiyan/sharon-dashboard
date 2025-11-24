import React from "react";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button, Modal } from "antd";

export default function EditCategoryModal({ open, setOpen }) {
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
      <FormWrapper>
        <UInput
          type="text"
          name="name"
          label="Category Name"
          required={true}
          // size="large"
          placeholder={"Enter category name"}
        />

        <Button type="primary" size="large" className="w-full">
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}
