"use client";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import USelect from "@/components/Form/USelect";
import { useCreateFaqMutation } from "@/redux/api/faqApi";
import { Button, Modal } from "antd";
import React from "react";
import toast from "react-hot-toast";

const AddFaqModal = ({ open, setOpen }) => {
  // API hook to create FAQ
  const [createFaq, { isLoading }] = useCreateFaqMutation();
  const onFinish = async (values) => {
    try {
      const res = await createFaq(values).unwrap();
      if (res?.success) {
        toast.success("Faq Created Successfully");
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };
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
      <FormWrapper onSubmit={onFinish}>
        <h1 className="text-xl font-medium">Add Faq</h1>
        <UInput
          type="text"
          name="question"
          label="Question"
          placeholder="Question"
        />
        <UInput type="text" name="answer" label="Answer" placeholder="Answer" />
        <USelect
          name="audience"
          label="Audience"
          placeholder="Audience"
          options={[
            {
              label: "User",
              value: "user",
            },
            {
              label: "Planer",
              value: "planer",
            },
            {
              label: "Vendor",
              value: "vendor",
            },
          ]}
        />
        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          className="w-full"
        >
          <span>Save</span>
        </Button>
      </FormWrapper>
    </Modal>
  );
};

export default AddFaqModal;
