import React, { Fragment } from "react";
import { Checkbox } from "../CheckboxComponent/CheckboxComponent";
import { Label } from "../LabelComponent/LabelComponent";
import { Input } from "antd";
import {
  WrapperFilterContainer,
  WrapperCourseFilter,
  WrapperFilterHeader,
  WrapperFilterTitle,
  WrapperSearchInput,
  WrapperFilterSection,
  WrapperFilterSectionTitle,
  WrapperFilterOption,
  IconWrapper,
} from "./style";
import { SearchOutlined } from "@ant-design/icons";
const filterOptions = {
  category: [
    { id: "all", label: "Tất cả trình độ" },
    { id: "is", label: "Sơ cấp" },
    { id: "kids", label: "Trung cấp" },
    { id: "accessories", label: "Cao cấp" },
    { id: "compete", label: "Thi đấu" },
  ],
};

function Filter({ filters, handleFilter }) {
  return (
    <WrapperFilterContainer>
      <WrapperCourseFilter>
        <WrapperFilterHeader>
          <WrapperFilterTitle>Tìm kiếm</WrapperFilterTitle>
          <WrapperSearchInput>
            <IconWrapper>
              <SearchOutlined />
            </IconWrapper>
            <Input
              placeholder="Tìm kiếm khóa học..."
              onChange={(e) => handleFilter("search", e.target.value)}
            />
          </WrapperSearchInput>
        </WrapperFilterHeader>

        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <WrapperFilterSection>
              <WrapperFilterSectionTitle>Bộ lọc</WrapperFilterSectionTitle>
              {filterOptions[keyItem].map((option) => (
                <WrapperFilterOption as={Label} key={option.id}>
                  <Checkbox
                    checked={
                      filters &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                  />
                  {option.label}
                </WrapperFilterOption>
              ))}
            </WrapperFilterSection>
          </Fragment>
        ))}
      </WrapperCourseFilter>
    </WrapperFilterContainer>
  );
}

export default Filter;
