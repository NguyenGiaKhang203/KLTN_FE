import React from "react";
import { Fragment } from "react";
import { Checkbox } from "../CheckboxComponent/CheckboxComponent";
import { Label } from "../LabelComponent/LabelComponent";
import { Separator } from "../SeparatorComponent/SeparatorComponent";

const filterOptions = {
  category: [
    { id: "all", label: "Tất cả trình độ" },
    { id: "is", label: "Sơ cấp" },
    { id: "kids", label: "Trung cấp" },
    { id: "accessories", label: "Cao cấp" },
  ],
};
function Filter({ filters, handleFilter }) {
  return (
    <div className="bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Bộ lọc</h2>
      </div>
      <div className="p-4 space p-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label className="flex font-medium items-center gap-2 ">
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Filter;
