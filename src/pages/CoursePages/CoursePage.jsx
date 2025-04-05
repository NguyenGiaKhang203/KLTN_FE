import React, { useEffect, useState } from "react";
import Filter from "../../components/FilterComponent/FilterComponet";
import CourseCardComponent from "../../components/CourseCardComponent/CourseCardComponent";
import CourseDetailComponent from "../../components/CourseDetailComponent/CourseDetailComponent";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchCourses,
  fetchCourseDetails,
} from "../../redux/slices/productSlice";
import { addToCart, fetchCartItems } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import {
  WrapperCoursePage,
  WrapperCourseContainer,
  WrapperCourseHeader,
  WrapperCourseGrid,
  SortSelect,
  CenteredPagination,
} from "./style";
import mockCourses from "../../lib/mockdata";
import { Pagination } from "antd";

const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến Cao" },
  { id: "price-hightolow", label: "Giá: Cao đến Thấp" },
  { id: "title-atoz", label: "Tiêu đề: A đến Z" },
  { id: "title-ztoa", label: "Tiêu đề: Z đến A" },
];

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function CoursePage() {
  const dispatch = useDispatch();
  // const { productList: courseList, productDetails: courseDetails } =
  //   useSelector((state) => state.product);
  const courseList = mockCourses;
  const courseDetails = mockCourses[0];
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sectionId, optionId) {
    let updatedFilters = { ...filters };
    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [optionId];
    } else {
      const optionIndex = updatedFilters[sectionId].indexOf(optionId);
      if (optionIndex === -1) {
        updatedFilters[sectionId].push(optionId);
      } else {
        updatedFilters[sectionId].splice(optionIndex, 1);
      }
    }
    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  function handleGetCourseDetails(courseId) {
    dispatch(fetchCourseDetails(courseId));
  }

  function handleAddToCart(courseId, totalStock) {
    const currentCartItems = cartItems.items || [];
    const itemIndex = currentCartItems.findIndex(
      (item) => item.productId === courseId
    );

    if (
      itemIndex > -1 &&
      currentCartItems[itemIndex].quantity + 1 > totalStock
    ) {
      toast.warning(
        `Chỉ có thể thêm ${currentCartItems[itemIndex].quantity} số lượng cho khóa học này`
      );
      return;
    }

    dispatch(
      addToCart({ userId: user?.id, productId: courseId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Khóa học đã được thêm vào giỏ hàng");
      }
    });
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  useEffect(() => {
    if (filters && sort)
      dispatch(fetchCourses({ filterParams: filters, sortParams: sort }));
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (courseDetails) setOpenDetailsDialog(true);
  }, [courseDetails]);

  return (
    <WrapperCoursePage>
      <Filter filters={filters} handleFilter={handleFilter} />

      <WrapperCourseContainer>
        <WrapperCourseHeader>
          <h2>Tất cả khóa học</h2>
          <div>
            <span>{courseList?.length} khóa học</span>
            <SortSelect
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SortSelect>
          </div>
        </WrapperCourseHeader>

        <WrapperCourseGrid>
          {courseList &&
            courseList.length > 0 &&
            courseList.map((course) => (
              <CourseCardComponent
                key={course.id}
                course={course}
                handleGetCourseDetails={handleGetCourseDetails}
                handleAddToCart={handleAddToCart}
              />
            ))}
        </WrapperCourseGrid>
      </WrapperCourseContainer>

      <CenteredPagination>
        <Pagination defaultCurrent={1} total={50} />
      </CenteredPagination>
    </WrapperCoursePage>
  );
}

export default CoursePage;
