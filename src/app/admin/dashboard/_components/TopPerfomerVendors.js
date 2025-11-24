import React from "react";
import { Star } from "lucide-react";
import { Image } from "antd";

const TopPerformingVendors = () => {
  // Mock data - in real app, this would come from props or API
  const vendors = [
    {
      id: 1,
      name: "Pro Photographers",
      category: "Photography",
      rating: 4.8,
      jobs: 128,
      avatar: "",
    },
    {
      id: 2,
      name: "Pro Photographers",
      category: "Photography",
      rating: 4.8,
      jobs: 128,
      avatar: "",
    },
    {
      id: 3,
      name: "Pro Photographers",
      category: "Photography",
      rating: 4.8,
      jobs: 128,
      avatar: "",
    },
    {
      id: 4,
      name: "Pro Photographers",
      category: "Photography",
      rating: 4.8,
      jobs: 128,
      avatar: "",
    },
    {
      id: 5,
      name: "Pro Photographers",
      category: "Photography",
      rating: 4.8,
      jobs: 128,
      avatar: "",
    },
  ];

  return (
    <div className="mx-auto w-1/3 rounded-lg bg-white p-6 shadow-lg">
      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Performing Vendors
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {vendors.map((vendor, index) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                {/* Avatar with fallback */}
                <div className="relative">
                  {vendor.avatar ? (
                    <Image
                      src={vendor.avatar}
                      alt={vendor.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-orange-100"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-400 text-lg font-semibold text-white ring-2 ring-orange-100">
                      {vendor.name.charAt(0)}
                    </div>
                  )}
                  {/* Optional: Add rank badge for top 3 */}
                  {index < 3 && (
                    <div
                      className={`absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : "bg-orange-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-500">{vendor.category}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="mb-1 flex items-center justify-end space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">
                    {vendor.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{vendor.jobs} Jobs</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPerformingVendors;
