"use client";

import { useUpdateFaqMutation } from "@/redux/api/faqApi";
import { Modal, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
import toast from "react-hot-toast";

const EditFaqModal = ({ open, setOpen, selectedRow, onSubmit, audience }) => {
  const [form] = Form.useForm();

  // Set form values when modal opens / selectedRow changes
  useEffect(() => {
    if (open && selectedRow) {
      form.setFieldsValue({
        audience: selectedRow.audience,
        question: selectedRow.title,
        answer: selectedRow.ans,
        audience: audience,
      });
    } else {
      form.resetFields();
    }
  }, [open, selectedRow, form, audience]);

  // api call to update faq can be placed here
  const [updateFaq, { isLoading }] = useUpdateFaqMutation();

  const handleFinish = async (values) => {
    try {
      const res = await updateFaq({
        id: selectedRow?.id || selectedRow?.id,
        values: values,
      }).unwrap();
      if (res?.success) {
        toast.success("FAQ Updated Successfully");
        setOpen(false);
      }
      form.resetFields();
      if (onSubmit) onSubmit(payload);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update FAQ");
    }
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={600}
      title={<h1 className="text-center text-xl font-semibold">Edit FAQ</h1>}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className="p-4"
      >
        {/* Type / Category Field */}
        <Form.Item
          label="FAQ For"
          name="audience"
          rules={[
            { required: true, message: "Please select user or business" },
          ]}
        >
          <Select
            placeholder="Select audience"
            options={[
              { value: "user", label: "User" },
              { value: "localBusiness", label: "Local Business" },
            ]}
          />
        </Form.Item>

        {/* Question */}
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: "Question is required" }]}
        >
          <Input placeholder="Enter the question" />
        </Form.Item>

        {/* Answer */}
        <Form.Item
          label="Answer"
          name="answer"
          rules={[{ required: true, message: "Answer is required" }]}
        >
          <Input.TextArea
            rows={5}
            placeholder="Enter the detailed answer..."
            showCount
            maxLength={1000}
          />
        </Form.Item>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditFaqModal;
