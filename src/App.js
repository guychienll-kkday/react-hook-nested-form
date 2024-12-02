import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const IDENTITY_OPTIONS = [
  {
    uuid: crypto.randomUUID(),
    title: "成人",
  },
  {
    uuid: crypto.randomUUID(),
    title: "兒童",
  },
  {
    uuid: crypto.randomUUID(),
    title: "嬰兒",
  },
  {
    uuid: crypto.randomUUID(),
    title: "老人",
  },
];

const mockPackage = {
  items: [
    {
      id: crypto.randomUUID(),
      name: "成人",
      type: "PRESET",
      config: {
        ageFrom: 18,
        ageTo: 25,
      },
    },
  ],
};

function PackageItem({ pkg }) {
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const {
    control,
    reset,
    watch,
    setValue,
    formState: { isDirty },
  } = useForm({
    items: [],
  });

  const items = watch("items") || [];

  const appendItem = (item) => {
    const nextItems = [...items, item];
    setValue("items", nextItems, { shouldDirty: true });
  };

  useEffect(() => {
    reset({
      items: pkg.items,
    });
  }, [pkg.items, reset]);

  const handleChangeIdentity = (value) => {
    setSelectedIdentity(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          身份設定
          {isDirty && (
            <span className="text-blue-500 text-sm ml-4">(已修改)</span>
          )}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              已選擇的身份
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-xl text-gray-800">
                      {item.name}
                    </div>
                  </div>
                  <div className="text-gray-600">
                    年齡範圍: {item.config.ageFrom} - {item.config.ageTo} 歲
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-gray-400 text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  尚未選擇任何身份
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">新增身份</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <select
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  name="person"
                  id="person"
                  onChange={(e) => handleChangeIdentity(e.target.value)}
                  value={selectedIdentity}
                >
                  <option disabled value="">
                    請選擇身份類型
                  </option>
                  {IDENTITY_OPTIONS.map((option) => (
                    <option key={option.uuid} value={option.uuid}>
                      {option.title}
                    </option>
                  ))}
                </select>
                <button
                  className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (!selectedIdentity) return;
                    appendItem({
                      id: selectedIdentity,
                      name: IDENTITY_OPTIONS.find(
                        (option) => option.uuid === selectedIdentity
                      ).title,
                      type: "PRESET",
                      config: {
                        ageFrom: 0,
                        ageTo: 0,
                      },
                    });
                    handleChangeIdentity("");
                  }}
                  disabled={!selectedIdentity}
                >
                  新增
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-100"
                  >
                    <div className="font-medium text-lg text-gray-800 mb-4">
                      {item.name}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          最小年齡
                        </label>
                        <Controller
                          control={control}
                          name={`items.${index}.config.ageFrom`}
                          render={({ field }) => (
                            <input
                              min={0}
                              max={200}
                              type="number"
                              className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                              {...field}
                            />
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          最大年齡
                        </label>
                        <Controller
                          control={control}
                          name={`items.${index}.config.ageTo`}
                          render={({ field }) => (
                            <input
                              min={0}
                              max={200}
                              type="number"
                              className="w-full rounded-lg border border-gray-200 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <PackageItem pkg={mockPackage} />;
}

export default App;
