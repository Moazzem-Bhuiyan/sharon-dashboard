"use client";

import { Button, Image, Modal } from "antd";

export default function KycVerificationModal({ open, setOpen }) {
  const data = {
    personalInfo: {
      fullName: "Rajesh Kumar",
      dateOfBirth: "15/01/1990",
      gender: "Male",
    },
    addressInfo: {
      permanentAddress: "123 Main Street, Old Delhi, Delhi 110006",
      currentAddress: "456 Park Avenue, New Delhi, Delhi 110016",
      city: "New Delhi",
      postalCode: "110016",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
    },
    identityInfo: {
      idType: "Aadhaar",
      idNumber: "1234 5678 9012",
      frontImageUrl: "/aadhaar-card-front.png",
      backImageUrl: "/aadhaar-card-back.png",
    },
    bankInfo: {
      bankName: "State Bank of India",
      accountNumber: "3010123456789",
      ifscNumber: "SBIN0001234",
    },
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
      width={800}
    >
      <div className="mt-6 space-y-6">
        {/* Personal Information */}
        <section className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold text-foreground">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Full Name
              </label>
              <p className="mt-1 text-foreground">
                {data.personalInfo.fullName}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Date of Birth
              </label>
              <p className="mt-1 text-foreground">
                {data.personalInfo.dateOfBirth}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Gender
              </label>
              <p className="mt-1 text-foreground">{data.personalInfo.gender}</p>
            </div>
          </div>
        </section>

        {/* Address Information */}
        <section className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold text-foreground">
            Address Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-muted-foreground text-sm font-medium">
                Permanent Address
              </label>
              <p className="mt-1 text-foreground">
                {data.addressInfo.permanentAddress}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="text-muted-foreground text-sm font-medium">
                Current Address
              </label>
              <p className="mt-1 text-foreground">
                {data.addressInfo.currentAddress}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                City
              </label>
              <p className="mt-1 text-foreground">{data.addressInfo.city}</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Postal Code
              </label>
              <p className="mt-1 text-foreground">
                {data.addressInfo.postalCode}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Email
              </label>
              <p className="mt-1 text-foreground">{data.addressInfo.email}</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Phone
              </label>
              <p className="mt-1 text-foreground">{data.addressInfo.phone}</p>
            </div>
          </div>
        </section>

        {/* Identity Verification */}
        <section className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold text-foreground">
            Identity Verification
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                ID Type
              </label>
              <p className="mt-1 text-foreground">{data.identityInfo.idType}</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                ID Number
              </label>
              <p className="mt-1 text-foreground">
                {data.identityInfo.idNumber}
              </p>
            </div>
            {data.identityInfo.frontImageUrl && (
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Front Side
                </label>
                <Image
                  src={data.identityInfo.frontImageUrl || "/placeholder.svg"}
                  alt="ID Front"
                  className="border-border mt-2 h-32 w-full rounded-lg border object-cover"
                />
              </div>
            )}
            {data.identityInfo.backImageUrl && (
              <div>
                <label className="text-muted-foreground text-sm font-medium">
                  Back Side
                </label>
                <Image
                  src={data.identityInfo.backImageUrl || "/placeholder.svg"}
                  alt="ID Back"
                  className="border-border mt-2 h-32 w-full rounded-lg border object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Bank Information */}
        <section className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold text-foreground">
            Bank Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Bank Name
              </label>
              <p className="mt-1 text-foreground">{data.bankInfo.bankName}</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Account Number
              </label>
              <p className="mt-1 text-foreground">
                {data.bankInfo.accountNumber}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                IFSC Number
              </label>
              <p className="mt-1 text-foreground">{data.bankInfo.ifscNumber}</p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3 border-t pt-6">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex-1"
          >
            Close
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
}
